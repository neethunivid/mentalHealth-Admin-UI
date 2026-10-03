import { Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import LibraryHeader from "../../Common/LibraryHeader";
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import calenderIcon from "../../../../assets/images/icon_calender.gif";
import arrow from "../../../../assets/images/arrow3s-removebg-preview.png";
import downloadButton from "../../../../assets/images/lib_download.gif";
import resetButton from "../../../../assets/images/lib_reset.gif";
import { CheckBoxDownload_loan } from "./component/CheckBox";
import LibraryapiClient from "../../../../API/LibraryAPI-client";
import { convertReactFormatDate } from "../../../Common/Date_conversion";
import LeftPanLibrary from "../../Common/LeftPanLibrary";

const Download_loan = () => {
  const { control, handleSubmit, setValue, getValues } = useForm();
  const datePickerRef = useRef<ReactDatePicker>(null);
  const datePickerRef1 = useRef<ReactDatePicker>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(null);
  const [selectedOption, setSelectedOption] = useState<any>(null);

  //handle download from date
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setValue("download_dateFrom", date);
  };

  //handle download to date
  const handleDateChange1 = (date: Date) => {
    setSelectedDate1(date);
    setValue("download_dateTo", date);
  };

  //open the date picker input to select download from date
  const handleButtonClick = () => {
    datePickerRef.current?.setOpen(true);
  };
   //open the date picker input to select download to date
  const handleButtonClick1 = () => {
    datePickerRef1.current?.setOpen(true);
  };

  //handle the option selcted by the user
  const handleRadioChange = (value: any) => {
    setSelectedOption(selectedOption === value ? null : value);
  };

  //handle the input field values
  const onSubmit=()=>{
    const formValues=getValues();

    if(!selectedOption){
      alert("一つのチェックボックスを選択してチェックをいれてください");
    }
    else if(selectedOption=="monthDownload"&&(!formValues.download_dateFrom ||!formValues.download_dateTo)){
      alert("日付をいれてください")
    }
    else if(selectedOption=="rentalDateSpecified"&&(!formValues.download_dateFrom ||!formValues.download_dateTo)){
      alert("日付をいれてください")
    }
    else if(selectedOption=="loanList"&&(!formValues.download_dateFrom ||!formValues.download_dateTo)){
      alert("日付をいれてください")
    }
    else{
    if(selectedOption){
      if(selectedOption=="batchDownload"){
        downloadcsvLendingData(1,"","","All_lending_books")
      }
      else if(selectedOption=="monthDownload"){
        downloadcsvLendingData(2,formValues.download_dateFrom,formValues.download_dateTo,"All_lending_books")
      }
      else if(selectedOption=="rentalDateSpecified"){
        downloadcsvLendingData(3,formValues.download_dateFrom,formValues.download_dateTo,"Lending_books")
      
      }
      else if(selectedOption=="loanList"){
        downloadcsvLendingData(4,formValues.download_dateFrom,formValues.download_dateTo,"NotReturnedBooks")
    }
    else if(selectedOption=="listLenders"){
      downloadcsvLendingData(5,"","","borrowers")
    }
    else if(selectedOption=="overDueProvider"){
      downloadcsvLendingData(6,"","","book_overdue")
    }
  }
  }
  }

  //download the lending data
  const downloadcsvLendingData = async (checktype:any,datefrom:any,dateto:any,name:any) => {
  
    const datarequest={
   check:checktype,
   ...(datefrom && { date1: convertReactFormatDate(datefrom) }),
   ...(dateto && { date2: convertReactFormatDate(dateto) }),
    }
     try {
       
       const apiData = await LibraryapiClient.post('library/export/lendingdatadownload', datarequest, {});
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

   //reset the selected option field to false 
   const reset=()=>{
    setSelectedOption(false)
   }
  return (
    <Grid container xs={12} padding={1} spacing={1}>
      <Grid item xs={3} spacing={2}>
       <LeftPanLibrary/>
      </Grid>
      <Grid item xs={9}>
        <LibraryHeader
          label1="E.2"
          label2="貸出データのダウンロード"
          label3="図書室管理"
        />
        <Grid className="hr"></Grid>
        <Grid>
          <label className="black">★いづれかの項目を選択して下さい。</label>
        </Grid>
        <Grid className="hr"></Grid>
        <Grid className="black management_flex_end">E-4</Grid>
        <Grid className="middle_table">
          <form>
            <Grid className="hr"></Grid>
            <Grid className="hr"></Grid>
            <Grid xs={12} className="content-row">
              {/* row1 */}
              <Grid className="library-width-3"></Grid>
              <Grid xs={2}>
                <Grid className="content-row">
                  <Grid className="library-width-3"></Grid>
                  <CheckBoxDownload_loan
                    control={control}
                    selectedOption={selectedOption}
                    value="batchDownload"
                    onClick={handleRadioChange}
                    setValue={setValue}
                
                  />
                  <Grid className="library-width-15"></Grid>
                  <label className="black">一括ダウンロード</label>
                </Grid>
                <Grid className="hr"></Grid>
                <Grid className="content-row">
                  <Grid className="library-width-3"></Grid>
                  
                  <CheckBoxDownload_loan
                    control={control}
                    selectedOption={selectedOption}
                    value="monthDownload"
                    onClick={handleRadioChange}
                    setValue={setValue}
                
                  />
                  <Grid className="library-width-15"></Grid>
                  <label className="black">月別ダウンロード</label>
                </Grid>
                <Grid className="hr"></Grid>
                <Grid className="content-row">
                  <Grid className="library-width-3"></Grid>
                  <CheckBoxDownload_loan
                    control={control}
                    selectedOption={selectedOption}
                    value="rentalDateSpecified"
                    onClick={handleRadioChange}
                    setValue={setValue} 
                  />
                  <Grid className="library-width-15"></Grid>
                  {/* <Grid className="library-width-20 "> */}
                  <label className="black">貸出日指定ダウンロード</label>
                  {/* </Grid> */}
                </Grid>
                <Grid className="hr"></Grid>
                <Grid className="content-row">
                  <Grid className="library-width-3"></Grid>
                  <CheckBoxDownload_loan
                    control={control}
                    selectedOption={selectedOption}
                    value="loanList"
                    onClick={handleRadioChange}
                    setValue={setValue}
                  />
                  <Grid className="library-width-15"></Grid>
                  {/* <Grid className="library-width-20 "> */}
                  <label className="black">貸出中リスト</label>
                  {/* </Grid> */}
                </Grid>
                <Grid className="hr"></Grid>
                <Grid className="content-row">
                  <Grid className="library-width-3"></Grid>
                  <CheckBoxDownload_loan
                    control={control}
                    selectedOption={selectedOption}
                    value="listLenders"
                    onClick={handleRadioChange}
                    setValue={setValue}
                  />
                  <Grid className="library-width-15"></Grid>
                  {/* <Grid className="library-width-20 "> */}
                  <label className="black">貸出者一覧</label>
                  {/* </Grid> */}
                </Grid>
                <Grid className="hr"></Grid>
                <Grid className="content-row">
                  <Grid className="library-width-3"></Grid>
                  <CheckBoxDownload_loan
                    control={control}
                    selectedOption={selectedOption}
                    value="overDueProvider"
                    onClick={handleRadioChange}
                    setValue={setValue}
                  />
                  <Grid className="library-width-15"></Grid>
                  {/* <Grid className="library-width-20 "> */}
                  <label className="black">返却日を過ぎている本</label>
                  {/* </Grid> */}
                </Grid>
              </Grid>
              {/* row 2 */}
              <Grid xs={1}>
                <Grid className="hr"></Grid>
                <Grid className="hr"></Grid>
                <Grid className="hr"></Grid>
                <Grid className="hr"></Grid>

                <Grid>
                  <img
                    className="bg_white"
                    src={arrow}
                    alt="calendar"
                    width={30}
                    height={66}
                  />
                </Grid>
              </Grid>
              <Grid>
                <Grid className="hr"></Grid>
                <Grid className="hr"></Grid>
                <Grid className="hr"></Grid>
                <Grid className="hr"></Grid>
                <Grid className="hr"></Grid>
                <Grid className="hr"></Grid>
                <Grid className="hr"></Grid>

                <Grid className="content-row">
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
                  <label className="black">（例：2012.4.1～2013.3.31）</label>
                </Grid>
              </Grid>
            </Grid>
          </form>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
        </Grid>
        <Grid className="hr"></Grid>
        <Grid className="hr"></Grid>
        <Grid className="content-row">
          <Grid className="library-width-32"></Grid>

          <Grid className="library-width-20">
            <img
              src={downloadButton}
              onClick={() => {
                onSubmit()
              }}
            />
          </Grid>
          <Grid className="library-width-48">
            <img src={resetButton} onClick={() => reset()} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Download_loan;
