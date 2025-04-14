import { TriggerClient } from "@trigger.dev/sdk";

export const client = new TriggerClient({
  id: "your-app-id",
  apiKey: process.env.TRIGGER_API_KEY!,
});
