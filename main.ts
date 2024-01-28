import { Hono } from "https://deno.land/x/hono@v3.3.1/mod.ts";

const app = new Hono();
const rss_url = "https://real.gunjobiyori.com/sow.cgi?cmd=rss";

app.get("/rss", async (_c) => {
  const res = await fetch(rss_url);
  const byteArray = await res.arrayBuffer();
  const decoder = new TextDecoder("shift_jis");
  const utf8 = decoder.decode(byteArray).replace(
    `<?xml version="1.0" encoding="Shift_JIS"?>`,
    `<?xml version="1.0" encoding="UTF-8"?>`
  );

  const newResponse = new Response(utf8, res);
  newResponse.headers.set("content-type", "text/xml; charset=UTF-8");

  return newResponse;
});

Deno.serve(app.fetch);
