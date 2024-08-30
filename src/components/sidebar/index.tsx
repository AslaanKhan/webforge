
import React from 'react'
import MenuOptions from './menu-options'
import { getAuthUserDetails } from '@/lib/globalServices/service'

type Props = {
  id: string
  type: 'agency' | 'subaccount'
}

const Sidebar = async ({ id, type }: Props) => {
  const user = await getAuthUserDetails(id)
  if (!user) return null

  if (!user.Company) return

  const details =
    type === 'agency'
      ? user?.Company
      : user?.Company.SubAccount.find((subaccount) => subaccount.id === id)

  const isWhiteLabeledAgency = user.Company.whiteLabel
  if (!details) return

  let sideBarLogo = user.Company.agencyLogo || '/assets/plura-logo.svg'

  if (!isWhiteLabeledAgency) {
    if (type === 'subaccount') {
      sideBarLogo =
        user?.Company.SubAccount.find((subaccount) => subaccount.id === id)
          ?.subAccountLogo || user.Company.agencyLogo
    }
  }

  const sidebarOpt =
    type === 'agency'
      ? user.Company.SidebarOption || []
      : user.Company.SubAccount.find((subaccount) => subaccount.id === id)
          ?.SidebarOption || []

  const subaccounts = user.Company.SubAccount.filter((subaccount) =>
    user.Permissions.find(
      (permission) =>
        permission.subAccountId === subaccount.id && permission.access
    )
  )

  return (
    <>
      <MenuOptions
        defaultOpen={true}
        details={details}
        id={id}
        sidebarLogo={sideBarLogo}
        sidebarOpt={sidebarOpt}
        subAccounts={subaccounts}
        user={user}
      />
      <MenuOptions
        details={details}
        id={id}
        sidebarLogo={sideBarLogo}
        sidebarOpt={sidebarOpt}
        subAccounts={subaccounts}
        user={user}
      />
    </>
  )
}

export default Sidebar