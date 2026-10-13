"use client";

import { Toaster } from "react-hot-toast";

export function AppToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          border: "1px solid #e6e2d7",
          borderRadius: "14px",
          background: "#fffdf8",
          color: "#213326",
          fontFamily: "inherit",
        },
        success: { iconTheme: { primary: "#2d7a4d", secondary: "#fff" } },
        error: { iconTheme: { primary: "#ba5142", secondary: "#fff" } },
      }}
    />
  );
}
