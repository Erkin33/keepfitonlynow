// src/app/api/workouts/finish/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth"; // путь аналогично
import prisma from "../../../../lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = Number(session.user.id);

    const { workoutId } = await request.json();
    if (!workoutId) {
      return NextResponse.json(
        { error: "Workout ID is required" },
        { status: 400 }
      );
    }

    const workout = await prisma.workout.findUnique({
      where: { id: workoutId },
    });
    if (!workout) {
      return NextResponse.json(
        { error: "Workout not found" },
        { status: 404 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.userWorkout.findFirst({
      where: {
        userId,
        workoutId,
        completedAt: { gte: today },
      },
    });
    if (existing) {
      return NextResponse.json(
        { message: "Монеты уже начислены за эту тренировку сегодня" },
        { status: 200 }
      );
    }

    await prisma.userWorkout.create({
      data: {
        user: { connect: { id: userId } },
        workout: { connect: { id: workoutId } },
      },
    });

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { coins: { increment: 5 } },
    });

    return NextResponse.json(
      { message: "Тренировка завершена и монеты начислены", updatedUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Finish workout error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
