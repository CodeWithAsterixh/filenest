"use client";

import { FileIn } from "@/store/reducers/fileTypes";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { FiFilePlus } from "react-icons/fi";
import FileCard from "../FileGrid/FileCard";

interface UploadDialogProps {
  onClose: () => void;
  onUpload: (file: File) => void;
}

const UploadDialog: React.FC<UploadDialogProps> = ({ onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleOpenFilePicker = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      if (!selectedFile) return;

      // Example custom file data structure
      const fileData: FileIn = {
        id: "1",
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        content: selectedFile,
      };

      // Convert the custom file object to a File instance
      const createFileFromData = (fileData: FileIn): File => {
        const blob = new Blob([fileData.content || ""], {
          type: fileData.type,
        });
        return new File([blob], fileData.name, { type: fileData.type });
      };

      const actualFile = createFileFromData(fileData);

      onUpload(actualFile);

      setSelectedFile(null);
      onClose();
    }
  };
  function fmb(size: number) {
    const units = ["Bts", "KB", "MB", "GB", "TB"];
    let uindex = 0;
    while (size >= 1024 && uindex < units.length - 1) {
      size /= 1024;
      uindex++;
    }
    return `${size.toFixed(2)}${units[uindex]}`;
  }

  return (
    <div className="w-full p-3 !text-neutral-900 dark:!text-neutral-100">
      <DialogTitle>Upload File</DialogTitle>
      <DialogContent className="w-full h-fit p-2 flex flex-col gap-2 items-center justify-center">
        <div className="w-32 h-fit flex overflow-x-auto *:!w-full *:!shrink-0">
          {selectedFile && (
            <FileCard
              name={selectedFile.name}
              size={fmb(selectedFile.size)}
              type={selectedFile.name.split(".").slice(-1)[0]}
            />
          )}
        </div>
        <TextField
          type="file"
          fullWidth
          onChange={handleFileChange}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            input: {
              id: "fileInput",
            },
          }}
          className="!hidden"
        />
        <IconButton
          onClick={handleOpenFilePicker}
          className="!text-5xl !flex !items-center !justify-center !gap-2 !flex-col !text-neutral-600 dark:!text-neutral-300"
        >
          <FiFilePlus />
          <Typography variant="caption" className="!not-italic" component="em">
            add a file
          </Typography>
        </IconButton>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          className="!border-blue-500 !text-blue-500"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          className="!bg-blue-500 !text-white"
          onClick={handleUpload}
          disabled={!selectedFile}
        >
          Upload
        </Button>
      </DialogActions>
    </div>
  );
};

export default UploadDialog;
