import sys
import pandas as pd
import math
from sklearn.cluster import KMeans
from sklearn import preprocessing

"""
#   this script finds the value of k such that average cluster size is around 1km - 1.5km in radius
"""
def slope(x1, y1, x2, y2):
  return (y2 - y1) / (x2 - x1)

'''
# finds optimal value of k using elbow method
'''
def compute_wcss(data_points, scaled_data):
  wcss = []
  for i in range(1, 11):
    kmeans = KMeans(i, init = 'k-means++', random_state = 42)
    kmeans.fit(scaled_data)
    wcss.append(kmeans.inertia_)
  return wcss

def get_slope_ratio(wcss):
  slope_ratio = []
  for i in range(1, len(wcss) - 1):
    s1 = slope(i, wcss[i - 1], i + 1, wcss[i])
    s2 = slope(i + 1, wcss[i], i + 2, wcss[i + 1])
    slope_ratio.append(s1 / s2)
  return slope_ratio

def get_max_slope_ratio(slope_ratio):
  max = 0
  index = 0
  for i in range(0, len(slope_ratio)):
    if (max < slope_ratio[i]):
      max = slope_ratio[i]
      index = i
  return index

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
  return i

arg1 = sys.argv[1]
arg2 = sys.argv[2]

# arg1 = "19.2678214,19.255892,19.2681929,19.2545103,19.2086086,19.2091141,19.227809"
# arg2 = "72.9649841,72.98365,72.96505859999999,72.981653,72.9718998,72.9722499,72.9702343"

latitude = list(map(float, arg1.split(',')))
longitude = list(map(float, arg2.split(',')))

data_frame = pd.DataFrame({"Latitude": latitude, "Longitude": longitude})
scaled_data = preprocessing.scale(data_frame)

wcss = compute_wcss(len(latitude), scaled_data)
slope_ratio = get_slope_ratio(wcss)
optimal_k = get_max_slope_ratio(slope_ratio) + 2

k = compute_k(optimal_k, len(latitude), scaled_data, data_frame)

print(k)
sys.stdout.flush()