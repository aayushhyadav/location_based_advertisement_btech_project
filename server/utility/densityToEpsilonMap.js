const calDensity = (cluster) => {
  const area = cluster.clusterSize
  const compactness = []
  const epsilon = []

  /* calculating business density in a region with radius = 200m */
  for (var i = 0; i < area.length; i++) {
    val = area[i] * 10e6
    const density =
      (cluster.clusters[i].clusterInd.length / val) * Math.PI * 4 * 10e4

    /*
     * mapping [0, 1] to [0.25, 0.5]
     * former range is the probability of guessing the correct store visited by the user
     * for example business density = 4, then P(correctly guessing) = 0.25
     * latter range is minimum probability of making an error
     * so if P(guessing) is low then minimum probability of making an error can be on the lower side
     */
    epsilon.push(((1 / Math.ceil(density)) * 0.25) / 1 + 0.25)
  }
  return epsilon
}

module.exports = {calDensity}
