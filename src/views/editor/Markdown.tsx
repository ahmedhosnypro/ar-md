import React from "react";
import SplitPane from "@/components/splitPane/SplitPane";
import { useEditorPane } from "../home/EditorPaneContext";
import { MarkdownProvider } from "./MarkdownContext";
import Editor from "./Editor";
import Preview from "./Preview";

const Markdown: React.FC = () => {
  const { firstPaneVisible, secondPaneVisible } = useEditorPane();

  return (
    <MarkdownProvider>
      <SplitPane
        orientation="vertical"
        firstPane={{
          visible: firstPaneVisible,
          minRatio: 0.3,
        }}
        secondPane={{
          visible: secondPaneVisible,
          minRatio: 0.3,
        }}
        resizerProps={{
          style: {
            cursor: "col-resize",
          },
        }}
        style={{
          flex: 1,
          minHeight: `calc(100vh -256px)`,
        }}
        storageKey="markdown-editor-split"
      >
        <Editor />
        <Preview />
      </SplitPane>
    </MarkdownProvider>
  );
};

export default Markdown;
