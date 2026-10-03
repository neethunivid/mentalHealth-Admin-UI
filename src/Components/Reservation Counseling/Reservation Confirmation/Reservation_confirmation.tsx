import React, { useState, useEffect, useRef } from "react";
import { DataGrid, GridColDef, GridPagination } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../Redux/actions";
import "../../BBS/Mail Magazine Management/Mail Magazine Components/mail_magazine.scss";

import "../reservation.scss";
import { Grid, Box, Button } from "@mui/material";
import "../../../assets/css/health.css";
import { useForm, Controller } from "react-hook-form";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
import arrowForward from "../../../assets/images/6th_btn_next.gif";
import ApiClient from "../../../API/API-client";
import LeftPanReservation from "../common/LeftPanReservation";
import ReservationHeader from "../common/ReservationHeader";
import {formatDateArray} from "../../Common/Date_conversion";

const Reservation_confirmation = () => {
  
  const navigate = useNavigate();
  let req: any;
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
  const [selectedValue, setSelectedValue] = useState<any>(10);
  const [pagesizevalue, setpagesizevalue] = useState<any>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const gridRef = useRef(null);// Create a ref object named 'gridRef' initialized with a value of 'null'
  const dispatch = useDispatch();
  //getting data from redux stores
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.reserveconfirm_list;
  });
  useEffect(() => {
    Confirmation_List(10,1);
  }, []);
