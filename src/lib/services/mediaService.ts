import { db } from "../db";

export async function getMedia(mediaId: string) {
    return await db.media.findUnique({ where: { id: mediaId } });
}

export async function createMedia(media: any) {
    return await db.media.create({
        data: media
    });
}

export async function deleteMedia(mediaId: string) {
    return await db.media.delete({ where: { id: mediaId } });
}
