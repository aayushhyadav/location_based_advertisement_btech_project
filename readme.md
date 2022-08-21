# Hybrid Privacy Preservation for Location-Based Advertisement

This application makes use of geo-indistinguishability for perturbing actual location coordinates of users before sending them to the server.
Suppose, (x, y) are actual coordinates then (x + rcos(w), y + rsin(w)) are sent to the server. This helps in preserving location privacy of users.
Amount of perturbation is controlled by the privacy budget.
With the help of perturbed coordinates and area of retrieval specified by the user, advertisements from nearby stores are shown to the user.

The Chicago Groceries Stores dataset was used for testing the application. This dataset has information about 500 grocery stores.
K-means clustering algorithm is used to generate clusters of these stores.
Distances between perturbed coordinates and centroids of clusters are computed on the server to select the nearby stores.

Stores can post details about their advertisements using this application.
Statistical information about customers is also provided to stores for enhancing their business strategies.
It is assumed that information like gender and age-group of customers is shared by stores.

Analysts can query the database to gain insights into customer footfall by viewing the statistical data.
To preserve customer privacy, noise is added to the results using the concept of differential privacy.
Amount of noise is controlled by the privacy budget.

The application is robust against localization attack and map-matching attack.

The jupyter notebook is just for visualizing the clustering algorithm.

"npm run dev" -> starts the server.\
"npm run start" -> initiates the frontend application.\
make sure that a local instance of mongoDB is up and running.\
APIs can be tested using postman.
