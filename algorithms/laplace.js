const exponential = (mean) => -1 * mean * Math.log(1 - Math.random())

const laplace = (scale) => {
  const exp1 = exponential(scale)
  const exp2 = exponential(scale)
  return exp1 - exp2
}

var noise = laplace(1) // epsilon = 1
console.log(`result - ${10 + noise}`)

noise = laplace(10) // epsilon = 0.1
console.log(`result - ${10 + noise}`)

noise = laplace(100) // epsilon = 0.01
console.log(`result - ${10 + noise}`)
