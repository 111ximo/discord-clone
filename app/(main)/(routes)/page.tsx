"use client"; // Mark the component as client-side

import { UserButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Use next/navigation for routing
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, router]);

  return (
    <div>
      {/* {isSignedIn ? (
        <div>Welcome back! You are signed in.</div>
      ) : (
        <div>Redirecting to sign-in...</div>
      )} */}
      <UserButton afterSwitchSessionUrl="/" />
    </div>
  );
}
