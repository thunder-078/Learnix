import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "./module.css";

const GeminiPrompt = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const queryPrompt = router.query.prompt;

    // Prevent double submission
    if (queryPrompt && !hasSubmitted) {
      setPrompt(queryPrompt);
      submitPrompt(queryPrompt);
      setHasSubmitted(true);
    }
  }, [router.query.prompt, hasSubmitted]);

  const submitPrompt = async (promptText) => {
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptText }),
      });

      const data = await res.json();
      console.log(data, "data response");

      setResponse(data?.text_content);
    } catch (error) {
      console.error(error);
      setResponse("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={{ backgroundColor: "#000000", width: "100dvw" }}>
   <div style={{ width: "100dvw",height: "100dvh",display:"flex",justifyContent:"center",alignItems:"center" }}><div style={{ maxWidth: "600px", fontFamily: "Arial" }}>
      <h2>Ask Gemini anything!</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setHasSubmitted(true);
          submitPrompt(prompt);
        }}
      >
        <input
          type="text"
          placeholder="Enter your prompt here"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            setHasSubmitted(false); // Allow resubmission on prompt change
          }}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            fontSize: "1rem",
            color: "white"
          }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}>
          Submit
        </button>
      </form>

      <div style={{ marginTop: "2rem" }}>
        <h3 style={{ color: "white"}}>Prompt:</h3>
        <p style={{ color: "white",marginBottom:"30px"}}>{prompt || "Waiting for input..."}</p>

        <h3 style={{ color: "white"}}>Response:</h3>
        <p style={{ color: "white"}}>{response || "Waiting for response..."}</p>
      </div>
    </div></div> </div>
  );
};

export default GeminiPrompt;
