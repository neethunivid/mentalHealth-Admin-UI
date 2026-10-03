import { Box, Divider, Grid, Modal, Paper, Typography } from "@mui/material";
import React, { useState, useRef } from "react";
import LeftPanLibrary from "../Common/LeftPanLibrary";
import LibraryHeader from "../Common/LibraryHeader";
import LibraryapiClient from "../../../API/LibraryAPI-client";

type JsonData = {
  successLogFile: string;
  totalRows: number;
  message: string;
  errorLogFile: string;
  status: number;
};
const Csv_upload = () => {
  //modal style
  const style = {
    position: "absolute" as "absolute",
    top: "12%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "10px solid #d9eadb ",
    // padding:'10px',
    boxShadow: 24,
    p: 4,
  };
  //modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  //to store file in the state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  //checking file uploaded
  const [isFileUploaded, setFileUploaded] = useState(false);
  //file uploaded response
  const [jsonData, setJsonData] = useState<JsonData | null>(null);

  //function to open modal for uploading excel sheet
  const openModal = () => {
    setFileUploaded(false);
    setIsModalOpen(true);
  };

  //function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* function to upload selected file */
  const handleSubmitClick = async () => {
    //checking file is there
    if (selectedFile == null || undefined) {
      alert("Please select a CSV file");
    }
    try {
      const dataRequest = {
        file: selectedFile,
      };
      const apiData = await LibraryapiClient.post(
        "library/upload/uploadCsv?format=csv",
        dataRequest
      );
      if (apiData) {
        //after successful upload change set new state
        setFileUploaded(true);
        setJsonData(apiData.data.data);
        setSelectedFile(null);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleFileSelect = (event: any) => {
    const file = event?.target?.files[0];
    if (!file) {
      // User canceled the file upload, do nothing
      return;
    }
    // Check if the file extension is .xlsx or .xls
    const allowedExtensions = ["csv"];
    const fileExtension = file?.name?.split(".").pop()?.toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      alert("Please select a file in csv format (.csv).");
      return;
    }

    setSelectedFile(file);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // If the file input ref is available, click it to open the file dialog
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <Grid container xs={12} padding={1} spacing={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanLibrary />
      </Grid>
      <Grid item xs={9}>
        <LibraryHeader label1="A." label2="Upload CSV" label3="図書室管理" />
        <Grid className="hr"></Grid>
        <Grid className="black">Please upload a CSV file here</Grid>
        <Grid className="hr"></Grid>
        <Grid className="middle_table">
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <Grid className="csv_upload_button_center">
            <input
              type="button"
              value="Upload CSV"
              onClick={() => openModal()}
            />
          </Grid>
          <Grid className="hr"></Grid>
        </Grid>
      </Grid>
      <Modal
        open={isModalOpen}
        // onClose={closeModal}
      >
        <Box sx={style}>
          <label className="csv_upload_header">Upload A CSV</label>
          <Grid className="hr"></Grid>
          <Divider style={{ backgroundColor: "black" }} />
          <Grid className="hr"></Grid>
          {!isFileUploaded ? (
            <Grid className="content-row black">
              <label>CSV File</label>
              <b className="red">*</b>
              <Grid className="library-width-15"></Grid>
              <input
                hidden
                type="file"
                // {...register("files")}
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
              <button onClick={handleButtonClick}>Choose File</button>
              {selectedFile ? (
                <span className="upload_mem_span">{selectedFile.name}</span>
              ) : (
                <span className="upload_mem_span">Not Choosen</span>
              )}
            </Grid>
          ) : (
            <>
              <Grid className="content-row black">
                <label className="black" style={{ color: "green" }}>
                  Process completed,no books could be registered. please see the
                  log files to know the result.
                </label>
              </Grid>
              <Grid className="hr"></Grid>
              <Grid className="content-row">
                <label className="black" style={{ color: "darkblue" }}>
                  {jsonData && jsonData.successLogFile}
                </label>
                <Grid className="library-width-15"></Grid>
                <label className="black" style={{ color: "darkblue" }}>
                  {jsonData && jsonData.errorLogFile}
                </label>
              </Grid>
            </>
          )}
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <Grid className="content-row">
            {!isFileUploaded && (
              <input
                type="button"
                value="Submit"
                onClick={() => {
                  handleSubmitClick();
                }}
              />
            )}
            <Grid className="library-width-3"></Grid>
            <input type="button" value="Close" onClick={closeModal} />
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
};

export default Csv_upload;
