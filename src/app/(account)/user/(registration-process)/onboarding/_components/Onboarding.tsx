import { Icon } from "@iconify/react/dist/iconify.js"
import onboarding_image1 from '@/assets/images/onboarding-image1.svg'
import onboarding_image2 from '@/assets/images/onboarding-image2.svg'
import onboarding_image3 from '@/assets/images/onboarding-image3.svg'

const chart = 'mage:chart-fill'
const delivery = 'solar:delivery-bold'
const verified_user = 'material-symbols:verified-user'

const Onboarding = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row min-h-screen">
        <div className="col flex-[1.5]">col-1</div>
        <div className="col flex-1 ">col-2</div>
    </section>
  )
}

export default Onboarding