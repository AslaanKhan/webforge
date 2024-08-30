'use client';
import AgencyDetails from "@/components/forms/agency-details";
import axiosInstance from "@/lib/axios";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = async ({searchParams}: {searchParams: {state:string; code:string}}) => {
  const [authUser, setAuthUser] = useState<User>() 
  const [loading, setLoading] = useState(true);

  const getUser = async () => await axiosInstance.get("/user/getDetails").then((res) => setAuthUser(res.data)).finally(() => setLoading(false));
  
  // const agencyId = await verifyAndAcceptInvitation();
  // const user = await getAuthUserDetails();
  // if (agencyId) {
  //   if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
  //     return redirect("/subaccount");
  //   } else if (user?.role === "ADMIN" || user?.role === "COMPANY_ADMIN") {
  //     if(searchParams.plan){
  //       return redirect(`/agency/${agencyId}/billing?plan=${searchParams.plan}`)
  //     }
  //     if(searchParams.state){
  //       const statePath = searchParams.state.split('___'[0]) 
  //       const stateAgencyId = searchParams.state.split('___'[1])
  //       if(stateAgencyId) return <div>Not authorized</div> 
  //       return redirect(`/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`)
  //     } else return redirect(`/agency/${agencyId}`)
  //   }else {
  //     return <div>Not authorized</div>;
  //   }
  // }
  
  useEffect(() => {
    getUser()
  },[])

  if (loading) {
    return <div>Loading...</div>; // Show a loading state
  }

  return (
  <div className="flex justify-center items-center mt-4">
    <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
      <h1 className="text-4xl"> Create An Company </h1>
      <AgencyDetails 
        data={{ companyEmail: authUser?.email }}
      />
    </div>
  </div>
  )
};

export default page;
