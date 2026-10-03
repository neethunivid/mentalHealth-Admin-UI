import {
  Grid,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Typography
} from "@mui/material";
import React, {useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../Redux/actions';
import LeftPanReservation from "../common/LeftPanReservation";
import ReservationHeader from "../common/ReservationHeader";
import { useForm, Controller } from "react-hook-form";
import apiClient from "../../../API/API-client";
import { error } from 'console';
import { getCurrentDateTime } from "../../Common/Date_conversion";

const Registration_counselors = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    setError,
    getValues,
    formState: { errors },
  } = useForm();
  const [message,setMessage] = useState("");
  const [region,setRegion] = useState<any>([]);
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.counselor_list
  });
 
  const dispatch = useDispatch();
  useEffect(() => {
    fetchCounselorList();
    ReservationRegion();
  }, []);

  //to get counselor list
  const fetchCounselorList = () => {
    try {
  const req=
      {
    }
      dispatch(fetchData("counselor_list", "api/reservation/counselorlist",req));
      if (!data || !Array.isArray(data)) {
        return null;
      } else if (!data) {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  //to delete the counselor
  const handleDelete = async (index: number) => {
    try {
      const confirmation = window.confirm("削除しますか？");
      if (confirmation) {
        const apiData = await apiClient.delete(
          "api/reservation/deletecouselor/" + index,
          {}
        );
        if (apiData?.data) {
          window.location.reload();
        }
      }
    } catch (e) {
      console.log(e, "error");
    }
  };

  //to get the region
  const ReservationRegion = async () => {
    try{
      const apiData = await apiClient.get("api/reservation/getregion");
      if(apiData){
        setRegion(apiData.data.data);
        setValue('region',apiData.data.data[0]?.id);
        
      }
    } catch (error){
      console.log(error,"error ");
    }

  };
  
  //handling the submitted input value
  const onSubmit = async (data: any) => {
    if(data.registration_counselors_name==""||data.registration_counselors_name==="undefined"){
      setMessage("Please Enter the Name")
      return
    }else{
    saveRegistration(data);
    }
  };

  //save the counselor name using api call
  const saveRegistration = async (data: any) => {
    setMessage("")
    const dataRequest: any = {
      name: data.registration_counselors_name,
      region: data.registration_counselors_region || getValues('region'),
      createdOn: getCurrentDateTime(),
      createdBy: "0",
      status: 1
    }

    try {
        const apiData = await apiClient.post(
          "api/reservation/createcounselor",
          dataRequest,
          {}
        );
        if(apiData){
          setValue("registration_counselors_name","")
          window.location.reload();
        }
    } catch (e) {
      console.log(e, "error");
    }
  }

  //reset the field values entered by user
  const handleReset = () => {
    reset();
  };
  
  return (
    <div>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={2}>
          <LeftPanReservation />
        </Grid>
        <Grid item xs={10}>
          <ReservationHeader
            label="	
            D. カウンセラーの登録・追加"
          />
          <Grid className="hr"></Grid>
          <label className="black">★ カウンセラーを追加</label>
          <Grid className="hr"></Grid>
          <Grid className="middle_table">
            <Grid className="hr"></Grid>
            <Grid className="hr"></Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid className="registraion_counselors_padding">
                <Grid xs={12}>
                  <Grid xs={7}>
                     {/* {message ? (<Grid>
                        <h1 id="errormessage" >{message}</h1>
                    </Grid>) : null} */}
                    {errors.registration_counselors_name && (
                      <Grid>
                        <h1 id="errormessage" >Please Enter Name</h1>
                    </Grid>
                      )}
                  </Grid>
                </Grid>
                <Grid xs={12} className="content-row">
               
                  <Grid xs={4} className="black">名前</Grid>
                  <Grid xs={4}>
                    <Controller
                      control={control}
                      // defaultValue={}
                      name="registration_counselors_name"
                      rules={{ required: true }} 
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="bdr_text"
                        ></input>
                      )}
                    />
                  </Grid>
                </Grid>
       
                <Grid className="hr"></Grid>
                <Grid xs={12} className="content-row">
                  <Grid xs={4}className="black">地域</Grid>
                  <Grid xs={4}>
                  <Controller
                      control={control}
                      name="registration_counselors_region"
                      render={({ field }) => (
                        <select {...field}>
                        {region.map((item:any) => {
                          return (
                            <option key={item.id} value={item.id} selected={item.name==getValues('region')}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                      )}
                    />
               
                  </Grid>
                </Grid>
              </Grid>
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
              <Grid className="registration_counselors_button_align">
                <input
                  className="registration_counselors_button"
                  type="submit"
                  value={"保存する"}
                ></input>

                <input
                  type="reset"
                  onClick={()=>handleReset()}
                  className="registration_counselors_button"
                  value={"リセットする"}
                ></input>
              </Grid>
              <Grid className="hr"></Grid>
            </form>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <label className="black">★ カウンセラーのリスト</label>
          <Grid className="hr"></Grid>
          <TableContainer component={Paper} className="Reservation-Table-root">
            <Table aria-label="company table">
              <TableHead>
                <TableRow>
                  <TableCell className="ReserVation-Table-root-col1 cell-paddingreserv  Reservation-Table-root-border-right Reservationheaderbold">
                    名前
                  </TableCell>
                  <TableCell className="ReserVation-Table-root-col1 cell-paddingreserv  Reservation-Table-root-border-right Reservationheaderbold">
                    地域
                  </TableCell>
                  <TableCell className="ReserVation-Table-root-col1 cell-paddingreserv  Reservation-Table-root-border-right  Reservationheaderbold">
                    更新
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="Reservation-Tablebody-background">
                {data?.data?.map((item:any, index:any) => (
                  <TableRow
                    key={item.id}
                    className="Reservation-Tablebody-background"
                  >
                    <TableCell className="Reservation-Table-root-col9 cell-paddingreserv Reservation-Table-root-border-right-bottom">
                      {item.name}
                    </TableCell>
                    <TableCell className="Reservation-Table-root-col9 cell-paddingreserv Reservation-Table-root-border-right-bottom">
                      {item.region.name}
                    </TableCell>
                    <TableCell
                      className="Reservation-Table-root-col9 cell-paddingreserv Reservation-Table-root-border-right-bottom"
                    >
                      < a href="#" onClick={() => handleDelete(item.id)}>削除</a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Registration_counselors;
