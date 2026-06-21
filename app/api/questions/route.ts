import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { QuestionCategory } from "@prisma/client";


export async function GET(request: Request) {
  try {
    const {searchParams} = new URL(request.url);
    const category = searchParams.get("category");


    const questions = await prisma.question.findMany({
      where: category
      ?{
        category: category as QuestionCategory,
      }
      : undefined,

      orderBy: {
        createdAt: "desc",
      },
      include: {
        options: {
          orderBy: {
            order: "asc",
          },
        },
        importBatch: {
          select: {
            id: true,
            filename: true,
            originalName: true,
            status: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error("GET /api/questions error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch questions",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      normalizedText,
      explanation,
      category = "GENERAL",
      status = "DRAFT",
      sourcePage,
      sourceNumber,
      options,
    } = body;

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Question title is required",
        },
        { status: 400 },
      );
    }

    if (!Array.isArray(options) || options.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "At least 2 options are required",
        },
        { status: 400 },
      );
    }

    const correctOptions = options.filter((option) => option.isCorrect);

    if (correctOptions.length !== 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Exactly one correct option is required",
        },
        { status: 400 },
      );
    }

    const question = await prisma.question.create({
      data: {
        title,
        normalizedText: normalizedText ?? title,
        explanation,
        category,
        status,
        sourcePage,
        sourceNumber,
        options: {
          create: options.map(
            (
              option: {
                text: string;
                isCorrect?: boolean;
                order?: number;
              },
              index: number,
            ) => ({
              text: option.text,
              isCorrect: Boolean(option.isCorrect),
              order: option.order ?? index + 1,
            }),
          ),
        },
      },
      include: {
        options: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: question,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/questions error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create question",
      },
      { status: 500 },
    );
  }
}
