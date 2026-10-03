import { useEffect, useState,useRef } from 'react';
import { Box,Grid, Typography} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../Redux/actions';
import { useForm, Controller } from "react-hook-form";
import { DataGrid, GridColDef} from "@mui/x-data-grid";
import calendericon from '../../assets/images/icon_calender.gif';
import options from '../BBS/Member monitor management/timedata';
import optionsdata from '../BBS/Member monitor management/minutesdata';
import reserveStatus from './common/reserveStatus';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../../assets/css/health.css";
import LeftPanReservation from '../Reservation Counseling/common/LeftPanReservation';
import apiClient from '../../API/API-client';
import { convertReactFormatDate, formatDateArray } from '../Common/Date_conversion';
import arrowBack from "../../assets/images/6th_btn_previous.gif";
import arrowForward from "../../assets/images/6th_btn_next.gif";

interface Item {
    id: any;
    name: any;
  }

const Reservationreg_cancel = () => {
  let req: any;
  const [status,setStatus] = useState('');
  const [select,setSelect] = useState('');
  const [searchData, setSearchData] = useState<any>("")
  const [items, setItems] = useState<Item[]>([]);
  const [ManagerData, setManager] = useState<Item[]>([]);
  const [message,setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any>(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
  
  const [counsellingtype, setCounsellingtype] = useState<string>("");
  const [selectedItemId, setSelectedRegionId] = useState<string>("");
//defining form1 
  const form1Methods = useForm();
  const { register: registerForm1, handleSubmit: handleSubmitForm1, control: controlForm1, reset: resetForm1, setValue: setValueForm1, formState: { errors: errorsForm1 } } = form1Methods;
  //defining form 2
  const form2Methods = useForm();
  const { register: registerForm2, handleSubmit: handleSubmitForm2, control: controlForm2, reset: resetForm2, setValue: setValueForm2, formState: { errors: errorsForm2 } } = form2Methods;
  
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedtime, setSelectedtime] = useState('');
  const [selectedMinutes, setSelectedMinutes] = useState('');
  const [selectedminutes, setSelectedminutes] = useState('');
  const [pagesizevalue, setpagesizevalue] = useState<any>(10);
  const dispatch = useDispatch();
  const type_of_counselling = {
    "values": [
      {
        "label": "Online",
        "name": "Online"
      },
      {
        "label": "面接",
        "name": "interview"
      },
     
    ]
  };
  //getting data from redux store
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.reservation_list;
  });
