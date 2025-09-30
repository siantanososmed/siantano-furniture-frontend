"use client";
import "./global-error.css";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error occurred:", error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Something went wrong!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css?family=Cabin:400,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="notfound">
          <div className="notfound">
            <div className="notfound-404">
              <div></div>
              <h1>500</h1>
            </div>
            <h2>Something went wrong!</h2>
            <p>
              {error.message || "An unexpected error has occurred."}
              {error.digest && (
                <span className="digest-id">Error ID: {error.digest}</span>
              )}
            </p>
            <button onClick={() => reset()} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
