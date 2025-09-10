import { ReactNode } from "react";
import { getSession, clearSession } from "@/lib/session";

async function LogoutButton() {
  async function action(formData: FormData) {
    "use server";
    await clearSession();
  }

  return (
    <form action={action}>
      <button className="rounded-md border px-3 py-1.5">Log Out</button>
    </form>
  );
}

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  return (
    <div className="min-h-dvh grid grid-cols-[240px_1fr]">
      <aside className="border-r p-4 space-y-4">
        <div className="text-lg font-semibold">ERP / HR</div>
        <nav className="grid gap-1 text-sm">
          <a href="/" className="px-2 py-1 rounded hover:bg-black/5">Dashboard</a>
          <a href="/staff" className="px-2 py-1 rounded hover:bg-black/5">Staff</a>
          <a href="/circulars" className="px-2 py-1 rounded hover:bg-black/5">Circulars</a>
          <a href="/profile" className="px-2 py-1 rounded hover:bg-black/5">Profile</a>
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="flex items-center justify-between border-b p-4">
          <div className="text-sm text-gray-600">
            {session ? <>Вы вошли как <b>{session.name}</b> ({session.email})</> : "Гость"}
          </div>
          <LogoutButton />
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
