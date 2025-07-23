"use client";

import React, { useRef, useState } from "react";

// This component lets the user either upload a file or enter text.
// It calls the onSubmit prop with the chosen data.
type FileOrTextInputProps = {
  // onSubmit is a function you provide to handle the data
  onSubmit: (data: { file?: File; text?: string }) => void;
};

export default function FileOrTextInput({ onSubmit }: FileOrTextInputProps) {
  // State to keep track of the text input
  const [text, setText] = useState("");
  // State to keep track of the selected file
  const [file, setFile] = useState<File | null>(null);
  // Reference to the file input element (not strictly necessary, but useful for resets)
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Called when the user selects a file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setText(""); // Clear text if a file is chosen
    }
  };

  // Called when the user types in the textarea
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setFile(null); // Clear file if text is entered
  };

  // Called when the form is submitted
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default browser behavior
    if (file) {
      // If a file is selected, call onSubmit with the file
      onSubmit({ file });
    } else if (text.trim()) {
      // If text is entered, call onSubmit with the text
      onSubmit({ text });
    } else {
      // If neither, show an alert
      alert("Please provide a file or enter some text.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {/* File input */}
      <label>
        <span>Choose a file:</span>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={!!text} // Disable if text is entered
        />
      </label>
      <span>or</span>
      {/* Text input */}
      <label>
        <span>Enter text:</span>
        <textarea
          value={text}
          onChange={handleTextChange}
          rows={4}
          disabled={!!file} // Disable if file is selected
          placeholder="Paste or type your text here"
        />
      </label>
      {/* Submit button */}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
