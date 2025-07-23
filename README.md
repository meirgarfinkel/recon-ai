# ReconAI

Multi-Tenant RAG Chatbot Platform with Embeddable AI Assistants.

## Structure

A platform where users can create their own retrieval-augmented generation (RAG) knowledge bases and then embed a chatbot on their own external websites that interacts with their specific RAG. This requires a robust, multi-tenant architecture: users log in, create/manage multiple RAGs (each with their own data sources), and receive an embed code for a chat widget. That widget communicates with your backend via an external API, retrieves relevant knowledge from the user’s RAG, and streams responses from an LLM. The system must be secure, scalable, and easy for non-technical users to deploy on their own sites.

Concise Requirements List:
Platform Features:
User authentication: Users sign up, log in, and manage their own RAGs.

Dashboard: Each user sees a list of their RAGs, can create new ones (by uploading files, entering text, or connecting data sources), and view/edit/delete existing RAGs.

RAG creation: Users can create a RAG by uploading documents, text, or URLs. Each RAG is stored in a vector database and linked to the user.

RAG management: Users can update, delete, or add new data to their RAGs.

Chatbot Integration:
RAG-specific chatbot UI: Each RAG has an associated chat interface within the dashboard for testing and management.

Embeddable chat widget: Users can generate a code snippet (script tag or iframe) to embed the chatbot on their own external websites.

External API endpoint: The widget communicates with your backend API, passing the user’s message and the unique RAG ID to retrieve context and generate responses.

Secure, rate-limited API: Each RAG/chatbot instance is authenticated (e.g., with a public API key or signed token) to prevent abuse and ensure data isolation.

Technical Stack:
Frontend: Next.js (App Router), React, TailwindCSS.

Backend: Next.js API routes or serverless functions, LLM orchestration (OpenAI gpt-4.1-nano), vector database (pgvector), LangChain for RAG logic.

Embeddings: Automatic generation and storage of embeddings for uploaded/ingested data.

Streaming responses: Support for real-time chat (streaming LLM output to the widget).

Documentation: Clear instructions for users on how to embed the chatbot on their site.

Implementation Breakdown:
User Auth & Dashboard:

Set up authentication (NextAuth).

Build a dashboard (/dashboard) listing all user RAGs, with options to create, edit, or delete.

Each RAG has a detail page (/dashboard/rag/[id]) with management tools and a test chat interface.

RAG Creation & Management:

Allow users to upload files, enter text, or connect URLs to create a RAG.

Store each RAG’s data in a vector database, linked to the user.

Provide tools to update or delete RAGs.

Backend RAG API:

Expose an API endpoint (e.g., /api/rag-chat/[ragId]) that:

Accepts chat messages and the RAG ID.

Retrieves relevant context from the vector DB for that RAG.

Sends context + message to the LLM and streams the response back.

Secure the endpoint with API keys or tokens and implement rate limiting.

Embeddable Chat Widget:

Build a chat widget (React) that can be embedded via a script tag or iframe.

The widget connects to your API, passing the correct RAG ID and handling responses.

Provide users with a ready-to-copy embed code in the dashboard.

Integration & Documentation:

Document how users can embed the chatbot on any website.

Ensure CORS and security best practices are followed.

Optionally, allow widget customization (colors, logo, etc.).
