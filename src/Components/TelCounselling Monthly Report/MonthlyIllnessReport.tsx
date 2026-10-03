import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Box,Grid} from "@mui/material";
import { getCurrentDateTimevalue } from "../Common/Date_conversion";
import apiClient from "../../API/API-client";
import moment from "moment";
import LeftPanChecksheet from "../Check Sheet Mail/LeftPanChecksheet";
import CheckSheetHeader from "../Check Sheet Mail/Common/CheckSheetHeader";
import year from "../Check Sheet Mail/Common/Year";
import { downloadFile } from "../Helper/TelCounselingHelper";

/**
 * Component to render and download the Monthly Illness Report.
 */
const MonthlyIllnessReport = () => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  let req: any;
  let apiData: any;
  const [rows, setRows] = useState([]);
  const [currentyear, setYear] = useState<any>()

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
      field: "normal",
      align: "center",
      headerAlign: "center",
      headerName: "普通",
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      flex: 1,
    },
    {
      field: "anxiety",
      align: "center",
      headerAlign: "center",
      headerName: "不安",
      flex: 1,
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      headerClassName: "td_ninteen_1 mail_member_header_background",
    },
    {
      field: "panic",
      align: "center",
      headerAlign: "center",
      headerName: "パニック",
      flex: 1,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
    {
      field: "obsessiveCompulsive",
      align: "center",
      headerAlign: "center",
      headerName: "強迫",
      flex: 1,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
    {
      field: "socialInterpersonal",
      headerName: "社交対人",
      headerAlign: "center",
      align: 'center',
      flex: 1,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
    {
      field: "moodDisorder",
      headerName: "気分障害",
      headerAlign: "center",
      align: 'center',
      flex: 1,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
    {
      field: "otherNeuroses",
      headerName: "他神経症",
      headerAlign: "center",
      align: 'center',
      flex: 1,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
    {
      field: "others",
      headerName: "その他",
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

  const initialize=()=>{
    const currentDate = new Date()
    const formattedDate = moment(currentDate)
    const year = formattedDate.format('YYYY');
    fetchIllnessReport(year)
    setYear(year)
  }
  useEffect(() => {
    initialize();
  }, []);


  /**
   * Fetches the illness report data for a given year
   * @param year
   * @param month
   */
  const fetchIllnessReport = async (year: any) => {
    year = year ? year : currentyear;
    try {
      req = {
        year,
      };
      apiData = await apiClient.post("/api/telcounselling/illnessReport", req);
      if (apiData) {
        setDatagridRow(apiData?.data?.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  /**
   * Handles form submission to fetch illness data based on the year and month
   * @param data - form data containing year and month
   */
  const onSubmit = (data: any) => {
    let year = data.report_year ? data.report_year : currentyear;
    fetchIllnessReport(year)
  };
  
  /**
   * Populates the grid with the report data and adds total and ratio rows
   * @param reportdata
   */
  const setDatagridRow = (reportdata: any) => {
    if (reportdata) {
      const totals: any = {};
      columns.forEach((column) => {
        const field = column.field;
        if (field !== 'dt') {
          const total = reportdata.reduce((accumulator: any, row: any) => {
              const value = row[field] || 0;
              return accumulator + value;
          }, 0);
          totals[field] = total;
      }
      });

      const totalRow = createTotalRow(totals);
      const ratioRow = createRatioRow(totals);

      const updatedRows: any = [...reportdata, totalRow, ratioRow];
      setRows(updatedRows);
    }
  };

  /**
   * Creates the total row for the grid based on report totals
   * @param totals
   */
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

  /**
   * Creates the ratio row for the grid by calculating the percentage for each field
   * @param totals
   */
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

  /**
   * Initiates report CSV download
   */
  const DownloadCSV = async () => {
    const data = getValues();
    let year = data.report_year ? data.report_year : currentyear;
    const datarequest = {
      year: year,
    }
    try {
      const currentDate = getCurrentDateTimevalue()
      const apiData = await apiClient.post('api/export/illnessReportDownload', datarequest, {});
      if (apiData) {
        downloadFile(apiData.data, `report${currentDate}`, 'text/csv')
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        console.error("403 error occurred");
      } else {
        console.error("Error occurred:", error);
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
            label="G.月別主訴別レポート"
          />
          <Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid className="hr"></Grid>
              <Grid className="content-row">
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
export default MonthlyIllnessReport;
