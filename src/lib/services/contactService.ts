export async function searchContacts(query: string) {
    return await prisma.contact.findMany({
        where: {
            OR: [
                { name: { contains: query } },
                { email: { contains: query } },
                { phone: { contains: query } },
            ],
        },
    });
}

export async function upsertContact(contact: any) {
    return await prisma.contact.upsert({
        where: { id: contact.id || '' },
        update: contact,
        create: contact,
    });
}
