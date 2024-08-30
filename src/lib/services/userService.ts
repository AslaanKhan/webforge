import { db } from "../db";

export async function getAuthUserDetails(userId: any) {
    return await db.user.findUnique({ where: { id: userId }  });
}

export async function createTeamUser(agencyId: string, user: any) {
    return await db.user.create({
        data: {
            ...user,
            agency: { connect: { id: agencyId } }
        }
    });
}

export async function updateUserDetails(userId: string, user: any) {
    return await db.user.update({
        where: { id: userId },
        data: user,
    });
}

export async function deleteUser(userId: string) {
    return await db.user.delete({ where: { id: userId } });
}

export async function getUserPermissions(userId: string) {
    return await db.permissions.findMany({ where: { id: userId } });
}
