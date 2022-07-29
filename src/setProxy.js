import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://3.39.212.63:8081",
      changeOrigin: true,
    })
  );
}
