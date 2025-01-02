import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const ip = request.headers.get("x-real-ip");

    await prisma.accessCount.create({
      data: {
        ip: ip || "unknown",
      },
    });

    const thirtySecondsAgo = new Date(Date.now() - 60 * 1000);

    await prisma.accessCount.deleteMany({
      where: {
        timestamp: {
          lt: thirtySecondsAgo,
        },
      },
    });

    const count = await prisma.accessCount.count();

    return NextResponse.json({ status: "ok", count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
