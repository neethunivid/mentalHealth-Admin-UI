import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "../../../assets/css/health.css";
import { Button, Checkbox, Grid } from "@mui/material";
import "../MemberData/member.scss";
import { useForm, Controller } from "react-hook-form";
import submit from "../../../assets/images/page_ten_btn_left.gif";
import reset1 from "../../../assets/images/page_ten_btn.gif";
import RegAddHeader from "./MemberRegComp/RegAddHeader";
import RegInputField from "./MemberRegComp/RegInputField";
import RegDobInput from "./MemberRegComp/RegDobInput";
import RegRadioIn from "./MemberRegComp/RegRadioIn";
import RegCheckBox from "./MemberRegComp/RegCheckBox";
import RegInpRight from "./MemberRegComp/RegInpRight";
import RegPostInp from "./MemberRegComp/RegPostInp";
import { error } from "console";
import RegRightTop_Inp from "./MemberRegComp/RegRightTop_Inp";
import apiClient from "../../../API/API-client";
import { useSelector, useDispatch } from "react-redux";
import { setMemberReg } from "../../../Redux/actions";
import { useNavigate } from "react-router-dom";
import RegEmailImput from "./MemberRegComp/RegEmailImput";
import LeftPanBBS from "../../Common/LeftPanBBS";
import { onSubmitForm } from "./MemberRegComp/MemberReg_submit";
import MemberRegInput from "./MemberRegComp/MemberRegInput";
import MemberRegCheckbox from "./MemberRegComp/MemberRegCheckbox";
const MemberReg: React.FC = () => {
  const navigate = useNavigate();
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
  const dispatch = useDispatch();

  const [memberIdChecks, setMemberIdChecks] = useState<boolean>(false);

  //function to reset form fields
  const handleReset = () => {
    reset();
  };
  const [selectedCheckbox, setSelectedCheckbox] = useState<String>("1");
  const watchField = watch("MemberReg_memberid");

  //this is membeData get from redux state
  const memberData: any = useSelector((state: any) => state.memberData);
  
  useEffect(() => {
    if (!memberData?.memberReg?.MemberReg_usertype) {
      setSelectedCheckbox(memberData?.memberReg?.MemberReg_usertype);
    } else {
      setSelectedCheckbox("1");
    }
    setSelectedCheckbox(memberData?.memberReg?.MemberReg_usertype || "1");
  }, []);

  //function calls when submit form
  const onSubmit = async (data: any) => {
    
    onSubmitForm(data,setError,navigate,dispatch);   
  };

  const handleCheckboxChange = (event: any) => {
    
    setSelectedCheckbox(event.target.value);
    setValue('MemberReg_usertype',event.target.value);
  };

  //function to check memberId already exist
  const memberIdCheck = async () => {
    if (!watchField) {
      alert("まずは会員IDを入力してください");
      return;
    }
    if (watchField.length < 4 || watchField.length > 15) {
      alert("4～15字の英数大小文字のニックネームにしてください。");
      return;
    } else {
      const dataRequest: any = {
        memberid: watchField,
        withdrawList: false,
      };
      try {
        const apiData = await apiClient.post(
          "api/members/memberlistsearch",
          dataRequest,
          {}
        );
        if (apiData.data.count === 0) {
          //no existing memberId
          alert("この会員IDは空いています。");
          setMemberIdChecks(true);
        } else {
          //memberId exist
          alert("会員IDはすでに存在しています。このIDは使用できません。");
        }
      } catch (e) {
        alert(e);
      }
    }
  };

  return (
    <Grid container xs={12} padding={1} spacing={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanBBS />
      </Grid>
      <Grid item xs={9}>
        <RegAddHeader />
        <Grid className="hr"></Grid>
        <span className="black_bold"> ★以下の項目内容を入力して下さい。</span>
        <span className="red_font">＊印</span>
        <span className="black_bold"> は必須項目です。</span>
        <form
          name="registration"
          id="memberReg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container className="middle_table">
            <Grid item xs={6}>
              <Grid className="hr"></Grid>
              <RegInputField
                error={errors.MemberReg_name}
                firstrowHeading="・名前（漢字）姓"
                control={control}
                name="MemberReg_name"
                defaultValue={memberData?.memberReg?.MemberReg_name}
              />
              <Grid className="hr"></Grid>
              <RegInputField
                error={errors.MemberReg_name2}
                firstrowHeading="・名前（漢字） 名"
                control={control}
                name="MemberReg_name2"
                defaultValue={memberData?.memberReg?.MemberReg_name2}
              />
              <Grid className="hr"></Grid>
              <RegInputField
                error={errors.MemberReg_namek}
                firstrowHeading="・ふりがな 姓"
                control={control}
                name="MemberReg_namek"
                defaultValue={memberData?.memberReg?.MemberReg_namek}
              />
              <Grid className="hr"></Grid>
              <RegInputField
                error={errors.MemberReg_namek2}
                firstrowHeading="・ふりがな 名"
                control={control}
                name="MemberReg_namek2"
                defaultValue={memberData?.memberReg?.MemberReg_namek2}
              />
              <Grid className="hr"></Grid>
              <RegInputField
                handleSubmit={memberIdCheck}
                error={errors.MemberReg_memberid}
                firstrowHeading="・ID"
                firstrowHeading1="（4~15字以内英数ひらがな）"
                control={control}
                defaultValue={memberData?.memberReg?.MemberReg_memberid}
                name="MemberReg_memberid"
                memberButton={true}
              />
              <Grid className="hr"></Grid>
              <RegInputField
                error={errors.MemberReg_password}
                firstrowHeading="・パスワード"
                firstrowHeading1="（6~15字以内英数ひらがな）"
                control={control}
                name="MemberReg_password"
                defaultValue={memberData?.memberReg?.MemberReg_password}
                inputTypePassword={true}
              />
              <Grid className="hr"></Grid>
              <RegInputField
                error={errors.MemberReg_password2}
                firstrowHeading="・パスワード再入力 "
                control={control}
                name="MemberReg_password2"
                defaultValue={memberData?.memberReg?.MemberReg_password2}
                inputTypePassword={true}
              />
              <Grid className="hr"></Grid>
              <RegRadioIn
                error={errors.sex}
                span={true}
                firstRowHeading="・性別"
                control={control}
                defaultValue={memberData?.memberReg?.MemberReg_sex}
                defaultValue1={memberData?.memberReg?.MemberReg_sex}
                name="MemberReg_sex"
                name1="MemberReg_sex"
                radioTitle1="男性"
                radioTitle2="女性"
              />
              <Grid className="hr"></Grid>
              <RegDobInput
                isDob={true}
                error={errors.MemberReg_dob1}
                error1={errors.MemberReg_dob2}
                error2={errors.MemberReg_dob3}
                firstrowHeading=" ・ 生年月日"
                firstrowHeading1="（西暦）"
                defaultValue={memberData?.memberReg?.MemberReg_dob1}
                defaultValue1={memberData?.memberReg?.MemberReg_dob2}
                defaultValue2={memberData?.memberReg?.MemberReg_dob3}
                control={control}
                spanText1="年"
                spanText2="月"
                spanText3="日"
                name="MemberReg_dob1"
                name1="MemberReg_dob2"
                name2="MemberReg_dob3"
              />
              <Grid className="hr"></Grid>
              <RegInputField
                firstrowHeading="・職業"
                control={control}
                name="MemberReg_occupation"
                defaultValue={memberData?.memberReg?.MemberReg_occupation}
                textInput={true}
                select1={false}
              />
              <Grid className="hr"></Grid>
              <RegInputField
                span={true}
                firstrowHeading="・ 職業の詳細"
                name="MemberReg_job_additional"
                defaultValue={memberData?.memberReg?.MemberReg_job_additional}
                control={control}
              />
              <Grid className="hr"> </Grid>
              <RegPostInp
                firstRowHeading="・郵便番号"
                firstRowHeading1="〒"
                firstRowHeading2=" - "
                name="MemberReg_post1"
                name1="MemberReg_post2"
                control={control}
                defaultValue={memberData?.memberReg?.MemberReg_post1}
                defaultValue1={memberData?.memberReg?.MemberReg_post2}
                error={errors.MemberReg_post1}
                error1={errors.MemberReg_post2}
              />
              <Grid className="hr"></Grid>
              <RegInputField
                firstrowHeading="・都道府県"
                name="MemberReg_prefecture"
                defaultValue={memberData?.memberReg?.MemberReg_prefecture}
                control={control}
                textInput={true}
                select1={true}
              />
              <Grid className="hr"></Grid>
              <RegInputField
                error={errors.MemberReg_address1}
                firstrowHeading="・住所１ （市町村）"
                name="MemberReg_address1"
                defaultValue={memberData?.memberReg?.MemberReg_address1}
                control={control}
              />
              <Grid className="hr" />
              <RegInputField
                error={errors.MemberReg_address2}
                firstrowHeading="・住所2 （丁目番地））"
                name="MemberReg_address2"
                defaultValue={memberData?.memberReg?.MemberReg_address2}
                control={control}
              />
              <Grid className="hr" />
              <RegInputField
                span={true}
                firstrowHeading="・住所3 （マンション・ビル名）"
                name="MemberReg_address3"
                defaultValue={memberData?.memberReg?.MemberReg_address3}
                control={control}
              />
              <Grid className="hr" />
              <RegDobInput
                error={errors.MemberReg_tel1}
                firstrowHeading="電話・携帯番号 （例：0000-0000-0000）"
                defaultValue={memberData?.memberReg?.MemberReg_tel1}
                defaultValue1={memberData?.memberReg?.MemberReg_tel2}
                defaultValue2={memberData?.memberReg?.MemberReg_tel3}
                control={control}
                spanText1="-"
                spanText2="-"
                spanText3=""
                name="MemberReg_tel1"
                name1="MemberReg_tel2"
                name2="MemberReg_tel3"
                error1={errors.MemberReg_tel2}
                error2={errors.MemberReg_tel3}
              />
              <Grid className="hr"></Grid>
              <RegInputField
                firstrowHeading="・勤め先・学校"
                name="MemberReg_workplace"
                defaultValue={memberData?.memberReg?.MemberReg_workplace}
                control={control}
                span={true}
              />
              <Grid className="hr"></Grid>
              <RegInputField
                firstrowHeading="・何で知ったか"
                name="MemberReg_howfound"
                defaultValue={memberData?.memberReg?.MemberReg_howfound}
                control={control}
                span={true}
              />
              <Grid className="hr"></Grid>
              <RegEmailImput
                error1={errors.MemberReg_email_pc1}
                error2={errors.MemberReg_email_pc2}
                control={control}
                firstrowHeading="メールアドレス1"
                defaultValue={memberData?.memberReg?.MemberReg_email_pc1}
                defaultValue1={memberData?.memberReg?.MemberReg_email_pc2}
                name="MemberReg_email_pc1"
                name1="MemberReg_email_pc2"
              />
              <Grid className="hr"></Grid>
              <RegEmailImput
              error1={errors.MemberReg_email_mob1}
              error2={errors.MemberReg_email_mob2}
                control={control}
                firstrowHeading="メールアドレス2"
                defaultValue={memberData?.memberReg?.MemberReg_email_mob1}
                defaultValue1={memberData?.memberReg?.MemberReg_email_mob2}
                name="MemberReg_email_mob1"
                name1="MemberReg_email_mob2"
              />
              <Grid className="hr"></Grid>
              <RegRadioIn
                span={false}
                firstRowHeading="・メルマガ購読の有無"
                control={control}
                defaultValue={memberData?.memberReg?.MemberReg_mailmagazine}
                defaultValue1={memberData?.memberReg?.MemberReg_mailmagazine}
                name="MemberReg_mailmagazine"
                name1="MemberReg_mailmagazine"
                radioTitle1="購読"
                radioTitle2="中止"
              />
            </Grid>
            {/* Right Section of input fields */}
            <Grid item xs={6}>
              <Grid className="hr"></Grid>
              <Grid>
                <Grid item xs={12}>
                  <span className="black">・発言タイトル</span>
                  <span className="red_font">*</span>
                </Grid>
                <RegRightTop_Inp
                  title="・発言内容"
                  control={control}
                  defaultValue1={
                    memberData?.memberReg?.MemberReg_statement_title
                  }
                  defaultValue2={
                    memberData?.memberReg?.MemberReg_statement_text
                  }
                  error1={errors.MemberReg_statement_title}
                  error2={errors.MemberReg_statement_text}
                  name1="MemberReg_statement_title"
                  name2="MemberReg_statement_text"
                />
                <Grid container>
                  <Grid item xs={4}>
                    <span className="black">・タイプ区分</span>
                    <span className="red_font">*</span>
                  </Grid>
                  <Grid item xs={8}>
                    <span className="black">（チエックして下さい）</span>
                  </Grid>
                </Grid>
                <Grid className="hr"></Grid>
                <RegCheckBox
                  error1={errors.MemberReg_checkboxGroup5Title}
                  error2={errors.MemberReg_checkboxGroup6Title}
                  defaultValue={memberData?.memberReg?.MemberReg_checkboxGroup}
                  control={control}
                  defaultValue1={memberData?.memberReg?.MemberReg_checkboxGroup1}
                  defaultValue2={memberData?.memberReg?.MemberReg_checkboxGroup2}
                  defaultValue3={memberData?.memberReg?.MemberReg_checkboxGroup3}
                  defaultValue4={memberData?.memberReg?.MemberReg_checkboxGroup4}
                  defaultValue5={memberData?.memberReg?.MemberReg_checkboxGroup5}
                  defaultValue6={memberData?.memberReg?.MemberReg_checkboxGroup6}
                  defaultTitle1={memberData?.memberReg?.MemberReg_checkboxGroup5Title}
                  defaultTitle2={memberData?.memberReg?.MemberReg_checkboxGroup6Title}
                />
                <Grid className="hr"></Grid>
                <Grid container item xs={12}>
                  <Grid xs={2}></Grid>
                  <Grid item xs={6} className="content-row">
                    <label className="black">（入力欄） </label>
                  </Grid>
                  <Grid item xs={4} className="content-row">
                    <label className="black">（入力欄） </label>
                  </Grid>
                </Grid>
                <Grid className="hr"></Grid>
                <RegInpRight
                  error={errors.MemberReg_join_date}
                  firstrowHeading=" .入会日"
                  firstrowHeading1="（例：2008-05-01）"
                  defaultValue={memberData?.memberReg?.MemberReg_join_date}
                  control={control}
                  name="MemberReg_join_date"
                />
                <Grid className="hr"></Grid>
                <RegInpRight
                  control={control}
                  firstrowHeading="・状況"
                  firstrowHeading1="（チエックして下さい）"
                />
                <Grid container item xs={12}>
                  <Grid item xs={4} className="content-row">
                  <MemberRegCheckbox
                    name="MemberReg_usertype"
                    control={control}
                    defaultValue={ memberData?.memberReg?.MemberReg_usertype}
                    id={'user_type3'}
                    selectedValue={selectedCheckbox}
                    value={"1"}
                    onChange={handleCheckboxChange}
                    />
                    <label className="verdana">A. 参加中</label>
                  </Grid>
                  <Grid item xs={4}>
                  <MemberRegCheckbox
                    name="MemberReg_usertype"
                    control={control}
                    defaultValue={ memberData?.memberReg?.MemberReg_usertype}
                    id={'user_type2'}
                    selectedValue={selectedCheckbox}
                    value={"2"}
                    onChange={handleCheckboxChange}
                    />
                    <label className="verdana">B. 利用中止</label>
                  </Grid>
                  <Grid item xs={4}>
                    <MemberRegCheckbox
                    name="MemberReg_usertype"
                    control={control}
                    defaultValue={ memberData?.memberReg?.MemberReg_usertype}
                    id={'user_type3'}
                    selectedValue={selectedCheckbox}
                    value={"3"}
                    onChange={handleCheckboxChange}
                    />
                    <label className="verdana">D. 退会</label>
                  </Grid>
                </Grid>
                <Grid className="hr"></Grid>
                <Grid container item xs={12}>
                  <Grid item xs={3}>
                    <label className="black">・変更日 </label>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid item xs={12} className="content-row">
                      <Grid xs={3}></Grid>
                      <Grid item xs={3}>
                        <MemberRegInput
                        control={control}
                        defaultValue={memberData?.memberReg?.MemberReg_change_date}
                        className="bdr_text_medium"
                        name="MemberReg_change_date"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <span className="black">（例：2008-05-01）</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className="hr"></Grid>
                <Grid container item xs={12}>
                  <Grid item xs={4}>
                    <span className="black">・理由</span>
                  </Grid>
                  <Grid item xs={8}>
                    <MemberRegInput
                    className='bdr_text'
                    control={control}
                    name="MemberReg_change_cause"
                    defaultValue={ memberData?.memberReg?.MemberReg_change_cause}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid item xs={12}>
            <Grid container display={"flex"} justifyContent={"center"}>
              <Button type='submit'>
                <img className="padding_top" src={submit} />
              </Button>
              <Button type="button">
                <img
                  className="padding_top"
                  src={reset1}
                  onClick={handleReset}
                />
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
export default MemberReg;
