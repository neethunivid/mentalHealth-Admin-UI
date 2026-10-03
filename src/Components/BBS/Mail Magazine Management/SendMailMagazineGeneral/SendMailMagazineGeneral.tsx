import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "../../../BBS/MemberData/member.scss";
import "../../../BBS/Mail Magazine Management/Mail Magazine Components/mail_magazine.scss";
import LeftPanBBS from '../../../Common/LeftPanBBS';
import rightbtn from '../../../../assets/images/pg_24_btn_right.gif';
import leftbtn from '../../../../assets/images/pg_24_btn_left.gif';
import '../../../../assets/css/health.css';
import { setMemberReg } from "../../../../Redux/actions";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {  useLocation } from 'react-router-dom';

function SendMailMagazineGeneral() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { register, handleSubmit, reset, setValue, formState: { errors }, control } = useForm();
  const [selectedOption, setSelectedOption] = useState("PC");
  const [textareaWidth, setTextareaWidth] = useState("650px");
  const [isPcClicked, setIsPcClicked] = useState(true);
  const [isMobileClicked, setIsMobileClicked] = useState(false);


  useEffect(() => {

    if (location && location.state && location.state.data) {
      setSelectedOption(location.state.data);
      setTextareaWidth(location.state.data === "PC" ? "600px" : "250px");
    }
  }, []);

  //handling the pc click and setting the textarea width
  const handlePcClick = () => {
    setIsPcClicked(true);
    setIsMobileClicked(false);
    setTextareaWidth("600px");
    setSelectedOption("PC")
  };

  //handling the mobile click and setting the textarea width
  const handleMobileClick = () => {
    setIsPcClicked(false);
    setIsMobileClicked(true);
    setTextareaWidth("250px");
    setSelectedOption("SP")
  };

  //resetting the field values entered by the user
  function handleReset() {
    reset();
    setValue("title", "");
    setValue("content", "");
  }
  
  //get the value from redux
  const memberData = useSelector((state: any) => state.memberData);

  //handling the input values
  const onSubmit = async (data: any) => {
    if (data.title == "") {
      alert("メールマガのタイトルをご記入ください。");
      return;
    } else if (data.content == "") {
      alert("メールマガのテキストをご記入ください。");
      return;
    } else {

      //save the data into redux
      dispatch(setMemberReg("sendmailgeneral", { ...data, type: selectedOption }));
      navigate('/sendmailmaggeneralpreview');
    }
  };

  return (
    <div>
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanBBS />
        </Grid>
        <Grid item xs={9}>
          <Grid className="content-row">
            <Grid className="p2red_bg_left size"></Grid>
            <Grid className="p2red_bg_midle">
              <Grid className="top-header">
                <span className="verdana_big">F.メルマガ発信（一般)</span>
                <span className="verdana_big">メルマガ管理</span>
              </Grid>
            </Grid>
            <Grid className="p2red_bg_right size"></Grid>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <Grid xs={12} className="gridmrglft">
            <Grid className="hr"></Grid>
            <Grid item xs={12} container>
              <Grid item xs={9}>
              </Grid>
              <Grid item xs={3}>
                <button className={selectedOption=="PC" ? 'Active_btnmailmag' : 'Inactive_btnmailmag'}
                  onClick={handlePcClick}
                >
                  PC
                </button>
                {" | "}
                <button
                  onClick={handleMobileClick} className={selectedOption=="SP" ? 'Active_btnmailmag' : 'Inactive_btnmailmag'}
                >
                  携帯
                </button>
              </Grid>
            </Grid>
            <Grid className="content-row">
              <Grid item xs={1}>
              </Grid>
              <Grid item xs={11}>
                <Grid>
                  <label className="black">	★タイトル</label>
                </Grid>
                <Grid className="hr"></Grid>

                <form name="mailcontentbbs" id="form" onSubmit={handleSubmit(onSubmit)}>
                  <Grid>
                    <Controller
                      name="title"
                      control={control}
                      defaultValue={memberData ? memberData?.sendmailgeneral?.title : ""}
                      render={({ field }) => <input {...field} />}
                    />
                  </Grid>
                  <Grid className="hr"></Grid>
                  <Grid className="hr"></Grid>

                  <Grid xs={12} className="content-row">
                    <Grid xs={11}>
                      <label className="black">{selectedOption=="PC"
                        ? "★メール内容(PC)"
                        : "★メール内容(携帯）"}</label>
                    </Grid>
                  </Grid>
                  <Grid className="hr"></Grid>
                  <Grid xs={12} className="content-row">
                    <Grid xs={8}>
                      <Controller
                        name="content"
                        control={control}
                        defaultValue={memberData ? memberData?.sendmailgeneral?.content : ""}
                        render={({ field }) =>
                          < textarea
                          {...field}
                            className="bdr_textarea_mailmag"
                            rows={40}
                            style={{ width: textareaWidth }}
                             />}
                      />
                    </Grid>
                  </Grid>
                  <Grid className="hr"></Grid>
                  <Grid className="content-row">
                    <Button type="submit">
                      <img src={leftbtn} />
                    </Button>
                    <Button type="reset" onClick={() => handleReset()}>
                      <img src={rightbtn} />
                    </Button>
                  </Grid>
                </form>

              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </div>

  );
}

export default SendMailMagazineGeneral;
