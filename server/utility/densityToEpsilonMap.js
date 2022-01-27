const calDensity = (cluster) => {
  const area = cluster.clusterSize
  const epsilon = []

  /* calculating business density in a region with radius = 200m */
  for (var i = 0; i < area.length; i++) {
    /*
     * mapping [0, 1] to [0.1, 0.5]
     * former range is the probability of guessing the correct store visited by the user
     * for example num ber of businesses = 4, then P(correctly guessing) = 0.25
     * latter range is minimum probability of making an error
     * so if P(guessing) is low then minimum probability of making an error can be on the lower side
     */
    const probMinError =
      ((1 / cluster.clusters[i].clusterInd.length) * 0.4) / 1 + 0.1

    const e =
      (1 / (1000 * Math.sqrt(area[i] / Math.PI))) *
      Math.log((1 - probMinError) / probMinError)

    epsilon.push(e)
  }
  return epsilon
}

module.exports = {calDensity}
