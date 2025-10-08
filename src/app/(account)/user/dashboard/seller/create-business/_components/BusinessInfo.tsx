import { FC, useEffect, useState } from "react";
import general_type from "./general.types";
import interFont from "@/fonts/Inter";
import openSansFont from "@/fonts/OpenSans";
import Link from "next/link";
import Circle from "@/components/Circle";
import { Icon } from "@iconify/react/dist/iconify.js";
import poppinsFont from "@/fonts/Poppins";
import useForm from "@/hooks/useForm";
import Accordion from "./Accordion";
import useToggle from "@/hooks/useToggle";
import { ProfileInfo } from "./Main";
import axios from "@/utils/axios";
import axios2 from "axios";
import { showToast } from "@/utils/alert";
import Image from "next/image";
import { form } from "framer-motion/client";
import Swal from "sweetalert2";

const initialState = [
  { item: "Health Regulation", state: false },
  { item: "Age-based Regulation", state: false },
  { item: "Safety Regulation", state: false },
];

const cities = [
  {
    id: 0,
    abbr: "",
    name: "Select city"
  },
  {
    id: 4,
    abbr: "ABA",
    name: "ABA",
  },
  {
    id: 8,
    abbr: "AKK",
    name: "ABAKALIKI",
  },
  {
    id: 5,
    abbr: "ABK",
    name: "ABEOKUTA",
  },
  {
    id: 6,
    abbr: "ABV",
    name: "ABUJA",
  },
  {
    id: 7,
    abbr: "ADK",
    name: "ADO EKITI",
  },
  {
    id: 9,
    abbr: "AKR",
    name: "AKURE",
  },
  {
    id: 10,
    abbr: "ASB",
    name: "ASABA",
  },
  {
    id: 11,
    abbr: "AWK",
    name: "AWKA",
  },
  {
    id: 12,
    abbr: "BAU",
    name: "BAUCHI",
  },
  {
    id: 14,
    abbr: "BNI",
    name: "BENIN",
  },
  {
    id: 13,
    abbr: "BRK",
    name: "BIRNIN- KEBBI",
  },
  {
    id: 15,
    abbr: "BNY",
    name: "BONNY ISLAND",
  },
  {
    id: 16,
    abbr: "CBQ",
    name: "CALABAR",
  },
  {
    id: 17,
    abbr: "DAM",
    name: "DAMATURU",
  },
  {
    id: 18,
    abbr: "DUT",
    name: "DUTSE",
  },
  {
    id: 19,
    abbr: "EKT",
    name: "EKET",
  },
  {
    id: 20,
    abbr: "ENU",
    name: "ENUGU",
  },
  {
    id: 21,
    abbr: "GOM",
    name: "GOMBE",
  },
  {
    id: 22,
    abbr: "GUS",
    name: "GUSAU",
  },
  {
    id: 3,
    abbr: "IBA",
    name: "IBADAN",
  },
  {
    id: 24,
    abbr: "IJB",
    name: "IJEBU",
  },
  {
    id: 25,
    abbr: "IKP",
    name: "IKOT EKPENE",
  },
  {
    id: 23,
    abbr: "IFE",
    name: "ILE-IFE",
  },
  {
    id: 65,
    abbr: "Ile",
    name: "Ilesha",
  },
  {
    id: 26,
    abbr: "ILR",
    name: "ILORIN",
  },
  {
    id: 27,
    abbr: "JAL",
    name: "JALINGO",
  },
  {
    id: 28,
    abbr: "JOS",
    name: "JOS",
  },
  {
    id: 29,
    abbr: "KAD",
    name: "KADUNA",
  },
  {
    id: 30,
    abbr: "KAN",
    name: "KANO",
  },
  {
    id: 31,
    abbr: "KAS",
    name: "KASTINA",
  },
  {
    id: 32,
    abbr: "LAF",
    name: "LAFIA",
  },
  {
    id: 56,
    abbr: "ISL",
    name: "LAGOS ISLAND",
  },
  {
    id: 2,
    abbr: "MLD",
    name: "LAGOS MAINLAND",
  },
  {
    id: 33,
    abbr: "LKJ",
    name: "LOKOJA",
  },
  {
    id: 35,
    abbr: "MIU",
    name: "MAIDUGURI",
  },
  {
    id: 34,
    abbr: "MDI",
    name: "MAKURDI",
  },
  {
    id: 36,
    abbr: "MNA",
    name: "MINNA",
  },
  {
    id: 37,
    abbr: "NNI",
    name: "NNEWI",
  },
  {
    id: 38,
    abbr: "NSK",
    name: "NSUKKA",
  },
  {
    id: 39,
    abbr: "OFA",
    name: "OFA",
  },
  {
    id: 60,
    abbr: "OGB",
    name: "OGBOMOSO",
  },
  {
    id: 40,
    abbr: "ONA",
    name: "ONITSHA",
  },
  {
    id: 42,
    abbr: "OSG",
    name: "OSHOGBO",
  },
  {
    id: 43,
    abbr: "OTA",
    name: "OTA",
  },
  {
    id: 41,
    abbr: "ORI",
    name: "OWERRI",
  },
  {
    id: 61,
    abbr: "OYO",
    name: "OYO",
  },
  {
    id: 44,
    abbr: "PHC",
    name: "PORT-HARCOURT",
  },
  {
    id: 46,
    abbr: "SAG",
    name: "SAGAMU",
  },
  {
    id: 45,
    abbr: "SAE",
    name: "SAPELE",
  },
  {
    id: 47,
    abbr: "SKO",
    name: "SOKOTO",
  },
  {
    id: 48,
    abbr: "SUL",
    name: "SULEJA",
  },
  {
    id: 49,
    abbr: "UHA",
    name: "UMUAHIA",
  },
  {
    id: 50,
    abbr: "UYO",
    name: "UYO",
  },
  {
    id: 51,
    abbr: "WRI",
    name: "WARRI",
  },
  {
    id: 52,
    abbr: "YEN",
    name: "YENAGOA",
  },
  {
    id: 53,
    abbr: "YOL",
    name: "YOLA",
  },
  {
    id: 54,
    abbr: "ZRI",
    name: "ZARIA",
  },
];
const statesAndCapitals = [
  { state: "Abia", capital: "Umuahia" },
  { state: "Adamawa", capital: "Yola" },
  { state: "Akwa Ibom", capital: "Uyo" },
  { state: "Anambra", capital: "Awka" },
  { state: "Bauchi", capital: "Bauchi" },
  { state: "Bayelsa", capital: "Yenagoa" },
  { state: "Benue", capital: "Makurdi" },
  { state: "Borno", capital: "Maiduguri" },
  { state: "Cross River", capital: "Calabar" },
  { state: "Delta", capital: "Asaba" },
  { state: "Ebonyi", capital: "Abakaliki" },
  { state: "Edo", capital: "Benin City" },
  { state: "Ekiti", capital: "Ado-Ekiti" },
  { state: "Enugu", capital: "Enugu" },
  { state: "Gombe", capital: "Gombe" },
  { state: "Imo", capital: "Owerri" },
  { state: "Jigawa", capital: "Dutse" },
  { state: "Kaduna", capital: "Kaduna" },
  { state: "Kano", capital: "Kano" },
  { state: "Katsina", capital: "Katsina" },
  { state: "Kebbi", capital: "Birnin Kebbi" },
  { state: "Kogi", capital: "Lokoja" },
  { state: "Kwara", capital: "Ilorin" },
  { state: "Lagos", capital: "Ikeja" },
  { state: "Nasarawa", capital: "Lafia" },
  { state: "Niger", capital: "Minna" },
  { state: "Ogun", capital: "Abeokuta" },
  { state: "Ondo", capital: "Akure" },
  { state: "Osun", capital: "Osogbo" },
  { state: "Oyo", capital: "Ibadan" },
  { state: "Plateau", capital: "Jos" },
  { state: "Rivers", capital: "Port Harcourt" },
  { state: "Sokoto", capital: "Sokoto" },
  { state: "Taraba", capital: "Jalingo" },
  { state: "Yobe", capital: "Damaturu" },
  { state: "Zamfara", capital: "Gusau" },
  { state: "FCT", capital: "Abuja" },
];
const mainState = [
  { item: "umuahia", state: false },
  { item: "jos", state: false },
  { item: "akwa-ibom", state: false },
  { item: "anambra", state: false },
  { item: "bauchi", state: false },
  { item: "bayelsa", state: false },
  { item: "delta", state: false },
  { item: "ebonyi", state: false },
  { item: "plateau", state: false },
  { item: "niger", state: false },
  { item: "kogi", state: false },
];

