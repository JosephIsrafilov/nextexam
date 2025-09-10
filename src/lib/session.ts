import { cookies } from "next/headers";
import { createHmac } from "crypto";

const COOKIE = "session";
const SECRET = process.env.AUTH_SECRET ?? "dev_secret";

export type Session = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "hr" | "staff";
};

function sign(payload: string) {
  return createHmac("sha256", SECRET).update(payload).digest("hex");
}

export async function setSession(s: Session, maxAgeSeconds = 60 * 60 * 8) {
  const payload = Buffer.from(JSON.stringify(s)).toString("base64url");
  const sig = sign(payload);
  (await cookies()).set(COOKIE, `${payload}.${sig}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  });
}

export async function getSession(): Promise<Session | null> {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return null;
  const [payload, sig] = raw.split(".");
  if (!payload || !sig || sign(payload) !== sig) return null;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString()) as Session;
  } catch {
    return null;
  }
}

export async function clearSession() {
  (await cookies()).delete(COOKIE);
}
