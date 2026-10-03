import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import LeftPanBBS from "../../Common/LeftPanBBS";
import LibraryHeader from "../Common/LibraryHeader";
import "../Common/library.scss";
import { useForm, Controller } from "react-hook-form";
import NewLenderInput1 from "./Components/NewLenderInput1";
import NewLenderInput2 from "./Components/NewLenderInput2";
import NewLenderRadioInp from "./Components/NewLenderRadioInp";
import NewLenderDateInp from "./Components/NewLenderDateInp";
import saveButton from "../../../assets/images/lib_save.gif";
import resetButton from "../../../assets/images/lib_reset.gif";
import { useSelector, useDispatch } from "react-redux";
import { setMemberReg } from "../../../Redux/actions";
import { useNavigate } from "react-router-dom";
import LibraryapiClient from "../../../API/LibraryAPI-client";
import { getCurrentDate } from "../../Common/Date_conversion";
import pref from "../Common/pref";
import LeftPanLibrary from "../Common/LeftPanLibrary";

const New_lender_Reg = () => {
  const navigate = useNavigate();
  //to get redux stored data to state
  const LenderData: any = useSelector(
    (state: any) => state.memberData.lender_reg
  );
  const [memberNo, setMemberNo] = useState<any>("");
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  let currentDate;

  useEffect(() => {
    getMemberRegNo();
    if (LenderData) {
      setValue("library_date_registerd", LenderData?.library_date_registerd);
    } else {
      const currentDate = getCurrentDate();
      setValue("library_date_registerd", currentDate);
    }
  }, []);

  //get current memberNo
  const getMemberRegNo = async () => {
    try {
      const apiData = await LibraryapiClient.get("library/books/getmemberno");
      if (apiData) {
        setMemberNo(apiData.data.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  //reset the form fields
  const handleReset = () => {
    reset();
  };

  /*
  validate form field null or any entered data incorrectly 
  if regex passed it will check regex.test method
   */
  const validateField = (
    data: any,
    field: string,
    errorMessage: string,
    regex: RegExp | null = null
  ): boolean => {
    if (!data[field]) {
      alert(errorMessage);
      setError(field, {
        type: "required",
      });
      return false;
    } else if (regex && !regex.test(data[field])) {
      alert(errorMessage);
      setError(field, {
        type: "required",
      });
      return false;
    }
    return true;
  };

  //when submit form call this function
  const onSubmit = (data: any) => {
    console.log(data,'lender form values');
    //validate form by using validateField function
    if (
      validateField(data,"library_name_last","貸出者氏名の性を入れてください")&&
      validateField(data,"library_name_first","貸出者氏名の名を入れてください") &&
      validateField(data,"library_name_phonetic2","性のふりがなを入れてください") &&
      validateField(data,"library_name_phonetic1","名のふりがなを入れてください") &&
      validateField(data, "library_age", "年齢を入れてください", /^\d+$/) &&
      validateField(data, "library_zip", "郵便番号を入れてください", /^\d{3}-\d{4}$/) &&
      validateField(data, "library_address", "市区群町を入れてください") &&
      validateField(data, "library_text_phone", "電話番号を入れてください") &&
      validateField(data,"library_email","メールアドレスを入れてください",/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)
    ) {
      dispatch(setMemberReg("lender_reg", data));
      //navigate to preview screen with memberNo
      navigate("/newlenderpreview", { state: memberNo });
    }
  };

  return (
    <Grid container xs={12} padding={1} spacing={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanLibrary />
      </Grid>
      <Grid item xs={9}>
        <LibraryHeader
          label1="B-1."
          label2="新規貸出者の登録"
          label3="図書室管理"
        />
        <Grid className="hr"></Grid>
        <label className="black">★新しい貸出者を登録して下さい。</label>
        <Grid className="hr"></Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid className="middle_table">
            <Grid className="hr"> </Grid>
            <Grid className="hr"></Grid>

            <Grid className="content-row">
              <Grid className="library-width-3"></Grid>
              <Grid className="content-row library-width-15">
                <label className="black">● 登録No.</label>
              </Grid>
              <Grid className="content-row library-width-82 library-text-bold black">
                {memberNo  ?? ""}
              </Grid>
            </Grid>
            <Grid className="hr"></Grid>

            <NewLenderInput1
              error1={errors.library_name_last}
              error2={errors.library_name_first}
              label1="● 貸出者氏名"
              label2="姓 "
              label3="姓"
              control={control}
              name1={"library_name_last"}
              name2={"library_name_first"}
              defaultValue1={LenderData?.library_name_last}
              defaultValue2={LenderData?.library_name_first}
            />
            <Grid className="hr"></Grid>
            <NewLenderInput1
              error1={errors.library_name_phonetic2}
              error2={errors.library_name_phonetic1}
              label1="● ふりがな"
              label2="名"
              label3="名"
              control={control}
              name1={"library_name_phonetic2"}
              name2={"library_name_phonetic1"}
              defaultValue1={LenderData?.library_name_phonetic2}
              defaultValue2={LenderData?.library_name_phonetic1}
            />
            <Grid className="hr"></Grid>
            <NewLenderInput2
              error={errors.library_age}
              label1="● 年齢"
              label2=""
              defaultValue1={LenderData?.library_age}
              label3=""
              control={control}
              name1={"library_age"}
              name2={""}
            />
            <Grid className="hr"></Grid>
            <NewLenderRadioInp
              label1="● 性別"
              label2="男性"
              label3="女性"
              control={control}
              name1={"library_gender"}
              name2={"library_gender"}
              defaultValue1={LenderData?.library_gender}
              defaultValue2={LenderData?.library_gender}
            />
            <Grid className="hr"></Grid>
            <NewLenderInput2
              error={errors.library_zip}
              label1="● 郵便番号"
              label2=""
              control={control}
              defaultValue1={LenderData?.library_zip}
              defaultValue2={LenderData?.library_zip}
              label3="（例 541-0067）"
              name1={"library_zip"}
              name2={"library_zip"}
            />
            <Grid className="hr"></Grid>
            <NewLenderInput2
              label1="● 都道扶県"
              label2=""
              label3=""
              control={control}
              defaultValue1={LenderData?.library_state}
              defaultValue2={""}
              name1={"library_state"}
              name2={""}
              selectBox={true}
            />
            <Grid className="hr"></Grid>
            <NewLenderInput2
              error={errors.library_address}
              label1="● 市区群町番地・番号"
              label2=""
              label3=""
              control={control}
              defaultValue1={LenderData?.library_address}
              defaultValue2={""}
              name1={"library_address"}
              name2={""}
              inputClassName="library-text-input2"
            />
            <Grid className="hr"></Grid>
            <NewLenderDateInp
              setValue={setValue}
              date={currentDate}
              label1="● 登録日（日付）"
              label2=""
              label3="（例 2014-06-21）"
              control={control}
              defaultValue1={""}
              defaultValue2={""}
              name1={"library_date_registerd"}
              name2={""}
            />
            <Grid className="hr"></Grid>
            <NewLenderInput2
              error={errors.library_text_phone}
              label1="	● 電話番号"
              label2=""
              label3="（例 06-6809-1211）"
              control={control}
              defaultValue1={LenderData?.library_text_phone}
              defaultValue2={""}
              name1={"library_text_phone"}
              name2={""}
              inputClassName="library-text-input2"
            />
            <Grid className="hr"></Grid>
            <NewLenderInput2
              error={errors.library_email}
              label1="●  E-mail"
              label2=""
              label3=""
              control={control}
              defaultValue1={LenderData?.library_email}
              name1={"library_email"}
              name2={""}
              inputClassName={"library-text-input2"}
            />
            <Grid className="hr"></Grid>
            <Grid className="hr"></Grid>
            <Grid className="hr"></Grid>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>

          <Grid className="content-row">
            <Grid className="library-button-32"></Grid>
            <Grid className="library-button-20">
              <Button type="submit">
                <img src={saveButton} />
              </Button>
            </Grid>
            <Grid className="library-button-48">
              <Button type="reset">
                <img src={resetButton} onClick={handleReset} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default New_lender_Reg;
