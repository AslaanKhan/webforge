"use client";

import {
  deleteSubaccount,
  getSubaccountDetails,
  saveActivityLogsNotification,
} from "@/lib/queries";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  subaccountId: string;
};

const DeleteButton = ({ subaccountId }: Props) => {
  const router = useRouter();

  return (
    <div
      onClick={async () => {
        const response = await getSubaccountDetails(subaccountId);
        await saveActivityLogsNotification({
          agencyId: undefined,
          description: `Deleted subaccount ${response?.name}`,
          subaccountId: subaccountId,
        });
        await deleteSubaccount(subaccountId);
      }}
    >Delete</div>
  );
};

export default DeleteButton;
