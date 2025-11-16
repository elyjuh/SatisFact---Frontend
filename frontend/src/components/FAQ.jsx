import { useState, useRef, useEffect } from "react";

export default function FAQ({ question, answer }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      if (open) {
        const scrollHeight = content.scrollHeight;
        content.style.height = scrollHeight + "px";
        content.style.opacity = "1";

        const handleTransitionEnd = () => {
          content.style.height = "auto";
          content.removeEventListener("transitionend", handleTransitionEnd);
        };
        content.addEventListener("transitionend", handleTransitionEnd);
      } else {
        const currentHeight = content.scrollHeight;
        content.style.height = currentHeight + "px";
        content.style.opacity = "0";
        requestAnimationFrame(() => {
          content.style.height = "0";
        });
      }
    }
  }, [open]);

  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <div className="faq-header" onClick={() => setOpen(!open)}>
        <h4>{question}</h4>
        <i className={`faq-icon fas fa-chevron-down ${open ? "rotated" : ""}`}></i>
      </div>

      <div
        ref={contentRef}
        className="faq-answer"
        style={{ height: "0", opacity: 0 }}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}
