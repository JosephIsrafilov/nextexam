"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { loginAction } from "./action";
import Image from "next/image";
import Link from "next/link";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-gradient-to-r from-sky-500 to-indigo-700 text-white py-3 font-medium disabled:opacity-50"
    >
      {pending ? "Signing in…" : "Sign In"}
    </button>
  );
}

function Eye({ off }: { off?: boolean }) {
  if (off) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gray-500">
        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M2 12s3.5-6 10-6 10 6 10 6-1.22 2.09-3.36 3.76" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.88 9.88A3 3 0 0012 15a3 3 0 002.12-.88" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gray-500">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, { error: "" });
  const [show, setShow] = useState(false);
  const sp = useSearchParams();
  const from = sp.get("from") ?? "/";

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      <section className="flex flex-col">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={28} height={28} />
            <div className="text-sm leading-tight">
              <div className="font-semibold">UiUxOtor</div>
              <div className="text-gray-500">ERP System</div>
            </div>
          </div>
          <Link href="#" className="rounded-md border px-4 py-2 text-sm hover:bg-black/5">
            Sign Up
          </Link>
        </div>

        <div className="flex-1 grid place-items-center p-6">
          <form action={formAction} className="w-full max-w-md space-y-5">
            <input type="hidden" name="from" value={from} />
            <div className="space-y-1">
              <div className="text-sm text-gray-500">Welcome back!</div>
              <h1 className="text-2xl font-semibold">Please Sign In</h1>
            </div>
            {state?.error ? (
              <p className="rounded-md bg-red-50 text-red-700 px-3 py-2 text-sm">{state.error}</p>
            ) : null}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email address</label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-200 bg-white"
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  required
                  className="w-full rounded-xl border px-3 py-2 pr-12 outline-none focus:ring-2 focus:ring-sky-200 bg-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  aria-label="Toggle password visibility"
                >
                  <Eye off={!show} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="remember" className="size-4" />
                Remember me
              </label>
              <a href="#" className="text-sky-600 hover:underline">
                I forgot my password
              </a>
            </div>
            <SubmitBtn />
          </form>
        </div>
      </section>

      <aside className="hidden lg:block">
        <img src="/login.jpg" alt="" className="w-full h-screen object-cover" />
      </aside>
    </main>
  );
}
