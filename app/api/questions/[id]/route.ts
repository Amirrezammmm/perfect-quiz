import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const question = await prisma.question.findUnique({
      where: {
        id: params.id,
      },
      include: {
        options: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!question) {
      return NextResponse.json(
        { success: false, message: "Question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: question,
    });
  } catch (error) {
    console.error("GET question error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch question" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const { title, explanation, category, options } = body;

    const question = await prisma.$transaction(async (tx) => {

      if (options) {
        await tx.option.deleteMany({
          where: {
            questionId: params.id,
          },
        });
      }

      return tx.question.update({
        where: {
          id: params.id,
        },
        data: {
          title,
          explanation,
          category,

          options: options
            ? {
                create: options.map(
                  (
                    option: {
                      text: string;
                      isCorrect?: boolean;
                      order?: number;
                    },
                    index: number
                  ) => ({
                    text: option.text,
                    isCorrect: Boolean(option.isCorrect),
                    order: option.order ?? index + 1,
                  })
                ),
              }
            : undefined,
        },

        include: {
          options: {
            orderBy: {
              order: "asc",
            },
          },
        },
      });
    });

    return NextResponse.json({
      success: true,
      data: question,
    });

  } catch (error) {
    console.error("PATCH question error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update question" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.question.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Question deleted",
    });
  } catch (error) {
    console.error("DELETE question error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete question" },
      { status: 500 }
    );
  }
}