//functioncall for confirmationlist api
  const Confirmation_List = async (pagesize: any,
    pageNumber: number = 1,
   
  ) => {
    

    try {
      
      
        req = {
      
          pageNumber: pageNumber,
          pageSize:pagesize,
        };
      
      dispatch(fetchData("reserveconfirm_list", "api/reservation/listrsvconfirmation", req));
      // Update the data state once the data is fetched
      setIsLoading(false);
      if (!data || !Array.isArray(data)) {
        return null;
      } else if (!data) {
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  //handle pagination with rows
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(event.target.value);
    setpagesizevalue(event.target.value);
    setSelectedValue(event.target.value);
    setCurrentPage(1);
    Confirmation_List(event.target.value,1);
  
  };
  //jsondata for pagination
  const jsonData = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "75", label: "75" },
    { value: "100", label: "100" }
  ];

  //defining columns of datagid
  const columns: GridColDef[] = [
    {
      field: "id",
      width: 100,
      headerName: "ID",
      flex:1,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells blacktxt",
      headerAlign: "center",
      renderCell: (params: any) => {
        if (params.row?.id) {
          return params.row?.id;
        }
        return null;
      },
    },

    {
      field: "typeofcounselling",
      width: 80,
      headerName: "面接形式",
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells blacktxt",
      headerAlign: "center",
      renderCell: (params: any) => {
        if (params.row?.type_of_counselling) {
          return params.row?.type_of_counselling;
        }
        return null;
      },
    },
    {
      field: "created_on",
      headerName: "受付日",
      width: 100,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells blacktxt",
      headerAlign: "center",
      renderCell: (params: any) => {
        if (params.row?.createdOn != null) {
          const date = formatDateArray(params.row?.createdOn);
          return date;
        }
        return null;
      },
    },

    {
      field: "reservation_region",
      headerName: "地域",
      width: 100,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells blacktxt",
      headerAlign: "center",
      renderCell: (params: any) => {
        if (params.row?.region?.name != null) {
          const region = params.row?.region?.name;
          return region;
        }
        return null;
      },
    },
    {
      field: "date",
      headerName: "予約日時",
      width: 100,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      headerAlign: "center",
      cellClassName: "gridcolumn-cells blacktxt",
      renderCell: (params: any) => {
        if (params.row?.date) {
          return formatDateArray(params.row?.date);
        }
        // Return a fallback value if the property is not available
        return null;
      },
    },
    {
      field: "time",
      headerName: "予約時間",
      width: 100,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      headerAlign: "center",
      cellClassName: "gridcolumn-cells blacktxt",
      renderCell: (params: any) => {
        if (params.row?.timeStart || params.row?.timeEnd) {
        
        return `${params.row?.timeStart}-${params.row?.timeEnd}`
      }
      return null;
    },
    },
    {
      field: "manager",
      headerName: "担当者",
      width: 120,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      headerAlign: "center",
      cellClassName: "gridcolumn-cells blacktxt",
      renderCell: (params: any) => {
        if (params.row?.respPerson) {
          return params.row?.respPerson?.name;
        }
        // Return a fallback value if the property is not available
        return null;
      },
    },
    {
      field: "status",
      headerName: "予約状況",
      width: 120,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      headerAlign: "center",
      cellClassName: "gridcolumn-cells blacktxt",
      renderCell: (params: any) => {
        if (params.row?.reservationStatus=="TEMPORARY") {
          return "仮予約";
        }
        // Return a fallback value if the property is not available
        return null;
      },
    },
    
    {
      field: "age",
      headerName: "年代",
      width: 80,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      headerAlign: "center",
      cellClassName: "gridcolumn-cells blacktxt",
      renderCell: (params: any) => {
        if (params.row?.age) {
          return params.row?.age;
        }
      
        // Return a fallback value if the property is not available
        return null;
      },
    },
    {
      field: "username",
      headerName: "ユーザ名",
      width: 100,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      headerAlign: "center",
      cellClassName: "gridcolumn-cells blacktxt",
      renderCell: (params: any) => {
        if (params.row?.reservationId?.personName) {
          return params.row.reservationId?.personName;
        }
        // Return a fallback value if the property is not available
        return null;
      },
    },
    {
      field: "pref",
      headerName: "都道府県",
      width:120,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      headerAlign: "center",
      cellClassName: "gridcolumn-cells blacktxt",
      renderCell: (params: any) => {
        if (params.row?.reservationId?.pref) {
          return params.row?.reservationId?.pref;
        }
        // Return a fallback value if the property is not available
        return null;
      },
    },
    {
      field: "town",
      headerName: "市町村",
      width: 100,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      headerAlign: "center",
      cellClassName: "gridcolumn-cells blacktxt",
      renderCell: (params: any) => {
        if (params.row?.reservationId?.town) {
          const time = params.row?.reservationId?.town;

          return time;
        }
        // Return a fallback value if the property is not available
        return null;
      },
    },
    {
      field: "update",
      headerName: "更新",
      width:150,
      sortable: false,
      headerAlign: "center",
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells",

      renderCell: (params) => {
        const handleConfirm = async () => {
          let Id = params.row.id;
          try {
            const apiData = await ApiClient.post(
              "api/reservation/confirm/" + Id,
              {}
            );
            if (apiData) {
              window.location.reload();
            }
          } catch (error:any) {
            if (error.response && error.response.status === 403) {
              console.error("403 error occurred");
            } else {
              console.error("Error occurred:", error);
            }
          }
        };
        //fuctioncall for delete 
        const deleteReservation = async () => {
          let ID = params.row.id;
          const confirmed = window.confirm("予約を削除してもよろしいですか？");
          if (confirmed) {
            try {
              const apiData = await ApiClient.delete(
                "api/reservation/deleteResSlot/" +ID,
                {}
              );
              if (apiData) {
                window.location.reload();
              }
            } catch (error:any) {
              if (error.response && error.response.status === 403) {
                console.log("403 error occurred");
              } else {
                console.log("Error occurred:", error);
              }
            }
          }
        };

        return (
          <Grid spacing={2} className="text_grid ">
       

            <div className='Removetext-underline' onClick={deleteReservation}>予約を削除</div>&nbsp;&nbsp;
            <div className='Removetext-underline' onClick={handleConfirm}>確認</div>
           
          </Grid>
        );
      },
    },
  ];
  //pagination
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    Confirmation_List(selectedValue,pageNumber)
  
  };
  const getPageInfo = (data: any) => {
    let page: any = currentPage ? currentPage : 1;
    let offset: any = (page - 1) * selectedValue + 1;
    let count: any = page * selectedValue;
    let totalRows: any = data && data["count"] ? data["count"] : 0;
    let totalPages: number = Math.ceil(totalRows / selectedValue);
    if (count > totalRows) {
      count = totalRows;
    }
    return (
      <>
        <span className="padding">
          <span className="black">{data?.count + "件中"}</span>
          <span className="black">
            {offset}〜{count}件{" "}
          </span>
          {page > 1 && (
            <img
              onClick={() => {
                goToPage(currentPage - 1);
              }}
              src={arrowBack}
            ></img>
          )}
          {totalPages > page && (
            <img
              onClick={() => {
                goToPage(currentPage + 1);
              }}
              src={arrowForward}
            ></img>
          )}
        </span>
      </>
    );
  };
  //giving styles for alternative rows
  const getRowClassName = (params: any) => {
    return params.indexRelativeToCurrentPage % 2 === 0
      ? "Reservation-Tablebody-background"
      : "Reservation-Tablebody-background";
  };
  

  
  

  return (
    <>
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={2}>
          <Grid className="hr" />
          <LeftPanReservation />
        </Grid>
        <Grid item xs={10} ref={gridRef}>
          <ReservationHeader label="A. 予約の確認" />
          <Grid className="mgtp_bt checkpad ">
            <span className="blacktxt">
              ★
              予約内容でよければ確認をクリックして予約完了メールを送信して下さい。
            </span>
          </Grid>

          <Grid className="hr"></Grid>
          {data && data.data ? (
            <Grid>
            <Grid xs={12}>
              <DataGrid
                columns={columns}
                rows={data?.data?? []}
                getRowClassName={getRowClassName}
                disableColumnMenu={true}
                autoHeight
                hideFooter
                hideFooterSelectedRowCount
                className="custom-data-grid"
                rowHeight={30} 
                columnHeaderHeight={30}
              />

              <Grid className="hr"></Grid>
            </Grid>
            <Grid className="content-row">
              <Grid className="p6red_bg_left size"></Grid>
              <Grid xs={12} container className="p6red_bg_midle">
                <Grid xs={4} className="black"></Grid>
                <Grid xs={4} className="black">
                  <Grid
                    container
                    flexDirection={"row"}
                    justifyContent={"center"}
                    alignSelf={"center"}
                    padding={1}
                  >
                    <span className="black">列を表示</span>
                    <select
                      value={selectedValue}
                      onChange={handleChangeRowsPerPage}
                    >
                      defaultValue={jsonData[0].label}
                      {jsonData.map((option) => (
                        <option key={option.value} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <Grid></Grid>
                  </Grid>
                </Grid>
                <Grid xs={4}>{data?.data && getPageInfo(data)}</Grid>
              </Grid>
              <Grid className="p6red_bg_right size"></Grid>
            </Grid></Grid>
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Reservation_confirmation;
