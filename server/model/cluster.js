const mongoose = require("mongoose")

const clusterSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  poi: [],
  clusters: [],
  clusterSize: [],
  epsilon: [],
})

const Cluster = mongoose.model("Cluster", clusterSchema)

module.exports = {Cluster}
