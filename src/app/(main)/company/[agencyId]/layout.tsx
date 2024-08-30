import BlurPage from "@/components/global/blur-page";
import InfoBar from "@/components/global/infobar";
import SideBar from "@/components/sidebar";
import Unauthorized from "@/components/unauthorized";
import { verifyAndAcceptInvitation } from "@/lib/globalServices/service";
import { getNotifications } from "@/lib/services/notificationService";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: { agencyId: string };
};

const layout = async ({ children, params }: Props) => {
  const companyId = await verifyAndAcceptInvitation(params.agencyId);
  // const user = await currentUser();

  if (!companyId) {
    return redirect("/");
  }

  if (!companyId) {
    return redirect("/agency");
  }

  // if (
  //   user?.privateMetadata?.role !== "AGENCY_OWNER" &&
  //   user?.privateMetadata?.role !== "AGENCY_ADMIN"
  // )
    // return <Unauthorized />;

  let allNoti: any = []
  const notifications = await getNotifications(companyId)
  if(notifications) allNoti = notifications

  return (
    <div className="h-screen overflow-hidden">
      <SideBar id={params.agencyId} type="agency" />
      <div className="md:pl-[300px]">
        <InfoBar role={allNoti?.User?.role} notifications={allNoti} />
        <div className="relative"><BlurPage> {children} </BlurPage></div>
      </div>
    </div>
  );
};

export default layout;
