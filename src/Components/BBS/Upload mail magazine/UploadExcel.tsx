import { Button, Grid,Typography } from "@mui/material";
import React, { useState,useRef } from "react";
import LeftPanBBS from "../../Common/LeftPanBBS";
import MailMagazineMemberlistHeader from "../Mail Magazine Management/Mail Magazine Components/MailMagazineMemberlistHeader";
import { useForm, Controller } from "react-hook-form";
import { useParams } from 'react-router-dom';
import ApiClient from "../../../API/API-client";
interface LayoutProps{
    label:string;
}

const UploadExcel = ({label}:any) => {
    let type:any;
    const params = useParams();
    const { specificValue } = params;
    const [uploadMsg, setUploadMsg] = useState("");// State for displaying upload status
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
      } = useForm();
  const [selectedFile, setSelectedFile] = useState<File | undefined>();

  const fileInputRef = useRef<HTMLInputElement>(null);// Ref for file input element

 // Handle click event for file input button
  const handleButtonClick=(event: React.MouseEvent<HTMLButtonElement>)=>{
    event.preventDefault();
     // If the file input ref is available, click it to open the file dialog
    if(fileInputRef.current){
        fileInputRef.current.click();

    }
  }
  // Handle file select event
  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    if (!file) {
      // User canceled the file upload, do nothing
      return;
  }
    // Check if the file extension is .xlsx or .xls
    const allowedExtensions = ["xlsx", "xls"];
    const fileExtension = file?.name?.split(".").pop()?.toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
      alert("Please select a file in Excel format (.xlsx or .xls).");
      return;
    }
  
    setValue("uploadExcel_file", file);
    setSelectedFile(file);
  };
  //handles form submission
  const onSubmit=(data:any)=>{
    setValue("uploadExcel_file",selectedFile);
    uploadExcelfile(data,specificValue=="PCのメールアドレス・アップロード"?type='pc':type='sp');
  }
   //function to call exceluploads
  const uploadExcelfile = async (data: any,type:'pc'|'sp') => {
   try {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
     // Create a FormData object and append the selected file to it
    const formData = new FormData();
    formData.append('file', selectedFile);
     // Construct query parameters for the API request
      const queryParams = `topic=${encodeURIComponent(data.uploadExcel_title)}&type=${type}&format=excel`;

      const apiData = await ApiClient.post("api/file/uploadcsv?"+queryParams,formData,{});
      if (apiData) {
        setUploadMsg("アップロードしました。");
        setValue("uploadExcel_title", ""); // Reset the title input field
        setSelectedFile(undefined); 
        setTimeout(() => {
          window.location.reload()
        }, 2000);
        //window.location.reload(); 
        
      }
  } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div>
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanBBS />
        </Grid>
        <Grid item xs={9}>
          <MailMagazineMemberlistHeader
            title1="I. テーマ別のメルマガ登録のアップロード"
            title2="メルマガ管理"
          />
          <Grid className="hr"></Grid>
          <span className="upload_mem_span">{specificValue}</span>
          <Grid className="hr"></Grid>
          <form id="uploadExcel" onSubmit={handleSubmit(onSubmit)}>
            <Grid className="middle_table">
            <Typography className="txt_green mglft_1" >{uploadMsg}</Typography>
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
              <Grid xs={12} className="content-row">
             
                <Grid xs={2}>
                  <span className="upload_mem_span">タイトル*</span>
                </Grid>
                <Grid xs={10}>
                  <input type="text" className="bdr_text" {...register('uploadExcel_title',{ required: "true" })}></input>
                </Grid>
              </Grid>
              <Grid className="hr"></Grid>
              <Grid xs={12} className="content-row">
                <Grid xs={2}>
                  <span className="upload_mem_span">選択*</span>
                </Grid>
                <Grid xs={9}>
                  <label htmlFor="fileInput">
                    <input
                      hidden
                      id="fileInput"
                      type="file"
                     
                      {...register('uploadExcel_file')}
                      onChange={handleFileSelect}
                      ref={fileInputRef}
                    />
                    <button onClick={handleButtonClick}>ファイルを選択</button>
                  </label>
                  {selectedFile ? (
                    <span className="upload_mem_span">{selectedFile.name}</span>
                  ) : (
                    <span className="upload_mem_span">ファイルは選択されていない。</span>
                  )}
                  <Grid className="hr"></Grid>
                  <Grid>
                  <Button
                  type="submit"
                variant="contained"
                className="upload_mail_magazine_button"
              >
                Upload Excel
              </Button>
                  </Grid>
                  <Grid className="hr"></Grid>
                </Grid>
              </Grid>
              <Grid className="hr"></Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default UploadExcel;