let listData=data?.data;
  
  const gridRef = useRef(null);
  // Function to handle status selection change
  const handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };
  // Function to handle region selection change
  const handleSelSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(event.target.value);
  };
  // Function to handle time selection change
  const handleTimeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };
  // Function to handle minutes selection change
  const handleMinutesSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMinutes(event.target.value);
  };
  // Function to handle start time selection change
  const handletimeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedtime(event.target.value);
  };
  // Function to handle end time selection change
  const handleminutesSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedminutes(event.target.value);
  };
  //on selecting region apical for getting manager
  const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;

    setSelectedRegionId(selectedId);

    try {
      const apiData = await apiClient.get("api/reservation/respperson/" + selectedId);
      if (apiData) {
        setManager(apiData.data.data);
      }
    } catch (error) {
      console.error(error, "error is getting here");
    }
  };


  //on selecting region apical for getting manager
  const handleTypeChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCounsellingtype = event.target.value;

    setCounsellingtype(selectedCounsellingtype);
  };
  
  // Ref for the date picker
  const datePickerRef = useRef<ReactDatePicker>(null);
  const datePickerRef1 = useRef<ReactDatePicker>(null);
  const datePickerRef2 = useRef<ReactDatePicker>(null);

 // Function to handle opening the date picker
  const handleButtonClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };
  // Function to handle opening the date picker 
  const handleButtonClick1 = () => {
    if (datePickerRef1.current) {
      datePickerRef1.current.setOpen(true);
    }
  };
  const handleButtonClick2 = () => {
    if (datePickerRef2.current) {
      datePickerRef2.current.setOpen(true);
    }
  };
  const handleChangeRowsPerPage = (
    // event: React.ChangeEvent<HTMLInputElement>
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(event.target.value);
    setpagesizevalue(event.target.value);
    setSelectedValue(event.target.value);
    setCurrentPage(1);
    // navigate('/memberlist', { state: { pagesize: event.target.value } });
    Reservation_list(event.target.value,1,searchData??"");
  };
  //on submit of form 1
  const onSubmitForm1 = async (data:any) => {
    if(data.timestart==data.timeend &&data.minutesstart==data.minuteend ){
      alert("Invalid time");
      return; 
    }
    
    const formattedData = {
      ...data,
      Booking_date:  convertReactFormatDate(data.Booking_date)
      
    };
    const selectedDate = formattedData?.Booking_date;
    const selectedTime = `${formattedData.timestart}:${formattedData.minutesstart}-${formattedData.timeend}:${formattedData.minuteend}`;
    const selectedManager = parseInt(formattedData.manager)??parseInt(ManagerData[0].id);

    const isConflict = listData?.some((row: any) => {
      const rowDateTime =formatDateArray(row.date);
      const rowTimeStart = row.timeStart;
      const rowTimeEnd = row.timeEnd;
      const rowManager = row.respPerson?.id;
      // Compare selectedDateTime with rowDateTime and selectedEndTime with rowTimeStart and rowTimeEnd

      // For example, check if selectedDateTime falls within the range of rowDateTime and rowTimeEnd and also the manager
      return (
        selectedDate== rowDateTime &&
        selectedTime ==`${rowTimeStart}-${rowTimeEnd}` && 
        selectedManager == rowManager
        
      );
    
    });
    if (isConflict) {
      // Display a message or take any other actions for conflicts
      setMessage('	この枠はすでに存在している。');
      return;
    } 
      // No conflict, continue with your submission logic
     setMessage('');
     
    Slotcreate(formattedData);

  };
  //onsubmit of form2
  const onSubmitForm2 = (data1:any) => {
    Reservation_list(10,1,data1);
    setSearchData(data1)
  };
  const ReservationRegion = async () => {
    try {
      const apiData = await apiClient.get("api/reservation/getregion");
      if (apiData) {
       
        setItems(apiData.data.data);
        mangerList(apiData.data.data[0].id);

      }
    } catch (error) {
   
    }
  };
  //fuction to call managerlist
  const mangerList=async(data:any)=>{
    try{
const apiData=await apiClient.get(`api/reservation/respperson/${data}`);
if(apiData){
  setManager(apiData.data.data);
}
    }catch(error){
      alert(error);
    }
  }
  
  const getCurrentFormattedDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('.')[0]; // Remove milliseconds
    return formattedDate;
  };
  
  const  Slotcreate=async(formattedData:any)=>{
    
    let regionId;
    regionId = items[0].id

    if (!formattedData.manager) {
      alert('choose manager');
    } else if (!formattedData.type_of_counselling) {
      alert('を選択してください 面接形式');
    } else
    try {
        const dataRequest: any = {
          date:formattedData.Booking_date,
          timeStart:`${formattedData.timestart}:${formattedData.minutesstart}`,
          timeEnd: `${formattedData.timeend}:${formattedData.minuteend}`,
          respPerson: parseInt(formattedData.manager)??parseInt(ManagerData[0].id),
          reservationStatus: "UNRESERVED",
          regionId:formattedData.region==''||undefined?regionId:formattedData.region,
          createdOn: getCurrentFormattedDate(),
          createdBy: "1",
          modifiedOn: getCurrentFormattedDate(),
          modifiedBy: "1",
          status:1,
          type_of_counselling:formattedData.type_of_counselling
        };
    
        const apiData = await apiClient.post("api/reservation/saveslot", dataRequest, {});
        if(apiData){
         window.location.reload();
          
        }
      
    } catch (error: any) {
        if (error.response && error.response.status === 400) {

            alert(error.response.data.error);
            console.error(error.response.data);
        } else {

            console.error("Error:", error);
        }
    }
  }

 
 
  useEffect(() => {
    ReservationRegion();
    Reservation_list(10,1,"");
  }, []);
  //reservationlist and search api
  const Reservation_list = async (pagesize: any, pageNumber: number = 1,searchData:any) => {
    try {
      if(searchData){
        
            let fromdate=searchData?.fromDate;
            let todate=searchData?.toDate;
           req = {
          
              pageNumber:pageNumber,
              pageSize:pagesize,
              ...(searchData?.reservestatus && {"status":searchData?.reservestatus}),
              ...(searchData?.selectregion && {"regionId":searchData?.selectregion}),
              ...(fromdate && {"fromDate":convertReactFormatDate(fromdate)}),
              ...(todate && {"toDate":convertReactFormatDate(todate)})
          
          };
      }else{
      req = {
        pageNumber:pageNumber,
        pageSize:pagesize
      };
    }
      dispatch(fetchData("reservation_list", "api/reservation/searchslot", req));
      if (!data || !Array.isArray(data)) {
        return null;
      } else if (!data) {
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    }
  
  function handleReset() {
    resetForm1();
  }
  const jsonData = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "75", label: "75" },
    { value: "100", label: "100" },
  ];
  const columns: GridColDef[] = [
    {
      field: "identitfication",
      headerName: "ID",
      flex:1,
      width:100,
      sortable: false,
      headerClassName: "reserveheadergridcell_blue1 ",cellClassName:"gridcolumn-cells black_text",
      align:'center',headerAlign:"center",
      renderCell: (params:any) => {
              if (params.row?.id) {
                return params.row?.id;
              }
              // Return a fallback value if the property is not available
              return null;
          },
     
    },
    {
      field: "type_of_counselling",
      headerName: "面接形式",
      width:80,
      sortable: false,
      headerClassName: "reserveheadergridcell_blue1 ",cellClassName:"gridcolumn-cells black_text",
      align:'center',headerAlign:"center",
      renderCell: (params:any) => {
              if (params.row?.type_of_counselling) {
                return params.row?.type_of_counselling;
              }
              // Return a fallback value if the property is not available
              return null;
          },
     
    },
    {
      field: "date",
      headerName: "登録日",
      sortable: false,
      headerClassName: "reserveheadergridcell_blue1",cellClassName:"gridcolumn-cells black_text",
      align:'center',headerAlign:"center",
      renderCell: (params: any) => {
        if (params.row?.date && params.row?.date?.length >= 3) {
       return formatDateArray(params?.row?.date)
      }
      return null;
    },
      width:100
    },
    {
      field: "time",
      headerName: "時間",
      sortable: false,
      headerClassName: "reserveheadergridcell_blue1",cellClassName:"gridcolumn-cells black_text",
      align:'center',headerAlign:"center",
      renderCell: (params: any) => {
        if (params.row?.timeStart || params.row?.timeEnd) {
        
        return `${params.row?.timeStart}-${params.row?.timeEnd}`
      }
      return null;
    },
      width:100
    },
    {
      field: "region",
      headerName: "地域",
      width:100,
      sortable: false,
      headerClassName: "reserveheadergridcell_blue1",cellClassName:"gridcolumn-cells black_text",
      align:'center',headerAlign:"center",
      renderCell: (params:any) => {
        if (params.row?.region?.name) {
          return params.row?.region?.name;
        }
        // Return a fallback value if the property is not available
        return null;
    },
     
    },
    {
      field: "manager",
      headerName: "担当者",
      width:120,
      sortable: false,
      headerClassName: "reserveheadergridcell_blue1",cellClassName:"gridcolumn-cells black_text",
      align:'center',headerAlign:"center",
      renderCell: (params:any) => {
        if (params.row?.respPerson) {
          return params.row?.respPerson.name;
        }
        // Return a fallback value if the property is not available
        return null;
    },
     
    },
    {
      field: "status",
      headerName: "予約状況",
      width:120,
      sortable: false,
      headerClassName: "reserveheadergridcell_blue1",cellClassName:"gridcolumn-cells black_text",
      align:'center',headerAlign:"center",
      renderCell: (params:any) => {
        if (params.row?.reservationStatus==="RESERVED") {
          return "予約済み";
        }
       else if (params.row?.reservationStatus==="UNRESERVED") {
          return "空き";
        }
        else if (params.row?.reservationStatus==="TEMPORARY") {
          return "仮予約";
        }else if(params.row?.reservationStatus==="CANCELLED"){
            return '空き';
       
        }else {
          return null;
        }
    },
     
    },
    {
      field: "username",
      headerName: "	ユーザ名",
      width:100,
      sortable: false,
      headerClassName: "reserveheadergridcell_blue1",cellClassName:"gridcolumn-cells black_text",
      align:'center',headerAlign:"center",
      renderCell: (params:any) => {
        //here 'cancelled condition added to avoid show name,pref,munci etc '
        if (params.row?.reservationId?.personName&&params.row?.reservationStatus!='CANCELLED') {
          return params.row?.reservationId?.personName;
        }
        // Return a fallback value if the property is not available
        return null;
    },
     
    },
    {
      field: "prefecture",
      headerName: "都道府県	",
      width:120,
      sortable: false,
      headerClassName: "reserveheadergridcell_blue1",cellClassName:"gridcolumn-cells black_text",
      align:'center',headerAlign:"center",
      renderCell: (params:any) => {
        if (params.row?.reservationId?.pref&&params.row?.reservationStatus!='CANCELLED') {
          return params.row?.reservationId?.pref;
        }
        // Return a fallback value if the property is not available
        return null;
    },
     
    },
   
    {
      field: "muncipality",
      headerName: "市町村",
      width:100,
      sortable: false,
      headerClassName: "reserveheadergridcell_blue1",cellClassName:"gridcolumn-cells black_text",
      align:'center',headerAlign:"center",
      renderCell: (params: any) => {
        if (params.row?.reservationId?.town!==null&&params.row?.reservationStatus!='CANCELLED') {
        return params.row?.reservationId?.town;
        }
        return null;
      },
    },
    {
      field: "update",
      headerName: "更新",
      width:150,
      sortable: false,
      headerClassName: "reserveheadergridcell_blue1",headerAlign:"center",cellClassName:"gridcolumn-cells",
      renderCell: (params:any) => {
        const handleDelete = async() => {
          let Id=params.row?.id;
          const confirmed = window.confirm('枠を削除してもよろしいですか?');
          if (confirmed) {
            try {
              const apiData =await apiClient.delete('api/reservation/deleteEmptySlot/' +Id , {});
              if (apiData) {
                window.location.reload();
              }
              
            } 
           catch (error: any) {
              if (error.response && error.response.status === 403) {
                  console.error("403 error occurred");
              } else {
                  console.error("Error occurred:", error);
              }
          }
          }

        }
        const handleCancel = async() => {
          let cancelId=params.row?.id;
          const confirmed = window.confirm('キャンセルしますか?');
          if (confirmed) {
            try {
              const apiData =await apiClient.post('api/reservation/cancelResSlot/' +cancelId , {});
              if (apiData) {
                window.location.reload();
              }
              
            } 
           catch (error: any) {
              if (error.response && error.response.status === 403) {
                  console.error("403 error occurred");
              } else {
                  console.error("Error occurred:", error);
              }
          }
          }

        }
        return(
          <>
       <div onClick={handleDelete} className='Removetext-underline'>枠を削除 </div>
       {params.row?.reservationStatus === "RESERVED" || params.row?.reservationStatus === "TEMPORARY" ? 
       <div onClick={handleCancel}  className='Removetext-underline registraion_counselors_padding'> キャンセル</div>
       : null}</>
        );
    },
  },
];


