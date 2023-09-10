const computeConsistentStats = (noisyStats) => {
  const genderCountSum = noisyStats[0] + noisyStats[1]
  const ageCountSum =
    noisyStats[2] + noisyStats[3] + noisyStats[4] + noisyStats[5]

  if (genderCountSum <= ageCountSum) {
    const randomVal = Math.random()
    const deficit = ageCountSum - genderCountSum
    randomVal > 0.5 ? (noisyStats[0] += deficit) : (noisyStats[1] += deficit)
    return noisyStats
  }

  if (genderCountSum > ageCountSum) {
    const deficit = genderCountSum - ageCountSum

    if (deficit <= noisyStats[0]) {
      noisyStats[0] -= deficit
    } else if (deficit <= noisyStats[1]) {
      noisyStats[1] -= deficit
    } else {
      noisyStats[1] -= Math.abs(noisyStats[0] - deficit)
      noisyStats[0] = 0
    }
    return noisyStats
  }
}

module.exports = {computeConsistentStats}
