import { redirect } from "next/navigation"
import { currentUser, saveActivityLogsNotification } from "../globalServices/service"
import { db } from "../db"
import { createTeamUser } from "./userService"

export const verifyAndAcceptInvitationService = async () => {
    const user = await currentUser()
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
            avatarUrl: user.imageUrl,
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
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
                email: user.emailAddresses[0].emailAddress
            }
        })
        return agency ? agency.companyId : null
    }
}