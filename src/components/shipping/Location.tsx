import { useState, useEffect, useRef } from "react";
import axios from "axios";

const LocationAutoFill = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null); // Specify type

  useEffect(() => {
    if (window.google && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["(cities)"], // Restrict to cities
        componentRestrictions: { country: "us" }, // Optional: Restrict to a country
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log(place);

        if (place.address_components && inputRef.current) {
          const city = place.address_components.find((comp) =>
            comp.types.includes("locality")
          )?.long_name;
          const state = place.address_components.find((comp) =>
            comp.types.includes("administrative_area_level_1")
          )?.long_name;

          console.log("City:", city, "State:", state);
          inputRef.current.value = `${city}, ${state}`;
        }
      });
    }
  }, []);

  return (
    <div>
      <input type="text" placeholder="City" value={city} readOnly />
      <input type="text" placeholder="State" value={state} readOnly />
    </div>
  );
};

export default LocationAutoFill;
