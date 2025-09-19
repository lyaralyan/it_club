"use client";
import { useEffect } from "react";
import RegisterForm from "./RegisterForm";
import Close from "@front/assets/icons/Close.svg";
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UniversalModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", onEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] p-[40px]">
      <div className={"h-full w-full relative"}>
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-2xl text-gray-500 hover:text-gray-800 cursor-pointer">
          <Close />
        </button>
        <RegisterForm onClose={onClose} />
      </div>
    </div>
  );
}
