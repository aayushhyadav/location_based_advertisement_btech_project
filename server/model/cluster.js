const mongoose = require("mongoose")

const clusterSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  poi: [],
  clusters: [],
})

const Cluster = mongoose.model("Cluster", clusterSchema)

module.exports = {Cluster}
