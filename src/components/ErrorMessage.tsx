import { ReactNode } from "react";

type ErrorMessageProps = {
  children: ReactNode;
};

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <span className="bg-red-50 text-center text-sm font-semibold text-red-600">
      {children}
    </span>
  );
}
