import axios from "axios";
import dotenv from 'dotenv';
import { getFedExAccessToken } from "./fedexAuth";

dotenv.config();

const fedexBaseUrl = process.env.REACT_APP_FEDEX_BASE_URL_TEST || "https://apis-sandbox.fedex.com";
const fedexApiKey = process.env.REACT_APP_FEDEX_API_KEY || "";
const fedexPassword = process.env.REACT_APP_FEDEX_PASSWORD || "";
const fedexAccountNumber =  "510087020";
const fedexMeterNumber = process.env.REACT_APP_FEDEX_METER_NUMBER || "";
console.log(fedexBaseUrl, fedexApiKey, fedexPassword, fedexMeterNumber, fedexAccountNumber)
// FedEx Request Headers
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${fedexApiKey}`,
};

// Common FedEx API Request Function
export const fedexApi = axios.create({
  baseURL: "https://apis-sandbox.fedex.com",
  headers,
});

// Example: Get Shipping Rates
export const getShippingRates = async (shipmentDetails: any) => {
    // console.log(fedexBaseUrl)

  try {
    const accessToken = await getFedExAccessToken();
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
