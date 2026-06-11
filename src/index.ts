import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "local-time", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_local_time",
      description:
        "Returns the current local date and time of the user's system. " +
        "Call this immediately when asked about current time or date, without asking for clarification.",
      inputSchema: { type: "object", properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  if (req.params.name === "get_local_time") {
    const now = new Date();
    const tz = process.env.TZ_OVERRIDE ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = process.env.LOCALE ?? "en-US";
    return {
      content: [
        {
          type: "text",
          text: `${now.toLocaleString(locale, { timeZone: tz })} (${tz})`,
        },
      ],
    };
  }
  throw new Error(`Unknown tool: ${req.params.name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);