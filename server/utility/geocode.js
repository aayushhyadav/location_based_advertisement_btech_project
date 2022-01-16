const axios = require("axios")
const dotenv = require("dotenv")
const {stringify} = require("nodemon/lib/utils")

const envVar = dotenv.config()
const API_KEY = process.env.GEOCODER_API_KEY
const GEO_URL = "https://maps.googleapis.com/maps/api/geocode/json?address="
const REVERSE_GEO_URL =
  "https://maps.googleapis.com/maps/api/geocode/json?latlng="

if (envVar.error) {
  throw envVar.error
}

const geocodeToCoords = async (address) => {
  const url = GEO_URL + address + "&key=" + API_KEY
  const res = await axios.get(url)
  return res.data.results[0].geometry.location
}

const geocodeToCity = async (latitude, longitude) => {
  const url =
    GEO_URL +
    latitude.toString() +
    "," +
    longitude.toString() +
    "&key=" +
    API_KEY

  const res = await axios.get(url)
  return res.data.results[0].address_components[5].long_name
}

module.exports = {geocodeToCoords, geocodeToCity}
