"use client";

import React, { createContext, useContext, useState } from "react";

type EditorPaneContextType = {
  firstPaneVisible: boolean;
  secondPaneVisible: boolean;
  toggleFirstPane: () => void;
  toggleSecondPane: () => void;
};

const EditorPaneContext = createContext<EditorPaneContextType | undefined>(undefined);

export function EditorPaneProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [firstPaneVisible, setFirstPaneVisible] = useState<boolean>(true);
  const [secondPaneVisible, setSecondPaneVisible] = useState<boolean>(true);

  const toggleFirstPane = () => {
    setFirstPaneVisible(prev => !prev);
  };

  const toggleSecondPane = () => {
    setSecondPaneVisible(prev => !prev);
  };

  const value = React.useMemo(
    () => ({
      firstPaneVisible,
      secondPaneVisible,
      toggleFirstPane,
      toggleSecondPane
    }),
    [firstPaneVisible, secondPaneVisible]
  );

  return (
    <EditorPaneContext.Provider value={value}>
      {children}
    </EditorPaneContext.Provider>
  );
}

export function useEditorPane() {
  const context = useContext(EditorPaneContext);
  if (context === undefined) {
    throw new Error("useEditorPane must be used within a EditorPaneProvider");
  }
  return context;
}
