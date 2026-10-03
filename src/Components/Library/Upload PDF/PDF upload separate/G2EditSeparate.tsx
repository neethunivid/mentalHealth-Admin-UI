import { Grid } from '@mui/material';
import LeftPanLibrary from '../../Common/LeftPanLibrary';
import LibraryHeader from '../../Common/LibraryHeader';
import { useForm } from "react-hook-form";
import { useState } from "react";
import LibraryapiClient from '../../../../API/LibraryAPI-client';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useRef } from 'react';

const G2EditSeparate = () => {
  let id: any
  let bookNolist: any
  let documentname: any
  const navigate = useNavigate()
  const location = useLocation()
  if (location && location.state) {
    id = location.state.data;
    bookNolist = location.state.bookNolist
    documentname = location.state.documentname
  }
  //to store file in the state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileNames, setSelectedFileNames] = useState({
    pdf1: "No file chosen",
  });
  const fileInputRef = useRef<any>(null);
  const { handleSubmit, formState: { errors } } = useForm();
  /* function to upload selected file */
  const onSubmit = async () => {
    //checking file is there
    if (selectedFile == null || undefined) {
      alert("Please select a pdf file");
    }
    try {
      const dataRequest = {
        pdfFile: selectedFile,
      };

      //api call to edit document
      const apiData = await LibraryapiClient.put(
        "library/upload/editDocument/" + id,
        dataRequest
      );
      if (apiData) {
        navigate('/G2uploadseparate', { state: { data: bookNolist } });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle file select event
  const handleFileSelect = (event: any, name: any) => {
    const file = event.target.files[0];
    if (!file) {
      return
    }

    // Check if the file extension is .pdf
    const allowedExtensions = ["pdf"];
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (extension && allowedExtensions.includes(extension)) {
      setSelectedFile(file)
      setSelectedFileNames({
        ...selectedFileNames,
        [name]: file.name,
      });
    } else {
      // Display an error message 
      alert("Invalid file format. Please choose pdf file format");
    }
  };

  // Handle click event for file input button
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // If the file input ref is available, click it to open the file dialog
    if (fileInputRef.current) {
      fileInputRef.current.click();

    }
  }
  return (
    <Grid container xs={12} padding={1} spacing={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanLibrary />
      </Grid>
      <Grid item xs={9}>
        <LibraryHeader
          label1="G-2.編集"
          label2=""
          label3=""
        />
        <Grid className='hr'></Grid>
        <Grid className='hr'></Grid>
        <Grid className='hr'></Grid>

        <Grid container xs={12}>
          <Grid container className="middle_table up" >
            <Grid className='hr'></Grid>
            <Grid className='hr'></Grid>
            <Grid container xs={12} className="middle_table ">
              <Grid className="p6red_bg_midle1">
                <Grid className="top-header">
                  <span className="verdana_big g2edit">編集</span>
                </Grid>
              </Grid>
              <Grid container xs={12} className='up' >
                <Grid item xs={2}>
                  <label className='black'>PDF名</label>
                </Grid>
                <Grid item xs={6}>
                  <label className='black'>{documentname}</label>
                </Grid>
              </Grid>
              <Grid container xs={12} className='up' >
                <Grid item xs={2}>
                  <label className='black'>PDFをアップロード</label>
                </Grid>
                <Grid item xs={6}>

                  <label htmlFor="fileInput">
                    <input
                      hidden
                      id="fileInput"
                      type="file"
                      onChange={(e) => handleFileSelect(e, "pdf1")}
                      ref={fileInputRef}
                    />
                    <button onClick={handleButtonClick}>Choose a File</button>
                  </label>
                  {selectedFileNames.pdf1 ? (
                    <span className="upload_mem_span">{selectedFileNames.pdf1}</span>
                  ) : (
                    <span className="upload_mem_span">No file Chosen</span>
                  )}

                </Grid>
              </Grid>

              <Grid container xs={12} className='up' >
                <Grid item xs={2}>

                </Grid>
                <Grid item xs={6}>
                  <input type="submit" name="Sub2" value="アップロード" onClick={onSubmit} />
                </Grid>
              </Grid>
            </Grid>
            <Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default G2EditSeparate;