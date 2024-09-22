'use client'
import SubProvider from "@/context/SubscriptionContext";
import Layer from "./Layer";

type screentype = {
  children: React.ReactNode
};

const SubcriptionLayout = ({ children }: screentype) => {
  return (
    <SubProvider>
      <Layer>{children}</Layer>
    </SubProvider>
  );
};
export default SubcriptionLayout;
