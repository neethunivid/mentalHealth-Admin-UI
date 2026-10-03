import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../../Redux/actions";
import "../../../BBS/MemberData/member.scss";
import "../../../BBS/Mail Magazine Management/Mail Magazine Components/mail_magazine.scss";
import { Grid, Button } from "@mui/material";
import LeftPanBBS from "../../../Common/LeftPanBBS";
import MailMagazineMemberlistHeader from "../Mail Magazine Components/MailMagazineMemberlistHeader";
import deletebtn from "../../../../assets/images/btn_delete_new.gif";
import editbtn from "../../../../assets/images/btn_edit2_new.gif";

import apiClient from "../../../../API/API-client";
import ListMailMagThemeHeader from "./componets/ListMailMagThemeHeader";
import { formatDateTimeArray } from "../../../Common/Date_conversion";
const ListMailMagazine_Theme = () => {
  const navigate = useNavigate();
  let req: any;

  useEffect(() => {
    //clear session storage from that key
    sessionStorage.removeItem("mailmagazineTheme");
    //calling list api here
    ListmailBBSMember();
  }, []);
  const dispatch = useDispatch();

  //get redux stored data into the data variable
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.magthemelist;
  });

  //function to call the listing mail mag theme
  const ListmailBBSMember = async () => {
    try {
      req = {};

      dispatch(fetchData("magthemelist", "api/mailmag/magthemelist", req));

      if (!data || !Array.isArray(data)) {
        return null;
      } else if (!data) {
      }
    } catch (error) {
      alert(error);
    }
  };

  // columns of the dataGrid
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      headerClassName:
        "td_ninteen_1 mail_member_header_background white_headertext",
      cellClassName: "gridcolumn-cells blacktxt",
      headerAlign: "center",
      align: "center",
      sortable: false,
    },
    {
      field: "subject",
      headerName: "タイトル ",
      headerClassName:
        "sixth_bdr_left_bottom mail_member_header_background white_headertext",
      cellClassName: "gridcolumn-cells blacktxt",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: any) => {
        return params.subject;
      },
      width: 350,
      align: "center",
    },
    {
      field: "sendtime",
      headerName: "予約日時",
      width: 200,
      align: "center",
      sortable: false,
      headerClassName:
        "sixth_bdr_left_bottom mail_member_header_background white_headertext",
      cellClassName: "gridcolumn-cells blacktxt",
      headerAlign: "center",
      renderCell: (params: any) => {
        if (params.row.sendStatus == 1) {
          return "送信済み";
        } else {
          if (params.row.sendOutTime) {
            const formattedDate = formatDateTimeArray(params.row.sendOutTime);
            return formattedDate;
          }
        }

        return null;
      },
    },
    {
      field: "edit",
      headerName: "",
      flex: 1,
      align: "center",
      sortable: false,
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      cellClassName: "gridcolumn-cells",
      headerAlign: "center",
      renderCell: (params) => {
        const handleEditButtonClick = () => {
          //navigate to edit screen with params
          navigate("/emailreplytheme", { state: { data: params.row } });
        };
        const handleDeletClick = () => {
          const userConfirmation = window.confirm("削除してもよろしいですか？");
          if (userConfirmation) {
            deleteEmail(params.id);
          } else {
            // User clicked Cancel, do nothing or perform any additional actions
          }
        };
        return (
          <Grid spacing={2} className="text_grid">
            <Button onClick={handleDeletClick}>
              <img src={deletebtn} />
            </Button>
            <Button type="button" onClick={handleEditButtonClick}>
              <img src={editbtn} />
            </Button>
            <a
              className="list-mail-magazine_a"
              onClick={() => downloadMail(params.id)}
            >
              <label className="list-mail-magazine-theme_lab">download</label>
            </a>
          </Grid>
        );
      },
    },
  ];

  //each row style of dataGrid
  const getRowClassName = (params: any) => {
    return params.indexRelativeToCurrentPage % 2 === 0
      ? "mbr-list-bg1"
      : "mbr-list-bg2";
  };

  /*
  api to get data for download
   */
  const downloadMail = async (data: any) => {
    try {
      const apiData = await apiClient.get(
        `api/export/mailmagEmailDownload/${data}`
      );
      if (apiData) {
        //200 status code calling csv download function
        downloadFile(apiData.data, `mailMagDownload`, "text/csv");
      }
    } catch (error) {
      alert(error);
    }
  };

  // function helps to download file .csv format
  const downloadFile = (data: any, fileName: any, fileType: any) => {
    const blob = new Blob(["\ufeff" + data], {
      type: "text/csv;charset=UTF-8",
    });
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  //function to call delete from the list
  const deleteEmail = async (data: any) => {
    try {
      const apiData = await apiClient.delete(
        `api/mailmag/deletemailmagbody/${data}`
      );
      if (apiData) {
        //after successful deletion call this function update the ui
        ListmailBBSMember();
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanBBS />
        </Grid>
        <Grid item xs={9}>
          <ListMailMagThemeHeader
            label1="K. .テーマ別メルマガ一覧"
            label2="メルマガ管理"
          />
          <Grid className="hr"></Grid>
          <Grid>
            <span className="black">メルマガ一覧</span>
          </Grid>
          <Grid className="hr"></Grid>
          <DataGrid
            columns={columns}
            rows={data?.data ?? []}
            getRowClassName={getRowClassName}
            autoHeight
            style={{ border: "1px solid #729BCB", padding: 8 }}
            rowCount={data?.data?.length ?? 0}
            disableColumnMenu={true}
            hideFooter
            hideFooterSelectedRowCount
            rowHeight={30}
            columnHeaderHeight={30}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ListMailMagazine_Theme;
