const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET

/**
 * Using the email and password generates a JWT.
 * Expires in 4 weeks.
 *
 * @param email email of the authenticated user
 *
 * @returns a string containing the JWT
 */
const generateJwt = (email, password) => {
  const payload = {email, password}
  const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "4w"})
  return token
}

const decodeJwt = (token) => {
  try {
    const {email, password} = jwt.verify(token, JWT_SECRET)
    return {email, password}
  } catch (error) {
    console.log(error)
    throw new Error("Token Expired!")
  }
}

module.exports = {generateJwt, decodeJwt}
