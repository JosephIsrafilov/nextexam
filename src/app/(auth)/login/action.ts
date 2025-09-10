"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { setSession } from "@/lib/session";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  remember: z.string().optional(),
  from: z.string().optional(),
});

export async function loginAction(_: any, formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = schema.safeParse(data);
  if (!parsed.success) return { error: "Invalid credentials" };

  const { email, password, remember, from } = parsed.data;
  if (password !== "admin123") return { error: "Invalid email or password" };

  const long = remember ? 60 * 60 * 24 * 7 : 60 * 60 * 8;
  await setSession(
    { id: "1", name: "Admin User", email, role: "admin" },
    long
  );

  redirect(from && from !== "/login" ? from : "/");
}
