import { Button, Grid } from "@mui/material";
import React, { useState ,useEffect} from "react";
import LeftPanBBS from "../../../Common/LeftPanBBS";
import ButtonLeft from "../../../../assets/images/pg_24_btn_left.gif";
import ButtonRight from "../../../../assets/images/pg_24_btn_right.gif";
import { Link, useLocation } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setMemberReg } from "../../../../Redux/actions";
import ApiClient from "../../../../API/API-client";

const GeneralMailCorrection = () => {
   let id:any
  const [selectedOption, setSelectedOption] = useState("");
  const [textareaWidth, setTextareaWidth] = useState("");
  const [parsedObject, setParsedObject] = useState<any>(null);
  const [generalData, setGeneralData] = useState<any>([]);
  const [isLoaded,setLoaded]=useState<boolean>(false)
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setError,
    formState: { errors },
    setValue,
    getValues,
} = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const mailContent = useSelector((state: any) => state.memberData?.mailcontentgeneral);
  if (location && location.state) {
    id = location.state.data
  }
  
  useEffect(() => {
     /*when browser refresh or when back from preview screen
     condition to get redux stored values get here and setValue in each fields */
    const localStorageData1 = sessionStorage.getItem("mailcontentgeneral");
    if (localStorageData1) {
      const parsedObject: any = JSON.parse(localStorageData1); 
      setParsedObject(parsedObject);
      setValue("title", parsedObject.title);
      setValue("text", parsedObject.text);
      dispatch(setMemberReg("mailcontentgeneral", parsedObject));
    }
    if (location && location.state && location.state.selectedOption) {
      setSelectedOption(location.state.selectedOption);
      //setting textareawidth corresponding to the type whether it is pc or mobile
      setTextareaWidth(location.state.selectedOption === "PC" ? "600px" : "250px");
    }
    setTextareaWidth(location.state.data.type == 1 ? "600px" : "250px");
  }, []);

  const getMailGeneralMemberById = async () => {

    try {
        const apiData = await ApiClient.get('api/mailmag/' + id);
        setGeneralData(apiData.data.data)
        if (apiData) {
          setLoaded(true)
          setGeneralData(apiData?.data?.data)
          setSelectedOption(apiData?.data?.data.type === 1?"PC":"SP");
          setTextareaWidth(apiData?.data?.data.type === 1 ? "600px" : "250px");
          
        }

    } catch (error) {
        console.error('Error fetching users:', error);
        setLoaded(true)
    }
}

//handling the submitted form input values
  const onSubmit = async (data: any)=> {
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
      //save the dataRequest to redux
      dispatch(setMemberReg("mailcontentgeneral", dataRequest));
        navigate('/mailcorrectiongeneralPrev')
    }
    
  }

  //reset the form field  values entered by the user
  const handleReset=()=>{
    reset();
    setValue("title", "");
    setValue("text", "");
  }
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
               
                <form name="mailcontentgeneral" id="form" onSubmit={handleSubmit(onSubmit)}>
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
                      <label className="black">
                      
                        { location.state.data.type === 1 ? "★メール内容(PC)":"★メール内容(携帯）"}
                        </label>
                    </Grid>
                    <Grid xs={1} container spacing={1}>
                      <Grid item className=
                      
                      { location.state.data.type === 1 ? "Active_btnmailmag" : "Inactive_btnmailmag"}
                      >
                        PC
                      </Grid>
                      <Grid item className=
                      
                      { location.state.data.type === 2? "Active_btnmailmag" : "Inactive_btnmailmag"}
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
                        location?.state?.data?.text?location?.state?.data?.text:location?.state?.data?.textMob}
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
                    <Button onClick={()=>handleReset()}>
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

export default GeneralMailCorrection;
