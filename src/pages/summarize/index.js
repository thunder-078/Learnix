import { useEffect } from "react";
import GeminiPrompt from "./components/GeminiPrompt";

export default function Home() {
  const question = "Explain machine learning in simple terms";

  useEffect(() => {
    const prompt = `Please answer the following question clearly and briefly: ${question}`;

    fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Gemini Response:", data))
      .catch((err) => console.error("Error fetching from Gemini:", err));
  }, [question]); // dependency array, not strictly needed if static

  return (
    <div>
      <GeminiPrompt />
    </div>
  );
}
