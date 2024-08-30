export async function getFunnels() {
    return await prisma.funnel.findMany();
}

export async function upsertFunnel(funnel: any) {
    return await prisma.funnel.upsert({
        where: { id: funnel.id || '' },
        update: funnel,
        create: funnel,
    });
}
