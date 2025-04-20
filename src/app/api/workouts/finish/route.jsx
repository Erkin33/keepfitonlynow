import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "../../../../lib/prisma";

export async function POST(request) {
  try {
    // Получаем сессию пользователя
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = Number(session.user.id);

    // Получаем workoutId из запроса
    const { workoutId } = await request.json();
    if (!workoutId) {
      return NextResponse.json({ error: "Workout ID is required" }, { status: 400 });
    }
    
    // Проверяем, существует ли тренировка
    const workout = await prisma.workout.findUnique({
      where: { id: workoutId },
    });
    if (!workout) {
      return NextResponse.json({ error: "Workout not found" }, { status: 404 });
    }
    
    // Определяем сегодняшнюю дату (начало дня)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Проверяем, не завершал ли пользователь этот вид тренировки сегодня
    const existingRecord = await prisma.userWorkout.findFirst({
      where: {
        userId,
        workoutId,
        completedAt: { gte: today },
      },
    });
    
    if (existingRecord) {
      return NextResponse.json(
        { message: "Монеты уже начислены за эту тренировку сегодня" },
        { status: 200 }
      );
    }
    
    // Создаем запись о выполненной тренировке
    await prisma.userWorkout.create({
      data: {
        user: { connect: { id: userId } },
        workout: { connect: { id: workoutId } },
      },
    });
    
    // Обновляем монеты пользователя (+5)
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { coins: { increment: 5 } },
    });
    
    return NextResponse.json(
      { message: "Тренировка завершена и монеты начислены", updatedUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Finish workout error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
