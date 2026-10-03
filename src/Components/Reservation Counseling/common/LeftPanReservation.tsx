import { Box, Grid, Link, Table, TableCell, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const LeftPanReservation = () => {
  const location = useLocation();
  useEffect(() => {});
  const isLocationActive = (path: any) => {
    return location.pathname === path;
  };
  return (
    <Grid container className="leftpan-container">
      {" "}
      <Grid item xs={12} className="first_page">
           
                <Table>
                    <TableRow>
                        <TableCell valign="bottom">
                            <Table >
                                <TableRow>
                                    <TableCell className=" height p6red_bg_left ">&nbsp;</TableCell>
                                    <TableCell className=" height p6red_bg_midle ">
                                        <span className="black-text"></span>
                                    </TableCell>
                                    <TableCell className=" height p6red_bg_right ">&nbsp;</TableCell>
                                </TableRow>
                            </Table>
                        </TableCell>
                    </TableRow>
                </Table>
            </Grid>
      <Grid item xs={12} className="gridcontainer">
        <Box className="leftmenu_bg  box-container">
          <Box className="black_left_menu">
            <Link
              href="/reservation_list_confirm_reservation"
              className={
                isLocationActive("/reservation_list_confirm_reservation") ? "active_link" : "link"
              }
            >
            	A. 予約の確認
            </Link>
            <br />
            <Link
              href="/reservationslotlist"
              className={isLocationActive("/reservationslotlist") ? "active_link" : "link"}
            >
             B. 予約の状況と予約者情報
            </Link>
            <br />
            <Link
              href="/reservationreg_cancel"
              className={isLocationActive("/reservationreg_cancel") ? "active_link" : "link"}
            >
             C. 予約の登録・キャンセル・削除
            </Link>
            <br />
            <Link
              href="/addcounselors"
              className={isLocationActive("/addcounselors") ? "active_link" : "link"}
            >
             D. カウンセラーの登録・削除
            </Link>
            <br />
            <Link
              href="/reservationlist"
              className={isLocationActive("/reservationlist") ? "active_link" : "link"}
            >
            E. 予約者の一覧とダウンロード
            </Link>
            <br />
            <Link
              href="/todays_cancellations"
              className={isLocationActive("/todays_cancellations") ? "active_link" : "link"}
            >
             F. 当日キャンセル
            </Link>
            <br />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LeftPanReservation;
