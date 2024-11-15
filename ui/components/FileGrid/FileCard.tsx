"use client";

import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BiVideo } from "react-icons/bi";
import {
  BsFile,
  BsFileImage,
  BsFiletypeDoc,
  BsFiletypeDocx,
  BsFiletypePdf,
  BsFiletypeTxt,
} from "react-icons/bs";
import { TbFileUnknown } from "react-icons/tb";
import { fileType } from "./fileTypes";
import FileIcon from "./FileIcon";
import { CgMoreVertical } from "react-icons/cg";
import FileImage from "./FileImage";

export interface File {
  name?: string;
  type?: fileType;
  size?: string;
}

export default function FileCard({ name, size, type = "unknown" }: File) {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [mediaThumbnailError, setMediaThumbnailError] = useState(false);
  const isMenuOpen = Boolean(menuAnchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleAction = (action: string) => {
    console.log(`Action selected: ${action}`);
    handleMenuClose();
  };
  useEffect(() => {
    console.log(mediaThumbnailError);
  }, [mediaThumbnailError]);
  let icon = <FileIcon type={type} />;

  return (
    <Card
      elevation={2}
      className="flex-grow relative isolate flex flex-col items-center justify-between min-[300px]:max-w-36 w-24 h-36 !bg-transparent"
    >
      {/* Menu Button */}
      <IconButton
        className="!absolute !z-10 top-2 right-2 text-black dark:text-white"
        size="small"
        onClick={handleMenuOpen}
        aria-controls="file-card-menu"
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
      >
        <CgMoreVertical />
      </IconButton>

      {/* Menu */}
      <Menu
        id="file-card-menu"
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className="!z-10"
      >
        <MenuItem onClick={() => handleAction("open")}>Open</MenuItem>
        <MenuItem onClick={() => handleAction("rename")}>Rename</MenuItem>
        <MenuItem onClick={() => handleAction("delete")}>Delete</MenuItem>
      </Menu>

      {/* thumbnail (media thumbnail if available, icon if unavailable) */}
      <span className="w-full isolate relative h-[85%] shrink-0">
        <FileImage
          fallback={
            <i
              className={`*:size-full size-full flex relative items-center justify-center p-7 z-0 box-border text-black dark:text-white`}
            >
              {icon}
            </i>
          }
          src={`/icons/${name}.png`} // Replace with actual icons or placeholders
          alt={`${name}.${type} file`}
          className="size-full"
          onError={() => {
            setMediaThumbnailError(true);
          }}
          siblings={
            <i
              className={`absolute rounded-md bottom-2 z-10 p-2 box-border right-2 text-3xl bg-black/50 text-black dark:text-white`}
            >
              {icon}
            </i>
          }
        />
      </span>
      <CardContent className="w-full !p-0 !px-2 grid grid-cols-[3fr,1.5fr] items-center justify-center">
        <Typography
          variant="caption"
          className="text-black dark:text-white"
          noWrap
        >
          {name}
        </Typography>
        <Typography
          variant="caption"
          className="text-neutral-800 dark:!text-neutral-300 line-clamp-1"
        >
          {size}
        </Typography>
      </CardContent>
    </Card>
  );
}
