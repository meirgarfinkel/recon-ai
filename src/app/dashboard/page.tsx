import { getServerSession } from "~/server/auth";
import { redirect } from "next/navigation";
import prisma from "~/lib/prisma";
import RagList from "~/components/RagList";
import RagForm from "~/components/RagForm";
import Nav from "~/components/Nav";

// Fetch user RAGs on the server side for initial render
export default async function DashboardPage() {
  // Get the current user session
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  // Fetch RAGs belonging to the logged-in user
  const rags = await prisma.rag.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <Nav />
      <main className="flex-1 max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Your RAGs</h1>
        {/* List of existing RAGs with edit/delete options */}
        <RagList rags={rags} />
        {/* Form to create a new RAG */}
        <RagForm userId={session.user.id} />
      </main>
    </div>
  );
}
