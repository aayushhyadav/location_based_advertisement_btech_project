const exponential = (mean) => -1 * mean * Math.log(1 - Math.random())

const laplace = async (stats, scale) => {
  const noisyStats = stats.map((stat) => {
    const exp1 = exponential(scale)
    const exp2 = exponential(scale)
    return stat + (exp1 - exp2) < 0 ? 0 : Math.ceil(stat + (exp1 - exp2))
  })
  return noisyStats
}

module.exports = {laplace}
