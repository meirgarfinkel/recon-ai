// This file defines your UploadThing "file router"
// the configuration object that sets up what kinds of files can be uploaded,
// their constraints, and any middleware or completion logic.
// tldr: Defines file router/configuration (file types, hooks, etc.)
import { createFileRouter } from "uploadthing/next";

export const fileRouter = createFileRouter({
  documentUploader: {
    maxFileSize: "50MB",
    allowedFileTypes: ["text", "pdf", "document"],
    // ...other config or hooks
  },
});
