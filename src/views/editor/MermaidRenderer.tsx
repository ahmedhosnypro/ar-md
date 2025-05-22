import mermaid from "mermaid";
import React from "react";


// Initialize mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: "default",
});

const MermaidRenderer: React.FC<{ code: string }> = ({ code }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      mermaid.render("mermaid-diagram", code).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      });
    }
  }, [code]);

  return <div ref={ref} />;
};

export default MermaidRenderer;