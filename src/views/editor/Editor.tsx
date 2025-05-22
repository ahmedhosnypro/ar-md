"use client";

import React from "react";
import { useMarkdown } from "./MarkdownContext";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
} from "@mdxeditor/editor";
import { useTheme } from "@mui/material/styles";
import "@mdxeditor/editor/style.css";
import "./mdxeditor-dark.css";

const ToolbarContents = () => (
  <>
    <UndoRedo />
    <BlockTypeSelect />
    <BoldItalicUnderlineToggles />
    <CodeToggle />
    <ListsToggle />
    <CreateLink />
    <InsertImage />
    <InsertTable />
    <InsertThematicBreak />
  </>
);

const Editor: React.FC = () => {
  const { content, setContent } = useMarkdown();
  const theme = useTheme();

  return (
    <MDXEditor
      className={theme.palette.mode === "dark" ? "dark-theme dark-editor" : ""}
      markdown={content}
      onChange={setContent}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        toolbarPlugin({
          toolbarClassName: "my-classname",
          toolbarContents: ToolbarContents,
        }),
      ]}

     
    />
  );
};

export default Editor;
