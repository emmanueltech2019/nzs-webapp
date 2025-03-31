import React, { useEffect, useState } from "react";
import { getShippingRates } from "../../utils/fedexService";
import axios from "axios";


const ShippingRates: React.FC = () => {
  const [rates, setRates] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const fetchRates = async () => {
    try {
      const shipmentDetails = {
        shipper: {
          address: {
            city: "Lagos",
            stateOrProvinceCode: "LA",
            postalCode: "10001",
            countryCode: "NG",
            
          },
        },
        recipient: {
          address: {
            city: "Austin",
            stateOrProvinceCode: "TX",
            postalCode: "73301",
            countryCode: "US",
          },
        },
        pickupType: "DROPOFF_AT_FEDEX_LOCATION",
        rateRequestType: [
          "ACCOUNT",
          "LIST"
        ],
        requestedPackageLineItems : [
      {
        weight: {
          units: "LB",
          value: "11"
        }
      }
    ],
      };
      const data = await axios({
        url:"/users/shipping-rates",
        data:shipmentDetails,
        method:"POST"
      })
      console.log(data.data.rates.output.rateReplyDetails)
      setRates(data.data.rates.output.rateReplyDetails);
      setError(null);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching rates.");
    }
  };
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Using OpenStreetMap's Nominatim API for reverse geocoding
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        if (res.data.address) {
          console.log(res.data)
          setCity(res.data.address.city || res.data.address.town);
          setState(res.data.address.state);
        }
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);
  return (
    <div>
      <button onClick={fetchRates}>Get Shipping Rates</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {rates.map((rate, index) => (
          <li key={index} className="p-3 drop-shadow-xl">
            <b>Service:</b> {rate.serviceType}, Cost: {rate.ratedShipmentDetails[0].totalNetCharge} {rate.ratedShipmentDetails[0].currency} - {rate.ratedShipmentDetails[0].ratedPackages[0].packageRateDetail.billingWeight.units} {rate.ratedShipmentDetails[1].shipmentRateDetail.totalBillingWeight.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShippingRates;
