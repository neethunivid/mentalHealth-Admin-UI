import { Button, Grid ,Typography} from "@mui/material";
import React from "react";
import LeftPanBBS from "../../Common/LeftPanBBS";
import MemberMoDelDetailHeader from "./Member monitor Comp/MemberMoDelDetailHeader";
import { useForm, Controller } from "react-hook-form";
import returnButton from "../../../assets/images/pg_16_btn_right.gif";
import EditButton from "../../../assets/images/pg_17_btn_blue_left.gif";
import deleteButton from "../../../assets/images/pg_17_btn_blue_middle.gif";
import resetButton from "../../../assets/images/pg_17_btn_blue_right.gif";
import { useNavigate, useLocation } from 'react-router-dom';
import ApiClient from "../../../API/API-client";
import { useState, useEffect } from "react";
import { formatDateTime } from "../../Common/Date_conversion";
const SearchModifyDeleteDetail = () => {
  let  previewData : any
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [dataChanged, setDataChanged] = useState(false);
  const [updatedText, setUpdatedText] = useState();
//updates the remarks text in the on submit
  const onsubmit = async (data: any) => {
    const confirmSubmit = window.confirm("この内容で修正しますか");
    if (confirmSubmit) {
      try {
       await remarkUpdate(data);
        setDataChanged(true);
      } catch (error) {
        console.error("Error occurred while updating data:", error);
      }
    } else {
      console.log("API call canceled by user.");
    }
  };
  //set the value during reloading
  useEffect(() => {
    setValue('member_monitor_detail_statement_content', previewData.text);
  }, [previewData, setValue]);
//data coming from membermonitor screen
  const location = useLocation();
  if (location && location.state&& location.state.data) {
    previewData = location.state.data
  
    
  }
   //gets date in the format 'YYYY/MM/DD ddd HH:mm'
  const itemDate = previewData.date
  ? new Date(previewData.date[0], previewData.date[1] - 1, previewData.date[2], previewData.date[3], previewData.date[4])
  : null;
  const handlereturnClick = () => {
  
    navigate('/membermonitor');
  };
  //update api for remarks text update
  const remarkUpdate = async (data: any) => {
  const dataRequest = {
      text:data.member_monitor_detail_statement_content
    }
    try {
        const apiData = await ApiClient.put('api/updateRemarkById/'+previewData.id, dataRequest, {});
        if (apiData) {
        setUpdatedText(apiData.data.data.text);
      
        }
    } catch (error: any) {
        if (error.response && error.response.status === 403) {
            console.error("403 error occurred");
        } else {
            console.error("Error occurred:", error);
        }
    }


}
//deletes the remarks
const remarkDelete = async () => {
  const confirmed = window.confirm('この発言内容を削除しますか？');
  if (confirmed) {
    try {
      const apiData = await ApiClient.delete('api/deleteRemark/' + previewData.id, {});
      if (apiData) {
        navigate('/membermonitor');
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
  //resets the text area
  const handleReset = () => {
    reset({
      member_monitor_detail_statement_content: "",
    });
  };
   //gets date in the format 'YYYY/MM/DD ddd HH:mm'
  const formattedDate = itemDate ? formatDateTime(itemDate) : null;
  return (
    <Grid container xs={12} padding={1} spacing={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanBBS />
      </Grid>
      <Grid item xs={9}>
        <MemberMoDelDetailHeader />
        <Grid xs={12}>
          <Grid item xs={8}>
            <ul className="black_bold">
              <li className="list_style member_mointer_content_listData">
                <Grid container>
                  <Grid item xs={12}>
                    ●発言No:{previewData.remarkNo}
                  </Grid>
                  <Grid item xs={12}>
                    ●発言日： {formattedDate}
                  </Grid>
                  <Grid item xs={12}>
                    ●ID：{previewData.memberid}
                  </Grid>
                  <Grid item xs={12}>
                    ●タイプ区分：{previewData.normal==1? "普通神経症の部屋":previewData.other==1?"その他の部屋":previewData.blackmail==1?"強迫神経症の部屋":previewData.anxiety==1?"不安神経症の部屋":previewData.growingup==1?"成長の部屋":previewData.addition1!==""?"新規1":"新規２"}
                        
                  </Grid>
                  <Grid item xs={12}>
                    ●Mail：{previewData.emailPc}
                  </Grid>
                  <Grid item xs={12}>
                    ●タイトル：{previewData.title}
                  </Grid>
                  <Grid item xs={12}>
                    ●発言内容：{updatedText?updatedText:previewData.text}
                  </Grid>
                </Grid>
              </li>
            </ul>
          </Grid>
        </Grid>
        {dataChanged ? (
          // Render the updated data with a back button
          <Grid>
            <Grid className="greytopbtm">
              <Typography className="red_font_2">詳細が変更されました。</Typography>
            </Grid>
            <Grid className="itemgrid">
            <Button type="button" className="member_mointer_content_button" onClick={() => handlereturnClick()}>
              <img className="padding_top" src={returnButton} alt="Return" />
            </Button>
            </Grid>
          </Grid>
        ) : (
        <form onSubmit={handleSubmit(onsubmit)}>
          <Grid xs={12}>
            <Controller
              control={control}
              name="member_monitor_detail_statement_content"
              defaultValue={previewData.text}
              render={({ field }) => (
                <textarea
                  cols={80}
                  rows={10}
                  className="middle_table"
                  {...field}
                />
              )}
            />
          </Grid>
       
        <Grid className="hr"></Grid>
        <Grid className="hr"></Grid>
        <Grid xs={12} className="content-row member_moniter_detail_buttonAlignment">
          <Button type="button" onClick={() => handlereturnClick()}>
            <img
              className="padding_top"
              src={returnButton}
             
            />
          </Button>
          <Button type="submit">
            <img
              className="padding_top"
              src={EditButton}
              alt="edit"
        
            />
          </Button>
          <Button type="button" onClick={remarkDelete}>
            <img
              className="padding_top"
              src={deleteButton}
               alt="delete"
            />
          </Button>
          <Button type="button" onClick={() => handleReset()}>
            <img
              className="padding_top"
              src={resetButton}
              alt="reset"
            />
          </Button>
        </Grid>
        </form>
        )}
      </Grid>
    </Grid>
  );
};

export default SearchModifyDeleteDetail;
