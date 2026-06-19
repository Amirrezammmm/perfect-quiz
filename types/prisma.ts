import {Prisma} from "@prisma/client";

export type QuestionWithRelations = Prisma.QuestionGetPayload<{
    include:{
        options: true;
        importBatch: true;
    };
}>;
