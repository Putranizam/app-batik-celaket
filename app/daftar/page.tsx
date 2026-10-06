"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ScreenSignup from "../components/ScreenSignup";
import TermsModal from "../components/TermsModal";

export default function DaftarPage() {
  const router = useRouter();
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <>
      <ScreenSignup
        onLoginClick={() => router.push("/login")}
        onTermsClick={() => setTermsOpen(true)}
        onSignupSuccess={() => router.push("/beranda")}
      />

      <TermsModal
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
        onAccept={() => setTermsOpen(false)}
      />
    </>
  );
}
