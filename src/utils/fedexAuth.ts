import axios from "axios";

const FEDEX_AUTH_URL = "https://apis-sandbox.fedex.com/oauth/token";
const CLIENT_ID = "l7ed8ac90dc0c44a97be21d021dc7fa5d8"; // Replace with actual client ID
const CLIENT_SECRET = "f0130be9c4e24eb7a9f226d52d08ecb2"; // Replace with actual client secret

export const getFedExAccessToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post(
      FEDEX_AUTH_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("FedEx Auth Error:", error);
    return null;
  }
};
