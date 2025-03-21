"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "./loading";

function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/products`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading  />
    </div>
  );
}

export default Page;
