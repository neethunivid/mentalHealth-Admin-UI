import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Reservation_form_input from "./compoents/Reservation_form_input";
import Reservation_form_radioInp from "./compoents/Reservation_form_radioInp";
import apiClient from "../../../API/API-client";
import {
  formatDateArray,
  getCurrentDateTime,
} from "../../Common/Date_conversion";
import Reservation_form_select from "./compoents/Reservation_form_select";

export const Reservation_list_slot_form = ({
  item,
  date,
  handleRefresh,
  selectedItemR,
}: any) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const [reservationId, setReservationId] = useState<Boolean>(false);

  //form submit function
  const onSubmit = async () => {

    const data=getValues();
    //check the error case below
    if (!data.reservation_slot_personName) {
      alert("お名前を入力してください。");
      setError("reservation_slot_personName", {
        type: "required",
      });
      return;
    } else if (!data.reservation_slot_surname) {
      alert("ふりがなを入力してください。");
      setError("reservation_slot_surname", {
        type: "required",
      });
      return;
    }  else if (!data.reservation_slot_gender) {
      alert("性別を選択してください");
      setError("reservation_slot_gender", {
        type: "required",
      });
      return;
    }else if (!data.reservation_slot_postalcode) {
      alert("郵便番号を記入してください");
      setError("reservation_slot_postalcode", {
        type: "required",
      });
      return;
    } else if (!data.reservation_slot_pref) {
      alert("都道府県を記入してください。");
      setError("reservation_slot_pref", {
        type: "required",
      });
      return;
    } else if (!data.reservation_slot_town) {
      alert("市町村を記入してください");
      setError("reservation_slot_town", {
        type: "required",
      });
      return;
    } if (!data.reservation_slot_age) {
      alert("年齢を選択してください");
      setError("reservation_slot_age", {
        type: "required",
      });
      return;
    }
    
    else if (!data.reservation_slot_address) {
      alert("調番地を記入してください");
      setError("reservation_slot_address", {
        type: "required",
      });
      return;
    } else if (!data.reservation_slot_telephone) {
      alert(" 電話番号を入力してください。");
      setError("reservation_slot_telephone", {
        type: "required",
      });
      return;
    } else if (!data.reservation_slot_email) {
      alert("メールアドレスを入力してください。");
      setError("reservation_slot_email", {
        type: "required",
      });
      return;
    } else if (
      !/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
        data.reservation_slot_email
      )
    ) {
      alert("メールアドレスを入れてください");
      setError("reservation_slot_email", {
        type: "required",
      });
      return;
    }
    if (!reservationId) {
      //if reservationId false then to free slot to register
      await createSlot(data);
    } else {
      //to update already reserved slot
      await editSlot(data);
    }
  };
  //defined all input field Names 
  const fieldNames = [
    "reservation_slot_personName",
    "reservation_slot_surname",
    "reservation_slot_gender",
    "reservation_slot_age",
    "reservation_slot_job",
    "reservation_slot_postalcode",
    "reservation_slot_pref",
    "reservation_slot_town",
    "reservation_slot_address",
    "reservation_slot_telephone",
    "reservation_slot_email",
    "reservation_slot_date",
  ];
  useEffect(() => {
    if (item.reservationId == null) {
      //reservationId field get null make all the fields into empty
      setReservationId(false);
      fieldNames.forEach((fieldName)=>{
        setValue(fieldName,'');
      });
    } else {
      //parameter item values are save the form field using setValue
      setReservationId(true);
      const date1 = formatDateArray(date);
      const reserVationObject=item.reservationId;
for(const fieldName in reserVationObject){
  if(reserVationObject.hasOwnProperty(fieldName)){
    setValue(`reservation_slot_${fieldName}`, reserVationObject[fieldName]); 
  }
}
setValue("reservation_slot_date", date1)
    }
  }, [item]);

  //function reset the form
  const handleReset = () => {
    reset();
  };

  //free available slots register api
  const createSlot = async (data: any) => {

    try {
      const dataRequest = {
        id: item.id,
        name: data.reservation_slot_personName,
        furigana: data.reservation_slot_surname,
        sex: data.reservation_slot_gender,
        job: data.reservation_slot_job,
        age: data.reservation_slot_age.replace(/[代以上]/g, ""),
        postalcode: data.reservation_slot_postalcode,
        pref: data.reservation_slot_pref,
        town: data.reservation_slot_town,
        address: data.reservation_slot_address,
        phone: data.reservation_slot_telephone,
        email: data.reservation_slot_email,
        dbaction: "INSERT",
        region_id: selectedItemR.region.id,
        type_of_counselling:item?.type_of_counselling
      };
      const apiData = await apiClient.post(
        "api/reservation/reserveSlot",
        dataRequest
      );
      if (apiData) {
        //after register trigger this function from parentScreen
        handleRefresh();
      }
    } catch (error) {
     alert(error);
    }
  };

  //to edit already registered slots
  const editSlot = async (data: any) => {
    const currentDateTime = getCurrentDateTime();

  
    try {
      const dataRequest = {
        id: item.id,
        name: data.reservation_slot_personName,
        furigana: data.reservation_slot_surname,
        sex: data.reservation_slot_gender,
        job: data.reservation_slot_job,
        age: data.reservation_slot_age.replace(/[代以上]/g, ""),
        postalcode: data.reservation_slot_postalcode,
        pref: data.reservation_slot_pref,
        town: data.reservation_slot_town,
        address: data.reservation_slot_address,
        phone: data.reservation_slot_telephone,
        email: data.reservation_slot_email,
        dbaction: "UPDATE",
        region_id: selectedItemR.region.id,
        reservation_id: item.reservationId.reservationId,
        date: currentDateTime,
        type_of_counselling:item?.type_of_counselling
      };

    
      const apiData = await apiClient.post(
        "api/reservation/reserveSlot",
        dataRequest
      );
      if (apiData) {
        handleRefresh();
      }
    } catch (error) {
    alert(error);
    }
  };

  //delete registerd slot make to free slot by this api
  const handleDeleteReset = async () => {
    const id = item.id;
  
    if (!reservationId) {
      handleReset();
      fieldNames.forEach((fieldName)=>{
        setValue(fieldName,'');
      });
    } else {
      const userConfirmation = window.confirm("当日キャンセルしますか？ ");
      if (userConfirmation) {
        try {
          const apiData = await apiClient.delete(
            `api/reservation/deleteReservedSlot/${id}`
          );
          handleRefresh();
        } catch (error) {}
      } else {
        // User clicked Cancel, do nothing
      }
    }
  };
  return (
    <div>
      <form id="reservation_slot_form" onSubmit={handleSubmit(onSubmit)}>
        <Grid className="middle_table">
          <Grid className="hr"></Grid>
          <Reservation_form_input
            defaultValue={item?.name}
            label1="お名前*"
            label2="(漢字）"
            classNameInput="reservation_form_input1"
            control={control}
            name={"reservation_slot_personName"}
            inpuEx={true}
            error={errors.reservation_slot_personName}
          />
          <Grid className="hr"></Grid>
          <Reservation_form_input
            defaultValue={item?.surname}
            label1="ふりがな*"
            label2="(漢字）"
            classNameInput=""
            control={control}
            name={"reservation_slot_surname"}
            error={errors.reservation_slot_surname}
          />
          <Grid className="hr"></Grid>
          <Reservation_form_radioInp
            defaultValue={item?.gender}
            label="性別*"
            radioLabel1="男性"
            radioLabel2="女性"
            control={control}
            name={"reservation_slot_gender"}
          />
          <Grid className="hr"></Grid>

          <Reservation_form_select
            defaultValue={item.reservationId?.age}
            label1="年代"
            label2=""
            classNameInput="reservation_form_input1"
            control={control}
            name={"reservation_slot_age"}
            error={errors.reservation_slot_age}
          />
          
          <Grid className="hr"></Grid>
          <Reservation_form_input
            defaultValue={item?.job}
            label1="ご職業"
            label2="(漢字）"
            classNameInput="reservation_form_input1"
            control={control}
            name={"reservation_slot_job"}
            error={errors.reservation_slot_job}
          />
<Grid className="hr"></Grid>

          
          <Reservation_form_input
            defaultValue={item?.postalcode}
            label1="郵便番号*"
            label2="(漢字）"
            classNameInput="reservation_form_input1"
            control={control}
            name={"reservation_slot_postalcode"}
            error={errors.reservation_slot_postalcode}
          />
          <Grid className="hr"></Grid>
          <Reservation_form_input
            defaultValue={item?.pref}
            label1="都道府県*"
            label2="(漢字）"
            classNameInput="reservation_form_input1"
            control={control}
            name={"reservation_slot_pref"}
            error={errors.reservation_slot_pref}
          />
          <Grid className="hr"></Grid>
          <Reservation_form_input
            defaultValue={item?.town}
            label1="市町村*"
            label2="(漢字）"
            classNameInput="reservation_form_input1"
            control={control}
            name={"reservation_slot_town"}
            error={errors.reservation_slot_town}
          />
          <Grid className="hr"></Grid>
          <Reservation_form_input
            defaultValue={item?.address}
            label1="町番地*"
            label2="(漢字）"
            classNameInput="reservation_form_input1"
            control={control}
            name={"reservation_slot_address"}
            error={errors.reservation_slot_address}
          />
          <Grid className="hr"></Grid>
          <Reservation_form_input
           isPhone={true}
            defaultValue={item?.telephone}
            label1="電話番号*"
            label2=" (例：06-6809-1211）"
            classNameInput=""
            control={control}
            name={"reservation_slot_telephone"}
            error={errors.reservation_slot_telephone}
            inpuEx={true}
          />
          
          <Grid className="hr"></Grid>
          <Reservation_form_input
            defaultValue={item?.email}
            label1="メールアドレス*"
            label2="(半角英数文字で）"
            classNameInput="reservation_form_input2"
            control={control}
            name={"reservation_slot_email"}
            error={errors.reservation_slot_email}
            inpuEx={true}
          />
          <Grid className="hr"></Grid>


          <Reservation_form_input
            defaultValue={item?.type_of_counselling}
            label1="面接形式"
            label2=""
             disabled={true}
            classNameInput="reservation_form_input1"
            control={control}
            name={"reservation_slot_counsellingtype"}
            error={""}
          />

          <Grid className="hr"></Grid>
          <Reservation_form_input
            defaultValue={`${formatDateArray(date)}(*)${item.timeStart}-${item.timeEnd}`}
            disabled={true}
            label1="希望日時"
            label2="(半角英数文字で）"
            classNameInput="reservation_form_input2"
            control={control}
            name={"reservation_slot_date"}
            error={errors.reservation_slot_date}
          />
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
        </Grid>
        <Grid className="hr"></Grid>
        <Grid className="hr"></Grid>
        <Grid className="reservation_form_button_align">
        {reservationId ? (
            <>
              <input
                type="button"
                className="reservation_formSubmitButton"
                value={"当日キャンセル"}
                onClick={() => handleDeleteReset()}
              />
              <Grid className="reservation_form_sizebox" />
              <input
                type="submit"
                className="reservation_formSubmitButton"
                value={"更新"}
              />
            </>
          ) : (
            <>
              <input
                type="submit"
                className="reservation_formSubmitButton"
                value={"送信する"}
              />
              <Grid className="reservation_form_sizebox" />
              <input
                type="button"
                className="reservation_formSubmitButton"
                value={"リセット"}
                onClick={() => handleDeleteReset()}
              />
            </>
          )}
        </Grid>
        <Grid className="hr"></Grid>
        <Grid className="hr"></Grid>
        <Grid className="hr"></Grid>
        <Grid className="hr"></Grid>
        <Grid className="hr"></Grid>
        <Grid className="hr"></Grid>
        <Grid className="hr"></Grid>
        <Grid className="hr"></Grid>
      </form>
    </div>
  );
};
