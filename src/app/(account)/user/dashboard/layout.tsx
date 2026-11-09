
// import React from "react";
// import LeftSidenav from "@/components/dashboard/sidenav/LeftSidenav";
// import RightSidenav from "@/components/dashboard/sidenav/RightSidenav";

// export default function layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="md:flex block justify-between">
//       <LeftSidenav />
//       <div className="w-full xl:w-[55vw] mx-auto overflow-y-auto h-[100vh]">{children}</div>
//       <RightSidenav />
//     </div>
//   );
// }

// // md:w-[60vw]
// import React from "react";
// import LeftSidenav from "@/components/dashboard/sidenav/LeftSidenav";
// import RightSidenav from "@/components/dashboard/sidenav/RightSidenav";

// export default function Layout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen bg-[#f7f9f8]">
//       {/* Left sidebar */}
//       <LeftSidenav />

//       {/* Main content */}
//       <main
//         className="
//           min-h-screen
//           w-full
//           px-4
//           pb-24
//           md:px-6
//           lg:ml-[10px]
//           lg:mr-[360px]
//           lg:px-6
//           xl:px-8
//         "
//       >
//         <div className="mx-auto max-w-[900px]">
//           {children}
//         </div>
//       </main>

//       {/* Right sidebar */}
//       <RightSidenav />
//     </div>
//   );
// }
import React from "react";
import LeftSidenav from "@/components/dashboard/sidenav/LeftSidenav";
import RightSidenav from "@/components/dashboard/sidenav/RightSidenav";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f9f8]">
      {/* ================================================================ */}
      {/* LEFT SIDEBAR                                                     */}
      {/* ================================================================ */}

      <LeftSidenav />

      {/* ================================================================ */}
      {/* MAIN CONTENT                                                     */}
      {/* ================================================================ */}

      <main
        className="
          min-h-screen
          min-w-0
          pb-24
          md:px-6
          lg:ml-[260px]
          lg:mr-[360px]
          lg:px-7
          lg:pb-8
          xl:px-8
        "
      >
        <div className="mx-auto w-full max-w-[1150px]">
          {children}
        </div>
      </main>

      {/* ================================================================ */}
      {/* RIGHT SIDEBAR                                                    */}
      {/* ================================================================ */}

      <RightSidenav />
    </div>
  );
}