const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://utc2-network.herokuapp.com";
export default baseUrl;
