import axios from "axios";

const GIG_API = axios.create({
  baseURL: "https://dev-thirdpartynode.theagilitysystems.com", // switch to prod later
// baseURL: "https://thirdpartynode.theagilitysystems.com/",
});

// Login to get token
export const gigLogin = async (email: string, password: string) => {
  const res = await GIG_API.post("/login", { email, password });
  return res.data.data["access-token"];
};

// Get Price Estimate
export const gigGetPrice = async (token: string, payload: any) => {
  const res = await GIG_API.post("/price", payload, {
    headers: { "access-token": token },
  });
  return res.data;
};

// Create Shipment
export const gigCreateShipment = async (token: string, payload: any) => {
  const res = await GIG_API.post("/capture/preshipment", payload, {
    headers: { "access-token": token },
  });
  return res.data;
};
