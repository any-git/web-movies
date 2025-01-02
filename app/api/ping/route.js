import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const idStr = url.searchParams.get("id");
    if (!idStr) {
      return NextResponse.json(
        { error: "Missing 'id' in query parameters" },
        { status: 400 }
      );
    }

    const id = parseInt(idStr, 10);

    const ip = request.headers.get("x-real-ip") || "unknown";

    // Upsert bản ghi với id
    await prisma.accessCount.upsert({
      where: { id },
      update: { ip },
      create: { id, ip },
    });

    const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);

    // Xóa các bản ghi cũ
    await prisma.accessCount.deleteMany({
      where: {
        timestamp: { lt: thirtySecondsAgo },
      },
    });

    // Đếm số bản ghi còn lại
    const count = await prisma.accessCount.count();

    return NextResponse.json({ status: "ok", count }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
