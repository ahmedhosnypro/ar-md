import React from "react";
import { Box, Typography } from "@mui/material";

const AppTitle: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        paddingLeft: 1,
        maxWidth: "100%",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: "bold",
          fontSize: {
            xs: "1rem",
            sm: "1.125rem",
            md: "1.25rem",
          },
          lineHeight: 1.6,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: {
            xs: "140px",
            sm: "180px",
            md: "240px",
            lg: "320px",
          },
        }}
      >
        {"Ar - MD"}
      </Typography>
    </Box>
  );
};


export default AppTitle