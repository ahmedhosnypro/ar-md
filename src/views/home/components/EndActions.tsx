import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
    PanelRight as PanelRightIcon,
    PanelLeft as PanelLeftIcon,
} from "lucide-react";
import { useEditorPane } from "../EditorPaneContext";

export default function EndActions() {
    const { 
        firstPaneVisible, 
        secondPaneVisible, 
        toggleFirstPane, 
        toggleSecondPane 
    } = useEditorPane();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                gap: 1,
                paddingInlineEnd: 2,
            }}
        >
            <Tooltip title="Toggle Editor">
                <span>
                    <IconButton
                        onClick={toggleFirstPane}
                        disabled={!secondPaneVisible}
                    >
                        <PanelRightIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Toggle Preview">
                <span>
                    <IconButton
                        onClick={toggleSecondPane}
                        disabled={!firstPaneVisible}
                    >
                        <PanelLeftIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <LanguageSwitcher />
        </Box>
    );
}
