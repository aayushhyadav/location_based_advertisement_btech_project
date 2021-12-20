const axios = require("axios")
const dotenv = require("dotenv")

const envVar = dotenv.config()
const API_KEY = process.env.GEOCODER_API_KEY
const BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address="

if (envVar.error) {
  throw envVar.error
}

const geocode = async (address) => {
  const url = BASE_URL + address + "&key=" + API_KEY
  const res = await axios.get(url)
  console.log(res)
  return res
}

module.exports = {geocode}
