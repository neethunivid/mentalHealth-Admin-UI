import React,{useRef,useState,useEffect} from 'react';
import '../../../assets/css/health.css';
import {Button, Grid } from '@mui/material';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import '../Common/library.scss';
import calendericon from "../../../assets/images/icon_calender.gif";
import { useForm, Controller } from "react-hook-form";
import submit from '../../../assets/images/lib_save.gif';
import deletebtn from '../../../assets/images/lib_delete.gif'
import ReactDatePicker from "react-datepicker";
import LibraryapiClient from '../../../API/LibraryAPI-client';
import Tooltip from '@mui/material/Tooltip';
import {  useLocation } from 'react-router-dom';
import { formatDateArray, formatDateString } from '../../Common/Date_conversion';
import LeftPanLibrary from '../Common/LeftPanLibrary';
import pref from '../Common/pref';
const Edit_lenderProfile = () => {
    // React hook form initialization and form state setup
    const {
        register,
        handleSubmit,
        control,
        setValue,
        setError,
        formState: { errors },
      } = useForm();
       // State variables initialization
      const [selectedDate, setSelectedDate] = useState<Date | null>(null);
      const [apiLenderdata, setLenderData] = useState<any>({})
      const [lendedBookData, setLenderBookData] = useState<any>([])
        // useRef for the date picker
    const datePickerRef = useRef<ReactDatePicker>(null);
      // Function to handle date change in the date picker
    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        setValue("date1", date);
        
      };
      // Function to handle button click to open the date picker
      const handleButtonClick = () => {
        datePickerRef.current?.setOpen(true);
      };
   // Getting ID from the location state if available
      let Id:any;
      const location = useLocation();
      if (location && location.state&& location.state.data) {

        Id = location.state.data
      }
       // Function to handle form submission
      const onSubmit = async (data: any) => {
        if (!data.name_last) {
          alert("貸出者氏名の性を入れてください");
          setError("name_last", {
              type: "required",
          });
          return
      } else if (!data.name_first) {
          alert("貸出者氏名の名を入れてください");
          setError("name_first", {
              type: "required",
          });
          return
      } else if (!data.phonetic1) {
          alert("性のふりがなを入れてください");
          setError("phonetic1", {
              type: "required",
          });
          return
      } else if (!data.phonetic2) {
          alert(" 名のふりがなを入れてください  ");
          setError("phonetic2", {
              type: "required",
          });
          return
      } else if (!data.age) {
          alert("貸出者氏名の性を入れてください");
          setError("age", {
              type: "required",
          });
          return
      } else if (!data.Zipcode) {
          alert(" 郵便番号を入れてください");
          setError("Zipcode", {
              type: "required",
          });
          return
      } else if (!data.address) {
          alert("市区群町を入れてください");
          setError("address", {
              type: "required",
          });
          return
      } else if (!data.date1) {
          alert("Please enter the date");
          setError("date1", {
              type: "required",
          });
          return
      }
      else if (!data.phone) {
        alert("電話番号を入れてください");
        setError("phone", {
            type: "required",
        });
        return
    }
    else if (!data.email) {
      alert("メールアドレスを入れてください");
      setError("email", {
          type: "required",
      });
      return
  }
  else{
    lenderUpdateApi(data);
  }
      }

    // Function to fetch lender profile data from the API based on the ID
      const lenderProfileContent=async()=>{
        try {
            
            const apiData = await LibraryapiClient.get("library/books/lenderprofile/"+Id);
            if(apiData){
              setLenderData(apiData?.data?.data?.member)
              setLenderBookData(apiData?.data?.data?.data)
              initializevalue(apiData?.data?.data?.member)
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
       // Function to initialize form values with lender data
      const initializevalue = (lenderData: any) => {
        if (lenderData?.dateRegistered) {
          const dateRegisteredString = formatDateArray(lenderData?.dateRegistered);
          // Split the date string into year, month, and day parts
          const [pyear, pmonth, pday] = dateRegisteredString.split('-').map(Number);
          // Create a JavaScript Date object
          const RegisteredparsedDate = new Date(pyear, pmonth - 1, pday);
          setValue("date1", RegisteredparsedDate);
          setSelectedDate(RegisteredparsedDate);
      }
      
    }
     // Function to delete lender profile after confirmation
    const deleteLenderProfile = async () => {
     const confirmed = window.confirm('削除してもよろしいですか？');
     if (confirmed) {
       try {
         const apiData = await LibraryapiClient.delete('library/books/deletemember/' +Id , {});
         if (apiData) {
          window.location.href = '/lenderlist';
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
      // useEffect hook to fetch lender profile data when the component mounts
      useEffect(() => {
        lenderProfileContent();
        
      }, []);
      //update lenderprofile apicall
      const lenderUpdateApi = async (dataValues:any) => {
        const confirmed = window.confirm('保存されました!');
        if (confirmed) {
        const dataRequest = {
          nameFirst:dataValues?.name_first,
          nameLast: dataValues?.name_last,
          name:`${dataValues?.name_last} ${dataValues?.name_first}`,
          name2:`${dataValues?.name_first} ${dataValues?.name_last}`,
          phonetic1: dataValues?.phonetic1,
          phonetic2: dataValues?.phonetic2,
          phoneticCom1: `${dataValues?.phonetic2} ${dataValues?.phonetic1}`,
          zip: dataValues?.Zipcode,
          state: dataValues?.state,
          address1: dataValues?.address,
          phone: dataValues?.phone,
          email: dataValues?.email,
           status: 1,
           dateRegistered: formatDateString(dataValues?.date1),
           regNo: dataValues?.memberNo,
           age: dataValues?.age,
           sex: dataValues?.sex
        };
        try { 
          const apiData=await LibraryapiClient.put("library/books/editlenderregistration/"+Id,dataRequest,{})
          if(apiData){
            //navigate to edit exsisting regiistrants csreen
              window.location.href = '/editlendersearch';
          }
    
        } catch (error) {
        alert(error);
        }
      }
      };
     // defining columns og datagrid
     const columns: GridColDef[] = [
      {
        field: 'lendingNo', headerName: '貸出No ', width: 65, headerAlign: "center",
        headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
      },
      {
        field: 'isbnCode', headerName: 'ISBN ', width: 150, headerAlign: "center",
        headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
      },
      {
        field: 'title', headerName: 'タイトル ',flex:2, headerAlign: "center",
        headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
        renderCell: (params:any) => {
          if (params.row?.title) {
           return(
             <Tooltip title={params?.row?.title}>
                 <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                   {params?.row?.title}
                 </div>
               </Tooltip>
           );
          }
          return null;
        },
      },
      {
        field: 'loandate', headerName: '貸出日 ',
        headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
        headerAlign: "center",
        renderCell: (params) => {
          if (params?.row?.lendingDay) {
            return formatDateArray(params?.row?.lendingDay)
          }
          else{
            return null
          }
         }, // Return a fallback value if the array is undefined or doesn't have enough elements
        width: 100
      },
      {
          field: 'Scheduledreturn', headerName: '返却予定 ',
          headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
          headerAlign: "center",
          renderCell: (params) => {
            if (params?.row?.dateReturn) {
              return formatDateArray(params?.row?.dateReturn)
            }
            else{
              return null
            }
           },
          width:100
        },
        {
          field: 'returnDate', headerName: '返却日  ',
          headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
          headerAlign: "center",
          renderCell: (params) => {
            if (params?.row?.returnDate) {
              return formatDateArray(params?.row?.returnDate)
            }
            else{
              return null
            }
           },
          width: 100
        },
       
      
     
    ];
    //giving colours for rows of datagrid
    const getRowClassName = (params: any) => {
      return params.indexRelativeToCurrentPage % 2 === 0
        ? "mbr-list-bg1" : "mbr-list-bg1";
    };

    return(
        <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanLibrary />
        </Grid>
        <Grid item xs={9}>
          <Grid className="content-row">
            <Grid className="p2red_bg_left"></Grid>
            <Grid className="p2red_bg_midle">
              <Grid className="top-header">
                <span className="verdana_big">B-2.貸出者プロフィールの編集（修正・削除）</span>
                <span className="verdana_big">図書室管理</span>
              </Grid>
            </Grid>
            <Grid className="p2red_bg_right"></Grid>
          </Grid>
          <Grid className='hr' />
          {apiLenderdata && apiLenderdata.id?
          <form name="Edit" id="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid className="middle_table" padding={2}>
            <Grid xs={12} flexDirection={'row'}>
          <Grid className="middle_table" xs={8}>
            <Grid className='cell_red1'>貸出者プロフィール</Grid>
            <Grid xs={12} className='text_grid padding'>
                <Grid xs={3}><label className='black'>登録No.</label></Grid>
                <Grid xs={6}>
                <Controller
          name="memberNo"
          control={control}
          defaultValue={apiLenderdata?.memberNo} // Set your initial value here if needed
          render={({ field }) => (
            <span className='black'>
              <b>{field.value}</b>
            </span>
          )}
        />
                </Grid></Grid>
            <Grid xs={12} className='text_grid padding'>
                <Grid xs={3}><label className='black'>貸出者氏名</label></Grid>
                <Grid xs={7} className='text_grid'>
                    <Grid xs={6} > <span className='blacktxt mrg_left'>姓</span>
                    <Controller
                      name="name_last"
                      control={control}
                      defaultValue={apiLenderdata?.nameLast}
                      render={({ field }) => <input {...field} className='bdr_text12'/>}
                       />
                
                    </Grid>
                   <Grid xs={6}> <span className='blacktxt mrg_left'>名</span>
                   <Controller
                      name="name_first"
                      control={control}
                      defaultValue={apiLenderdata?.nameFirst}
                      render={({ field }) => <input {...field} className='bdr_text12'/>}
                       />
                    </Grid>
                </Grid>
                <Grid xs={2}></Grid>
            </Grid>
            <Grid xs={12} className='text_grid padding'>
                <Grid xs={3}><label className='black'>ふりがな</label></Grid>
                <Grid xs={7} className='text_grid'>
                    <Grid xs={6}> <span className='blacktxt mrg_left'>姓</span>
                     <Controller
                      name="phonetic2"
                      control={control}
                      defaultValue={apiLenderdata?.phonetic2}
                      render={({ field }) => <input {...field} className='bdr_text12'/>}
                       />
                    </Grid>
                   <Grid xs={6}> <span className='blacktxt mrg_left'>名</span>
                    <Controller
                      name="phonetic1"
                      control={control}
                      defaultValue={apiLenderdata?.phonetic1}
                      render={({ field }) => <input {...field} className='bdr_text12'/>}
                       />
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} className='text_grid padding'>
                <Grid xs={3}><label className='black'>性別</label></Grid>
                <Grid xs={6}>
                <input type='radio' value={1}
                                                {...register("sex")}
                                                defaultChecked={apiLenderdata?.sex == 1} />
                                            <span className='black'> 男性 </span>
                                            <input type='radio' value={2}
                                                {...register("sex")}
                                                defaultChecked={apiLenderdata?.sex == 2}
                                            />
                                            <span className='black'>女性 </span></Grid></Grid>
             <Grid xs={12} className='text_grid padding'>
                <Grid xs={3}><label className='black'>年齢</label></Grid>
                <Grid xs={6}>
                <Controller
                      name="age"
                      control={control}
                      defaultValue={apiLenderdata?.age}
                      render={({ field }) => <input {...field} className='bdr_text12'/>}
                       />
                </Grid></Grid>
                <Grid xs={12} className='text_grid padding'>
                <Grid xs={3}><label className='black'>〒 都道府県</label></Grid>
                <Grid xs={6} className='text_grid'>
                <Controller
                      name="Zipcode"
                      control={control}
                      defaultValue={apiLenderdata?.zip}
                      render={({ field }) => <input {...field} className='bdr_text12'/>}
                       />
                <div className='mglft'>
                <Controller
                  control={control}
                  name="state"
                  defaultValue={apiLenderdata?.state }
                  render={({ field }) => (
                    <select {...field}>
                      {pref.map((option: any) => (
                        <option
                          key={option.id}
                          value={option.id}
                          selected={option.id == apiLenderdata?.state}
                        >
                          {option.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
               
</div>
                </Grid></Grid>
                <Grid xs={12} className='text_grid padding'>
                <Grid xs={3}><label className='black'>市区群町番地・番号</label></Grid>
                <Grid xs={6}>
                <Controller
                      name="address"
                      control={control}
                      defaultValue={apiLenderdata?.address1}
                      render={({ field }) => <input {...field} className='bdr_text13'/>}
                       />
                </Grid></Grid>
                <Grid xs={12} className='text_grid padding'>
                <Grid xs={3}><label className='black'>登録日（日付）</label></Grid>
                <Grid xs={6}>
                <Controller
                          control={control}
                          name={"date1"}
                          render={({ field }) => (
                            <ReactDatePicker
                              className="bdr_text"
                              {...field}
                              ref={datePickerRef}
                              selected={selectedDate}
                              onChange={handleDateChange}
                              dateFormat="yyyy-MM-dd"
                            />
                          )}
                        />
              <img
                className="bg_white"
                src={calendericon}
                alt="calendar"
                width={14}
                height={14}
                onClick={handleButtonClick}
              />
              <span className='blacktxt mgrgt'>（例 2014-06-21）</span>
                </Grid></Grid>
                <Grid xs={12} className='text_grid padding'>
                <Grid xs={3}><label className='black'>電話番号</label></Grid>
                <Grid xs={6}>
                <Controller
                      name="phone"
                      control={control}
                      defaultValue={apiLenderdata?.phone}
                      render={({ field }) => <input {...field} className='bdr_text13'/>}
                       />
                </Grid></Grid>
                <Grid xs={12} className='text_grid padding'>
                <Grid xs={3}><label className='black'>E-mail</label></Grid>
                <Grid xs={6}>
                <Controller
                      name="email"
                      control={control}
                      defaultValue={apiLenderdata?.email}
                      render={({ field }) => <input {...field} className='bdr_text13'/>}
                       />
                </Grid></Grid>
            </Grid>

            
            <Grid xs={4}></Grid>
            </Grid>
            <Grid className='hr'/>
            <Grid className='hr'/>
            
          
              <Grid xs={12}>
                <DataGrid
                  sx={{
                    '.MuiDataGrid-iconButtonContainer': {
                      visibility: 'visible',
                    },
                    '.MuiDataGrid-sortIcon': {
                      opacity: 'inherit !important',
                    },
                  }}
                  columns={columns}
                 
                  rows={lendedBookData?lendedBookData: []}
                  getRowClassName={getRowClassName}
                  disableColumnMenu={true}
                  autoHeight
                  hideFooter
                  hideFooterSelectedRowCount
                  rowHeight={38} 
                  columnHeaderHeight={38}

                />
              </Grid>
              <Grid className='hr'></Grid>
             
          
            
           
    
                            <Grid container className='btn_align_centre'>
                                <Button type="submit">
                                    <img src={submit} />
                                </Button>
                                <div className='div_width'/> 
                                <Button type="button" onClick={deleteLenderProfile}>
                                    <img src={deletebtn} />
                                </Button>
                            </Grid>
          </Grid></form>:null}
          </Grid>
          </Grid>
    );
};export default Edit_lenderProfile;