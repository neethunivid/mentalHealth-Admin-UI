import { Button, Grid } from "@mui/material";
import { useState,useEffect } from "react";
import LeftPanBBS from "../../../Common/LeftPanBBS";
import { useForm, Controller } from "react-hook-form";
import ButtonLeft from "../../../../assets/images/pg_24_btn_left.gif";
import ButtonRight from "../../../../assets/images/pg_24_btn_right.gif";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setMemberReg } from "../../../../Redux/actions";

const BBSmail_correction = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [textareaWidth, setTextareaWidth] = useState("");
  const [parsedObject, setParsedObject] = useState<any>(null);
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
  
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //getting id from the listscreen
  
let Id:any;
const location = useLocation();
if (location && location.state&& location.state.data) {
  Id = location.state.data
}
//To store in redux
const bbsmailContent = useSelector((state: any) => state.memberData?.bbsmailcontent);

useEffect(() => {
  //to restore data while reloading and commming back from preview page
  const localStorageData1 = sessionStorage.getItem("bbsmailcontent");
    if (localStorageData1) {
      const parsedObject: any = JSON.parse(localStorageData1); 
 setParsedObject(parsedObject);
      setValue("title", parsedObject.title);
      setValue("text", parsedObject.text);
      dispatch(setMemberReg("bbsmailcontent", parsedObject));
    }
   
    
    
//to get selected option while coming back from previewpage
if (location && location.state && location.state.selectedOption) {
  setSelectedOption(location.state.selectedOption);
  setTextareaWidth(location.state.selectedOption === "PC" ? "600px" : "250px");
}
   setTextareaWidth(location.state.data.type == 1 ? "600px" : "250px");

}, []);

const onSubmit = async (data: any)=> {
  //checking for text and title
  if (!data.text) {
      alert("メールマガのテキストをご記入ください。")
      return
  } else if (!data.title ) {
      alert("メールマガのタイトルをご記入ください。")
      return
  } else {
    const dataRequest = {
    
      title: data.title,
      text: data.text,
      id:location.state.data.id?location.state.data.id:location.state.data, 
      type:location.state.data.type==1?"PC":"SP"
    }
  
      dispatch(setMemberReg("bbsmailcontent", dataRequest));
    
      navigate('/emailbbspreview',{ state: { selectedOption: selectedOption } });
  }
  
}
//to reset the values stored in redux
const handleReset=()=>{
  reset();
  setValue("title","");
  setValue("text","");
}
  return (
    <div>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={3}>
          <Grid className="hr"></Grid>
          <LeftPanBBS />
        </Grid>
        <Grid item xs={9}>
          <Grid className="hr"></Grid>
          <Grid className="content-row">
            <Grid className="p2red_bg_left size"></Grid>
            <Grid className="p2red_bg_midle">
              <Grid className="top-header">
                <span className="verdana_big">D.メルマガ会員へのメール送信（修正）</span>
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
            
            <Grid className="content-row">
              <Grid item xs={1}>
              </Grid>
              <Grid item xs={11}>
                <Grid>
                  <label className="black">	★タイトル</label>
                </Grid>
                <Grid className="hr"></Grid>
                <form id="formemailedit_BBS" onSubmit={handleSubmit(onSubmit)}>
                  <Grid>
                  <Controller
                      name="title"
                      control={control}
                      defaultValue={parsedObject===null?location.state.data?.title:parsedObject.title}
                      render={({ field }) => <input {...field} />}
                       />
                
                  </Grid>
                  <Grid className="hr"></Grid>
                  <Grid className="hr"></Grid>

                  <Grid xs={12} className="content-row">
                    <Grid xs={11}>
                      <label className="black">{ location.state.data.type === 1 ? "★メール内容(PC)":"★メール内容(携帯）"}</label>
                    </Grid>
                    <Grid xs={1} container spacing={1}>
                      <Grid item className={ location.state.data.type === 1 ? "Active_btnmailmag" : "Inactive_btnmailmag"}
                      >
                        PC
                      </Grid>
                      <Grid item className={ location.state.data.type === 2 ? "Active_btnmailmag" : "Inactive_btnmailmag"}
                      >
                       携帯
                      </Grid>
                    </Grid>
                  </Grid>
                 
                  <Grid className="hr"></Grid>
                  <Grid xs={12} className="content-row">
                    <Grid xs={8}>
                    <Controller
                      name="text"
                      control={control}
                      defaultValue={parsedObject!==null?parsedObject?.text:
                        location.state.data.text?location.state.data.text:location.state.data.textMob}
                      render={({ field }) =>
                       < textarea
                      className="bdr_textarea_mailmag"
                      rows={40}
                      style={{ width: textareaWidth }}
                       {...field} />}
                       />
                    </Grid>
                    
                  </Grid>
                  <Grid className="hr"></Grid>
                  <Grid className="content-row">
                    <Button type="submit">
                      <img src={ButtonLeft} />
                    </Button>
                    <Button type="reset" onClick={()=>handleReset()}>
                      <img src={ButtonRight} />
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
};

export default BBSmail_correction;
