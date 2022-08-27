import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { LanguageSharp } from "@mui/icons-material";
import useLanguage from "../hooks/useLanguage";
export default function LanguageSelector() {
  const [anchorEl, setAncherEl] = useState(null);
  const open = Boolean(anchorEl);
  const { t, i18n } = useTranslation();
  const [language, changeLanguage] = useLanguage();
  const menuItemClickHandler = (e) => {
    changeLanguage(e.currentTarget.getAttribute("value"));
    setAncherEl(() => null);
  };
  return (
    <div style={{ paddingRight: "12px", paddingLeft: "12px" }}>
      <Menu onClose={() => setAncherEl(null)} open={open} anchorEl={anchorEl}>
        <MenuItem id={"lang-en"} onClick={menuItemClickHandler} value={"en"}>
          english
        </MenuItem>
        <MenuItem
          id={"lang-persian"}
          onClick={menuItemClickHandler}
          value={"persian"}
        >
          persian
        </MenuItem>
      </Menu>
      <Stack direction={"row"} alignItems={"center"}>
        <Tooltip title="select language">
          <IconButton onClick={(e) => setAncherEl(e.currentTarget)}>
            <LanguageSharp scale={10} />
          </IconButton>
        </Tooltip>
        <Typography>{language}</Typography>
      </Stack>
    </div>
  );
}
