import { Box, Button, Grid } from "@mui/material";
import React, { useState,useEffect } from "react";
import LeftPanChecksheet from "../LeftPanChecksheet";
import options from "../../BBS/Member monitor management/timedata";
import ButtonLeft from "../../../assets/images/pg_24_btn_left.gif";
import ButtonRight from "../../../assets/images/pg_24_btn_right.gif";
import CheckSheetHeader from "../Common/CheckSheetHeader";
import { useForm, Controller } from "react-hook-form";
import apiClient from "../../../API/API-client";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMemberReg } from "../../../Redux/actions";
import { useLocation } from 'react-router-dom';

const MoritaEmailReplay = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const handleReset = () => {
    setValue("template_subject","")
    setValue("template_content","")
    setValue("checksheet_title","")
    setValue("selected_checksheet_title", "選択する");
  };
  let rowData:any;
  const [selectedOption, setSelectedOption] = useState("PC");
  const [selectedOptionId, setSelectedOptionId] = useState<any>();
  const [textareaWidth, setTextareaWidth] = useState("100%");
  const [templateList,setTemplate]=useState<any>([])
  const [templateArrayList,settemplateArrayList]=useState<any>()
  const [checkSheetId,setCheckSheetType]=useState<any>()
  const[userEmail,setUserEmail]=useState<any>()
  const[DiagonoseId,setDiagonoseId]=useState<any>()
  const [type,setType]=useState(1)
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const selectedValue = watch('template_select');
  const location = useLocation();
  const mailContent = useSelector((state: any) => state.memberData?.emailcontent);
  const selectedData = useSelector((state: any) => state.memberData?.allCheckedItems);
  useEffect(() => {
    if (location && location.state && location.state.selectedOption) {
      setSelectedOption(location.state.selectedOption);
      setCheckSheetType(location.state.CheckSheetId)
     
    }
      
      if (selectedData) {
        // Filter data to include only items where mailsendstatus is not equal to 1
        const filteredData = selectedData?.filter((data:any) => data.mailSendStatus!== 1);
  
        // Extract emails from filtered data and store them in a new array
        const emails = filteredData?.map((data:any) => data.userEmail);
         // Extract diagonoseId from filtered data and store them in a new array
        const diagonoseIdList = filteredData?.map((data:any) => data.id);
         // Use a Set to eliminate duplicates and convert it back to an array
        const uniqueEmailsArray = Array.from(new Set(emails));
        setUserEmail(uniqueEmailsArray?uniqueEmailsArray:"")
        setDiagonoseId(diagonoseIdList?diagonoseIdList:"")
       
      }
      if (location && location.state) {
        rowData = location.state
        setCheckSheetType(rowData?.checkSheetType?.id)
        }
      const sessionStorageData = sessionStorage.getItem("emailcontent");
     
      if (sessionStorageData) {
      
        //parse to json
        const parsedObject: any = JSON.parse(sessionStorageData);
        //saves to redux state using dispatch method
        dispatch(setMemberReg("emailcontent", parsedObject));
  
        //assign the form fields using setValue below
        setValue(
          "checksheet_title",
          parsedObject?.checksheet_title
        );
        setValue(
          "template_content",
          parsedObject?.template_content
        );
        setValue(
          "template_subject",
          parsedObject?.template_subject
        );

        setValue("selected_checksheet_title", parsedObject?.selected_checksheet_title);
        //save to device type to state
        setSelectedOption(parsedObject?.type);
        //textarea width based on the device type
        setTextareaWidth(parsedObject?.type === "PC" ? "100%" : "250px");
        //check sheet type
        setCheckSheetType(parsedObject?.checksheetId);
        if (parsedObject?.type == "PC") {
       
          CheckSheetTemplateList("PC",parsedObject?.checksheetId);
        } else {
          CheckSheetTemplateList("SP",parsedObject?.checksheetId);
        }
      } else {
       
        CheckSheetTemplateList("PC",rowData?.checkSheetType?.id);
        setSelectedOption("PC");
      } 
   
  }, []);
  const handleOptionClick = async(option: any) => {
    setSelectedOption(option);
    setTextareaWidth(option === "PC" ? "100%" : "250px");
    await CheckSheetTemplateList(option,checkSheetId);
    setValue("template_subject","")
    setValue("template_content","")
    setValue("checksheet_title","")
  };

  const onSubmit = (data: any) => {
  const  formdata=getValues();
  
   if(!formdata.checksheet_title){
      alert("内容を記入されていない。")
      return
    }else
    if(!formdata.template_subject){
      alert("内容を記入されていない。")
      return
    } else if(!formdata.template_content){
      alert("内容を記入されていない。")
    }else{
      dispatch(setMemberReg("emailcontent", {
        ...data,
        type:selectedOption,
        checksheetId:location.state?.checkSheetType?.id,
       userEmail:userEmail,
       DiagonoseId:DiagonoseId
    }));
    
      navigate('/emailpreview');
    }
  };
const CheckSheetTemplateList=async(ModeSelected:any,checkSheetId:any)=>{
  let dataRequest;
  
  if(ModeSelected=="PC"){
    dataRequest={
      "checkSheetType":checkSheetId,
      "template_type":2
     }
  }else{
    dataRequest={
      "checkSheetType":checkSheetId,
      "template_type":1
     }
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
    console.error("Error:",error)
}
}
const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedId = event.target.value;
  const selectedTitleValue =event.target.value
  setSelectedOptionId(selectedId);
  if (selectedTitleValue === "選択する") {
    //The form fields will be cleared when '選択する' is chosen
    setValue("template_subject", "");
    setValue("template_content", "");
    setValue("checksheet_title","")
    setValue("selected_checksheet_title", "選択する");
  } else {
  if(selectedTitleValue){
  
  templateArrayList.map((item: any) => {
    if (item.templateTitle == selectedTitleValue) {
      //When a match is found, it will set the value in the form fields
      setValue("template_subject", item.templateTitle);
      setValue(
        "template_content",
        item.templateContent
      );
      setValue("checksheet_title", item.checksheetType.title);
      setValue("selected_checksheet_title", item.templateTitle);
    }
  });
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
              <Grid item xs={1}></Grid>
              <Grid item xs={11}>
                <Grid>
                  <label className="black"> ＜メルマガ・タイトル＞</label>
                </Grid>
                <Grid className="hr"></Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid>
                    <Controller
                      control={control}
                      defaultValue={mailContent?.checksheet_title}
                      name="checksheet_title"
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
                        onClick={() => handleOptionClick("PC")}
                        className={
                          selectedOption=== "PC"
                            ? "response_template_deviceType_selected black"
                            : "response_template_deviceType_notSelected black"
                        }
                      >
                        PC
                      </Grid>
                      <Grid className="black" item>
                        |
                      </Grid>{" "}
                      <Grid
                        item
                        onClick={() => handleOptionClick("SP")}
                        className={
                          selectedOption=== "SP"
                            ? "response_template_deviceType_selected black"
                            : "response_template_deviceType_notSelected black"
                        }
                      >
                        SP
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid className="content-row">
                    <Controller
                      control={control}
                     defaultValue={mailContent?.template_subject}
                      name="template_subject"
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
                  <Grid xs={12} className="content-row">
                    <Grid xs={7}>
                      <Controller
                        control={control}
                        defaultValue={mailContent?.template_content}
                        name="template_content"
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
                    <Grid xs={5}>
                    <Controller
                      control={control}
                      name="selected_checksheet_title"
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
                    <Button >
                      <img src={ButtonRight} onClick={handleReset} />
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

export default MoritaEmailReplay;
