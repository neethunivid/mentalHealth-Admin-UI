import React, { useState, useEffect, useRef } from "react";
import { DataGrid, GridColDef, GridPagination } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../Redux/actions";
import "../../BBS/Mail Magazine Management/Mail Magazine Components/mail_magazine.scss";
import "../reservation.scss";
import { Grid } from "@mui/material";
import "../../../assets/css/health.css";
import LeftPanReservation from "../common/LeftPanReservation";
import ReservationHeader from "../common/ReservationHeader";
import arrowForward from "../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";

const  Reservation_cancel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.cancellation_list;
  });

 
  useEffect(() => {
    fetchCancellationList(10,1);
  }, []);
  const jsonData = [
    { value: '10', label: '10' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
    { value: '75', label: '75' },
    { value: '100', label: '100' },
   
];
const [selectedValue, setSelectedValue] = useState<any>(10);
const [currentPage, setCurrentPage] = useState(1);
const [rowsPerPage, setRowsPerPage] = useState<any>(10);
const [pagesizevalue, setpagesizevalue] = useState<any>(10);
  //get todays cancellation list
  const fetchCancellationList = (pageSize:any,pageNumber:any) => {
    try {
      
      const  req = {
        pageNumber:pageNumber,
        pageSize:pageSize
        };
     
      dispatch(fetchData("cancellation_list", "api/reservation/listTodaysCancellation", req));
      setIsLoading(false);
      if (!data || !Array.isArray(data)) {
        return null;
      } else if (!data) {
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  //column definition for datagrid
  const columns: GridColDef[] = [
    {
      field: "reservationId",
      width: 10,
      headerName: "ID",
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells",
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
        if (params.row.id) {
          return params.row.id;
        }
        return null;
      },
    },
    {
      field: "counsellingtype",
      headerName: "面接形式",
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells",
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
        if (params.row.type_of_counselling) {
          return params.row.type_of_counselling;
        }
        return null;
      },
    },
    {
      field: "date",
      headerName: "日付",
      flex:1,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells",
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
        if(params?.row?.date){
        const timestampMs = params?.row?.date;
        const timestampS = timestampMs / 1000;
        const date = new Date(timestampS * 1000);
    
        const formattedDate = date.toISOString().slice(0, 10); 
    
        return formattedDate 
      }
        else {
        return null
      }
    }
    },

    {
      field: "time",
      headerName: "時間",
      flex:1,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells",
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
      if(params.row?.timeStart&&params.row?.timeEnd){
        const time = `${params.row?.timeStart} -${params.row?.timeEnd}`; // Combine time start and timeend fields
        return (
          time
        );}
        return null
      },
    },
    {
      field: "region",
      headerName: "地域",
      flex:1,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      align: "center",
      headerAlign: "center",
      cellClassName: "gridcolumn-cells",
      
    },
    {
      field: "name",
      headerName: "担当者",
      flex:1,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      align: "center",
      headerAlign: "center",
      cellClassName: "gridcolumn-cells",
    },
    {
      field: "bookingstatus",
      headerName: "予約の状況",
      flex:1,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      align: "center",
      headerAlign: "center",
      cellClassName: "gridcolumn-cells",
      renderCell: (params: any) => {
        return(<span className="black">当日キャンセル</span>)
      },
    },
    {
      field: "age",
      headerName: "年代",
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells",
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
        if (params.row.age) {
          return params.row.age;
        }
        return null;
      },
    },
    {
      field: "resp_person",
      headerName: "ユーザ名",
      flex:1,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      align: "center",
      headerAlign: "center",
      cellClassName: "gridcolumn-cells",
      renderCell: (params: any) => {
        if (params.row?.personName) {
          return (<span>{params.row?.personName}</span>);
        }
        else{
          return null
        }
      },
    },
    {
      field: "pref",
      headerName: "都道府県",
      flex:1,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      align: "center",
      headerAlign: "center",
      cellClassName: "gridcolumn-cells",
      renderCell: (params: any) => {
        if (params?.row?.pref) {
          return (<span>{params?.row?.pref}</span>);
        }
        else 
        {
          return null
        }
      },
    },
    {
      field: "town",
      headerName: "市町村",
      flex:1,
      sortable: false,
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      align: "center",
      headerAlign: "center",
      cellClassName: "gridcolumn-cells",
      renderCell: (params: any) => {
        if (params?.row?.town) {
          return (<span>{params?.row?.town}</span>);
        }else{
          return null
        }
      },
    },
   
    
  ];

  //style for aletrnative row for datagrid
  const getRowClassName = (params: any) => {
    return params.indexRelativeToCurrentPage % 2 === 0
      ? "Reservation-Tablebody-background"
      : "Reservation-Tablebody-background";
  };

  const handleChangeRowsPerPage = (
    // event: React.ChangeEvent<HTMLInputElement>
    event: React.ChangeEvent<HTMLSelectElement>
) => {
    setRowsPerPage(event.target.value);
    setpagesizevalue(event.target.value);
    setSelectedValue(event.target.value);
    setCurrentPage(1);
    fetchCancellationList(event.target.value, 1);
};

const goToPage = (pageNumber: number) => {
  setCurrentPage(pageNumber);
  fetchCancellationList(selectedValue, pageNumber);
}
const getPageInfo = (data: any) => {
  let page: any = currentPage ? currentPage : 1;
  let offset: any = ((page - 1) * selectedValue) + 1
  let count: any = page * selectedValue;
  let totalRows: any = data && data['count'] ? data['count'] : 0;
  let totalPages: number = Math.ceil(totalRows / selectedValue);
  if (count > totalRows) {
    count = totalRows;
  }
  return (<>
    <span className='padding'>
      <span className='black'>{data?.count + "件中"}</span>
      <span className='black'>{offset}〜{count}件 </span>
      {page > 1 && <img onClick={() => { goToPage(currentPage - 1) }} src={arrowBack}></img>}
      {totalPages > page && <img onClick={() => { goToPage(currentPage + 1) }} src={arrowForward}></img>}
    </span>
  </>
  );
}
  return (
    <>
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={2}>
          <Grid className="hr" />
          <LeftPanReservation />
        </Grid>
        <Grid item xs={10} ref={gridRef}>
          <ReservationHeader label="F. 当日キャンセル" />
          <Grid className="mgtp_bt checkpad ">
            <span className="blacktxt">
	
            ★ カウンセリング相談枠
            </span>
          </Grid>

          <Grid className="hr"></Grid>

          <Grid className="tpspc"></Grid>
          {data ? (
            <Grid xs={12}>
              <DataGrid
                columns={columns}
                rows={data?.data ?? []}
                getRowClassName={getRowClassName}
                disableColumnMenu={true}
                autoHeight
                hideFooter
                hideFooterSelectedRowCount
                className="custom-data-grid"
              />

              <Grid className="hr"></Grid>
              <Grid className="content-row">
                    <Grid className="p6red_bg_left size"></Grid>
                    <Grid xs={12} container className="p6red_bg_midle">
                        <Grid xs={4} className="black"></Grid>
                        <Grid xs={4} className="black">
                            <Grid
                                container
                                flexDirection={"row"}
                                justifyContent={"flex-end"}
                                alignSelf={"center"}
                                padding={1}
                            >
                                <span className="black">行の表示 </span>
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
                        <Grid xs={4}>
                        {data?.data && getPageInfo(data)}
                        </Grid>
                    </Grid>
                    <Grid className="p6red_bg_right size"></Grid>
                </Grid>

            </Grid>
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default  Reservation_cancel;
