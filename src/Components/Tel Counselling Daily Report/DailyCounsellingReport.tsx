import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid } from "@mui/material";
import moment from "moment";
import LeftPanChecksheet from "../Check Sheet Mail/LeftPanChecksheet";
import CheckSheetHeader from "../Check Sheet Mail/Common/CheckSheetHeader";
import year from "../Check Sheet Mail/Common/Year";
import month from "../Check Sheet Mail/Common/Month";
import apiClient from "../../API/API-client";
import { downloadFile } from "../Helper/TelCounselingHelper";
import { getCurrentDateTimevalue } from "../Common/Date_conversion";

const DailyCounsellingReport = () => {
  const { handleSubmit, control, getValues } = useForm();
  const [rows, setRows] = useState([]);
  const [currentmonth, setMonth] = useState<any>();
  const [currentyear, setYear] = useState<any>();

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
          return moment(dtValue).format("YY/M/D");
        } else {
          return null;
        }
      },
    },
    {
      field: "moritaTherapy",
      align: "center",
      headerAlign: "center",
      headerName: "森田療法",
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      flex: 1,
    },
    {
      field: "medicalInstitutions",
      align: "center",
      headerAlign: "center",
      headerName: "医療機関",
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      flex: 1,
    },
    {
      field: "discoveryParty",
      align: "center",
      headerAlign: "center",
      headerName: "発見会",
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      flex: 1,
    },
    {
      field: "experienceForum",
      align: "center",
      headerAlign: "center",
      headerName: "体験フォーラム",
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      flex: 1,
    },
    {
      field: "booksVideos",
      align: "center",
      headerAlign: "center",
      headerName: "書籍動画",
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      flex: 1,
    },
    {
      field: "otherTreatments",
      align: "center",
      headerAlign: "center",
      headerName: "他治療法",
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      flex: 1,
    },
    {
      field: "others",
      headerName: "その他",
      headerAlign: "center",
      align: "center",
      flex: 1,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
    {
      field: "subtotal",
      headerName: "合計",
      headerAlign: "center",
      align: "center",
      flex: 1,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
  ];

  const initialize = () => {
    const currentDate = new Date();
    const formattedDate = moment(currentDate);
    const year = formattedDate.format("YYYY");
    const month = formattedDate.format("MM");
    fetchCounsellingReport(year, month);
    setMonth(month);
    setYear(year);
  };

  useEffect(() => {
    initialize();
  }, []);

  const fetchCounsellingReport = async (year: any, month: any) => {
    year = year || currentyear;
    month = month || currentmonth;
    const formattedMonth = moment(month, "M").format("MM");

    try {
      const req = {
        year,
        month: formattedMonth,
      };
      const apiData = await apiClient.post("/api/telcounselling/counsellingReport", req);
      if (apiData) {
        setDatagridRow(apiData?.data?.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmit = (data: any) => {
    let month = data.report_month ? data.report_month : currentmonth;
    let year = data.report_year ? data.report_year : currentyear;
    fetchCounsellingReport(year, month);
  };

  const setDatagridRow = (reportData: any) => {
    if (reportData) {
      const totals: any = {};
      columns.forEach((column) => {
        const field = column.field;
        if (field !== "dt") {
          const total = reportData.reduce(
            (accumulator: any, row: any) => accumulator + (row[field] || 0),
            0
          );
          totals[field] = total;
        }
      });

      const totalRow = createTotalRow(totals);
      const ratioRow = createRatioRow(totals);

      const updatedRows: any = [...reportData, totalRow, ratioRow];
      setRows(updatedRows);
    }
  };

  const createTotalRow = (totals: any) => {
    const totalRow: any = { dt: "合計" };
    columns.forEach((column) => {
      const field = column.field;
      if (field !== "dt") {
        totalRow[field] = totals[field];
      }
    });
    return totalRow;
  };

  const createRatioRow = (totals: any) => {
    const ratioRow: any = { dt: "割合" };
    const grandTotal = totals["subtotal"];
    columns.forEach((column) => {
      const field = column.field;
      if (field !== "dt") {
        ratioRow[field] =
          grandTotal > 0 ? ((totals[field] / grandTotal) * 100).toFixed(2) + "%" : "0%";
      }
    });
    return ratioRow;
  };

  const isLastRow = (params: any) => params.id === "合計";

  const getRowClassName = (params: any) => {
    if (isLastRow(params)) {
      return "checkCell-list-bg-total";
    }
    return params.indexRelativeToCurrentPage % 2 === 0
      ? "checkCell-list-bg1"
      : "checkCell-list-bg2";
  };

  const DownloadCSV = async () => {
    const data = getValues();
    let month = data.report_month ? data.report_month : currentmonth;
    let year = data.report_year ? data.report_year : currentyear;
    const formattedMonth = moment(month, "M").format("MM");
    const datarequest = {
      month: formattedMonth,
      year: year,
    };
    try {
      const currentDate = getCurrentDateTimevalue();
      const apiData = await apiClient.post("/api/export/counsellingReportDownload", datarequest, {});
      if (apiData) {
        downloadFile(apiData.data, `report${currentDate}`, "text/csv");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <Box>
      <Grid container xs={12} spacing={1} padding={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanChecksheet />
        </Grid>
        <Grid item xs={9}>
          <CheckSheetHeader
            label="	
            D. 月別属性別レポート"
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
                  // defaultValue={defaultValue}
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
                <label className="black pad-left check_date">月 :</label>
                <Grid className="pad-left"></Grid>
                <Controller
                  control={control}
                  // defaultValue={defaultValue}
                  name={"report_month"}
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
                <Grid className="pad-left"></Grid>
                <input type={"submit"} value="検索"></input>
                <Grid className="pad-left"></Grid>
                <Grid className="pad-left"></Grid>
                <Grid className="pad-left"></Grid>
                <input
                  type={"button"}
                  value="CSV"
                  onClick={() => DownloadCSV()}
                ></input>
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
                getRowId={(rows) => (rows ? rows.dt : "")}
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

export default DailyCounsellingReport;