const getRowClassName = (params: any) => {
  const data1 = data?.data;
  const maxId = Math.max(...data1.map((row: any) => row.id));

  return params.row.id === maxId || params.row?.reservationStatus == "CANCELLED"
    ? "reserlist-list-bgpink"
    : "reserve-list-bgblue";
};
const goToPage = (pageNumber: number) => {
  setCurrentPage(pageNumber);
  Reservation_list(selectedValue, pageNumber,searchData??"");
}
//pagination
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
return(
  
  <Grid container xs={12}  spacing={1} padding={1}>
    <Grid item xs={2} spacing={2}>
      <LeftPanReservation/>
    </Grid>
    <Grid item xs={10}>
      
        <Box className='p2red_bg_left'></Box>
        <Box className='p2red_bg_midle'>
          <Grid justifyContent={'space-between'}>
            <span className='verdana_big'>C. 予約の登録・キャンセル・削除</span>
          </Grid>
        </Box><br/>
        <span className='black mglft'>★ 無料カウンセリングの予約を追加する</span>
        <Grid className="hr"></Grid>
       
        <Grid>
        <form name="Reservecreate" id="Reservationcreate1" onSubmit={form1Methods.handleSubmit(onSubmitForm1)}>
         <Grid className="middle_table">
  
         <Grid className="tpspc_1"></Grid>
         <Grid item xs={6} className='mg_lft'>{message && <Typography className="Reservation_red_font">{message}</Typography>}</Grid>
  <Grid container xs={12} className='text_grid'>
  
  
    <Grid item xs={6}>
      <p className="black mg_lft">無料カウンセリングの予約</p>
    </Grid>
    <Grid item xs={6} className='text_grid'>
      <Controller
        control={controlForm1}
        name="Booking_date"
        render={({ field }) => (
          <ReactDatePicker
            {...field}
            ref={datePickerRef}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat="yyyy-MM-dd"
            className="bdr_text"
          />
        )}
      />
      <img className='bg_white'
        src={calendericon}
        alt="Calendar"
        width={14}
        height={14}
        onClick={handleButtonClick}
        
      /> 
    </Grid> </Grid>
    <Grid className='hr'></Grid>
    <Grid container xs={12} className='text_grid'>
    <Grid className="tpspc_1"></Grid>


    <Grid container xs={12} className='text_grid'>
  <Grid className="tpspc_1"></Grid>
    <Grid item xs={6}>
      <span className='black mg_lft'>面接形式</span><Grid/></Grid>
    <Grid item xs={6}>
    <select {...registerForm1('type_of_counselling')} onChange={handleTypeChange}>
  {type_of_counselling?.values.map((item: any) => (
    <option key={item.id} value={item.name}>
      {item.label}
    </option>
  ))}
</select>
</Grid></Grid>


    <Grid item xs={6}>
      <span className='black mg_lft'>開始時間</span></Grid>
      <Grid item xs={1}>
        <select id="time" {...registerForm1("timestart")} onChange={handletimeSelect}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="black">時</span></Grid>
      <Grid item xs={5}>
        <select
          id="minutes"
          {...registerForm1("minutesstart")}
          onChange={handleminutesSelect}>
          {optionsdata.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="black">分</span></Grid></Grid>
        <Grid className='hr'></Grid>   
    <Grid container xs={12} className='text_grid'>
    <Grid className="tpspc_1"></Grid>
    
    <Grid item xs={6}>
      <span className='black mg_lft'>終了時間</span></Grid>
      <Grid item xs={1}>
        <select id="time" {...registerForm1("timeend")} onChange={handleTimeSelect}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="black">時</span></Grid>
      <Grid item xs={5}>
        <select
          id="minutes"
          {...registerForm1("minuteend")}
          onChange={handleMinutesSelect}
        >
          {optionsdata.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="black">分</span></Grid></Grid>
  <Grid container xs={12} className='text_grid'>
  <Grid className="tpspc_1"></Grid>
    <Grid item xs={6}>
      <span className='black mg_lft'>地域</span><Grid/></Grid>
    <Grid item xs={6}>
    <select {...registerForm1('region')} onChange={handleSelectChange}>
  {/* <option value="">選択</option> */}
  {items.map((item: any) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ))}
</select>
</Grid></Grid>
  


    <Grid container xs={12} className='text_grid'>
    <Grid className="tpspc_1"></Grid>
    <Grid item xs={6}>
      <span className='black mg_lft'>担当者</span></Grid>
      <Grid item xs={6}>
      <Controller
          control={controlForm1}
          name="manager"
          render={({ field }) => (
            <select {...field}>
            <option value="">選択</option>
            {ManagerData.map((manager: any) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </select>
          )}/></Grid></Grid></Grid><br/>
  <Grid container xs={12} className=' btn_align_centre'>
    
    <button type='submit' className='reservation_formSubmitButton'>保存する</button> 
      <Grid className='div_width'></Grid>
    <button type='reset' className='reservation_formSubmitButton' onClick={handleReset}>リセットする</button>
  </Grid></form></Grid>
<br/><br/><br/>
<form name="Resvationsearch" id="reservationsearch" onSubmit={form2Methods.handleSubmit(onSubmitForm2)}>
<Grid container xs={12} className='text_grid'>
            <span className="blacktxt mglft mg_lftrgt">日付</span>
            <div>
            <Controller
        control={controlForm2}
        name="fromDate"
        render={({ field }) => (
          <ReactDatePicker
            {...field}
            ref={datePickerRef1}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat="yyyy-MM-dd"
            className="bdr_text"
          />
        )}
      />
      <img className='bg_white'
        src={calendericon}
        alt="Calendar"
        width={14}
        height={14}
        onClick={handleButtonClick1}
        
      /> </div>
      <span className=' blacktxt mg_lftrgt1'>~</span>
      <div>
               <Controller
        control={controlForm2}
        name="toDate"
        render={({ field }) => (
          <ReactDatePicker
            {...field}
            ref={datePickerRef2}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat="yyyy-MM-dd"
            className="bdr_text"
          />
        )}
      />
      <img className='bg_white'
        src={calendericon}
        alt="Calendar"
        width={14}
        height={14}
        onClick={handleButtonClick2}
        
      /> </div>
                <span className='blacktxt mg_lftrgt1'>予約状況:</span>&nbsp;
                <select  {...registerForm2("reservestatus")} onChange={handleStatusSelect}>
                <option value="">選択</option>
                {reserveStatus.map((status:any) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
                </select>&nbsp;
                <span className='blacktxt mg_lftrgt1'>地域:</span>&nbsp;
                <select  {...registerForm2("selectregion")} onChange={handleSelSelect}>
                <option value="">選択</option>
  {items.map((item: any) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ))}
              </select>&nbsp;
              <button type="submit"  name="btn" value="検索"  className=''>検索</button>
      </Grid></form><Grid>
        <Grid><br /><br />
          <span className='black'>★ カウンセリング相談枠</span><br/>
        </Grid></Grid>
        <Grid className='hr'></Grid>
        <DataGrid
            columns={columns}
            rows={data?.data??[]}
            getRowClassName={getRowClassName}
            disableColumnMenu={true}
            autoHeight
            hideFooter
            hideFooterSelectedRowCount
           rowHeight={30} 
           columnHeaderHeight={30}
           disableRowSelectionOnClick={true}
          />
           <Grid className='hr'></Grid>
              <Grid container className="content-row">
                <Grid className="p6red_bg_left"></Grid>
            <Grid xs={12} container className=" p6red_bg_midle">
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
              <Grid xs={3}>
                {!isLoading && getPageInfo(data)}
              </Grid>
               </Grid>
              <Grid className="p6red_bg_right"></Grid>
            
            </Grid>
          
         </Grid></Grid>
);
}
export default Reservationreg_cancel;