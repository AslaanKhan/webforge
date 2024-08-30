export async function upsertPipeline(pipeline: any) {
    return await prisma.pipeline.upsert({
        where: { id: pipeline.id || '' },
        update: pipeline,
        create: pipeline,
    });
}

export async function deletePipeline(pipelineId: string) {
    return await prisma.pipeline.delete({ where: { id: pipelineId } });
}

export async function getPipelineDetails(pipelineId: string) {
    return await prisma.pipeline.findUnique({
        where: { id: pipelineId },
        include: { lanes: true }
    });
}

export async function updatePipelineLanesOrder(pipelineId: string, lanesOrder: string[]) {
    return await prisma.pipeline.update({
        where: { id: pipelineId },
        data: { lanesOrder },
    });
}
