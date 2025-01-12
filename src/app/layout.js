"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";

export default function RootLayout({ children }) {

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.js');
  }, []);

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
