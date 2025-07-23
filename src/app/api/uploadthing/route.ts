// This file imports your file router from core.ts and exports the
// actual API route handlers (GET, POST) using UploadThing’s helper
// for Next.js App Router.
// tldr: Exports API route handlers using the router from core.ts
import { createFileRoute } from "uploadthing/next";
import { fileRouter } from "./core";

export const { GET, POST } = createFileRoute(fileRouter);
