"use client";
import React, { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export interface BookingTypes {
  day: string;
  month: string;
  year: string;
  date: string;
  bookingTitle: string;
  hour: string;
  min: string;
  meridiem: string;
}

interface HealthRecord {
  careType: string[];
  specialtyTitle: string;
  brieflyDescribe: string;
  procedureType: string;
  symptomatic: string[];
  providerType: string[];
  providerName: string[];
  providerProfileUrl: string[];
  bookingSlots: BookingTypes;
}

interface HospitalityRecord {
  serviceTitle: string;
  serviceDescribe: string;
  serviceList: string[];
  componentsAvailable: string[];
  maximumCapacity: number;
  imageUrl: string[];
  addHospitalityBooking: BookingTypes;
}

interface ClassRecord {
  classTitle: string;
  classBrieflyDescribe: string;
  classSectionList: string;
  classStudentCategory: string;
  classMaximumCapacity: number;
  classCertification: string;
  classProviderType: string[];
  classProviderName: string[];
  classProviderProfileUrl: string[];
  classBookingInfo: BookingTypes;
  classBookingTitle: string[];
}
interface LegalRecord {
  LegalSpecialtyTitle: string;
  LegalBrieflyDescribe: string;
  legalSimilarSpecialties: string[];
  legalServicesAvailable: string[];
  legalServiceCost: string;
  legalProviderType: string[];
  legalProviderName: string[];
  legalProviderProfileUrl: string[];
  legalBookingInfo: BookingTypes;
  legalBookingTitle: string[];
}
interface LogisticsRecord {
  LogisticsSpecialtyTitle: string;
  LogisticsBrieflyDescribe: string;
  logisticsSimilarSpecialties: string[];
  logisticsServicesAvailable: string[];
  logisticsServiceCost: string;
  logisticsProviderType: string[];
  logisticsProviderName: string[];
  logisticsProviderProfileUrl: string[];
  logisticsBookingInfo: BookingTypes;
  logisticsBookingTitle: string[];
}

interface HealthContextType {
  /*
        HEALTH CONTEXT TYPE
    */
  addHealthButton: boolean;
  setAddHealthButton: React.Dispatch<React.SetStateAction<boolean>>;

  // The Master List
  healthDataList: HealthRecord[];
  saveCurrentHealthData: () => void;

  // Specialty Info
  careType: string[];
  setCareType: React.Dispatch<React.SetStateAction<string[]>>;
  specialtyTitle: string;
  setSpecialtyTitle: React.Dispatch<React.SetStateAction<string>>;
  brieflyDescribe: string;
  setBrieflyDescribe: React.Dispatch<React.SetStateAction<string>>;
  procedureType: string;
  setProcedureType: React.Dispatch<React.SetStateAction<string>>;
  symptomatic: string[];
  setSymptomatic: React.Dispatch<React.SetStateAction<string[]>>;

  // Provider Info
  providerType: string[];
  setProviderType: React.Dispatch<React.SetStateAction<string[]>>;
  providerName: string[];
  setProviderName: React.Dispatch<React.SetStateAction<string[]>>;
  providerProfileUrl: string[];
  setProviderProfileUrl: React.Dispatch<React.SetStateAction<string[]>>;

  // Booking Info
  bookingSlots: BookingTypes;
  setBookingSlots: React.Dispatch<React.SetStateAction<BookingTypes>>;

  /*
        HOSPITALITY CONTEXT TYPE
    */
  hospitalityDataList: HospitalityRecord[];
  saveCurrentHospitalityData: () => void;
  addHospitalityButton: boolean;
  setAddHospitalityButton: React.Dispatch<React.SetStateAction<boolean>>;
  serviceTitle: string;
  setServiceTitle: React.Dispatch<React.SetStateAction<string>>;
  serviceDescribe: string;
  setServiceDescribe: React.Dispatch<React.SetStateAction<string>>;
  serviceList: string[];
  setServiceList: React.Dispatch<React.SetStateAction<string[]>>;
  componentsAvailable: string[];
  setComponentsAvailable: React.Dispatch<React.SetStateAction<string[]>>;
  maximumCapacity: number;
  setMaximumCapacity: React.Dispatch<React.SetStateAction<number>>;
  imageUrl: string[];
  setImageUrl: React.Dispatch<React.SetStateAction<string[]>>;
  addHospitalityBooking: BookingTypes;
  setAddHospitalityBooking: React.Dispatch<React.SetStateAction<BookingTypes>>;

  /*
        EDUCATION
   */

  handleSaveClassData: () => void;
  classDataList: ClassRecord[];
  addClass: boolean;
  setAddClass: React.Dispatch<React.SetStateAction<boolean>>;
  classTitle: string;
  setClassTitle: React.Dispatch<React.SetStateAction<string>>;
  classBrieflyDescribe: string;
  setClassBrieflyDescribe: React.Dispatch<React.SetStateAction<string>>;
  classSectionList: string;
  setClassSectionList: React.Dispatch<React.SetStateAction<string>>;
  classStudentCategory: string;
  setClassStudentCategory: React.Dispatch<React.SetStateAction<string>>;
  classMaximumCapacity: number;
  setClassMaximumCapacity: React.Dispatch<React.SetStateAction<number>>;
  classCertification: string;
  setClassCertification: React.Dispatch<React.SetStateAction<string>>;
  classProviderType: string[];
  setClassProviderType: React.Dispatch<React.SetStateAction<string[]>>;
  classProviderName: string[];
  setClassProviderName: React.Dispatch<React.SetStateAction<string[]>>;
  classProviderProfileUrl: string[];
  setClassProviderProfileUrl: React.Dispatch<React.SetStateAction<string[]>>;
  classBookingInfo: BookingTypes;
  setClassBookingInfo: React.Dispatch<React.SetStateAction<BookingTypes>>;
  classBookingTitle: string[];
  setClassBookingTitle: React.Dispatch<React.SetStateAction<string[]>>;

  /*
    LEGAL
  */
 legalDataList: LegalRecord[];
 handleSaveLegalData: () => void;
 addLegalServices: boolean;
 setAddLegalServices: React.Dispatch<React.SetStateAction<boolean>>;
  LegalSpecialtyTitle: string;
  setLegalSpecialtyTitle: React.Dispatch<React.SetStateAction<string>>;
  LegalBrieflyDescribe: string;
  setLegalBrieflyDescribe: React.Dispatch<React.SetStateAction<string>>;
  legalSimilarSpecialties: string[];
  setLegalSimilarSpecialties: React.Dispatch<React.SetStateAction<string[]>>;
  legalServicesAvailable: string[];
  setLegalServicesAvailable: React.Dispatch<React.SetStateAction<string[]>>;
  legalServiceCost: string;
  setLegalServiceCost: React.Dispatch<React.SetStateAction<string>>;
  legalProviderType: string[];
    setLegalProviderType: React.Dispatch<React.SetStateAction<string[]>>;
  legalProviderName: string[];
  setLegalProviderName: React.Dispatch<React.SetStateAction<string[]>>;
  legalProviderProfileUrl: string[];
  setLegalProviderProfileUrl: React.Dispatch<React.SetStateAction<string[]>>;
  legalBookingInfo: BookingTypes;
  setLegalBookingInfo: React.Dispatch<React.SetStateAction<BookingTypes>>;
  legalBookingTitle: string[];
  setLegalBookingTitle: React.Dispatch<React.SetStateAction<string[]>>;

  /*
    LOGISTICS
  */
 logisticsDataList: LogisticsRecord[];
 handleSaveLogisticsData: () => void;
 addLogisticsServices: boolean;
 setAddLogisticsServices: React.Dispatch<React.SetStateAction<boolean>>;
  LogisticsSpecialtyTitle: string;
  setLogisticsSpecialtyTitle: React.Dispatch<React.SetStateAction<string>>;
  LogisticsBrieflyDescribe: string;
  setLogisticsBrieflyDescribe: React.Dispatch<React.SetStateAction<string>>;
  logisticsSimilarSpecialties: string[];
  setLogisticsSimilarSpecialties: React.Dispatch<React.SetStateAction<string[]>>;
  logisticsServicesAvailable: string[];
  setLogisticsServicesAvailable: React.Dispatch<React.SetStateAction<string[]>>;
  logisticsServiceCost: string;
  setLogisticsServiceCost: React.Dispatch<React.SetStateAction<string>>;
  logisticsProviderType: string[];
    setLogisticsProviderType: React.Dispatch<React.SetStateAction<string[]>>;
  logisticsProviderName: string[];
  setLogisticsProviderName: React.Dispatch<React.SetStateAction<string[]>>;
  logisticsProviderProfileUrl: string[];
  setLogisticsProviderProfileUrl: React.Dispatch<React.SetStateAction<string[]>>;
  logisticsBookingInfo: BookingTypes;
  setLogisticsBookingInfo: React.Dispatch<React.SetStateAction<BookingTypes>>;
  logisticsBookingTitle: string[];
  setLogisticsBookingTitle: React.Dispatch<React.SetStateAction<string[]>>;
}

const ServicesContextProvider = createContext<HealthContextType | undefined>(
  undefined,
);

const ServicesContext = ({ children }: Props) => {
  /*
        ADD HEALTH
    */
  const [addHealthButton, setAddHealthButton] = useState<boolean>(false);
  const [healthDataList, setHealthDataList] = useState<HealthRecord[]>([]);

  const [careType, setCareType] = useState<string[]>([]);
  const [specialtyTitle, setSpecialtyTitle] = useState<string>("");
  const [brieflyDescribe, setBrieflyDescribe] = useState<string>("");
  const [procedureType, setProcedureType] = useState<string>("");
  const [symptomatic, setSymptomatic] = useState<string[]>([]);

  const [providerType, setProviderType] = useState<string[]>([]);
  const [providerName, setProviderName] = useState<string[]>([]);
  const [providerProfileUrl, setProviderProfileUrl] = useState<string[]>([]);

  const [bookingSlots, setBookingSlots] = useState<BookingTypes>({
    day: "",
    month: "",
    date: "",
    bookingTitle: "",
    hour: "",
    min: "",
    meridiem: "",
    year: "",
  });

  const saveCurrentHealthData = () => {
    const newRecord: HealthRecord = {
      careType,
      specialtyTitle,
      brieflyDescribe,
      procedureType,
      symptomatic,
      providerType,
      providerName,
      providerProfileUrl,
      bookingSlots,
    };
    setHealthDataList((prev) => [...prev, newRecord]);
  };

  /* 
        HOSPITALITY
    */

  const [addHospitalityButton, setAddHospitalityButton] =
    useState<boolean>(false);
  const [hospitalityDataList, setHospitalityDataList] = useState<
    HospitalityRecord[]
  >([]);
  const [serviceTitle, setServiceTitle] = useState<string>("");
  const [serviceDescribe, setServiceDescribe] = useState<string>("");
  const [serviceList, setServiceList] = useState<string[]>([]);
  const [componentsAvailable, setComponentsAvailable] = useState<string[]>([]);
  const [maximumCapacity, setMaximumCapacity] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [addHospitalityBooking, setAddHospitalityBooking] =
    useState<BookingTypes>({
      day: "",
      month: "",
      date: "",
      bookingTitle: "",
      hour: "",
      min: "",
      meridiem: "",
      year: "",
    });

  const saveCurrentHospitalityData = () => {
    const newRecord: HospitalityRecord = {
      serviceTitle,
      serviceDescribe,
      serviceList,
      maximumCapacity,
      imageUrl,
      addHospitalityBooking,
      componentsAvailable,
    };
    setHospitalityDataList((prev) => [...prev, newRecord]);
  };

  /*
        EDUCATION
    */
  const [classDataList, setClassDataList] = useState<ClassRecord[]>([]);
  const [addClass, setAddClass] = useState<boolean>(false);
  const [classTitle, setClassTitle] = useState<string>("");
  const [classSectionList, setClassSectionList] = useState<string>("");
  const [classStudentCategory, setClassStudentCategory] = useState<string>("");
  const [classMaximumCapacity, setClassMaximumCapacity] = useState<number>(0);
  const [classCertification, setClassCertification] = useState<string>("");
  const [classProviderType, setClassProviderType] = useState<string[]>([]);
  const [classProviderName, setClassProviderName] = useState<string[]>([]);
  const [classProviderProfileUrl, setClassProviderProfileUrl] = useState<
    string[]
  >([]);
  const [classBookingInfo, setClassBookingInfo] = useState<BookingTypes>({
    day: "",
    month: "",
    date: "",
    bookingTitle: "",
    hour: "",
    min: "",
    meridiem: "",
    year: "",
  });
  const [classBrieflyDescribe, setClassBrieflyDescribe] = useState<string>("");
  const [classBookingTitle, setClassBookingTitle] = useState<string[]>([]);

  const handleSaveClassData = () => {
    const newRecord: ClassRecord = {
      classTitle,
      classBrieflyDescribe,
      classSectionList,
      classStudentCategory,
      classMaximumCapacity,
      classCertification,
      classProviderType,
      classProviderName,
      classProviderProfileUrl,
      classBookingInfo,
      classBookingTitle,
    };
    setClassDataList((prev) => [...prev, newRecord]);
  };

  /*
    LEGAL
  */

    const [legalDataList, setLegalDataList] = useState<LegalRecord[]>([]);
    const [addLegalServices, setAddLegalServices] = useState<boolean>(false);
    const [LegalSpecialtyTitle, setLegalSpecialtyTitle] = useState<string>("");
    const [LegalBrieflyDescribe, setLegalBrieflyDescribe] = useState<string>("");
    const [legalSimilarSpecialties, setLegalSimilarSpecialties] = useState<string[]>([]);
    const [legalServicesAvailable, setLegalServicesAvailable] = useState<string[]>([]);
    const [legalServiceCost, setLegalServiceCost] = useState<string>("");
    const [legalProviderType, setLegalProviderType] = useState<string[]>([]);
    const [legalProviderName, setLegalProviderName] = useState<string[]>([]);
    const [legalProviderProfileUrl, setLegalProviderProfileUrl] = useState<string[]>([]);
    const [legalBookingInfo, setLegalBookingInfo] = useState<BookingTypes>({
        day: "",
        month: "",
        date: "",
        bookingTitle: "",
        hour: "",
        min: "",
        meridiem: "",
        year: "",
    });
    const [legalBookingTitle, setLegalBookingTitle] = useState<string[]>([]);

    const handleSaveLegalData = () => {
        const newRecord: LegalRecord = {
            LegalSpecialtyTitle,
            LegalBrieflyDescribe,
            legalSimilarSpecialties,
            legalServicesAvailable,
            legalServiceCost,
            legalProviderType,
            legalProviderName,
            legalProviderProfileUrl,
            legalBookingInfo,
            legalBookingTitle
        };
        setLegalDataList((prev) => [...prev, newRecord]);
    };

    /*
    LOGISTICS
    */
    const [logisticsDataList, setLogisticsDataList] = useState<LogisticsRecord[]>([]);
    const [addLogisticsServices, setAddLogisticsServices] = useState<boolean>(false);
    const [LogisticsSpecialtyTitle, setLogisticsSpecialtyTitle] = useState<string>("");
    const [LogisticsBrieflyDescribe, setLogisticsBrieflyDescribe] = useState<string>("");
    const [logisticsSimilarSpecialties, setLogisticsSimilarSpecialties] = useState<string[]>([]);
    const [logisticsServicesAvailable, setLogisticsServicesAvailable] = useState<string[]>([]);
    const [logisticsServiceCost, setLogisticsServiceCost] = useState<string>("");
    const [logisticsProviderType, setLogisticsProviderType] = useState<string[]>([]);
    const [logisticsProviderName, setLogisticsProviderName] = useState<string[]>([]);
    const [logisticsProviderProfileUrl, setLogisticsProviderProfileUrl] = useState<string[]>([]);
    const [logisticsBookingInfo, setLogisticsBookingInfo] = useState<BookingTypes>({
        day: "",
        month: "",
        date: "",
        bookingTitle: "",
        hour: "",
        min: "",
        meridiem: "",
        year: "",
    });
    const [logisticsBookingTitle, setLogisticsBookingTitle] = useState<string[]>([]);

    const handleSaveLogisticsData = () => {
        const newRecord: LogisticsRecord = {
            LogisticsSpecialtyTitle,
            LogisticsBrieflyDescribe,
            logisticsSimilarSpecialties,
            logisticsServicesAvailable,
            logisticsServiceCost,
            logisticsProviderType,
            logisticsProviderName,
            logisticsProviderProfileUrl,
            logisticsBookingInfo,
            logisticsBookingTitle
        };
        setLogisticsDataList((prev) => [...prev, newRecord]);
    };


  return (
    <ServicesContextProvider.Provider
      value={{
        //Health Services
        addHealthButton,
        setAddHealthButton,
        careType,
        setCareType,
        specialtyTitle,
        setSpecialtyTitle,
        brieflyDescribe,
        setBrieflyDescribe,
        procedureType,
        setProcedureType,
        symptomatic,
        setSymptomatic,
        providerType,
        setProviderType,
        providerName,
        setProviderName,
        providerProfileUrl,
        setProviderProfileUrl,
        bookingSlots,
        setBookingSlots,
        saveCurrentHealthData,
        healthDataList,
        //Hospitality Services
        addHospitalityButton,
        setAddHospitalityButton,
        serviceTitle,
        setServiceTitle,
        serviceDescribe,
        setServiceDescribe,
        serviceList,
        setServiceList,
        componentsAvailable,
        setComponentsAvailable,
        maximumCapacity,
        setMaximumCapacity,
        imageUrl,
        setImageUrl,
        addHospitalityBooking,
        setAddHospitalityBooking,
        saveCurrentHospitalityData,
        hospitalityDataList,

        //EDUCATION
        addClass,
        setAddClass,
        classTitle,
        setClassTitle,
        classSectionList,
        setClassSectionList,
        classStudentCategory,
        setClassStudentCategory,
        classMaximumCapacity,
        setClassMaximumCapacity,
        classCertification,
        setClassCertification,
        classProviderType,
        setClassProviderType,
        classProviderName,
        setClassProviderName,
        classProviderProfileUrl,
        setClassProviderProfileUrl,
        classBookingInfo,
        setClassBookingInfo,
        classBrieflyDescribe,
        setClassBrieflyDescribe,
        classBookingTitle,
        setClassBookingTitle,
        handleSaveClassData,
        classDataList,

        //LEGAL
        addLegalServices,
        setAddLegalServices,
        LegalSpecialtyTitle,
        setLegalSpecialtyTitle,
        LegalBrieflyDescribe,
        setLegalBrieflyDescribe,
        legalSimilarSpecialties,
        setLegalSimilarSpecialties,
        legalServicesAvailable,
        setLegalServicesAvailable,
        legalServiceCost,
        setLegalServiceCost,
        legalProviderType, 
        setLegalProviderType,
        legalProviderName,
        setLegalProviderName,
        legalProviderProfileUrl,
        setLegalProviderProfileUrl,
        legalBookingInfo,
        setLegalBookingInfo,
        setLegalBookingTitle, legalBookingTitle,
        legalDataList,
        handleSaveLegalData,
        //LOGISTICS
        logisticsDataList,
        addLogisticsServices,
        setAddLogisticsServices,
        LogisticsSpecialtyTitle,
        setLogisticsSpecialtyTitle,
        LogisticsBrieflyDescribe,
        setLogisticsBrieflyDescribe,
        logisticsSimilarSpecialties,
        setLogisticsSimilarSpecialties,
        logisticsServicesAvailable,
        setLogisticsServicesAvailable,
        logisticsServiceCost,
        setLogisticsServiceCost,
        logisticsProviderType,
        setLogisticsProviderType,
        logisticsProviderName,
        setLogisticsProviderName,
        logisticsProviderProfileUrl,
        setLogisticsProviderProfileUrl,
        logisticsBookingInfo,
        setLogisticsBookingInfo,
        setLogisticsBookingTitle,
        logisticsBookingTitle,
        handleSaveLogisticsData
      }}
    >
      {children}
    </ServicesContextProvider.Provider>
  );
};

export const useProvider = () => {
  const context = useContext(ServicesContextProvider);
  if (!context)
    throw new Error("useProvider must be used within a HealthContextProvider");
  return context;
};

export default ServicesContext;
