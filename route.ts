import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { joinTeamSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { joinCode } = joinTeamSchema.parse(body);

    const team = await prisma.team.findUnique({
      where: { joinCode },
      include: {
        event: true,
        members: true,
      },
    });

    if (!team) {
      return NextResponse.json({ error: "Invalid Join Code" }, { status: 404 });
    }

    if (team.members.length >= team.event.maxTeamSize) {
      return NextResponse.json(
        { error: "Team has reached maximum capacity" },
        { status: 400 }
      );
    }

    const isMember = team.members.some((m) => m.userId === session.user.id);
    if (isMember) {
      return NextResponse.json(
        { error: "You are already a member of this team" },
        { status: 400 }
      );
    }

    const newMember = await prisma.teamMember.create({
      data: {
        teamId: team.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json(
      { message: "Successfully joined team", member: newMember },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to join team" },
      { status: 500 }
    );
  }
}