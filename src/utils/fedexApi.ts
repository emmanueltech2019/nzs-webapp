import axios from "axios";
import dotenv from "dotenv";
import { getFedExAccessToken } from "./fedexAuth";

dotenv.config();

const fedexBaseUrl = process.env.REACT_APP_FEDEX_BASE_URL_TEST || "https://apis-sandbox.fedex.com";
const fedexAccountNumber = process.env.REACT_APP_FEDEX_ACCOUNT_NUMBER || "";

// Function to create an Axios instance dynamically with the auth token
const createFedexApiInstance = async () => {
  const accessToken = await getFedExAccessToken();
  if (!accessToken) throw new Error("Failed to get FedEx access token.");

  return axios.create({
    baseURL: fedexBaseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// Get Shipping Rates API
export const getShippingRates = async (shipmentDetails: any) => {
  try {
    const fedexApi = await createFedexApiInstance();
    const response = await fedexApi.post("/rate/v1/rates/quotes", {
      accountNumber: { value: fedexAccountNumber },
      requestedShipment: shipmentDetails,
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching shipping rates:", error.response?.data || error.message);
    throw error;
  }
};
