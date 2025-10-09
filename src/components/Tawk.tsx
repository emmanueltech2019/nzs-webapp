"use client"
import { useEffect } from "react";

const TawkToChat = () => {
  useEffect(() => {
    if (window.Tawk_API) return; // Prevents duplicate script loading

    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/68e68ed64bafb119539d83e2/1j729ruhq";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup script on unmount
    };
  }, []);

  return null; // No UI elements needed
};

export default TawkToChat;
