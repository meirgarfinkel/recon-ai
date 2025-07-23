import { NextResponse } from "next/server";
import { UTApi } from "uploadthing";
import { getServerSession } from "~/server/auth";

export const utapi = new UTApi();

export async function POST(req: Request) {
  // Use the auth handler directly
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.formData();
  const file = data.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const uploadResponse = await utapi.uploadFiles(
      new File([arrayBuffer], file.name, { type: file.type })
    );

    return NextResponse.json({ 
      success: true,
      fileUrl: uploadResponse.data?.url,
      fileName: file.name
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}