// dummy google map
const GoogleMapEmbed = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.4729100739933!2d7.022166680562655!3d4.860128682521301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069d3356c536691%3A0x545520791186f2d3!2sPristine%20Medical%20Consultants!5e0!3m2!1sen!2sng!4v1726304749925!5m2!1sen!2sng"
      height="450"
      style={{ border: 0, width: "100vw" }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Google Map Embed"
    ></iframe>
  );
};

const BusinessInfo: FC<general_type> = ({
  handleBtnFunc,
  setCount,
  setSection,
}) => {
  const [uploadCount, setuploadCount] = useState(0);
  const [townId, setTownId] = useState<number | null>(null);
  const [towns, setTowns] = useState<{ TownID: number; name: string; id: number }[]>([]);
  const [streetAddress, setStreetAddress] = useForm("");
  const [zipCode, setZipCode] = useForm("");
  const [town, setTown] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [states, setState] = useState(mainState);
  const handleStates = (a: string) => {
    setState((prev) =>
      prev.map(({ item, state }, i) => ({
        item,
        state: item == a ? !state : state,
      }))
    );
  };

  const [registeredBusinessName, setRegisteredBusinessName] = useForm("");
  const [description, setDescription] = useForm("");
  const [stateOfOrigin, setStateOfOrigin] = useForm("");
  const [CAC, setCAC] = useForm("" as any);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setuploadCount(uploadCount + 1); // Optionally update upload count
    }
  };
  const [selectedCity, setSelectedCity] = useState<{
    id: number;
    abbr: string;
    name: string;
  } | null>(null);
  const [selectedState, setSelectedState] = useState<{
    state: string;
    capital: string;
  } | null>(null);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const mockEvent = {
      target: { value: value },
    } as React.ChangeEvent<HTMLInputElement>;
    setStateOfOrigin(mockEvent);

    const stateObj = statesAndCapitals.find((s) => s.state === value);
    if (stateObj) {
      setSelectedState(stateObj);
    } else {
      setSelectedState(null);
    }
  };

  const fetchTownFromCity = async (cityAbbr: string) => {
    try {
      const res = await axios2({
        url: `http://redspeedopenapi.redstarplc.com/api/Operations/DeliveryTowns/${cityAbbr}`,
        method: "GET",
        headers: {
          Accept: "text/plain",
          "X-API-KEY":
            "nsZWdsi4hMDDfQmDTv3wCPCcSJloDA-SIyTzl1lcUP8xYJWgUdRN2hMYp-DU",
        },
      });

      if (res.data && res.data.length > 0) {
        setTowns(res.data); // ✅ store full list
        setTown(""); // clear old selection
        setTownId(null);
      } else {
        showToast("warning", `No towns found for city: ${cityAbbr}`);
        setTowns([]);
        setTown("");
        setTownId(null);
      }
    } catch (err) {
      console.error("Error fetching towns:", err);
      showToast("error", `Error fetching town for city: ${cityAbbr}`);
      setTowns([]);
      setTown("");
      setTownId(null);
    }
  };

  // const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   const cityObj = cities.find((c) => c.name === value);

  //   if (cityObj) {
  //     console.log("Selected city:", cityObj);
  //     setSelectedCity(cityObj);
  //     fetchTownFromCity(cityObj.abbr); // ✅ fetch town based on abbreviation
  //   } else {
  //     setSelectedCity({ id: 0, abbr: "", name: value });
  //     setTown("");
  //     setTownId(null);
  //   }
  // };
