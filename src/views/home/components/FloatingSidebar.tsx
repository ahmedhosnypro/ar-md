import React from "react";
import { Box, Drawer, useTheme } from "@mui/material";
import { Sidebar } from "./Sidebar";

interface FloatingDashboardSidebarProps {
    open: boolean;
    onClose: () => void;
    headerHeight: number;
}

export const FloatingDashboardSidebar: React.FC<
    FloatingDashboardSidebarProps
> = ({ open, onClose, headerHeight }) => {
    const theme = useTheme();

    return (
        <Drawer
            variant="temporary"
            anchor={"left"}
            open={open}
            onClose={onClose}
            ModalProps={{
                keepMounted: true, // Better mobile performance
            }}
            slotProps={{
                transition: {
                }
            }}
            sx={{
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: 280,
                    backgroundColor: theme.palette.background.paper,
                    top: `${headerHeight}px`,
                    height: `calc(100% - ${headerHeight}px)`,
                },
            }}
        >
            <Box sx={{ height: "100%" }}>
                <Sidebar />
            </Box>
        </Drawer>
    );
};

export default FloatingDashboardSidebar;
