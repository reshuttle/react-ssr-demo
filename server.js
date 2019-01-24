import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";

import App from "./src/App";

const app = express();

app.get("/client.js", (req, res) =>
  res.sendFile(__dirname + "/dist/client.js")
);

app.get("*", (req, res) => {
  const data = renderToString(<App />);
  const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>React App</title>
        </head>
        <body>
          <div id="root">${data}</div>
          <script src="/client.js"></script>
        </body>
      </html>
    `;
  res.send(html);
});

app.listen(3000);
