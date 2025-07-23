"use client";
import { useState } from "react";

export default function RagForm({ userId }: { userId: string }) {
  // State management for form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Create form data to send to API
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("name", name);
    formData.append("description", description);
    if (file) formData.append("file", file);
    if (text) formData.append("text", text);

    try {
      // Send data to API endpoint
      const res = await fetch("/api/rag/create", {
        method: "POST",
        body: formData,
      });
      if (res.ok) window.location.reload();
      else alert("Failed to create RAG.");
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred during submission.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-xl border shadow bg-bg-primary">
      {/* Form header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Create New RAG</h2>
        <p className="text-text-secondary">
          Upload files, enter text, or connect data sources to create your Retrieval-Augmented Generation
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* RAG Name Input */}
        <div className="space-y-1">
          <label className="block text-sm font-medium">
            RAG Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Company Knowledge Base"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-1"
          />
        </div>

        {/* Description Textarea */}
        <div className="space-y-1">
          <label className="block text-sm font-medium">
            Description
          </label>
          <textarea
            placeholder="Briefly describe your RAG's purpose..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border rounded-xl focus:ring-1"
          />
        </div>

        {/* File Upload Section */}
        <div className="space-y-4 p-5 bg-bg-secondary border rounded-xl">
          <div className="space-y-1">
            <label className="block text-sm font-medium">
              Upload File
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed hover:bg-bg-primary rounded-xl cursor-pointer">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="mb-2 text-sm">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs">PDF, DOCX, TXT (MAX. 10MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  accept=".pdf,.docx,.txt"
                />
              </label>
            </div>
            {file && (
              <div className="mt-2 flex items-center text-sm">
                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
              </div>
            )}
          </div>

          {/* Text Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-text-primary"></div>
            <span className="flex-shrink mx-4 text-sm">OR</span>
            <div className="flex-grow border-t border-text-primary"></div>
          </div>

          {/* Text Input Section */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">
              Enter Text Directly
            </label>
            <textarea
              placeholder="Paste your content here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 border hover:bg-bg-primary rounded-xl focus:ring-1"
            />
          </div>
        </div>

        {/* Data Source Connection (Coming Soon) */}
        <div className="p-5 bg-bg-secondary rounded-xl border">
          <label className="block text-sm font-mediummb-3">
            Connect Data Sources
          </label>
          <button
            type="button"
            disabled
            className="w-full py-3 px-4 bg-bg-secondary border rounded-xl flex items-center justify-center cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            Connect External Sources (Coming Soon!)
          </button>
          <p className="mt-2 text-sm text-center">
            Future integration with databases, APIs, and cloud storage
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-sm hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:-translate-y-0.5 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none"
          >
            Create RAG
          </button>
        </div>
      </form>
    </div>
  );
}