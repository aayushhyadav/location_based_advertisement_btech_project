# Hybrid Privacy Preservation for Location-Based Advertisement

This application makes use of [geo-indistinguishability](https://arxiv.org/abs/1212.1984) for perturbing actual location coordinates of users before sending them to the server.
Suppose, (x, y) are actual coordinates then `(x + rcos(w), y + rsin(w))` are sent to the server. This helps in preserving the location privacy of users. The amount of perturbation is controlled by the privacy budget. This privacy budget is allocated to regions based on the business density as proposed in our [research work](https://ieeexplore.ieee.org/document/9885503). With the help of perturbed coordinates and the area of retrieval specified by the user, advertisements from nearby stores are shown to the user.

The [Chicago Groceries Stores](https://www.kaggle.com/datasets/chicago/chicagogrocery-stores-2013) dataset was used for testing the application. This dataset has information about 500 grocery stores. The K-means clustering algorithm is used to generate clusters of these stores. Distances between perturbed coordinates and centroids of clusters are computed on the server to select stores in the vicinity.

Stores can post advertisements using this application. Statistical information about customers is also provided to stores for enhancing their business strategies. It is assumed that information like gender and age are shared by customers.

Moreover, analysts can query the database to gain insights about the number of customers interested in the advertisements by viewing the statistical data. To preserve customer privacy, noise is added to the results using the concept of differential privacy. The Amount of noise is controlled by the privacy budget. In this case, a fixed privacy budget is assigned to each store.

The application is robust against [localization and map-matching attacks](https://ieeexplore.ieee.org/document/9885503).

The jupyter notebook is for visualizing the clustering algorithm.

`npm run dev` -> starts the server.\
`npm run start` -> initiates the frontend application.\
Make sure that a local instance of mongoDB is up and running.\
APIs can be tested using postman.
