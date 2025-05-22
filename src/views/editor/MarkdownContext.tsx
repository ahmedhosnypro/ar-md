import React, { createContext, useContext, useState } from "react";

type PreviewMode = "live" | "side-by-side" | "preview";

type MarkdownContextType = {
  content: string;
  setContent: (content: string) => void;
  previewMode: PreviewMode;
  setPreviewMode: (mode: PreviewMode) => void;
};

const MarkdownContext = createContext<MarkdownContextType | undefined>(
  undefined
);

export const MarkdownProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [content, setContent] = useState<string>("");
  const [previewMode, setPreviewMode] = useState<PreviewMode>("side-by-side");

  const value = React.useMemo(
    () => ({ content, setContent, previewMode, setPreviewMode }),
    [content, previewMode]
  );

  return (
    <MarkdownContext.Provider value={value}>
      {children}
    </MarkdownContext.Provider>
  );
};

export const useMarkdown = () => {
  const context = useContext(MarkdownContext);
  if (!context) {
    throw new Error("useMarkdown must be used within a MarkdownProvider");
  }
  return context;
};