const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value;
  const cityObj = cities.find((c) => c.name === value);

  if (cityObj) {
    console.log("Selected city:", cityObj);
    setSelectedCity(cityObj);
    fetchTownFromCity(cityObj.abbr); // ✅ fetch town based on abbreviation
  } else {
    setSelectedCity({ id: 0, abbr: "", name: value });
    setTown("");
    setTownId(null);
  }
};

  const [regulations, setRegulations] = useState(initialState);
  const handleClick = (a: any) =>
    setRegulations((prev) =>
      prev.map(({ item, state }) => ({
        item,
        state: item == a ? !state : state,
      }))
    );
  const [a, aFunc] = useToggle(true);
  const [b, bFunc] = useToggle(true);
  const handleAPI = async () => {
    if (
    !registeredBusinessName.trim() ||
    !description.trim() ||
    !CAC.trim() ||
    !streetAddress.trim() ||
    !zipCode.trim() ||
    !stateOfOrigin.trim() ||
    !selectedCity?.name ||
    !town
  ) {
    showToast("warning", "Please fill all required fields before submitting");
    return;
  }
    console.log("Submitting business with data:", {
      businessName: registeredBusinessName,
      description,
      registrationNumber: CAC,
      regulations: regulations
        .filter(({ state }) => state)
        .map(({ item }) => item),
      state: stateOfOrigin,
      city: selectedCity?.name,
      cityAbbr: selectedCity?.abbr, // equals recipientCity
      street: streetAddress,
      zip: zipCode,
      town: town,
      townId, // ✅ include TownID
    });

    try {
      let addNewBusiness = localStorage.getItem("addNewBusiness");
      const res = await axios({
        method: "PUT",
        url: "/business/add-business-info",
        data: {
          businessName: registeredBusinessName,
          description,
          registrationNumber: CAC,
          regulations: regulations
            .filter(({ state }) => state)
            .map(({ item }) => item),
          state: stateOfOrigin,
          city: selectedCity?.name,
          cityAbbr: selectedCity?.abbr,
          street: streetAddress,
          zip: zipCode,
          town: town,
          townId, // ✅ include TownID
          businessId: addNewBusiness,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      localStorage.setItem("registeredBusinessName", registeredBusinessName);
      setTimeout(()=>{
        showToast("success", res.data.message);
        setSection(3);
      }, 3000)
    } catch (err: any) {
      console.error(
        "Error submitting business:",
        err.response?.data || err.message
      );
      showToast("error", err.message);
    }
  };

  useEffect(() => {
    setCount(50);
    handleBtnFunc(handleAPI);
    return () => {
      handleBtnFunc(() => console.log("default"));
    };
  }, [
    regulations,
    uploadCount,
    states,
    registeredBusinessName,
    description,
    CAC,
    // ✅ Add all form values you want to be current when handleAPI is called:
    streetAddress,
    zipCode,
    town,
    stateOfOrigin,
    // town (this is an unused state, should probably be removed or replaced with townName)
  ]);
  return (
    <div className="py-3">
      <div className="py-5 w-full">
        <div className="py-5 flex flex-col gap-4">
          <input
            type="text"
            id="businessName"
            onChange={(e) => setRegisteredBusinessName(e)}
            value={registeredBusinessName}
            minLength={3}
            maxLength={20}
            required={true}
            className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
            placeholder="Registered Business Name"
          />
          <div>
            <input
              type="text"
              id="description"
              onChange={(e) => setDescription(e)}
              value={description}
              required={true}
              className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
              placeholder="Briefly describe your business"
            />
          </div>
          <div>
            <input
              type="text"
              id="CAC"
              minLength={6}
              maxLength={7}
              onChange={(e: any) => {
                if (isNaN(e.target.value)) return;
                setCAC(e);
              }}
              value={CAC}
              required={true}
              className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
              placeholder="CAC Registration Number"
            />
          </div>
        </div>
        <div className="border-[0.5px] border-[#D4D6DD] rounded-2xl p-4 mt-3">
          <h1 className="flex gap-2 items-center pb-6">
            <span className="flex items-center justify-center rounded-full w-4 h-4 bg-[--foreground-green]">
              <span className="flex items-center justify-center rounded-full bg-white h-[5px] w-[5px]"></span>
            </span>
            <span
              className={`text-[#71727A] text-sm font-bold ${openSansFont}`}
            >
              Consideration
            </span>
          </h1>
          <div className="flex flex-col gap-3">
            {regulations.map(({ item, state }, i) => (
              <div
                key={item}
                className={`p-4 py-3 flex justify-between rounded-[12px] transition-all duration-300 border-[0.5px] ${
                  state
                    ? "bg-[#EAF2FF] border-transparent"
                    : "bg-[#ffffff] border-[#C5C6CC]"
                } cursor-pointer`}
                onClick={() => {
                  handleClick(item);
                }}
              >
                <p className="text-[14px] text-[#1F2024]">{item}</p>
                <div className="checkbox flex items-center">
                  <Icon
                    icon="ph:check-bold"
                    className={`text-[#006838] text-[14px] transition-all duration-300 ${
                      state ? "opacity-100" : "opacity-0"
                    }`}
                  ></Icon>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="my-5">
          <input
            type="text"
            id="street"
            onChange={(e) => setStreetAddress(e)}
            value={streetAddress}
            required={true}
            className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
            placeholder="Street Address / Street Info"
          />
        </div>
        <div>
          {/* <input
            type="text"
            id="town"
            onChange={(e) => setTown(e.target.value)}
            value={town}
            required
            className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
            placeholder="Town/Area"
          /> */}
        </div>
        <div>
          <input
            type="text"
            id="zip"
            onChange={(e) => setZipCode(e)}
            value={zipCode}
            required={true}
            className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
            placeholder="Zip Code / Postal Code"
          />
        </div>
        <div className="py-5 flex flex-col gap-4">
          <select
            id="state"
            onChange={handleStateChange} // This is the fixed handler
            value={stateOfOrigin} // Now controlled by stateOfOrigin, which is updated in the handler
            required={true}
            className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
          >
            <option value="">Select State</option>
            {statesAndCapitals.map((item) => (
              <option key={item.state} value={item.state}>
                {item.state} — {item.capital}
              </option>
            ))}
          </select>
          <div className="w-full">
            <select
              id="city"
              onChange={handleCityChange}
              value={selectedCity?.name ?? ""}
              required={true}
              className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC]"
            >
              {cities.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {/* <input
              type="text"
              id="city"
              list="city-options"
              onChange={handleCityChange}
              value={selectedCity?.name ?? ""}
              required
              className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC] placeholder:text-[#8F9098]"
              placeholder="City"
            /> */}
            {/* <datalist id="city-options">
              {cities.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </datalist> */}
          </div>
          <div className="my-4">
            <select
              id="town"
              onChange={(e) => {
                const selected = towns.find((t) => t.name === e.target.value);
                if (selected) {
                  setTown(selected.name);
                  setTownId(selected.TownID);
                } else {
                  setTown("");
                  setTownId(null);
                }
              }}
              value={town}
              required
              className="w-full px-4 py-3 rounded-xl outline-none bg-inherit border-[0.67px] border-[#C5C6CC]"
            >
              <option value="">Select Town</option>
              {towns.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* <ProfileInfo /> */}
      </div>
    </div>
  );
};

export default BusinessInfo;
