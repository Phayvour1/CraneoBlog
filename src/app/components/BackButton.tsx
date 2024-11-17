"use client";

import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
    >
      <FaArrowLeft /> Back
    </button>
  );
}
