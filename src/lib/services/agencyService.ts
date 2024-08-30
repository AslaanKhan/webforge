import { db } from "../db";

export async function createAgency(agency: any) {
    return await db.agency.create({
        data: agency
    });
}

export const upsertCompanyService = async (company: any) => {
    if (!company.companyEmail) return null
    try {
        const companyDetails = await db.agency.upsert({
            where: {
                id: company.id
            },
            update: company,
            create: {
                users: {
                    connect: { email: company.companyEmail },
                },
                ...company,
                SidebarOption: {
                    create: [
                        {
                            name: 'Dashboard',
                            icon: 'category',
                            link: `/company/${company.id}`,
                        },
                        {
                            name: 'Launchpad',
                            icon: 'clipboardIcon',
                            link: `/company/${company.id}/launchpad`,
                        },
                        {
                            name: 'Billing',
                            icon: 'payment',
                            link: `/company/${company.id}/billing`,
                        },
                        {
                            name: 'Settings',
                            icon: 'settings',
                            link: `/company/${company.id}/settings`,
                        },
                        {
                            name: 'Sub Accounts',
                            icon: 'person',
                            link: `/company/${company.id}/all-subaccounts`,
                        },
                        {
                            name: 'Team',
                            icon: 'shield',
                            link: `/company/${company.id}/team`,
                        },
                    ],
                },
            },
        })
        return companyDetails
    } catch (error) {
        console.log(error)
    }
}

export async function updateCompnayService(agencyId: string, agency: any) {
    return await db.agency.update({
        where: { id: agencyId },
        data: agency,
    });
}

export async function deleteCompanyService(company: string) {
    return await db.agency.delete({ where: { id: company } });
}

export async function getAgencyDetails(agencyId: string) {
    return await db.agency.findUnique({ where: { id: agencyId } });
}

export async function getAllAgencies() {
    return await db.agency.findMany();
}
