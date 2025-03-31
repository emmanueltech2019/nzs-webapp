"use client"
import { useEffect } from "react";

const TawkToChat = () => {
  useEffect(() => {
    if (window.Tawk_API) return; // Prevents duplicate script loading

    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/67a5ba8c825083258e117a21/1ijfm1dos";
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
