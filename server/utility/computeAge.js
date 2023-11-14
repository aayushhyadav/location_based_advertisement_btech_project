const computeAge = (dob) => {
  curDate = new Date(Date.now()).toISOString().split("T")[0]
  return new Number(curDate.split("-")[0]) - new Number(dob.split("-")[0])
}

module.exports = {computeAge}
