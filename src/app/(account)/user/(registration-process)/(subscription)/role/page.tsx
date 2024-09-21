import subcriptionLayout from "../layout";
import Role from "./_components/Role";
import ourTeamBanner from "@/assets/images/our-team-banner.svg";

const progressbar = 30
type roleType = {
  childHandleImg: (img:any) => void,
  progressbar: (progressbar:number) => void
}

const page = ({childHandleImg, progressbar}:roleType) => {
  
  return (
    <div>
      <Role />
    </div>
  );
};

export default page;
