import React, { useEffect, useState } from "react";
import { Grid, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import LeftPanChecksheet from "../LeftPanChecksheet";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import './tel.scss';
import apiClient from "../../../API/API-client";
import InputTextArea from "../../Common/Inputs/InputTextArea";
import InputText from "../../Common/Inputs/InputText";
import InputSelect from "../../Common/Inputs/InputSelect";
import savebutton from '../../../assets/images/savebutton.jpg'
import getOptions from "../../../utils/utls";
import resetbtn from '../../../assets/images/7nth_page_btn_1.gif'
import TelInputText from "./TelInputText";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from "react-router-dom";


const TelephoneConsultation = () => {

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [counselorOptions, setCounselorOptions] = useState<any[]>([]); // Store the fetched counselors
  const [jobOptions, setJobOptions] = useState<any[]>([]);
  const [routeOptions, setRouteOptions] = useState<any[]>([]);
  const [adviseOptions, setAdviseOptions] = useState<any[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string[]>([]);
  const [selectedAdvise, setSelectedAdvise] = useState<string[]>([])
  const { age, sessions, gender, self, symptomsList, StyledMenuItem } = getOptions();
  const navigate = useNavigate()

  // used to fetch data for different selection field counselorlist,jo,route and mainissues
  const fetchData = async () => {
    try {
      const [counselorRes, jobRes, routeRes, issuesRes] = await Promise.all([
        apiClient.post("api/reservation/counselorlist", {}),
        apiClient.post("/api/members/job", {}),
        apiClient.get("/api/telcounselling/route", {}),
        apiClient.get("/api/telcounselling/mainissues", {})
      ]);

      setCounselorOptions(counselorRes.data.data.map((item: any) => ({ name: item.name })));
      setJobOptions(jobRes.data.data.map((item: any) => ({ name: item.name })));
      setRouteOptions(routeRes.data.data.map((item: any) => ({ name: item.name })));
      setAdviseOptions(issuesRes.data.data.map((item: any) => ({ name: item.name })));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  // Set current date in the "date" field
  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    setValue('date', currentDate);
  }, [setValue]);

  // Function to handle checkbox changes
  const handleCheckboxChange = (symptomValue: string) => {
    setSelectedSymptoms((prevSelected) => {
      const newSelected = prevSelected.includes(symptomValue)
        ? prevSelected.filter((value) => value !== symptomValue)
        : [...prevSelected, symptomValue];
      setValue('mainIssues', newSelected.join(', ')); // Update mainissues field
      return newSelected;
    });
  };

  // Function to clear form fields
  const handleClear = () => {
    reset({
      no: "",
      date: new Date().toISOString().slice(0, 10),
      sessions: "選択する",
      routeselected: "",
      counsellor: "選択する",
      gender: "選択する",
      age: "選択する",
      job: "選択する",
      userType: "選択する",
      mainIssues: "",
      adviceselected: "",
      problemDetails: "",
      adviceDetails: ""
    });
    setSelectedSymptoms([]);
    setSelectedRoute([]);
    setSelectedAdvise([]);
  };

  /**
   * Function to save the response and validation 
   * @param data 
   * @returns 
   */
  const onSubmit: SubmitHandler<any> = async (data) => {
    Object.keys(errors).forEach(key => setError(key, { type: "manual", message: "" }));

    const requiredFields = [
      'date', 'sessions', 'routeselected', 'counsellor',
      'gender', 'age', 'job', 'userType', 'mainIssues',
      'adviceselected', 'problemDetails', 'adviceDetails'
    ];

    for (const field of requiredFields) {
      if (!data[field] || data[field] === "選択する") {
        setError(field, { type: "manual", message: `${field} is required.` });
        alert("すべてのフィールドは必須です");
        return;
      }
    }

    try {
      const formData = {
        ...data,
        route: data.routeselected,
        advice: data.adviceselected,
      };
      await apiClient.post("/api/telcounselling/save", formData);
      navigate('/savedresponse')
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Grid container className="main_container" xs={12} spacing={1} padding={1} >
      <Grid item xs={2} spacing={2}>
        <LeftPanChecksheet />
      </Grid>
      <Grid item xs={10}>
        <Box className='p2red_bg_midle'>
          <Grid justifyContent={'space-between'}>
            <span className='verdana_big'> A.電話相談の入力・閲覧・編集</span>
          </Grid>
        </Box>

        <form
          name="telconsultation"
          id="telConsultation"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container className="content-row content-padding" xs={12} spacing={2}>
            <Grid item xs={12} sm={2} className="content-row tel-list-padding">
            <label className="text" style={{ whiteSpace: 'nowrap' }}>・No</label>
            <InputText
                className="text_input"
                control={control}
                name="no"
                type="text"
                defaultValue={""}
                readOnly={true}
                error={errors.no?.message}
              />
                </Grid>
              <Grid item xs={12} sm={2} className="content-row tel-list-padding">
              <label className="text" style={{ whiteSpace: 'nowrap' }}>・受付日</label>
              <InputText
                control={control}
                name="date"
                defaultValue={setValue}
                className="text_input"
                setValue={setValue}
                error={errors.date}
                readOnly={true}
              />
            </Grid>
            

            <Grid item xs={12} sm={2} className="content-row tel-list-padding">
              <label className="text" style={{ whiteSpace: 'nowrap' }}>・回数</label>
              <InputSelect
                sampleOption="選択する"
                control={control}
                options={sessions}
                name="sessions"
                className="text_input"
                error={errors.sessions}
              />
            </Grid>

            <Grid item container xs={12} sm={4} spacing={1} alignItems="center"> 
                <label className="text">・認知経路</label>
                <Select
                  multiple
                  value={selectedRoute}
                  name="route"
                  displayEmpty
                  placeholder="選択する"
                  onChange={(event) => {
                    const selectedValues = event.target.value as string[];
                    setSelectedRoute(selectedValues);
                    setValue("routeselected", selectedValues.join(','));
                  }}
                  renderValue={(selected: string[]) => {
                    if (selected.length === 0) {
                      return (
                        <label className="left-aligned-text">
                          選択する
                        </label>
                      );
                    }
                    return(
                      <label className="left-aligned-text">
                      選択された
                    </label>
                    )
                  }}
                  className="custom-select"
                  inputProps={{
                    classes: { select: "text_input" },
                  }}
                  IconComponent={(props) => (
                    <KeyboardArrowDownIcon {...props} sx={{ fontSize: '18px' }} />
                  )}
                >
                  {routeOptions.map((route) => (
                    <StyledMenuItem key={route.name} value={route.name}>
                      {route.name}
                    </StyledMenuItem>
                  ))}
                </Select>
                <TelInputText
                  name="routeselected"
                  control={control}
                  defaultValue={selectedRoute.join(', ')}
                  readOnly={true}
                  className="text"
                />
              
            </Grid>

            <Grid item xs={12} sm={2} className="content-row tel-list-padding">
              <label className="text" style={{ whiteSpace: 'nowrap' }}>・相談員</label>
              <InputSelect
                sampleOption={"選択する"}
                control={control}
                options={counselorOptions}
                name="counsellor"
                className="text_input"
                error={errors.counsellor}
              />
            </Grid>
          </Grid>

          <Grid container className="middles_table" paddingLeft={4} paddingTop={2}>
            <Grid item xs={6} container alignItems={"center"} paddingBottom={1}>
              <Grid className="hr"></Grid>
              <Grid container justifyContent={'flex-start'} textAlign={"center"}>
                <label className="text"> ・相談者の性別</label>
                <InputSelect
                  sampleOption={"選択する"}
                  control={control}
                  options={gender}
                  name="gender"
                  className="input-select"
                  error={errors.gender}
                />
              </Grid>
              <Grid className="hr"></Grid>
              <Grid container justifyContent={"flex-start"}>
                <label className="text"> ・相談者の年代</label>
                <InputSelect
                  sampleOption={"選択する"}
                  control={control}
                  options={age}
                  name="age"
                  className="input-select"
                  error={errors.age}
                /></Grid>
              <Grid className="hr"></Grid>
              <Grid container justifyContent={"flex-start"}>
                <label className="text"> ・相談者の職業</label>
                <InputSelect
                  sampleOption={"選択する"}
                  control={control}
                  options={jobOptions}
                  name="job"
                  className="input-select"
                  error={errors.job}
                />
              </Grid>
              <Grid className="hr"></Grid>
              <Grid container justifyContent={"flex-start"} >
                <label className="text"> ・相談者の名前</label>
                <InputSelect
                  sampleOption={"選択する"}
                  control={control}
                  options={self}
                  name="userType"
                  className="input-select"
                  error={errors.userType}
                />
                <InputText
                  control={control}
                  defaultValue={""}
                  placeholder="名前"
                  name="name"
                  className="input-select-name"
                />

              </Grid>
              <Grid className="hr"></Grid>
              <Grid><label className="text">・主訴</label></Grid>
              <InputText
                className="input-take"
                control={control}
                defaultValue={selectedSymptoms.join(', ')}
                name="mainIssues"
                type="text"
                error={errors.mainIssues}
                readOnly={true}
              />
              <Grid>
                <Grid><label className="text">具体的症状(病気不安, 不眠)</label></Grid>
                <Grid container className="content-row middle_table">
                  {symptomsList.map((symptom) => (
                    <Grid className="content-row reservation-content-marginleft text" xs={12} key={symptom.value}>
                      <input
                        className="text"
                        type="checkbox"
                        value={symptom.value}
                        checked={selectedSymptoms.includes(symptom.value)}
                        onChange={() => handleCheckboxChange(symptom.value)}
                      />
                      <label className="text reservation-list-padding">{symptom.label}</label>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid className="hr"></Grid>
              <Grid container item xs={12} style={{ marginTop: '5px' }}>
              <label className="text"> 助言項目</label>
              <Select
                multiple
                value={selectedAdvise}
                onChange={(event) => {
                  const selectedValues = event.target.value as string[];
                  setSelectedAdvise(selectedValues);
                  setValue("adviceselected", selectedValues.join(','));
                }}
                renderValue={(value) => {
                  const selected = value as string[];
                  if (selected.length === 0) {
                    return (
                      <label className="left-aligned-text">
                        選択する
                      </label>
                    );
                  }
                  return(
                    <label className="left-aligned-text">
                    選択された
                  </label>
                  )
                }}
                className="custom-select"
                inputProps={{
                  classes: { select: "text_input" },
                }}
                displayEmpty={true}
                IconComponent={(props) => (
                  <KeyboardArrowDownIcon {...props} sx={{ fontSize: '18px' }} />
                )}
              >
                {adviseOptions.map((advise) => (
                  <StyledMenuItem disableRipple key={advise.name} value={advise.name} >
                    {advise.name}
                  </StyledMenuItem>
                ))}
              </Select>
              <TelInputText
                name="adviceselected"
                className="text"
                control={control}
                defaultValue={selectedAdvise.join(', ')}
                readOnly={true}
              />
              </Grid>
            </Grid>
            <Grid item xs={6} container paddingLeft={5} paddingBottom={1} >
              <Grid container direction="column" item>
                <Grid className="hr" />
                <Grid item>
                  <label className="text">・悩みの内容</label>
                </Grid>
                <Grid item padding={1}>
                  <InputTextArea
                    className="text-area"
                    setValue={setValue}
                    control={control}
                    name={"problemDetails"}
                    error={errors.problemDetails}
                  />
                </Grid>
              </Grid>
              <Grid container direction="column" item>
                <Grid className="hr" />
                <Grid item>
                  <label className="text">・助言の内容</label>
                </Grid>
                <Grid item padding={1}>
                  <InputTextArea
                    className="text-area"
                    setValue={setValue}
                    control={control}
                    name={"adviceDetails"}
                    error={errors.adviceDetails}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid>
            </Grid>
          </Grid>
          <Grid container display={"flex"} justifyContent={"center"}>
            <Button type='submit' className="button-size">
              <img
                src={savebutton}
              />
            </Button>
            <Button type="button" className="button-size">
              <img
                src={resetbtn}
                onClick={handleClear}
              />
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default TelephoneConsultation;