import { Box, Button, Grid,Typography } from "@mui/material";
import React, { useState,useEffect } from "react";
import LeftPanChecksheet from "../LeftPanChecksheet";
import ButtonLeft from "../../../assets/images/pg_24_btn_left.gif";
import ButtonRight from "../../../assets/images/pg_24_btn_right.gif";
import { useNavigate, useLocation } from 'react-router-dom';
import "../../Check Sheet Mail/check.scss";
import { useForm, Controller } from "react-hook-form";
import apiClient from "../../../API/API-client";
import { useSelector, useDispatch } from "react-redux";
import { setMemberReg } from "../../../Redux/actions";
import CheckSheetHeader from "../Common/CheckSheetHeader";

const ReserveListmailReplay = () => {
  const [textareaWidth, setTextareaWidth] = useState("620px");
  const [selectedOptionId, setSelectedOptionId] = useState<any>();
  const [parsedObject, setParsedObject] = useState<any>(null);
  const [templateList,setTemplate]=useState<any>([])
  const [templateArrayList,settemplateArrayList]=useState<any>()
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const sendmailData: any = useSelector(
    (state: any) => state?.memberData?.mailEditdata
  );
  //function to submit form values
  const onSubmit = async (data: any) => {
    if(!data.templateTitle){
      alert("内容を記入されていない。")
      return
    }else
    if(!data.magMailsubject){
      alert("内容を記入されていない。")
      return
    } else if(!data.templatecontent){
      alert("内容を記入されていない。")
    }
    else{
    const Datarequest={
      title:data.templateTitle,
      content:data.templatecontent,
      userEmail:location.state.data.userEmail,
      device:location.state.data.device,
      Id:location.state.data.id,
      mailMagsub:data.magMailsubject,
      templatelist:templateArrayList,
      templateArray:templateList,
    }
    //save the values in redux asnd pass the values to next preview screeb
   dispatch(setMemberReg("mailEditdata", Datarequest));
   
   navigate('/Reservemailpreview');
  }
  };
  //function to reset form values
  const handleReset = () => {
    setValue("templateTitle","");
    setValue("templatecontent","");
  };
  const location = useLocation();
  if (location && location.state) {
   
  }

  useEffect(() => {
      
       
  if(location && location.state&&location.state.data){
    setTextareaWidth(location.state.data.device == "PC" ? "600px" : "250px"); 
    setValue("templateTitle",location.state.data.title)
  setValue("templatecontent",location.state.data.content)
  setValue("magMailsubject",location.state.data.magMailSubject)
  CheckSheetTemplate();
  }


}, []);
//select option api function
const CheckSheetTemplate=async()=>{
  
 let dataRequest={
      "checkSheetType":location.state.data.typeId,
      "template_type":location.state.data.device==="PC"?2:1
     }
  try {
    const apiData = await apiClient.post('api/checksheetmail/listTemplateText', dataRequest);
    if (apiData) {
      setTemplate(apiData?.data?.data)

      if (apiData?.data?.data?.length > 0) {
        
          
          settemplateArrayList(apiData?.data?.data)
        
        
        
         
        }  
    }

} catch (error: any) {
    if (error.response && error.response.status === 403) {

        console.error("403 error occurred");
    } else {

        console.error("Error occurred:", error);
    }
}
}
//change the selection option 
const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedId = event.target.value;
  const selectedTitleValue =event.target.value
  setSelectedOptionId(selectedId);
  if(selectedTitleValue){
   templateArrayList.map((option:any) =>{ if(option.templateTitle === selectedTitleValue){
  setValue("templateTitle",option.templateTitle)
  setValue("templatecontent",option.templateContent)
  setValue("magMailsubject",option.checksheetType.title)
  setValue("selectField", option.templateTitle);
   }
   });
  }else{
    if(selectedTitleValue === "選択する"){
    setValue("templateTitle","")
    setValue("templatecontent","")
    setValue("magMailsubject","")
    setValue("selectField", "選択する");
    }
  }
};
  return (
    <div>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={3}>
          <Grid className="hr"></Grid>
          <LeftPanChecksheet />
        </Grid>
        <Grid item xs={9}>
          <CheckSheetHeader label="F. メール送信と作成" />
          <Grid className="hr"></Grid>
          <Grid xs={12} className="middle_table">
            <Grid className="hr"></Grid>
            <Grid className="content-row">
              <Grid item xs={1}>
              </Grid>
             
              <Grid item xs={11}>
                <Grid>
                  <Typography className="black"> ＜メルマガ・タイトル＞</Typography>
                </Grid>
                <Grid className="hr"></Grid>
                <form name="ReservationList_form" onSubmit={handleSubmit(onSubmit)}>
                <Grid>
               <Controller
                      control={control}
                      defaultValue={location.state.data.magMailSubject}
                      name="magMailsubject"
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            className="bdr_text_page_24th"
                            type="text"
                          ></input>
                        </>
                      )}
                    />
                  </Grid>
                  <Grid className="hr"></Grid>
                  <Grid className="hr"></Grid>
                  

                  <Grid xs={12} className="content-row">
                    <Grid xs={11}>
                      <label className="black">件名</label>
                    </Grid>
                   
                  
                    <Grid xs={1} container spacing={1}>
                      <Grid
                  item
                  className={
                    location.state.data.device === "PC"
                      ? "Active_btnmailmag"
                      : "Inactive_btnmailmag"
                  }
                >
                  PC
                </Grid>
                <Grid
                  item
                  className={
                    location.state.data?.device === "SP"
                      ? "Active_btnmailmag"
                      : "Inactive_btnmailmag"
                  }
                >
                SP
                </Grid>
                    </Grid>
                  </Grid>
                  <Grid className="hr"></Grid>
                  <Grid className="content-row">
                  
                  <Controller
                      control={control}
                     defaultValue={location.state.data.title}
                      name="templateTitle"
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            className="bdr_text_page_24th"
                            type="text"
                          ></input>
                        </>
                      )}
                    />
                  </Grid>
                  <Grid className="hr"></Grid>
                  <Grid xs={12} container className="content-row">
                    <Grid xs={8}>
                     <Controller
                        control={control}
                        defaultValue={location.state.data.content}
                        name="templatecontent"
                        render={({ field }) => (
                          <>
                            <textarea
                              {...field}
                              className="bdr_textarea_mailmag"
                              rows={40}
                              style={{ width: textareaWidth }}
                            />
                          </>
                        )}
                      />
                    
                    </Grid>
                    <Grid xs={4}>
                    <Controller
                      control={control}
                      name="seletField"
                      render={({ field }) => (
                        <select
                          {...field}
                          className="bdr_textarea_mailmag mgleft"
                          style={{ width: "200px" }}
                          onChange={handleSelectChange}
                        >
                          {/* Add the default option with "選択する" as its value */}
                          <option value="選択する">選択する</option>
                          {templateArrayList?.map((item: any) => (
                            <option key={item.id} value={item.templateTitle}>
                              {item.templateTitle}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    </Grid>
                  </Grid>
                  <Grid className="hr"></Grid>
                  <Grid className="content-row">
                    <Button type="submit">
                      <img src={ButtonLeft} />
                    </Button>
                    <Button type="button" onClick={handleReset}>
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

export default ReserveListmailReplay;
