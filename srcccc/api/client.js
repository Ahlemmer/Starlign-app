import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://us-central1-straling-9dd24.cloudfunctions.net/api/",
  timeout: 190000,
});

export default { apiClient };
