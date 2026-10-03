import React, { useRef, useState } from "react";
import "../../../assets/css/health.css";
import { Box, Button, Grid, TablePagination, TableRow } from "@mui/material";
import LeftPanBBS from "../../Common/LeftPanBBS";
import "../Common/library.scss";
import prefecture from "../../BBS/MemberData/MemberRegComp/Prefeture";
import calendericon from "../../../assets/images/icon_calender.gif";
import { useForm, Controller } from "react-hook-form";
import submit from "../../../assets/images/lib_save.gif";
import deletebtn from "../../../assets/images/lib_delete.gif";
import ReactDatePicker from "react-datepicker";
import LenderBookListcomp from "../LendingReturn management/LenderBooklistcomp";
import InputEditReg from "./component/InputEditReg";
import RadioEditReg from "./component/RadioEditReg";
import SelectBoxEditReg from "./component/SelectBoxEditReg";
// import LenderBookListcomp from './LenderBooklistcomp';

const Registratnt_edit = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const datePickerRef = useRef<ReactDatePicker>(null);
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };
  const onSubmit=(data:any)=>{
    console.log(data,'this is form submission');
  }
  return (
    <Grid container xs={12} padding={1} spacing={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanBBS />
      </Grid>
      <Grid item xs={9}>
        <Grid className="content-row">
          <Grid className="p2red_bg_left"></Grid>
          <Grid className="p2red_bg_midle">
            <Grid className="top-header">
              <span className="verdana_big">
                B-2.貸出者プロフィールの編集（修正・削除）
              </span>
              <span className="verdana_big">図書室管理</span>
            </Grid>
          </Grid>
          <Grid className="p2red_bg_right"></Grid>
        </Grid>
        <Grid className="hr" />
        <Grid className="middle_table" padding={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
          <Grid xs={12} flexDirection={"row"}>
            <Grid className="middle_table" xs={8}>
              <Grid className="cell_red1">貸出者プロフィール</Grid>
              <Grid xs={12} className="text_grid padding">
                <Grid xs={3}>
                  <label className="black">登録No.</label>
                </Grid>
                <Grid xs={6}>
                  <span className="black">
                    <b>3</b>
                  </span>
                </Grid>
              </Grid>
              <Grid xs={12} className="text_grid padding">
                <Grid xs={3}>
                  <label className="black">貸出者氏名</label>
                </Grid>
                <Grid xs={6} className="text_grid">
                  <Grid xs={6}>
                    <span className="black">姓</span>
                    <InputEditReg
                    control={control}
                    defaultValue={''}
                    name="registrant_edit_lastName"
                    />
                  </Grid>
                  <Grid xs={6}>
                    <span className="black">名</span>
                    <InputEditReg
                    control={control}
                    defaultValue={''}
                    name="registrant_edit_firstName"/>
                  </Grid>
                </Grid>
                <Grid xs={3}></Grid>
              </Grid>
              <Grid xs={12} className="text_grid padding">
                <Grid xs={3}>
                  <label className="black">ふりがな</label>
                </Grid>
                <Grid xs={6} className="text_grid">
                  <Grid xs={6}>
                    <span className="black">姓</span>
                    <InputEditReg
                    control={control}
                    defaultValue={''}
                    name="registrant_edit_phonetic2"/>
                  </Grid>
                  <Grid xs={6}>
                    <span className="black">名</span>
                    <InputEditReg
                    control={control}
                    defaultValue={''}
                    name="registrant_edit_phonetic1"/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={12} className="text_grid padding">
                <Grid xs={3}>
                  <label className="black">性別</label>
                </Grid>
                <Grid xs={6}>
                  <RadioEditReg
                  control={control}
                  name="registrant_edit_gender"
                  defaultValue={'1'}
                  value="1"
                  />
                  <span className="black"> 男性 </span>
                    <RadioEditReg
                  control={control}
                  name="registrant_edit_gender"
                  defaultValue={'1'}
                  value="2"
                  />
                  <span className="black">女性 </span>
                </Grid>
              </Grid>
              <Grid xs={12} className="text_grid padding">
                <Grid xs={3}>
                  <label className="black">年齢</label>
                </Grid>
                <Grid xs={6}>
                <InputEditReg
                    control={control}
                    defaultValue={''}
                    name="registrant_edit_age"/>
                
                </Grid>
              </Grid>
              <Grid xs={12} className="text_grid padding">
                <Grid xs={3}>
                  <label className="black">〒 都道府県</label>
                </Grid>
                <Grid xs={6} className="text_grid">
                <InputEditReg
                    control={control}
                    defaultValue={''}
                    name="registrant_edit_zip"/>
                  {/* <input
                    name="Zip"
                    type="text"
                    value="56"
                    className="bdr_text12"
                  ></input> */}
                  <div className="mglft">
                    <SelectBoxEditReg
                    control={control}
                    defaultValue={''}
                    name="registrant_edit_state"
                    />
                    {/* <select id="pref" name="state">
                      {prefecture.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select> */}
                  </div>
                </Grid>
              </Grid>
              <Grid xs={12} className="text_grid padding">
                <Grid xs={3}>
                  <label className="black">市区群町番地・番号</label>
                </Grid>
                <Grid xs={6}>
                <InputEditReg
                    control={control}
                    defaultValue={''}
                    name="registrant_edit_address1"/>
                  {/* <input
                    name="address1"
                    type="text"
                    value="56"
                    className="bdr_text13"
                  ></input> */}
                </Grid>
              </Grid>
              <Grid xs={12} className="text_grid padding">
                <Grid xs={3}>
                  <label className="black">登録日（日付）</label>
                </Grid>
                <Grid xs={6}>
                  <Controller
                    control={control}
                    name="registrant_edit_date"
                    // defaultValue={sendThemeData?.date1}
                    render={({ field }) => (
                      <ReactDatePicker
                      {...field}
                        className="bdr_text"
                        ref={datePickerRef}
                        selected={selectedDate} // Connect the value from the form state
                        onChange={handleDateChange} // Handle date changes and update form state
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
                    // onClick={handleButtonClick}
                  />
                  <span className="blacktxt mgrgt">（例 2014-06-21）</span>
                </Grid>
              </Grid>
              <Grid xs={12} className="text_grid padding">
                <Grid xs={3}>
                  <label className="black">電話番号</label>
                </Grid>
                <Grid xs={6}>
                <InputEditReg
                    control={control}
                    defaultValue={''}
                    name="registrant_edit_phone"/>
                  {/* <input
                    name="phone"
                    type="text"
                    value="5645678"
                    className="bdr_text13"
                  ></input> */}
                </Grid>
              </Grid>
              <Grid xs={12} className="text_grid padding">
                <Grid xs={3}>
                  <label className="black">電話番号</label>
                </Grid>
                <Grid xs={6}>
                <InputEditReg
                    control={control}
                    defaultValue={''}
                    name="registrant_edit_email"/>
                  {/* <input
                    name="email"
                    type="text"
                    value="amrutha@gmail.co"
                    className="bdr_text13"
                  ></input> */}
                </Grid>
              </Grid>
            </Grid>

            <Grid xs={4}></Grid>
          </Grid>
          <Grid className="hr" />
          <Grid className="hr" />
          <Grid xs={12}>
            <LenderBookListcomp />
          </Grid>
          <Grid container className="btn_align_centre">
            <Button type="submit">
              <img src={submit} />
            </Button>
            <div className="div_width" />
            <Button type="button">
              <img src={deletebtn} />
            </Button>
          </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Registratnt_edit;
