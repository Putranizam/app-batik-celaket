"use client";

import { useRouter } from "next/navigation";
import ScreenWelcome from "./components/ScreenWelcome";

export default function RootPage() {
  const router = useRouter();
  return (
    <ScreenWelcome
      onExplore={() => router.push("/beranda")}
      onLogin={() => router.push("/login")}
      onSignup={() => router.push("/register")}
    />
  );
}
