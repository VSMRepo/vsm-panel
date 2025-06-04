"use client";
import Header from "@/components/dashboard/layout/Header";
import LeftSidebar from "@/components/dashboard/layout/LeftSidebar";
import RightSidebar from "@/components/dashboard/layout/RightSiderbar";
import { useRef } from "react";

interface DashboardProps {
  children: React.ReactNode;
  params: { workspaceSlug: string };
}

export default function DashboardLayout({ children, params }: DashboardProps) {
  const mainContentRef = useRef(null);

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col ">
          <Header contentRef={mainContentRef} />
          <main
            className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6  bg-base-200"
            ref={mainContentRef}
          >
            {children}
            <div className="h-16"></div>
          </main>
        </div>
        <LeftSidebar />
      </div>

      {/* Right drawer - containing secondary content like notifications list etc.. */}
      <RightSidebar />

      {/* Notification layout container */}
      {/* <ToastContainer /> */}

      {/* Modal layout container */}
      {/* <ModalLayout /> */}
    </>
  );
}
