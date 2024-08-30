import axiosInstance from "../axios"
import { db } from "../db"
import { createTeamUser } from "../services/userService"
import { redirect } from "next/navigation"


//user
export const currentUser = async () => {
    const user = await axiosInstance.get("/user/getDetails")
    return user.data
}

export const getAuthUserDetails = async (userId: any) => {
    let user = await db.user.findUnique({
        where: { id: userId },
            include: {
            Company: {
                include: {
                    SidebarOption: true, SubAccount: {
                        include: { SidebarOption: true }
                    }
                }
            },
            Permissions: true
        }
    })
    return user
}

//company
export const upsertCompnay = async (company: any) => {
    if (!company.companyEmail) return null
    let companyDetails = (await axiosInstance.post("/company/upsert", company)).data
    return companyDetails
}


export const deleteCompany = async (agencyId: string) => {
    let res = await axiosInstance.delete(`/company/delete/${agencyId}`)
    return res.data
}

export const updateCompnayDetails = async (agencyId: string, agency: any) => {
    let res = await axiosInstance.put(`/company/updateDetails/${agencyId}`, agency)
    return res.data
}

//Sub account 

export const upsertSubAccount = async (subAccount: any) => {
    const res = await axiosInstance.post("/subaccount/upsert", subAccount)
    return res.data
}


export const saveActivityLogsNotification = async (data: any) => {
    let res = await axiosInstance.post("/notificaitons/saveAcitivityLogs", data)
    return res.data
}

//Invitation 

export const verifyAndAcceptInvitation = async (agencyId: string) => {
    const user = await db.user.findUnique({
        where: {
            id: agencyId
        }
    })
    if (!user) return redirect('/sign-in')

    const invitationExists = await db?.invitation?.findUnique({
        where: {
            email: user.email,
            status: "PENDING"
        }
    })

    if (invitationExists) {
        const userDetails = await createTeamUser(invitationExists.agencyId, {
            email: invitationExists.email,
            agencyId: invitationExists.agencyId,
            avatarUrl: user.avatarUrl,
            id: user.id,
            name: `${user.name}`,
            role: invitationExists.role,
            createdAt: new Date(),
            updatedAt: new Date(),

        })
        await saveActivityLogsNotification({ agencyId: invitationExists.agencyId, description: `Joined`, subaccountId: undefined })

        if (userDetails) {

            await db.invitation.delete({
                where: {
                    email: userDetails.email
                }
            })
            return userDetails.companyId
        } else return null
    } else {
        const agency = await db.user.findUnique({
            where: {
                email: user.email
            }
        })
        return agency ? agency.companyId : null
    }
}