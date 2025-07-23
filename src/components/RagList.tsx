"use client";
import Link from "next/link";

export default function RagList({ rags }) {
  if (!rags.length)
    return <p className="text-text-secondary">No RAGs yet. Create your first one below!</p>;

  return (
    <ul className="space-y-4">
      {rags.map((rag) => (
        <li key={rag.id} className="border rounded p-4 flex justify-between items-center">
          <div>
            <h3 className="font-bold">{rag.name}</h3>
            <p className="text-sm text-text-secondary">{rag.description}</p>
          </div>
          <div className="flex gap-2">
            {/* Link to view/edit RAG details */}
            <Link href={`/dashboard/rag/${rag.id}`}>
              <button className="btn btn-sm btn-12">View/Edit</button>
            </Link>
            {/* Delete button (implementation not shown) */}
            <form action={`/api/rag/delete`} method="POST">
              <input type="hidden" name="ragId" value={rag.id} />
              <button type="submit" className="btn btn-sm btn-danger">Delete</button>
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
}
