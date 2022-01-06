import sys
import pandas as pd
from sklearn.cluster import KMeans
from sklearn import preprocessing

"""
#   this script finds the optimal value of k using elbow method
"""
def slope(x1, y1, x2, y2):
  return (y2 - y1) / (x2 - x1)

def compute_wcss(data_points, scaled_data):
  wcss = []
  for i in range(1, data_points + 1):
    kmeans = KMeans(i, random_state = 42)
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

arg1 = sys.argv[1]
arg2 = sys.argv[2]

latitude = list(map(float, arg1.split(',')))
longitude = list(map(float, arg2.split(',')))

data_frame = pd.DataFrame({"Latitude": latitude, "Longitude": longitude})
scaled_data = preprocessing.scale(data_frame)

wcss = compute_wcss(len(latitude), scaled_data)
slope_ratio = get_slope_ratio(wcss)
k = get_max_slope_ratio(slope_ratio) + 2

print(k)
sys.stdout.flush()