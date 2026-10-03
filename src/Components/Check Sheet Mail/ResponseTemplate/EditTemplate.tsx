import { Box, Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import LeftPanChecksheet from "../LeftPanChecksheet";
import options from "../../BBS/Member monitor management/timedata";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMemberReg } from "../../../Redux/actions";
import apiClient from "../../../API/API-client";
import Response_header from "./Response_header";
const EditTemplate = () => {
  const [selectedOption, setSelectedOption] = useState("PC");
  const [textareaWidth, setTextareaWidth] = useState("100%");
  const [templateTitleList, setTemplateTitleList] = useState<any>([]);
  const [chekSheetType, setCheckSheetType] = useState();
  const [titleId, setTitleId] = useState<any>("");
  // Destructure form control functions and state variables from useForm() hook
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const location = useLocation();

  //get redux stored values using useSelector
  const responseEditTemplate: any = useSelector(
    (state: any) => state.memberData.responseEditTemplate
  );
  useEffect(() => {
    if (responseEditTemplate) {
     
      setValue("editTemplate_name", responseEditTemplate?.formData?.editTemplate_name);
      setValue(
        "editTemplate_content",
        responseEditTemplate?.formData?.editTemplate_content
      );
      setValue(
        "editTemplate_title",
        responseEditTemplate?.formData?.editTemplate_title
      );
   
      // setTitleId()
      //save to device type to state
      setSelectedOption(responseEditTemplate?.deviceType);
      //textarea width based on the device type
      setTextareaWidth(responseEditTemplate?.deviceType === "PC" ? "100%" : "250px");
      //check sheet type
      setCheckSheetType(responseEditTemplate?.checkSheetType);

      if (responseEditTemplate?.deviceType == "PC") {
        //fetching template title api 1 for pc 2 for sp
        templateTitle(1,  responseEditTemplate?.formData?.editTemplate_title);
      } else {
        templateTitle(2,  responseEditTemplate?.formData?.editTemplate_title);
      }
    } else {
      templateTitle(1);
      setSelectedOption("PC");
    }
  }, []);

  //template title api
  const templateTitle = async (data?: any,title?:any) => {
    try {
      const dataRequest = {
        checkSheetType: location.state ?? responseEditTemplate?.checkSheetType,
        template_type: data,
      };
      const apiData = await apiClient.post(
        "api/checksheetmail/listTemplateText",
        dataRequest
      );
      if (apiData) {
        //save the response to state
        setTemplateTitleList(apiData.data.data);
        if(title){
          apiData.data.data.map((item: any) => {
            if (item.templateTitle == title ) {
              setTitleId(item.id);
            }
          });
        }
    
      }
    } catch (error) {
      alert(error);
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //select device type
  const handleOptionClick = (option: any) => {
    //clear form fields using setValue
    setValue("editTemplate_name", "");
    setValue("editTemplate_content", "");
    // selected device stores to the state
    setSelectedOption(option);
    //text area width save to state to reflect the width according to selected device type
    setTextareaWidth(option === "PC" ? "100%" : "250px");
    // When the 'value'  is provided, an API call is initiated(templateTitle)
    let value;
    if (option == "SP") {
      value = 2;
    } else {
      value = 1;
    }
    templateTitle(value);
  };

  //function to edit existing template title
  const handleSaveButtonClick = async () => {
    const formData = getValues();
    if (titleId == "") {
      alert("select a title");
    } else {
      let value;
      templateTitleList.map((item: any) => {
        if (item.templateTitle == formData.editTemplate_title) {
          setTitleId(item.id);
          value = item.id;
        }
      });

      const dataRequest = {
        templateTitle: formData.editTemplate_name,
        templateContent: formData.editTemplate_content,
        templateType: selectedOption == "PC" ? 1 : 2,
      };

      try {
        const apiData = await apiClient.put(
          `api/checksheetmail/editchecksheettemplate/${value}`,
          dataRequest
        );
        if (apiData) {
          //navigate to home screen when successful api
          navigate("/responsetemplate");
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  //delete the existing template title is here
  const handleDeleteButtonClick = async () => {
    //when user not selected a title should give war
    if (titleId == "") {
      alert("select a title");
    } else {
      const userConfirmation = window.confirm("削除しますか？");
      if (userConfirmation) {
        try {
          const apiData = await apiClient.delete(
            `api/checksheetmail/deletetemplate/${titleId}`
          );
          if (apiData) {
            navigate("/responsetemplate");
          }
        } catch (error) {
          alert(error);
        }
      } else {
        // User clicked Cancel, do nothing or perform any additional actions
      }
    }
  };

  //this will create a new response title
  const handleSaveAsButtonClick = async () => {
    const formData = getValues();
    try {
      const dataRequest = {
        checksheetId:
          responseEditTemplate?.checkSheetType.toString() ??
          location.state.toString(),
        templateType: responseEditTemplate?.deviceType == "SP" ? "2" : "1",
        templateTitle:
          formData.editTemplate_name ??
          responseEditTemplate?.formData?.editTemplate_name ??
          formData.editTemplate_name,
        templateContent:
          formData.editTemplate_content ??
          responseEditTemplate?.formData?.editTemplate_content ??
          formData.editTemplate_content,
      };
      const apiData = await apiClient.post(
        `api/checksheetmail/checkExistingTemplateOrNot`,
        dataRequest
      );
      if (apiData) {
        // If the response returns a value of 0, it means that there are no titles with the same name in existence
        if (apiData.data.data == 0) {
          //create new title api calls here
          saveAsTitle();
        } else {
          //error message if there is currently exists
          alert("テンプレートのタイトルはすでに存在します");
        }
      }
    } catch (error) {}
  };

  //create new template title
  const saveAsTitle = async () => {
    const formData = getValues();
    let value;
    templateTitleList.map((item: any) => {
      if (item.templateTitle == formData.editTemplate_title) {
        setTitleId(item.id);
        value = item.id;
      }
    });
    const dataRequest = {
      checksheetId: location.state ?? responseEditTemplate?.checkSheetType,
      templateTitle: formData?.editTemplate_name,
      templateContent: formData?.editTemplate_content,
      templateType: selectedOption == "PC" ? 1 : 2,
    };
    try {
      const apiData = await apiClient.post(
        `api/checksheetmail/createTemplate`,
        dataRequest
      );
      if (apiData) {
        //navigate to home screen
        navigate("/responsetemplate");
      }
    } catch (error) {
      alert(error);
    }
  };

  //preview user entered form fields to the next screen
  const handlePreviewButtonClick = () => {
    const formData = getValues();

    if (
      formData.editTemplate_name == "" ||
      formData.editTemplate_name === undefined
    ) {
      alert("内容を記入されていない。");
      return;
    } else if (
      formData.editTemplate_content == "" ||
      formData.editTemplate_content === undefined
    ) {
      alert("内容を記入されていない。");
      return;
    }

    const confirmation = {
      formData: formData,
      deviceType: selectedOption ?? "PC",
      checkSheetType: location.state ?? chekSheetType,
    };

    dispatch(setMemberReg("responseEditTemplate", confirmation));

    navigate("/editpreview", { state: confirmation });
  };

  //When the select box is chosen, this function will be activated
  const handleSelectChange = (event: any) => {
    const selectedValue = event.target.value;
    // Update the selectedOption state
    if (selectedValue === "選択する") {
      //The form fields will be cleared when '選択する' is chosen
      setValue("editTemplate_name", "");
      setValue("editTemplate_content", "");
    } else {
      if (selectedValue) {
        //this will map through a list of template titles and find matches with the selected value
        templateTitleList.map((item: any) => {
          if (item.templateTitle == selectedValue) {
            //When a match is found, it will set the value in the form fields
            setValue("editTemplate_name", item.templateTitle);
            setValue("editTemplate_content", item.templateContent);
            setValue("editTemplate_title", selectedValue);
            setTitleId(item.id);
          }
        });
      }
    }
  };

  //api to make default title
  const makeDefaultTitle = async () => {
    if (titleId == "") {
      //when user not selected template title
      alert("テンプレートを選択してください");
    } else
      try {
        const apiData = await apiClient.put(
          `api/checksheetmail/setasdefaulttemplate/${titleId}`
        );
        if (apiData) {
          alert("テンプレートが作成された");
        }
      } catch (error) {}
  };
  return (
    <div>
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanChecksheet />
        </Grid>
        <Grid item xs={9}>
          <Response_header title={' I-2.回答用テンプレートの編集'}/>
          <Grid className="hr"></Grid>
          <Grid xs={12} container className="middle_table">
            <Grid className="hr"></Grid>
            <Grid
              xs={12}
              container
              spacing={1}
              className="response_flex_end"
            >
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
              <Grid
                item
                onClick={() => handleOptionClick("PC")}
                className={
                  selectedOption === "PC"
                    ? "response_template_deviceType_selected black"
                    : "response_template_deviceType_notSelected black"
                }
              >
                PC
              </Grid>
              <Grid className="black" item>
                |
              </Grid>
              <Grid
                item
                onClick={() => handleOptionClick("SP")}
                className={
                  selectedOption === "SP"
                    ? "response_template_deviceType_selected black"
                    : "response_template_deviceType_notSelected black"
                }
              >
                SP
              </Grid>
            </Grid>
            <form>
              <Grid
                item
                xs={12}
                container
                paddingLeft={6}
                paddingRight={2}
                paddingTop={3}
              >
                <Grid item xs={12} className="response-temp-margintop">
                  <span className="black"> （テンプレート名 ）</span>
                </Grid>
                <Grid className="hr"></Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    defaultValue={
                      responseEditTemplate?.formData?.editTemplate_name
                    }
                    name="editTemplate_name"
                    render={({ field }) => (
                      <input
                        {...field}
                        className="bdr_text_page_24th"
                        type="text"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} className="response-temp-margintop">
                  <span className="black ">（内容）</span>
                </Grid>
                <Grid xs={12} container className="content-row">
                  <Grid xs={8}>
                    <Controller
                      control={control}
                      defaultValue={
                        responseEditTemplate?.formData?.editTemplate_content
                      }
                      name="editTemplate_content"
                      render={({ field }) => (
                        <textarea
                          {...field}
                          className="bdr_textarea_mailmag"
                          rows={40}
                          style={{ width: textareaWidth }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={4}>
                    <Controller
                      control={control}
                      defaultValue={
                        responseEditTemplate?.formData?.editTemplate_title
                      }
                      name="editTemplate_title"
                      render={({ field }) => (
                        <select
                          {...field}
                          className="bdr_textarea_mailmag margn-left"
                          style={{ width: "200px" }}
                          onChange={handleSelectChange}
                        >
                          {/* Add the default option with "選択する" as its value */}
                          <option value="選択する">選択する</option>
                          {templateTitleList.map((item: any) => (
                            <option key={item.id} value={item.templateTitle}>
                              {item.templateTitle}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    <Grid className="hr"></Grid>
                    <Grid className="margn-left">
                      <Button
                        variant="contained"
                        className="defaultButton"
                        onClick={() => makeDefaultTitle()}
                      >
                        デフォルトテ ンプレート
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container xs={12}>
                  <Grid className="new_template_button_align">
                    <Button
                      variant="contained"
                      className="buttonstyle"
                      onClick={handleSaveButtonClick}
                    >
                      保存
                    </Button>
                  </Grid>
                  <Grid className="new_template_button_align">
                    <Button
                      variant="contained"
                      className="buttonstyle"
                      onClick={handlePreviewButtonClick}
                    >
                      プレビュー
                    </Button>
                  </Grid>
                  <Grid className="new_template_button_align">
                    <Button
                      variant="contained"
                      className="buttonstyle"
                      onClick={handleDeleteButtonClick}
                    >
                      削除
                    </Button>
                  </Grid>
                  <Grid className="new_template_button_align">
                    <Button
                      variant="contained"
                      className="buttonstyle"
                      onClick={handleSaveAsButtonClick}
                    >
                      別名で保存
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditTemplate;
