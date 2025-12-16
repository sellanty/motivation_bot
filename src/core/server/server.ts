import express from "express";

export function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  return new Promise<void>((resolve) => {
    app.listen(PORT, () => {
        console.log(` HTTP server started on port ${PORT}`);
      resolve();
    })
  });
}
