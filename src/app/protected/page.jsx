"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedPage() {
  const session = useSession();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/signin");
    }
  }, [session.status, router]);

  // Show loading state while checking authentication
  if (!isClient || session.status === "loading") {
    return <div>Loading...</div>;
  }

  // Show redirecting message when unauthenticated
  if (session.status === "unauthenticated") {
    return <div>Redirecting...</div>;
  }

  // Show protected content when authenticated
  return (
    <div>
      <h1>Protected Content</h1>
      <p>Welcome, {session.data?.user?.name || "Guest"}!</p>
    </div>
  );
}