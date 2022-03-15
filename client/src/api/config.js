export const API_ORIGIN_URL =
process.env.NODE_ENV === "production"
  ? "https://covid19india-jay.herokuapp.com/api"
  : "https://935cce599e89.ngrok.io/api";
// export const API_ORIGIN_URL =
// process.env.NODE_ENV === "production"
//   ? "https://covid19india-jay.herokuapp.com/api"
//   : "http://localhost:8080/api";