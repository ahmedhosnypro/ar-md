import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkDirective from "remark-directive";
import { useMarkdown } from "./MarkdownContext";
import MermaidRenderer from "./MermaidRenderer";
import "katex/dist/katex.min.css";

const Preview: React.FC = () => {
  const { content } = useMarkdown();

  return (
    <div style={{ padding: "1rem", overflow: "auto" }}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkDirective]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          code(props) {
            const { className, children } = props;
            const match = /language-(\w+)/.exec(className ?? "");
            const codeContent = Array.isArray(children)
              ? children.join("")
              : children instanceof Object
              ? JSON.stringify(children)
              : String(children ?? "").trim();

            if (match && match[1] === "mermaid") {
              return <MermaidRenderer code={codeContent} />;
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
        
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Preview;