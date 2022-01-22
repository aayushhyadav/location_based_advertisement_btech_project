from asyncio.windows_events import NULL
import sys
import pandas as pd
import math
from sklearn.cluster import KMeans
from sklearn import preprocessing
from kneed import KneeLocator

"""
# this script finds the value of k such that average cluster size is around 2km in radius
"""

'''
# finds optimal value of k using elbow method
'''
def compute_wcss(scaled_data, data_points):
  wcss = []
  
  if(data_points > 10):
    upper_limit = 11
  else:
    upper_limit = data_points + 1
  
  for i in range(1, upper_limit):
    kmeans = KMeans(i, init = 'k-means++', random_state = 42)
    kmeans.fit(scaled_data)
    wcss.append(kmeans.inertia_)
  return wcss

def degreeToRadian(degree):
    return (degree * math.pi) / 180

'''
# computes the haversine distance using latitude and longitude coordinates of source and destination
'''
def haversineDist(lat1, long1, lat2, long2):
  R = 6371.071

  lat1 = degreeToRadian(lat1)
  long1 = degreeToRadian(long1)
  lat2 = degreeToRadian(lat2)
  long2 = degreeToRadian(long2)

  diffLat = lat2 - lat1
  diffLong = long2 - long1

  distance = 2 * R * math.asin(math.sqrt(math.sin(diffLat / 2) * math.sin(diffLat / 2) + math.cos(lat1) * math.cos(lat2) * math.sin(diffLong / 2) * math.sin(diffLong / 2)))
  return distance

'''
# computes average distance of data points from centroid of the cluster
'''
def calClusterMean(centroid, data):
  meanDist = 0
  latitude = (list(data['Latitude']))
  longitude = (list(data['Longitude']))

  for i in range(0, len(data)):
    meanDist += haversineDist(centroid[0], centroid[1], latitude[i], longitude[i])

  if(len(data) == 0):
    return 0
  return meanDist / len(data)

'''
# computes average size of all clusters
'''
def calMeanDistance(cluster, cluster_centers):
  mean = 0

  for i in range(0, len(cluster_centers)):
    mean += calClusterMean(cluster_centers[i], cluster[cluster['prediction'] == i])
  return mean / len(cluster_centers)

def compute_k(optimal_k, data_points, scaled_data, data_frame):
  cluster_centers = []
  cluster = data_frame.copy()

  for i in range(optimal_k, data_points + 1):
    kmeans = KMeans(i, init = 'k-means++', random_state = 42)
    kmeans.fit(scaled_data)

    cluster['prediction'] = kmeans.fit_predict(data_frame)
    cluster_centers = kmeans.cluster_centers_
    mean = (calMeanDistance(cluster, cluster_centers))

    if(mean <= 2):
        break

  if(i == data_points + 1):
    return data_points

  return i

arg1 = sys.argv[1]
arg2 = sys.argv[2]

# arg1 = "19.2678214,19.255892,19.2681929,19.2545103,19.2086086,19.2091141,19.227809"
# arg2 = "72.9649841,72.98365,72.96505859999999,72.981653,72.9718998,72.9722499,72.9702343"

latitude = list(map(float, arg1.split(',')))
longitude = list(map(float, arg2.split(',')))

if(len(latitude) > 10):
  upper_limit = 11
else:
  upper_limit = len(latitude) + 1

data_frame = pd.DataFrame({"Latitude": latitude, "Longitude": longitude})
scaled_data = preprocessing.scale(data_frame)

wcss = compute_wcss(scaled_data, len(latitude))
optimal_k = KneeLocator(range(1, upper_limit), wcss, curve="convex", direction="decreasing")

if(optimal_k.elbow == None):
  elbow = 1
else:
  elbow = optimal_k.elbow

k = compute_k(elbow, len(latitude), scaled_data, data_frame)

print(k)
sys.stdout.flush()