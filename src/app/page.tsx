import { auth, signIn } from "~/server/auth";
import { redirect } from "next/navigation";

async function handleSignIn() {
  "use server";
  await signIn("google");
}

export default async function LandingPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to Recon AI
        </h1>
        <p className="text-text-secondary text-lg">
          Your all-in-one private retrieval augmented generation pipeline.
        </p>

        <form action={handleSignIn}>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl font-semibold transition"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </main>
  );
}
