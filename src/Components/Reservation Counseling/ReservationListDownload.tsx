import { Grid} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import LeftPanReservation from './common/LeftPanReservation';
import ReservationHeader from './common/ReservationHeader';
import apiClient from "../../API/API-client";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../Redux/actions";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "../Reservation Counseling/reservation.scss"
import { checkDate, formatDateArray } from '../Common/Date_conversion';
import arrowForward from "../../assets/images/6th_btn_next.gif";
import arrowBack from "../../assets/images/6th_btn_previous.gif"

const ReservationListDownload = () => {
    let Searchclick:any
    const[seachactive,setSearchActive]=useState<any>()
    const [regionData, setRegionData] = useState<any>([])
    const [select, setSelect] = useState('');
    const [formData,setFormData]=useState<any>('')
    const {
        register,
        control,
        handleSubmit, watch, reset, getValues, setValue,
        formState: { errors },
    } = useForm();
    const batchCheckbox = watch('batchdownload');
    const downloadByDateCheckbox = watch('downloadbydate')
    const dispatch = useDispatch();
    const data = useSelector((state: any) => {
        return state?.reducer1.data?.reservation_list;
    });
    useEffect(() => {
        getRegionData()
       getReservationList(10,1,"")

    }, []);

    const pagesizeOption = [
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
    //get region list
    const getRegionData = async () => {
        try {
            const apiData = await apiClient.get('api/reservation/getregion', {});
            if (apiData) {
                setRegionData(apiData.data.data)
            }

        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    
    //column definition for datagrid
    const columns: GridColDef[] = [
        {
            field: "date",
            headerName: "希望日時",
            flex: 1,
            sortable: false,
            headerClassName: "reserveheadergridcell_blue1 ", cellClassName: "gridcolumn-cells black_text",
            align: 'center', headerAlign: "center",
            renderCell: (params: any) => {
                if (params.row?.date && params.row?.date?.length == 3) {
                    const formattedDate = formatDateArray(params.row?.date);
                    return formattedDate;
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
            field: "personName",
            headerName: "氏名",
            sortable: false,
            headerClassName: "reserveheadergridcell_blue1", cellClassName: "gridcolumn-cells black_text",
            align: 'center', headerAlign: "center",
            renderCell: (params: any) => {
                if (params.row?.reservationId?.personName) {

                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.reservationId?.personName}</div>
                }
                return null;
            },
            flex: 1
        },
        {
            field: "region",
            headerName: "領域",
            sortable: false,
            headerClassName: "reserveheadergridcell_blue1", cellClassName: "gridcolumn-cells black_text",
            align: 'center', headerAlign: "center",
            renderCell: (params: any) => {
                if (params.row?.region?.name) {

                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.region?.name}</div>
                }
                return null;
            },
            flex: 1
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
            field: "furigana",
            headerName: "ふりがな",
            flex: 1,
            sortable: false,
            headerClassName: "reserveheadergridcell_blue1", cellClassName: "gridcolumn-cells black_text",
            align: 'center', headerAlign: "center",
            renderCell: (params: any) => {
                if (params.row?.reservationId?.surname) {
                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.reservationId?.surname}</div>
                }
                return null;
            },

        },
        {
            field: "sex",
            headerName: "性別",
            flex: 1,
            sortable: false,
            headerClassName: "reserveheadergridcell_blue1", cellClassName: "gridcolumn-cells black_text",
            align: 'center', headerAlign: "center",
            renderCell: (params: any) => {
                if (params.row?.reservationId?.gender) {
                    if (params.row?.reservationId?.gender == "W") { return "女性" }
                    else {
                        return "男性"
                    }
                }
                return null;
            },

        },
        {
            field: "profession",
            headerName: "職業",
            flex: 1,
            sortable: false,
            headerClassName: "reserveheadergridcell_blue1", cellClassName: "gridcolumn-cells black_text",
            align: 'center', headerAlign: "center",
            renderCell: (params: any) => {
                if (params.row?.reservationId?.job) {
                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.reservationId?.job}</div>
                }
                return null;
            },

        },
        {
            field: "prefecture",
            headerName: "	都道府県",
            flex: 1,
            sortable: false,
            headerClassName: "reserveheadergridcell_blue1", cellClassName: "gridcolumn-cells black_text",
            align: 'center', headerAlign: "center",
            renderCell: (params: any) => {
                if (params.row?.reservationId?.pref) {
                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.reservationId?.pref}</div>
                }
                return null;
            },

        },
        {
            field: "municipality",
            headerName: "市町村	",
            flex: 1,
            sortable: false,
            headerClassName: "reserveheadergridcell_blue1", cellClassName: "gridcolumn-cells black_text",
            align: 'center', headerAlign: "center",
            renderCell: (params: any) => {
                if (params.row?.reservationId?.town) {
                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.reservationId?.town}</div>
                }
                return null;
            },

        },

        {
            field: "tel",
            headerName: "TEL",
            flex: 1,
            sortable: false,
            headerClassName: "reserveheadergridcell_blue1", cellClassName: "gridcolumn-cells black_text",
            align: 'center', headerAlign: "center",
            renderCell: (params: any) => {
                if (params.row?.reservationId?.telephone) {
                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.reservationId?.telephone}</div>
                }
                return null;
            },
        },
        {
            field: "email",
            headerName: "E mail",
            flex: 1,
            sortable: false,
            headerClassName: "reserveheadergridcell_blue1", headerAlign: "center", cellClassName: "gridcolumn-cells",
            renderCell: (params: any) => {
                if (params.row?.reservationId?.email) {
                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.reservationId?.email}</div>
                }
                return null;

            },
        },
        {
            field: "cancellationstatus",
            headerName: "当日キャンセル",
            flex: 1,
            sortable: false,
            headerClassName: "reserveheadergridcell_blue1", cellClassName: "gridcolumn-cells black_text",
            align: 'center', headerAlign: "center",
            renderCell: (params: any) => {
                if (params.row?.reservationStatus) {
                    if (params.row?.reservationStatus == "CANCELLED")
                        return "当日キャンセル";
                }
                return null;
            },
        },
    ];

    //handle the select option for region
    const handleSelSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelect(event.target.value);
    };

    //handle the  form submit action
    const onSubmit = (data: any) => {
        if (!batchCheckbox && !downloadByDateCheckbox) {
            alert("いずれかのダウンロード オプションを選択します")
            return;
        } else if (downloadByDateCheckbox && (!data.fromYear || !data.frommonth || !data.fromdate || !data.toYear || !data.tomonth || !data.todate)) {
            alert("日付を入力してください")
            return;
        }
        else if (!downloadByDateCheckbox && (data.fromYear || data.frommonth || data.fromdate || data.toYear || data.tomonth || data.todate)) {
            alert("日付フィールドが提供される場合 選択してください 希望日時別のダウンロード")
            return;
            }
          else  if (downloadByDateCheckbox&&(!(checkDate(`${data.fromYear}-${data.frommonth}-${data.fromdate}`)))) {
              alert("正しい日付形式を入力してください ");
              return;
            }
          
          else  if (downloadByDateCheckbox&&(!(checkDate(`${data.toYear}-${data.tomonth}-${data.todate}`)))) {
              alert("正しい日付形式を入力してください ");
              return;
            }
          
        else {
                if (data.submitButton === 'submitButton') {  
                    Searchclick=1;
                    setSearchActive(1)
                    setFormData(data)
                    getReservationList(10,1,data)
                }
                else {
                    downloadReservationList(data)
                }
        }
        
    };
    const formatDate = (dateString: string) => {
        if (!dateString) return "";

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    //get reservationlist
    const getReservationList = async (pagesize:any,pageNumber:number=1,data: any) => {
        let req:any;
        try {
            
            const fromDate = `${data.fromYear}-${data.frommonth}-${data.fromdate}`
            const formattedFromDate = formatDate(fromDate)
            const toDate = `${data.toYear}-${data.tomonth}-${data.todate}`
            const formattedtoDate = formatDate(toDate)
            if(Searchclick==1){
                if(batchCheckbox){
                    req = {
                        allFilter: false,
                        ...(data.selectedregion && { regionId: data.selectedregion }),
                        pageSize:pagesize,
                        pageNumber:pageNumber
                    } 
                }else{
             req = {
                allFilter: false,
                fromDate: formattedFromDate&&formattedFromDate,
                toDate: formattedtoDate&&formattedtoDate,
                ...(data.selectedregion && { regionId: data.selectedregion }),
                pageSize:pagesize,
                pageNumber:pageNumber
            }
            }
            }
            else{
             req = {
                    allFilter: true,
                    pageSize:pagesize,
                    pageNumber:pageNumber
                }
    
            }
            dispatch(fetchData("reservation_list", "api/reservation/reservationlist", req));
            if (!data || !Array.isArray(data)) {
                return null;
            } else if (!data) {
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    //styling for datagrid rows
    const getRowClassName = (params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0
            ? "Reservation-Tablebody-background"
            : "Reservation-Tablebody-background";
    };

    //download reservation list
    const downloadReservationList = async (data: any) => {
        let dataRequest: any;
        if (data.batchdownload) {
            dataRequest = {
                allFilter: true
            }
        }
        else {
            const fromDate = `${data.fromYear}-${data.frommonth}-${data.fromdate}`
            const formattedFromDate = formatDate(fromDate)
            const toDate = `${data.toYear}-${data.tomonth}-${data.todate}`
            const formattedtoDate = formatDate(toDate)
            dataRequest = {
                allFilter: false,
                fromDate: formattedFromDate,
                toDate: formattedtoDate,
                ...(data.selectedregion && { regionId: data.selectedregion }),
            }
        }


        try {
            const apiData = await apiClient.post('api/export/reservationdownload', dataRequest, {});
            if (apiData) {
                downloadFile(apiData.data, `userreservationlist`, 'text/csv')
            }
        } catch (error: any) {
            console.error("Error:",error)
        }

    }

    //convert the api result to csv format 
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

    //handle batch download checkbox
    const handleBatchdownloadChange = (value: any) => {
        setValue('batchdownload', value);
        if (value) {
            setValue('downloadbydate', false);
            setValue('fromYear',"")
            setValue('frommonth',"")
            setValue('fromdate',"")
            setValue('toYear',"")
            setValue('tomonth',"")
            setValue('todate',"")

        }
    };

    //handle download by date checkbox
    const handleDownloadbyDateChange = (value: any) => {
        setValue('downloadbydate', value);
        if (value) {
            setValue('batchdownload', false);

        }
    };

    //reset the form field values entered by the user
    const handleReset=()=>{
        reset();
    }

 //handle the pagesize selected by the user
 const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(event.target.value);
    setpagesizevalue(event.target.value);
    setSelectedValue(event.target.value);
    setCurrentPage(1);
    if(seachactive==1){
        Searchclick=1
    }
    getReservationList(event.target.value, 1,formData);
};

 //got to page based on  pagesize and pagenumber
 const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    getReservationList(selectedValue, pageNumber,formData);
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
        <Grid container xs={12} padding={1} spacing={1}>
            <Grid item xs={2} spacing={2}>
                < LeftPanReservation />
            </Grid>
            <Grid item xs={10}>
                <ReservationHeader label="E. 予約者の一覧とダウンロード" />
                <Grid className="hr"></Grid>
                <Grid item xs={12} className="history_page">
                    <Grid item xs={12} >
                        <span className='black'>
                            ★ 一括又はダウンロードしたい年月日範囲を入力して 検索又はダウンロードボタンをクリック。</span>
                    </Grid>
                    <Grid className='hr'></Grid>
                    <form name="reservationlist" onSubmit={handleSubmit(onSubmit)}>
                        <Grid item xs={12} className="table_seven" padding={3}>
                            <Grid item xs={12}>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={10}>
                                    <Grid className='content-row reservation-content-marginleft '>
                                        <input type="checkbox" value="" {...register('batchdownload')}
                                            onChange={(e) => handleBatchdownloadChange(e.target.checked)}
                                        />
                                        <span className='black reservation-list-padding' >一括ダウンロード</span>
                                    </Grid>
                                    <Grid className='content-row reservation-content-marginleft'>
                                        <input type="checkbox" value="" {...register('downloadbydate')}
                                            onChange={(e) => handleDownloadbyDateChange(e.target.checked)}
                                        />
                                        <span className='black reservation-list-padding'>希望日時別のダウンロード （日付を入力してください 　例：2008年01月01日)</span>
                                    </Grid>
                                    <Grid className='content-row reservation-list-padding'>
                                        <input type="text" className='bdr_text_medium '  {...register('fromYear')} />
                                        <label className='black reservation-date-padding'>年</label>
                                        <input type="text" className="bdr_text_small_1 "  {...register('frommonth')} />
                                        <label className='black reservation-date-padding'>月</label>
                                        <input type="text" className="bdr_text_small_1  "  {...register('fromdate')} />
                                        <label className='black reservation-date-padding'>日</label>
                                        <label className='black reservation-date-padding'>~</label>
                                        <input type="text" className='bdr_text_medium '  {...register('toYear')} />
                                        <label className='black reservation-date-padding'>年</label>
                                        <input type="text" className="bdr_text_small_1  "  {...register('tomonth')} />
                                        <label className='black reservation-date-padding'>月</label>
                                        <input type="text" className="bdr_text_small_1 "  {...register('todate')} />
                                        <label className='black reservation-date-padding'>日</label>
                                    </Grid>
                                    <Grid className="content-row reservation-list-padding">
                                        <span className='black'>領域 </span>
                                        <select  {...register("selectedregion")} onChange={handleSelSelect}>
                                            <option value="">Both</option>
                                            {regionData.map((item: any) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>

                                    </Grid>
                                    <Grid
                                                item
                                                xs={12}
                                                container
                                                display={"flex"}
                                                justifyContent={"left"}
                                                className='reservation-list-padding'
                                            >
                                                <Controller
                                                name="submitButton"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                     <>
                                                     <button className="reservation_formSubmitButton " type='submit'
                                                         onClick={() => setValue('submitButton', 'submitButton')}
                                                        {...field} >  検索
                                                    </button>
                    
                                                    <button className="reservation_formSubmitButton  reservation-content-marginleft" type='submit'
                                                        
                                                         onClick={() => setValue('submitButton', 'downloadButton')}
                                                        {...field}>ダウンロード
                                                    </button>
                                                </>
                                            )}
                                            />
                                            
                                            <button className="reservation_formSubmitButton reservation-content-marginleft" type="reset" onClick={() => handleReset()}>
                                                リセット
                                            </button>
                                        
                                            </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                    <Grid item xs={12}><span className='black'>★ 予約者の一覧</span></Grid>
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
                            getRowHeight={() => "auto"}
                            localeText={{ noRowsLabel: "結果はありません。" }}
                        />

                        <Grid className="hr"></Grid>
                        <Grid className="hr"></Grid>
            <Grid className='hr'></Grid>
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
                                    defaultValue={pagesizeOption[0].label}
                                    {pagesizeOption.map((option) => (
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
                </Grid>
            </Grid>

        </Grid>
    );
}
export default ReservationListDownload