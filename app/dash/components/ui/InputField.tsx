"use client";
import React from "react";

interface Props {
  label: string;
  type?: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function InputField({ label, type = "text", ...props }: Props) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label} {props.required && <span className="text-red-500">*</span>}:
        <input
          type={type}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          {...props}
        />
      </label>
    </div>
  );
}
