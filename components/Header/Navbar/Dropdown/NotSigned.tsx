import React from "react";
import Link from "next/link";

export const NotSignedInSection: React.FC = () => (
  <div className="px-4 py-3">
    <Link href="/login" className="text-blue-500 hover:underline">
      Login
    </Link>
  </div>
);
