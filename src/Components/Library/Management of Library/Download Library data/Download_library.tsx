import { Grid } from "@mui/material";
import React, { useState, useRef } from "react";
import LeftPanBBS from "../../../Common/LeftPanBBS";
import LibraryHeader from "../../Common/LibraryHeader";
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import calenderIcon from "../../../../assets/images/icon_calender.gif";
import downloadButton from "../../../../assets/images/lib_download.gif";
import resetButton from "../../../../assets/images/lib_reset.gif";
import CheckBoxLibrary from "./component/CheckBoxLibrary";
import LeftPanLibrary from "../../Common/LeftPanLibrary";
import { convertReactFormatDate, getCurrentDateTimevalue } from "../../../Common/Date_conversion";
import LibraryapiClient from "../../../../API/LibraryAPI-client";
const Download_library = () => {
  const { control, handleSubmit, setValue, getValues } = useForm();
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<any>(null);
  const [showThirdCheckbox, setShowThirdCheckbox] = useState(false);
  const datePickerRef = useRef<ReactDatePicker>(null);
  const datePickerRef1 = useRef<ReactDatePicker>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(null);

  //handle the input fields
  const onSubmit = () => {
   
    const formValues = getValues();
    
    if(!selectedOption){
      alert("一つのチェックボックスを選択してチェックをいれてください")
      return
    }
    else if(selectedOption=="downloadType"&&(!selectedType)){
        alert("一つのチェックボックスを選択してチェックをいれてください")
        return
      }
      else if(selectedType=="download_new_book"&&(!formValues.download_dateFrom ||!formValues.download_dateTo)){
        alert("日付をいれてください")
      }
      else{
        if(selectedOption=="batchDownload"){
          downloadcsvLibraryDataBatch(1)

        }
        else{
          if(selectedOption=="downloadType"){
            if(selectedType=="morita_therapy"){
              downloadcsvLibraryData(3,"","","mortia_books")
            }else if(selectedType=="other_morita"){
              downloadcsvLibraryData(4,"","","Other_mortia_books")
            }
            else if(selectedType=="download_new_book"){
              downloadcsvLibraryData(5,formValues.download_dateFrom,formValues.download_dateTo,"new_books")
            }
            else if(selectedType=="download_deleted"){
              downloadcsvLibraryData(6,"","","deleted_books")
            }
          }
        }
      }
  };

  //download the batch data of library
  const downloadcsvLibraryDataBatch = async (checktype:any) => {
  
    const datarequest={
    check:checktype
    }
     try {
       const currentDate = getCurrentDateTimevalue()
       const apiData = await LibraryapiClient.post('library/export/batchDownload', datarequest, {});
       if (apiData) {

         downloadFile(apiData.data, `All_Books`, 'text/csv')
       }
     } catch (error: any) {
       console.error("Error :",error)
     }
   }
  
//download the csv format of the library data 
const downloadcsvLibraryData = async (checktype:any,datefrom:any,dateto:any,name:any) => {
  
 const datarequest={
check:checktype,
...(datefrom && { date1: convertReactFormatDate(datefrom) }),
...(dateto && { date2: convertReactFormatDate(dateto) }),
 }
  try {
    
    const apiData = await LibraryapiClient.post('library/export/bookDownload', datarequest, {});
    if (apiData) {
      downloadFile(apiData.data, `${name}`, 'text/csv')
    }
  } catch (error: any) {
   console.error("Error:",error)
  }
}

 //converting the api data to csv file
 const downloadFile = (data: any, fileName: any, fileType: any) => {
  const blob = new Blob(["\ufeff" + data], { type: "text/csv;charset=UTF-8" })
  const a = document.createElement('a')
  a.download = fileName
  a.href = window.URL.createObjectURL(blob)
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  a.dispatchEvent(clickEvt)
  a.remove()
}

 // Handle date change and set selected date and value for "download_dateFrom"
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setValue("download_dateFrom", date);
  };

  //Handle date change and set selected date and value for "download_dateTo"
  const handleDateChange1 = (date: Date) => {
    setSelectedDate1(date);
    setValue("download_dateTo", date);
  };

  //Handle button click to open date picker for "download_dateFrom"
  const handleButtonClick = () => {
    datePickerRef.current?.setOpen(true);
  };

  //Handle button click to open date picker for "download_dateTo"
  const handleButtonClick1 = () => {
    datePickerRef1.current?.setOpen(true);
  };

  //handle the selcted option for batchdownload or download by type
  const handleRadioChange = (value: any) => {
    setSelectedOption(selectedOption === value ? null : value);
    
  };

  //handle the download by type option values
  const handleTypeChange = (value: any) => {
    setSelectedType(selectedType === value ? null : value);
  };

  //reset the selected option and download by type to false
  const reset=()=>{
    setSelectedOption("false")
    setSelectedType("false")
  }
  return (
    <Grid container xs={12} padding={1} spacing={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanLibrary />
      </Grid>
      <Grid item xs={9}>
        <LibraryHeader
          label1="E.1"
          label2="図書室データ一覧"
          label3="図書室管理
"
        />
        <Grid className="hr"></Grid>
        <Grid>
          <label className="black">★いづれかの項目を選択して下さい。</label>
        </Grid>
        <Grid className="hr"></Grid>
        <Grid className="black management_flex_end">E-2</Grid>
        <Grid className="middle_table">
          <form>
            <Grid className="hr"></Grid>
            <Grid className="hr"></Grid>
            <Grid className="hr"></Grid>
            <Grid className="content-row">
              <Grid className="library-width-3"></Grid>
              <Grid className="library-width-3">
              
                <Controller
                  name="batch_download"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="management_checkbox"
                      type="checkbox"
                      checked={selectedOption == "batchDownload"}
                      value="batchDownload"
                      onChange={() => {
                        handleRadioChange("batchDownload");
                        setShowThirdCheckbox(false);
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid className="library-width-20 ">
                <label className="black">一括ダウンロード</label>
              </Grid>
            </Grid>
            <Grid className="hr"></Grid>
            <Grid className="content-row">
              <Grid className="library-width-3"></Grid>
              <Grid className="library-width-3">
              
                <Controller
                  name="download_type"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="management_checkbox"
                      type="checkbox"
                      value="downloadType"
                      checked={selectedOption == "downloadType"}
                      onChange={() => {
                        handleRadioChange("downloadType");
                        setShowThirdCheckbox(!showThirdCheckbox);
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid className="library-width-20 ">
                <label className="black">種類別ダウンロード</label>
              </Grid>
            </Grid>
            <Grid className="hr"></Grid>
            <Grid className="hr"></Grid>
            {showThirdCheckbox && (
              <Grid>
                <Grid className="content-row">
                  <Grid className="library-width-3"></Grid>
                  <Grid className="library-width-3"></Grid>
                  <Grid className="library-width-3">
                    <Controller
                      name="morita_therapy"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="management_checkbox"
                          type="checkbox"
                          value={3}
                          checked={selectedType == "morita_therapy"}
                          onChange={() => handleTypeChange("morita_therapy")}
                        />
                      )}
                    />
                  </Grid>
                  <Grid className="library-width-3"></Grid>
                  <Grid className="library-width-20 ">
                    <label className="black">森田療法</label>
                  </Grid>
                </Grid>
                <Grid className="hr"></Grid>
                <Grid className="content-row">
                  <Grid className="library-width-3"></Grid>
                  <Grid className="library-width-3"></Grid>
                  <Grid className="library-width-3">
                    <Controller
                      name="other_morita"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="management_checkbox"
                          type="checkbox"
                          value={4}
                          checked={selectedType == "other_morita"}
                          onChange={() => {
                            handleTypeChange("other_morita");
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid className="library-width-3"></Grid>
                  <Grid className="library-width-20 ">
                    <label className="black">森田療法以外</label>
                  </Grid>
                </Grid>
                <Grid className="hr"></Grid>
                <Grid className="content-row">
                  <Grid className="library-width-3"></Grid>
                  <Grid className="library-width-3"></Grid>
                  <Grid className="library-width-3">
                    <Controller
                      name="download_new_book"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="management_checkbox"
                          type="checkbox"
                          value={5}
                          checked={selectedType == "download_new_book"}
                          onChange={() => {
                            handleTypeChange("download_new_book");
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid className="library-width-3"></Grid>
                  <Grid className="library-width-20 ">
                    <label className="black">新図書データのダウンロード</label>
                  </Grid>
                  <Grid className="library-width-20 content-row"></Grid>
                  <Controller
                    control={control}
                    name={"download_dateFrom"}
                    render={({ field }) => (
                      <ReactDatePicker
                        className="management_date_picker"
                        {...field}
                        ref={datePickerRef}
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                      />
                    )}
                  />
                  <img
                    className="bg_white"
                    src={calenderIcon}
                    alt="calendar"
                    width={14}
                    height={14}
                    onClick={handleButtonClick}
                  />
                  <label className="black">~</label>
                  <Controller
                    control={control}
                    name={"download_dateTo"}
                    render={({ field }) => (
                      <ReactDatePicker
                        className="management_date_picker"
                        {...field}
                        ref={datePickerRef1}
                        selected={selectedDate1}
                        onChange={handleDateChange1}
                        dateFormat="yyyy-MM-dd"
                      />
                    )}
                  />
                  <img
                    className="bg_white"
                    src={calenderIcon}
                    alt="calendar"
                    width={14}
                    height={14}
                    onClick={handleButtonClick1}
                  />
                </Grid>
                <Grid className="content-row">
                  <Grid className="library-width-70"></Grid>
                  <label className="black">（例：2012.4.1～2013.3.31）</label>
                </Grid>

                <Grid className="hr"></Grid>
                <Grid className="content-row">
                  <Grid className="library-width-3"></Grid>
                  <Grid className="library-width-3"></Grid>
                  <Grid className="library-width-3">
                    <Controller
                      name="download_deleted"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="management_checkbox"
                          type="checkbox"
                          value={6}
                          checked={selectedType == "download_deleted"}
                          onChange={() => {
                            handleTypeChange("download_deleted");
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid className="library-width-3"></Grid>
                  <Grid className="library-width-20 ">
                    <label className="black">
                      削除（廃本）データのダウンロード
                    </label>
                  </Grid>
                </Grid>
                <Grid className="hr"></Grid>
              </Grid>
            )}
          </form>
        </Grid>
        <Grid className="hr"></Grid>
        <Grid className="hr"></Grid>
        <Grid className="content-row">
          <Grid className="library-width-32"></Grid>

          <Grid className="library-width-20">
            <img src={downloadButton} onClick={onSubmit} />
          </Grid>
          <Grid className="library-width-48">
            <img src={resetButton} onClick={() => reset()} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Download_library;
