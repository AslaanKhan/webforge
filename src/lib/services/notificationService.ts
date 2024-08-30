import { db } from "../db";

export async function getNotifications(userId: string) {
    return await db.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });
}

export async function saveActivityLogsService(logs: any) {
    return await db.notification.createMany({
        data: logs
    });
}
