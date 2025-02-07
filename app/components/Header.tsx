"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
function Header() {
  const { data: session } = useSession();

  const handleSignout = async () => {
    try {
      await signOut();
    } catch (error) {}
  };

  return (
    <div>
      <button onClick={handleSignout}>Signout</button>
    </div>
  );
}

export default Header;
