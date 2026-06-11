# local-time-mcp

A minimal [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that returns the current local date and time.

Designed for use with LLM clients (e.g. LM Studio, Claude Desktop) so that the model can immediately answer questions like "What time is it?" without asking for clarification.

## Features

- Returns current local date and time instantly
- Configurable timezone via environment variable
- Configurable locale via environment variable
- Zero required arguments — the LLM never needs to ask the user for clarification

## Requirements

- Node.js 18+

## Installation

```bash
git clone https://github.com/rindow/local-time-mcp.git
cd local-time-mcp
npm install
npm run build
```

## Configuration

Add the following to your MCP client's config file (e.g. `mcp.json`):

```json
{
  "mcpServers": {
    "local-time": {
      "command": "node",
      "args": ["/path/to/local-time-mcp/dist/index.js"],
      "env": {
        "TZ_OVERRIDE": "Asia/Tokyo",
        "LOCALE": "ja-JP"
      }
    }
  }
}
```

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `TZ_OVERRIDE` | Timezone string (e.g. `Asia/Tokyo`, `America/New_York`) | System timezone |
| `LOCALE` | Locale string (e.g. `ja-JP`, `en-US`) | `en-US` |

Both variables are optional. If omitted, the server uses the system timezone and `en-US` locale.

## Tool

### `get_local_time`

Returns the current local date and time.

**Arguments:** none

**Example response:**
```
4/27/2025, 10:30:00 AM (Asia/Tokyo)
```

## License

MIT
