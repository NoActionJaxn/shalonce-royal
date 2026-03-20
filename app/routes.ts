import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),

  layout("./routes/side-a/layout.tsx", [
    route("side-a", "./routes/side-a/home.tsx"),
    route("side-a/about", "./routes/side-a/about.tsx"),
    route("side-a/events", "./routes/side-a/events.tsx"),
    route("side-a/matches", "./routes/side-a/matches.tsx"),
    route("side-a/matches/:slug", "./routes/side-a/matches.$slug.tsx"),
    route("side-a/gallery", "./routes/side-a/gallery.tsx"),
    route("side-a/contact", "./routes/side-a/contact.tsx"),
    route("side-a/store", "./routes/side-a/store.tsx"),
    route("side-a/store/checkout", "./routes/side-a/store.checkout.tsx"),
    route("side-a/store/checkout/return", "./routes/side-a/store.checkout.return.tsx"),
    route("side-a/store/api/checkout", "./routes/side-a/store.api.checkout.ts"),
  ]),

  layout("./routes/side-b/layout.tsx", [route("side-b", "./routes/side-b/home.tsx")]),
] satisfies RouteConfig;
