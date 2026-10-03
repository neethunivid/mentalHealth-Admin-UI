import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import LeftPanChecksheet from "../../Check Sheet Mail/LeftPanChecksheet";
import CheckSheetHeader from "../Common/CheckSheetHeader";
import year from "../Common/Year";
import moment from "moment";
import apiClient from "../../../API/API-client";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Grid,
} from "@mui/material";
import CheckSheettype from "../Common/CheckSheetTypes";
import { getCurrentDateTimevalue } from "../../Common/Date_conversion";


const MonthlyReportCheckSheet = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  let req: any;
  let apiData: any;
  const [columnTotals, setColumnTotals] = useState<any>({});
  const [rows, setRows] = useState<any>([]);
  const [reportdata, setData] = useState<any>([])
  const [lastRowIndex, setLastRowIndex] = useState()
  const [currentmonth, setMonth] = useState<any>()
  const [currentyear, setYear] = useState<any>()
  const [checksheetId, setChecksheetId] = useState<any>()

  const columns: GridColDef[] = [
    {
      field: "date",
      align: "center",
      headerAlign: "center",
      headerName: "",
      width: 106,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        const dtValue = params?.row?.date;
        if (dtValue === "合計") {
          return dtValue;
        }
        if (dtValue) {
          return moment(dtValue, "YYYY-MM-DD").isValid() ? moment(dtValue, "YYYY-MM-DD").format("YY/M") : "Invalid date";
        } else {
          return null;
        }
      }
    },
    {
      field: "1",
      align: "center",
      headerAlign: "center",
      headerName: "症状",
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      width: 130,
    },
    {
      field: "2",
      align: "center",
      headerAlign: "center",
      headerName: "治療方法",
      width: 93,
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      headerClassName: "td_ninteen_1 mail_member_header_background",
    },
    {
      field: "3",
      align: "center",
      headerAlign: "center",
      headerName: "治療機関",
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
      headerName: "その他",
      width: 135,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
    {
      field: "subtotal",
      headerName: "小計",
      headerAlign:"center",
      align:"center",
       flex:1,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
  ];

  // const getRowClassName = (params: any) => {
  //   return params.indexRelativeToCurrentPage % 2 === 0
  //     ? "checkCell-list-bg1"
  //     : "checkCell-list-bg2";
  // };
  useEffect(() => {
    const currentDate = new Date()
    const formattedDate = moment(currentDate)
    const year = formattedDate.format('YYYY');
    MonthlyCountList(year, 1)
    setYear(year)

  }, []);

  const MonthlyCountList = async ( year: any, checksheetid: any) => {
    if (year == "" || undefined) {
      year = currentyear
    }
    try {

      req = {
        "year": year,
        checkType: checksheetid
      };
      apiData = await apiClient.post("api/checksheetReport/monthlyChecksheet", req);
      if (apiData) {
        setData(apiData?.data?.data)
        setDatagridRow(apiData?.data?.data);
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  //handling the submitted input values
  const onSubmit = (data: any) => {
    let year: any;
    if (data.daily_mail_year == undefined) {
      year = currentyear
    } else {
      year = data.daily_mail_year
    }
    const checksheet = getCheckSheetId(data);
    MonthlyCountList(year, checksheet)
  };

 //to get checksheet id value of the selected checksheet type
  const getCheckSheetId = (Data: any) => {
    if (Data.checksheettype) {
      const foundItem = CheckSheettype.find((item: any) => item.label === Data.checksheettype);
      if (foundItem) {
        return foundItem.id;
      }
    }
    return null;
  }

  //creating new  total rows along with existing datagrid rows
  const setDatagridRow = (reportdata: any) => {

    if (reportdata) {
      const totals: any = {};
      columns.forEach((column) => {
        const field = column.field;
        if (field !== 'date') {
          // Exclude the date field 'dt' column from calculation
          const total = reportdata.reduce((accumulator: any, row: any) => accumulator + row[field], 0);
          totals[field] = total;
        }
      });
      setColumnTotals(totals);
      const updatedRows: any = [...reportdata, createTotalRow(totals)];
      setRows(updatedRows);
    }
  }
  // Function to create a new row for displaying the column totals
  const createTotalRow = (totals: any) => {
    const totalRow: any = { date: '合計'};
    columns.forEach((column) => {
      const field = column.field;
      if (field !== 'date') {
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

  //download the csv format of the monthly report of checksheet based on month and year 
  const DownloadCSV = async () => {
    const data = getValues();
    const checksheet = getCheckSheetId(data);
    let year: any;
    if (data.daily_mail_year == undefined) {
      year = currentyear
    } else {
      year = data.daily_mail_year
    }
    const datarequest = {
      year: year,
      checkType: checksheet
    }
    try {
      const currentDate = getCurrentDateTimevalue()
      const apiData = await apiClient.post('api/export/montlyByChecksheetDownload', datarequest, {});
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
 
  return (
    <Box>
      <Grid container xs={12} spacing={1} padding={1}>
        <Grid item xs={3}  spacing={2}>
          <LeftPanChecksheet />
        </Grid>
        <Grid item xs={9}>
          <CheckSheetHeader
            label="D. チェックシート別の月別レポート"
          />
          <Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid className="hr"></Grid>
              <Grid className="content-row">
                <label className="black pad-left">チエックシート名:</label>
                <Grid className="pad-left"></Grid>
                <Controller
                  name="checksheettype" // The name of the field in the form data object
                  control={control} // Control instance from useForm
                  defaultValue={CheckSheettype[0]?.label} // Default value for the select input // Validation rules (optional)
                  render={({ field }) => (
                    <select {...field}
                    >
                      {CheckSheettype.map((option) => (
                        <option key={option.id} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <label className="black pad-left">年:</label>
                <Grid className="pad-left"></Grid>
                <Controller
                  control={control}
                  defaultValue={currentyear}
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

                
                <Grid className="pad-left"></Grid>
                <Grid className="pad-left"></Grid>
                <input type={"submit"} value="検索"></input>
                <Grid className="pad-left"></Grid>
                <Grid className="pad-left"></Grid>
                <input type={"button"} value="CSV" onClick={() => DownloadCSV()}></input>
              </Grid>
            </form>
            <Grid className="hr"></Grid>
            <Grid className="hr"></Grid>
            <Grid xs={10}>
              <DataGrid
                columns={columns}
                rows={rows ? rows : []}
                getRowClassName={getRowClassName}
                disableColumnMenu={true}
                autoHeight
                hideFooter
                hideFooterSelectedRowCount
                rowHeight={30}
                getRowId={(rows) => rows ? rows.date : ""}
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
export default MonthlyReportCheckSheet;
