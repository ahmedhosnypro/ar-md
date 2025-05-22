import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const Sidebar: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%", // Take full width of its container
        height: "100%", // Take full height
        bgcolor: theme.palette.background.paper,
        overflowY: "auto", // Enable scrolling if content overflows
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
      id="sidebar-container"
    >
      <Typography variant="h6" sx={{ padding: 2 }}>
        Sidebar
      </Typography>
    </Box>
  );
};

export default Sidebar;
