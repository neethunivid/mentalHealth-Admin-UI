import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import { Box,Grid} from "@mui/material";
import apiClient from "../../API/API-client";
import { getCurrentDateTimevalue } from "../Common/Date_conversion";
import LeftPanChecksheet from "../Check Sheet Mail/LeftPanChecksheet";
import CheckSheetHeader from "../Check Sheet Mail/Common/CheckSheetHeader";
import year from "../Check Sheet Mail/Common/Year";
import { downloadFile } from "../../Components/Helper/TelCounselingHelper";

const MonthlyAgeReport = () => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  let req: any;
  let apiData: any;
  const [columnTotals, setColumnTotals] = useState<any>({});
  const [rows, setRows] = useState([]);
  const [reportdata, setData] = useState<any>([])
  const [currentmonth, setMonth] = useState<any>()
  const [currentyear, setYear] = useState<any>()

  /** column defintion for datagrid */
  const columns: GridColDef[] = [
    {
      field: "dt",
      align: "center",
      headerAlign: "center",
      headerName: "",
      flex: 1,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        const dtValue = params?.row?.dt;
        if (dtValue === "合計" || dtValue === "割合") {
          return dtValue;
        }
        if (dtValue) {
          return moment(dtValue).format("YY/M");
        } else {
          return null;
        }
      },
    },
    {
      field: "group10",
      align: "center",
      headerAlign: "center",
      headerName: "10代",
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      flex: 1,
    },
    {
      field: "group20",
      align: "center",
      headerAlign: "center",
      headerName: "20代",
      flex: 1,
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      headerClassName: "td_ninteen_1 mail_member_header_background",
    },
    {
      field: "group30",
      align: "center",
      headerAlign: "center",
      headerName: "30代",
      flex: 1,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
    {
      field: "group40",
      align: "center",
      headerAlign: "center",
      headerName: "40代",
      flex: 1,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
    {
      field: "group50",
      headerName: "50代",
      headerAlign: "center",
      align: 'center',
      flex: 1,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
    {
      field: "group60",
      headerName: "60代",
      headerAlign: "center",
      align: 'center',
      flex: 1,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
    {
      field: "group70",
      headerName: "70代以上",
      headerAlign: "center",
      align: 'center',
      flex: 1,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
    {
      field: "unknown",
      headerName: "不詳",
      headerAlign: "center",
      align: 'center',
      flex: 1,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
    {
      field: "subtotal",
      headerName: " 合計",
      headerAlign: "center",
      align: 'center',
      flex: 1,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },

  ];

  const initialize = () =>{
    const currentDate = new Date()
    const formattedDate = moment(currentDate)
    const year = formattedDate.format('YYYY');
    ageGroupCounts(year)
    setYear(year)
  }
  useEffect(() => {
    initialize()
  }, []);

  /** get the daily age report */ 
  const ageGroupCounts = async (year: any) => {
    try {
      req = {
        "year": year,
      };
      apiData = await apiClient.post("/api/telcounselling/ageReport", req);   
      if (apiData) {
        setData(apiData?.data?.data)
        setDatagridRow(apiData?.data?.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  /** handling the values on submitting the input values */
  const onSubmit = (data: any) => {
    let year: any = data.report_year == undefined ? currentyear : data.report_year;
    ageGroupCounts(year)
  };
  
  const setDatagridRow = (reportdata: any) => {
    if (reportdata) {
      const totals: any = {};
      columns.forEach((column) => {
        const field = column.field;
        if (field !== 'date') {
          const total = reportdata.reduce((accumulator: any, row: any) => accumulator + row[field], 0);
          totals[field] = total;
        }
      });

      const totalRow = createTotalRow(totals);
      const ratioRow = createRatioRow(totals);

      const updatedRows: any = [...reportdata, totalRow, ratioRow];
      setRows(updatedRows);
      setColumnTotals(totals); 
    }
  };
  /** Function to create a new row for displaying the column totals */
  const createTotalRow = (totals: any) => {
    const totalRow: any = { dt: '合計' };
    columns.forEach((column) => {
      const field = column.field;
      if (field !== 'dt') {
        totalRow[field] = totals[field]  ;
      }
    });
    return totalRow;
  };

  const createRatioRow = (totals: any) => {
    const ratioRow: any = { dt: '割合' };
    const grandTotal = totals["subtotal"]; 
    columns.forEach((column) => {
      const field = column.field;
      if (field !== 'dt') {
        ratioRow[field] = grandTotal > 0 ? ((totals[field] / grandTotal) * 100).toFixed(2) + "%" : "0%";
      }
    });
    return ratioRow;
  };

  /** Check if the row ID matches the last row's ID */
  const isLastRow = (params: any) => {
    return params.id === "合計";
  };

  const getRowClassName = (params: any) => {
    if (isLastRow(params)) {
      return 'checkCell-list-bg-total';
    }
    return params.indexRelativeToCurrentPage % 2 === 0
      ? "checkCell-list-bg1"
      : "checkCell-list-bg2";
  };

  /** csv download of the dailyreport based on month and year */
  const DownloadCSV = async () => {
    const data = getValues();
    let year: any = data.report_year == undefined ? currentyear : data.report_year;
    const datarequest = {
      year: year,
    }
    try {
      const currentDate = getCurrentDateTimevalue()
      const apiData = await apiClient.post('api/export/ageReportDownload', datarequest, {});
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
  return (
    <Box>
      <Grid container xs={12} spacing={1} padding={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanChecksheet />
        </Grid>
        <Grid item xs={9}>
          <CheckSheetHeader
            label="	
            F. 月別年齢別レポート"
          />
          <Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid className="hr"></Grid>
              <Grid className="content-row">
              <Grid className="pad-left"></Grid>
                <label className="black pad-left">年 :</label>
                <Grid className="pad-left"></Grid>
                <Controller
                  control={control}
                  name={"report_year"}
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
                <Grid className="pad-left"></Grid>
                <input type={"submit"} value="検索"></input>
                <Grid className="pad-left"></Grid>
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
export default MonthlyAgeReport;
