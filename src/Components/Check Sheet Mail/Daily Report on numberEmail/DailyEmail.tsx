import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LeftPanChecksheet from "../../Check Sheet Mail/LeftPanChecksheet";
// import "../../Check Sheet Mail/check.scss";
import CheckSheetHeader from "../Common/CheckSheetHeader";
import year from "../Common/Year";
import month from "../Common/Month";
import moment from "moment";
import apiClient from "../../../API/API-client";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Grid,
} from "@mui/material";
import { getCurrentDateTimevalue } from "../../Common/Date_conversion";


const DailyEmail = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  let req: any;
  let apiData:any;
const [columnTotals, setColumnTotals] = useState<any>({});
 const [rows, setRows] = useState([]);
 const [reportdata,setData]=useState<any>([])
 const[currentmonth,setMonth]=useState<any>()
 const[currentyear,setYear]=useState<any>()
  
 //column defintion for datagrid
  const columns: GridColDef[] = [
    {
      field: "dt",
      align: "center",
      headerAlign: "center",
      headerName: "",
      width: 106,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
       renderCell: (params) => {
        const dtValue = params?.row?.dt;
        if (dtValue === "合計" || dtValue === "割合") {
          return dtValue;
        }
        if (dtValue) {
          return moment(dtValue).format("YY/M/D");
        } else {
          return null;
        }
      },
    },
    {
      field: "1",
      align: "center",
      headerAlign: "center",
      headerName: "森田神経質",
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      width: 130,
    },
    {
      field: "2",
      align: "center",
      headerAlign: "center",
      headerName: "対人恐怖",
      width: 93,
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      headerClassName: "td_ninteen_1 mail_member_header_background",
    },
    {
      field: "3",
      align: "center",
      headerAlign: "center",
      headerName: "パニック",
      width: 135,
      //   flex:1,

      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
    {
      field: "4",
      align: "center",
      headerAlign: "center",
      headerName: "うつ病",
      width: 135,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
    {
      field: "5",
      headerName: "強迫性障害",
      headerAlign:"center",
      align:'center',
      width: 112,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
    {
      field: "subtotal",
      headerName: "小計",
      headerAlign:"center",
      align:'center',
      flex:1,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
  ];

  useEffect(() => {
   const currentDate= new Date()
   const formattedDate = moment(currentDate)
   const year = formattedDate.format('YYYY');
    const month = formattedDate.format('MM');
    DailyMailCountList(year,month)
    setMonth(month)
    setYear(year)
   
  }, []);

  //get the daily report 
  const DailyMailCountList = async (year:any,month:any)  => {
    if(year==""||undefined){
      year=currentyear
    }
    if(month==""||undefined){
      month =currentmonth
    }
      const formattedMonth = moment(month, 'M').format('MM');
    
    try {
     
      req = {
          "year":year,
          "month":formattedMonth,
      };
      apiData = await apiClient.post("api/checksheetReport/daily",req);
             if (apiData) {
              setData(apiData?.data?.data)
              setDatagridRow(apiData?.data?.data);
             }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //handling the values on submitting the input values
  const onSubmit = (data: any) => {
    let month: any;
    let year: any;
    if (data.daily_mail_month == undefined) {
      month = currentmonth
    } else {
      month = data.daily_mail_month
    }
    if (data.daily_mail_year == undefined) {
      year = currentyear
    } else {
      year = data.daily_mail_year
    }
    DailyMailCountList( year, month)
  };
 
  //adding new total rows with the  existing rows
  const setDatagridRow=(reportdata:any)=>{
    
      if(reportdata){
        const totals:any = {};
        columns.forEach((column) => {
          const field = column.field;
          if (field !== 'dt') {
            // Exclude the 'id' column from calculation
            const total = reportdata.reduce((accumulator:any, row:any) => accumulator + row[field], 0);
            totals[field] = total;
          }
        });
         setColumnTotals(totals);
        const updatedRows:any = [...reportdata, createTotalRow(totals)];
        setRows(updatedRows);
      }
  }
// Function to create a new row for displaying the column totals
  const createTotalRow = (totals:any) => {
    const totalRow:any = {  dt: '合計' };
    columns.forEach((column) => {
      const field = column.field;
      if (field !== 'dt') {
        totalRow[field] = totals[field];
      }
    });
    return totalRow;
  };
   // Check if the row ID matches the last row's ID
   const isLastRow = (params:any) => {
    return params.id === "合計";
  };

  //style for datagrid rows
  const getRowClassName = (params: any) => {
    if (isLastRow(params)) {
      // Return a class name for the last row
      return 'checkCell-list-bg-total';
    }
     return params.indexRelativeToCurrentPage % 2 === 0
    ? "checkCell-list-bg1"
    : "checkCell-list-bg2";
  };

  //csv download of the dailyreport based on month and year
  const DownloadCSV=async()=>{
    const  data =getValues();
    let month:any;
    let year:any;
     if(data.daily_mail_month==undefined){
         month=currentmonth
     }else{
         month= data.daily_mail_month
     }
     if(data.daily_mail_year==undefined){
       year=currentyear
     }else{
       year= data.daily_mail_year
     }
   const formattedMonth = moment(month, 'M').format('MM');
   const datarequest={
    month:formattedMonth,
    year :year,
   }
   try {
    const currentDate = getCurrentDateTimevalue()
    const apiData = await apiClient.post('api/export/dailyDownload', datarequest, {});
    if (apiData) {
        downloadFile(apiData.data, `report${currentDate}`, 'text/csv')
    }
} catch (error: any) {
    if (error.response && error.response.status === 403) {
        console.log("403 error occurred");
    } else {
        console.log("Error occurred:", error);
    }
}
  }

  //converting the api result to csv format
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
  return (
    <Box>
      <Grid container xs={12} spacing={1} padding={1}>
        <Grid item xs={3}  spacing={2}>
          <LeftPanChecksheet />
        </Grid>
        <Grid item xs={9}>
          <CheckSheetHeader
            label="	
B-1. メール相談件数の日別レポート"
          />
          <Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid className="hr"></Grid>
              <Grid className="content-row">
                <label className="black pad-left">年:</label>
                <Grid className="pad-left"></Grid>
                <Controller
                  control={control}
                  // defaultValue={defaultValue}
                  name={"daily_mail_year"}
                  render={({ field }) => (
                    <>
                      <select {...field} className="pad-left">
                      <option value={currentyear}>{currentyear}</option>
                        {year.map((year) => (
                          <option key={year.id} value={year.label}>
                            {year.label}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                />

                <label className="black pad-left">月 :</label>
                <Grid className="pad-left"></Grid>
                <Controller
                  control={control}
                  // defaultValue={defaultValue}
                  name={"daily_mail_month"}
                  render={({ field }) => (
                    <>
                      <select {...field} className="pad-left">
                      <option value={currentmonth}>{currentmonth}</option>
                        {month.map((month) => (
                          <option key={month.id} value={month.label}>
                            {month.label}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                />

                <Grid className="pad-left"></Grid>
                <Grid className="pad-left"></Grid>
                <input type={"submit"} value="検索"></input>
                
                <Grid className="pad-left"></Grid>
                <Grid className="pad-left"></Grid>
                <input type={"button"} value="CSV" onClick={()=>DownloadCSV()}></input>
              </Grid>
            </form>
            <Grid className="hr"></Grid>
            <Grid className="hr"></Grid>
            <Grid xs={10}>
            <DataGrid
                columns={columns}
                rows={rows ? rows  : []}
                getRowClassName={getRowClassName}
                disableColumnMenu={true}
                autoHeight
                hideFooter
                hideFooterSelectedRowCount
                rowHeight={30}
                getRowId={(rows) => rows ? rows.dt : ""}
                columnHeaderHeight={50}
              />

              <Grid className="hr"></Grid>
            </Grid>
            <Grid className="hr"></Grid>
            <Grid className="hr"></Grid>

          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DailyEmail;
