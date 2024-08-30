export async function upsertTag(tag: any) {
    return await prisma.tag.upsert({
        where: { id: tag.id || '' },
        update: tag,
        create: tag,
    });
}

export async function deleteTag(tagId: string) {
    return await prisma.tag.delete({ where: { id: tagId } });
}

export async function getTags() {
    return await prisma.tag.findMany();
}
