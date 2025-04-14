import { NextResponse } from "next/server";
import { client } from "@/lib/trigger/client";

export async function POST(req: Request) {
  const { workflowId, executionGraph, userId } = await req.json();

  try {
    await client.sendEvent({
      name: "run-workflow",
      payload: {
        workflowId,
        executionGraph,
        userId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { success: false, error: e.message },
      { status: 500 }
    );
  }
}
