export async function upsertTicket(ticket: any) {
    return await prisma.ticket.upsert({
        where: { id: ticket.id || '' },
        update: ticket,
        create: ticket,
    });
}

export async function deleteTicket(ticketId: string) {
    return await prisma.ticket.delete({ where: { id: ticketId } });
}

export async function updateTicketOrder(ticketId: string, order: number) {
    return await prisma.ticket.update({
        where: { id: ticketId },
        data: { order },
    });
}
