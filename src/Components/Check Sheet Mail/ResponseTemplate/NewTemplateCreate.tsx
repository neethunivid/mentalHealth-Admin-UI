import { Box, Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import LeftPanChecksheet from "../LeftPanChecksheet";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMemberReg } from "../../../Redux/actions";
import apiClient from "../../../API/API-client";
import Response_header from "./Response_header";

const NewTemplateCreate = () => {
  const [selectedOption, setSelectedOption] = useState("PC");
  const [textareaWidth, setTextareaWidth] = useState("100%");
  const [templateTitleList, setTemplateTitleList] = useState<any>([]);
  const [checkSheetType, setCheckSheetType] = useState();
  const [mailTemplateType, setMailTemplateType]=useState(2);

  // Destructure form control functions and state variables from useForm() hook
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const location = useLocation();

  //get redux stored values using useSelector
  const responsetemplate: any = useSelector((state: any) => state.memberData);

  useEffect(() => {
    //gets sessionStored form fields
    const sessionStorageData = sessionStorage.getItem("responsetemplate");
    if (sessionStorageData) {
      //parse to json
      const parsedObject: any = JSON.parse(sessionStorageData);
      //saves to redux state using dispatch method
      dispatch(setMemberReg("responsetemplate", parsedObject));

      //assign the form fields using setValue below
      setValue(
        "newTemplateCreate_name",
        parsedObject?.formData?.newTemplateCreate_name
      );
      setValue(
        "newTemplateCreate_template_content",
        parsedObject?.formData?.newTemplateCreate_template_content
      );
      setValue(
        "newTemplateCreate_temp_title",
        parsedObject?.formData?.newTemplateCreate_temp_title
      );
      //save to device type to state
      setSelectedOption(parsedObject?.deviceType);
      //textarea width based on the device type
      setTextareaWidth(parsedObject?.deviceType === "PC" ? "100%" : "250px");
      //check sheet type
      setCheckSheetType(parsedObject?.checkSheetType);
      templateTitle(parsedObject?.deviceType === "PC" ? 2 : 1);
    } else {
      templateTitle(1);
      setSelectedOption("PC");
    }


    setCheckSheetType(location.state ?? responsetemplate?.responsetemplate?.checkSheetType);
  }, []);

  //template title api
  const templateTitle = async (templateType?: any) => {
    try {
      const dataRequest = {
        checkSheetType: checkSheetType ?? location.state,
        template_type: templateType,
      };
      const apiData = await apiClient.post(
        "api/checksheetmail/listTemplateText",
        dataRequest
      );
      if (apiData) {
        //save the response to state
        setTemplateTitleList(apiData.data.data);
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
    setValue("newTemplateCreate_name", "");
    setValue("newTemplateCreate_template_content", "");
    // selected device stores to the state
    setSelectedOption(option);
    //text area width save to state to reflect the width according to selected device type
    setTextareaWidth(option === "PC" ? "100%" : "250px");

    // When the 'value'  is provided, an API call is initiated(templateTitle)
    const templateType = option === "SP" ? 1 : 2;
    templateTitle(templateType);
    setMailTemplateType(templateType)
  };

  //When the select box is chosen, this function will be activated
  const handleSelectChange = (event: any) => {
    const selectedValue = event.target.value;

    // Update the selectedOption state
    if (selectedValue === "選択する") {
      //The form fields will be cleared when '選択する' is chosen
      setValue("newTemplateCreate_name", "");
      setValue("newTemplateCreate_template_content", "");
    } else {
      if (selectedValue) {
        //this will map through a list of template titles and find matches with the selected value
        templateTitleList.map((item: any) => {
          if (item.templateTitle == selectedValue) {
            //When a match is found, it will set the value in the form fields
            setValue("newTemplateCreate_name", item.templateTitle);
            setValue(
              "newTemplateCreate_template_content",
              item.templateContent
            );
            setValue("newTemplateCreate_temp_title", selectedValue);
          }
        });
      }
    }
  };

  //Preview user entered field values to the next screen
  const handlePreviewButtonClick = () => {
    const formData = getValues();
    //show alert messages when user not enter required fields
    if (
      formData.newTemplateCreate_name === "" ||
      formData.newTemplateCreate_name === undefined
    ) {
      alert("内容を記入されていない。");
      return;
    } else if (
      formData.newTemplateCreate_template_content === "" ||
      formData.newTemplateCreate_template_content === undefined
    ) {
      alert("内容を記入されていない。");
      return;
    }
    //custom json to pass to next screen as params
    const confirmation = {
      formData: formData,
      deviceType: selectedOption ?? "PC",
      checkSheetType: location.state ?? checkSheetType,
    };
    //to save to redux state
    dispatch(setMemberReg("responsetemplate", confirmation));
    navigate("/confirmtemplate", { state: { confirmation } });
  };

  //checking user entered title is already exist or not
  const isExistingTitle = async (data: any) => {
    const formData = getValues();
    const confirmation = {
      formData: formData,
      deviceType: selectedOption ?? "PC",
      checkSheetType: checkSheetType ?? location.state,
    };
    dispatch(setMemberReg("responsetemplate", confirmation));
    try {
      const dataRequest = {
        checksheetId: checkSheetType ?? location.state,
        templateType: mailTemplateType,
        templateTitle:
          data.newTemplateCreate_name ??
          responsetemplate?.responsetemplate?.formData
            ?.newTemplateCreate_name ??
          data.newTemplateCreate_name,
        templateContent:
          data.newTemplateCreate_template_content ??
          responsetemplate?.responsetemplate?.formData
            ?.newTemplateCreate_template_content ??
          data.newTemplateCreate_template_content,
      };

      const apiData = await apiClient.post(
        `api/checksheetmail/checkExistingTemplateOrNot`,
        dataRequest
      );
      if (apiData) {
        // If the response returns a value of 0, it means that there are no titles with the same name in existence
        if (apiData.data.data == 0) {
          //create new title api calls here
          createNewTemplate(data);
        } else {
          //error message if there is currently exists
          alert("テンプレートのタイトルはすでに存在します");
        }
      }
    } catch (error) {}
  };

  //create new template title is calls here
  const createNewTemplate = async (data: any) => {
    const formData = getValues();
    const confirmation = {
      formData: formData,
      deviceType: selectedOption ?? "PC",
      checkSheetType: location.state ?? checkSheetType,
    };
    try {
      const dataRequest = {

        checksheetId: checkSheetType ?? location.state,
        templateType: mailTemplateType,
        templateTitle:
          data.newTemplateCreate_name ??
          responsetemplate?.responsetemplate?.formData
            ?.newTemplateCreate_name ??
          formData.newTemplateCreate_name,
        templateContent:
          data.newTemplateCreate_template_content ??
          responsetemplate?.responsetemplate?.formData
            ?.newTemplateCreate_template_content ??
          formData.newTemplateCreate_template_content,
      };
      const apiData = await apiClient.post(
        "api/checksheetmail/createTemplate",
        dataRequest
      );
      if (apiData) {
        //back to first home screen
        navigate("/responsetemplate");
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
          <Response_header title={'  I-1. 回答用テンプレートの新規作成'}/>
          <Grid className="hr"></Grid>
          <Grid xs={12} container className="middle_table">
            <Grid className="hr"></Grid>
            <Grid
              xs={12}
              container
              spacing={1}
              className="response_flex_end"
              // display={"flex"}
              // justifyContent={"flex-end"}
            >
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
              <Grid
                item
                onClick={() => handleOptionClick("PC")}
                className={
                  !selectedOption || selectedOption === "PC"
                    ? "response_template_deviceType_selected black"
                    : "response_template_deviceType_notSelected black"
                }
              >
                PC
              </Grid>
              <Grid className="black" item>
                |
              </Grid>{" "}
              {/* This is the vertical bar */}
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
            <form
              id="responsetemplate"
              onSubmit={handleSubmit(isExistingTitle)}
            >
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
                      responsetemplate?.responsetemplate?.formData
                        ?.newTemplateCreate_name
                    }
                    name="newTemplateCreate_name"
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
                        responsetemplate?.responsetemplate?.formData
                          ?.newTemplateCreate_template_content
                      }
                      name="newTemplateCreate_template_content"
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
                        responsetemplate?.responsetemplate?.formData
                          ?.newTemplateCreate_temp_title
                      }
                      name="newTemplateCreate_temp_title"
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
                  </Grid>
                </Grid>
                <Grid item xs={12} className="response-tmp-content-row">
                  <Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      className="buttonstyle"
                      //   onClick={()=>isExistingTitle()}
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
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewTemplateCreate;
