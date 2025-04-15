import { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/lib/trigger/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  const { workflowId, executionGraph, userId } = req.body;

  try {
    await client.sendEvent({
      name: "run-workflow",
      payload: {
        workflowId,
        executionGraph,
        userId,
      },
    });

    return res.status(200).json({ success: true });
  } catch (e: any) {
    console.error("Error sending event:", e);
    return res.status(500).json({ success: false, error: e.message });
  }
}
