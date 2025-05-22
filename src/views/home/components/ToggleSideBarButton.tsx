import { Box, IconButton, IconButtonProps } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import React from "react";

export type ToggleSideBarButtonProps = IconButtonProps &{
    isOpen: boolean;
};

export const ToggleSideBarButton: React.FC<ToggleSideBarButtonProps> = ({
    isOpen,
    ...props
}) => {
     return (
        <Box
            sx={{
                width: { xs: 48, sm: 72 },
                display: "flex",
                justifyContent: "center",
                borderRight: "1px",
                borderColor: "divider",
                borderStyle: "solid",
            }}
        >
            <IconButton
                {...props}
                edge="start"
                color="inherit"
                aria-label="toggle sidebar"
                sx={{
                    transition: "transform 0.3s ease-in-out",
                    transform:
                        isOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                    ...props.sx,
                }}
            >
                {isOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
        </Box>
    );
};