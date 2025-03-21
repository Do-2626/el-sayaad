"use client";
import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  placeholder = "",
  min = 0,
  max = 100,
  step = 1,
}: InputFieldProps) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label} {required && <span className="text-red-500">*</span>}:
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
      />
    </label>
  </div>
);

export default InputField;
