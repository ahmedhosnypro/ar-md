"use client";

import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToggleSideBarButton } from "./components/ToggleSideBarButton";
import { FloatingDashboardSidebar } from "./components/FloatingSidebar";
import AppTitle from "./components/Title";
import EndActions from "./components/EndActions";
import Markdown from "../editor/Markdown";
import { useTheme } from "next-themes";

export default function HomeView() {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateDimentions = () => {
      if (headerRef?.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        setHeaderHeight(height);
      }
    };

    updateDimentions();

    window.addEventListener("resize", updateDimentions);

    return () => {
      window.removeEventListener("resize", updateDimentions);
    };
  }, [headerRef]);

  if (!theme) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* header */}
      <Box
        ref={headerRef}
        sx={{
          display: "flex",
          alignItems: "center",
          py: 0,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        {/* sidebar toggle */}
        <ToggleSideBarButton
          isOpen={isSidebarOpen}
          onClick={() => {
            console.log("toggle sidebar");
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />

        {/* title */}
        <AppTitle />
        <Box sx={{ flex: 1 }} />

        {/* end actions */}
        <EndActions />
      </Box>

      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* main content */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Markdown />
        </Box>
      </Box>

      {/* floating sidebar for mobile */}
      <FloatingDashboardSidebar
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        headerHeight={headerHeight}
      />
    </Box>
  );
}
