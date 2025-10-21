import axios from "axios";

const browserHttpClient = axios.create({
  adapter: "fetch",
});

export default browserHttpClient;
