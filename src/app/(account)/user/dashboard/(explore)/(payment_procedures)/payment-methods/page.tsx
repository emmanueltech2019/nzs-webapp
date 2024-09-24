import TagHeader from "@/components/header/TagHeader"
import PaymentComponent from "./component/PaymentMethod"

const page = () => {
  return (
    <div>
      <TagHeader title="Payment"/>
      <PaymentComponent/>
    </div>
  )
}

export default page