// import React from 'react'
// import { Icon } from '@iconify/react'
// import Profile from '@/app/(account)/user/dashboard/seller/profile/components/Profile'


// const RightSidenav = () => {
//   return (
//     <div className='hidden bg-[#EAF2FF] md:flex justify-between flex-col top-0 overflow-y-auto max-h-screen md:min-w-[30vw] lg:min-w-[23vw] py-[00px] px-4 sticky right-0'>

//       <Profile />

//     </div>
//   )
// }

// export default RightSidenav
// "use client";

// import React from "react";
// import Profile from "@/app/(account)/user/dashboard/seller/profile/components/Profile";

// const RightSidenav = () => {
//   return (
//     <aside
//       className="
//         hidden
//         lg:block
//         w-[360px]
//         shrink-0
//         self-start
//         p-4
//         pr-5
//       "
//     >
//       <div className="sticky top-4">
//         <Profile />
//       </div>
//     </aside>
//   );
// };

// export default RightSidenav;
"use client";

import React from "react";
import Profile from "@/app/(account)/user/dashboard/seller/profile/components/Profile";

const RightSidenav = () => {
  return (
    <aside
      className="
        fixed
        right-0
        top-0
        z-40
        hidden
        h-screen
        w-[360px]
        overflow-y-auto
        bg-[#f7f9f8]
        px-4
        py-4
        xl:block
      "
    >
      <div className="w-full">
        <Profile />
      </div>
    </aside>
  );
};

export default RightSidenav;