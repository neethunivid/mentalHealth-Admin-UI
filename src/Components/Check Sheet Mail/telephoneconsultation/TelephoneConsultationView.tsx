import React, { useEffect, useState } from "react";
import { Grid, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import LeftPanChecksheet from "../LeftPanChecksheet";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import './tel.scss';
import ApiClient from "../../../API/API-client";
import apiClient from "../../../API/API-client";
import { useSelector, useDispatch } from "react-redux";
import InputTextArea from "../../Common/Inputs/InputTextArea";
import InputText from "../../Common/Inputs/InputText";
import InputSelect from "../../Common/Inputs/InputSelect";
import editbutton from '../../../assets/images/edit.svg'
import removebutton from "../../../assets/images/delete.svg"
import getOptions from "../../../utils/utls";
import TelInputText from "./TelInputText";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useLocation } from 'react-router-dom';
import { formatDateArray } from "../../Common/Date_conversion";
import { useNavigate } from "react-router-dom";

//component used for rendering tel counselling view
const TelephoneConsultationView = () => {
    let id: any
    const {
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm();
    const location = useLocation();
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [counselorOptions, setCounselorOptions] = useState<any[]>([]); // Store the fetched counselors
    const [jobOptions, setJobOptions] = useState<any[]>([]);
    const [routeOptions, setRouteOptions] = useState<any[]>([]);
    const [adviseOptions, setAdviseOptions] = useState<any[]>([]);
    const [selectedRoute, setSelectedRoute] = useState<string[]>([]);
    const [selectedAdvise, setSelectedAdvise] = useState<string[]>([])
    const [apiTeldata, setData] = useState<any>({})
    const telData: any = useSelector((state: any) => state.telData?.telData_by_id);
    if (location && location.state && location.state.data) {
        id = location.state.data
    }
    const [routeSelected, setRouteSelected] = React.useState<string[]>([]);
    const [adviseSelected, setAdviseSelected] = React.useState<string[]>([]);
    const navigate = useNavigate();
    const { age, sessions, self, gender, symptomsList } = getOptions();

    useEffect(() => {
        if (apiTeldata?.data?.mainIssues) {
            const mainIssuesArray = apiTeldata.data.mainIssues.split(', ').map((issue: string) => issue.trim());  
            setSelectedSymptoms(mainIssuesArray);
        }
    }, [apiTeldata]);



    //used to fetch data by id
    const fetchTelconsById = async () => {
        try {
            const apiTeldata = await ApiClient.get(`api/telcounselling/view/${id}`);
            if (apiTeldata?.data) {
                setData(apiTeldata?.data);
                reset({
                    date: formatDateArray(apiTeldata?.data?.data?.date) || "",
                    sessions: apiTeldata?.data?.data?.sessions || "",
                    routeselected: apiTeldata?.data?.data?.route || "",
                    counsellor: apiTeldata?.data?.data?.counsellor || "",
                    gender: apiTeldata?.data?.data?.gender || "",
                    age: apiTeldata?.data?.data?.age || "",
                    job: apiTeldata?.data?.data?.job || "",
                    userType: apiTeldata?.data?.data?.userType || "",
                    name: apiTeldata?.data?.data?.name || "",
                    mainIssues: apiTeldata?.data?.data?.mainIssues || "",
                    adviceselected: apiTeldata?.data?.data?.advice || "",
                    problemDetails: apiTeldata?.data?.data?.problemDetails || "",
                    adviceDetails: apiTeldata?.data?.data?.adviceDetails || "",

                });
                const routes = apiTeldata?.data?.data?.route ? apiTeldata?.data?.data?.route.split(',') : [];
                setRouteSelected(routes);
                const advise = apiTeldata?.data?.data?.advice ? apiTeldata?.data?.data?.advice.split(',') : [];
                setAdviseSelected(advise);

                const selectedSymptoms: string[] = [];

                if (apiTeldata?.data?.data?.advice1 === '普通神経症') {
                    selectedSymptoms.push('普通神経症');
                }
                if (apiTeldata?.data?.data?.advice2 === "不安神経症") {

                    selectedSymptoms.push('不安神経症');
                }
                if (apiTeldata?.data?.data?.advice3 === "パニック症") {
                    selectedSymptoms.push('パニック症');
                }
                if (apiTeldata?.data?.data?.advice4 === "強迫観念・強迫症") {
                    selectedSymptoms.push('強迫観念・強迫症');
                }
                if (apiTeldata?.data?.data?.advice5 === "対人・社交不安症") {
                    selectedSymptoms.push('対人・社交不安症');
                }
                if (apiTeldata?.data?.data?.advice6 === "気分障害") {
                    selectedSymptoms.push('気分障害');
                }
                if (apiTeldata?.data?.data?.advice7 === "その他神経症") {
                    selectedSymptoms.push('その他神経症');
                }
                if (apiTeldata?.data?.data?.advice8 === "その他") {
                    selectedSymptoms.push('その他');
                }
                setSelectedSymptoms((prev) => selectedSymptoms);
                setValue('mainIssues', selectedSymptoms.join(', '));
            }
            const mainIssuesArray = apiTeldata?.data?.data?.mainIssues
                    ? apiTeldata.data.data.mainIssues.split(', ')
                    : [];

                setSelectedSymptoms(mainIssuesArray);      // Update selectedSymptoms state
                setValue('mainIssues', mainIssuesArray.join(', ')); 

        } catch (error) {
            console.error("Error fetching telephone consultation details:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchTelconsById();
        }
    }, [id, setValue]);

    // Handle Remove Function to Delete Consultation
    const handleRemove = async () => {
        try {
            if (id) {
                const response = await apiClient.delete(`/api/telcounselling/delete/${id}`);
                if (response.status === 200) {
                    navigate('/deleteresponse')
                } else {
                    alert("削除に失敗しました");
                }
            }
        } catch (error) {
            console.error("Error deleting consultation:", error);
            alert("削除中にエラーが発生しました");
        }
    };

    const handleNavigation = () => {
        navigate('/telephoneconsultationedit', { state: { data: id } }); // Navigate to the desired route
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
                >
                    <Grid container className="content-row content-padding" spacing={2} >
                        <Grid item xs={12} sm={2} className="content-row tel-list-padding">
                            <label className="text">・No</label>
                            <InputText
                                className="text_input"
                                control={control}
                                name="no"
                                type="text"
                                defaultValue={id}
                                error={errors.no?.message}
                                readOnly={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <label className="text">・受付日</label>
                            <InputText
                                control={control}
                                name="date"
                                defaultValue={apiTeldata?.data?.date || ""}
                                className="text_input"
                                readOnly={true}
                                error={errors.date}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <label className="text">・回数</label>
                            <InputSelect
                                sampleOption={apiTeldata?.data?.sessions}
                                control={control}
                                options={sessions}
                                name="sessions"
                                defaultValue={apiTeldata?.data?.sessions}
                                className="text_input"
                                readOnly={true}
                                error={errors.sessions}
                            />
                        </Grid>

                        <Grid item xs={16} sm={4} container spacing={1} alignItems="center">
                            <label className="text">・認知経路</label>
                            <Select
                                multiple
                                value={routeSelected}
                                name="route"
                                readOnly={true}
                                onChange={(event) => {
                                    const selectedValues = event.target.value as string[];
                                    setRouteSelected(selectedValues);
                                    setValue("routeselected", selectedValues.join(", "));
                                }}
                                renderValue={(selected: string[]) => {
                                    if (selected.length === 0) {
                                        return (
                                            <label className="left-aligned-text">
                                                選択する
                                            </label>
                                        );
                                    }
                                    return (
                                        <label className="left-aligned-text">
                                            選択された
                                        </label>
                                    );
                                }}
                                displayEmpty
                                className="custom-select"
                                inputProps={{
                                    classes: { select: "text_input" },
                                }}
                                IconComponent={(props) => (
                                    <KeyboardArrowDownIcon {...props} sx={{ fontSize: "18px" }} />
                                )}
                            >
                                {routeOptions.map((route) => (
                                    <MenuItem key={route.name} value={route.name}>
                                        {route.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <TelInputText
                                name="routeselected"
                                control={control}
                                value={routeSelected || ""}
                                readOnly={true}
                                className="text"
                            />
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <label className="text">・相談員</label>
                            <InputSelect
                                sampleOption={apiTeldata?.data?.counsellor || ""}
                                control={control}
                                defaultValue={apiTeldata?.data?.counsellor || ""}
                                options={counselorOptions}
                                name="counsellor"
                                className="text_input"
                                readOnly={true}
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
                                    sampleOption={apiTeldata?.data?.gender || ""}
                                    control={control}
                                    options={gender}
                                    defaultValue={apiTeldata?.data?.gender || ""}
                                    name="gender"
                                    readOnly={true}
                                    className="input-select"
                                    error={errors.gender}
                                />
                            </Grid>
                            <Grid className="hr"></Grid>
                            <Grid container justifyContent={"flex-start"}>
                                <label className="text"> ・相談者の年代</label>
                                <InputSelect
                                    sampleOption={apiTeldata?.data?.age}
                                    control={control}
                                    options={age}
                                    name="age"
                                    defaultValue={apiTeldata?.data?.age || ""}
                                    className="input-select"
                                    readOnly={true}
                                    error={errors.age}
                                /></Grid>
                            <Grid className="hr"></Grid>
                            <Grid container justifyContent={"flex-start"}>
                                <label className="text"> ・相談者の職業</label>
                                <InputSelect
                                    sampleOption={apiTeldata?.data?.job}
                                    control={control}
                                    options={jobOptions}
                                    defaultValue={apiTeldata?.data?.job || ""}
                                    name="job"
                                    className="input-select"
                                    readOnly={true}
                                    error={errors.job}
                                />
                            </Grid>
                            <Grid className="hr"></Grid>
                            <Grid container justifyContent={"flex-start"} >
                                <label className="text"> ・相談者の名前</label>
                                <InputSelect
                                    sampleOption={apiTeldata?.data?.userType || ""}
                                    control={control}
                                    options={self}
                                    name="userType"
                                    defaultValue={apiTeldata?.data?.userType}
                                    className="input-select"
                                    readOnly={true}
                                    error={errors.userType}
                                />
                                <InputText
                                    control={control}
                                    defaultValue={apiTeldata?.data?.name || ""}
                                    placeholder={apiTeldata?.data?.name || ""}
                                    name="name"
                                    className="input-select-name"
                                    readOnly={true}
                                />

                            </Grid>
                            <Grid className="hr"></Grid>
                            <Grid><label className="text">・主訴</label></Grid>
                            
                            <InputText
                                className="input-take"
                                control={control}
                                defaultValue={selectedSymptoms.length > 0 ? selectedSymptoms.join(', ') : ""}
                                name="mainIssues"
                                type="text"
                                error={errors.mainIssues}
                                readOnly={true}
                            />
                            <Grid>
                                <Grid><label className="text">具体的症状(病気不安, 不眠)</label></Grid>
                                <Grid container className="content-row middle_table">
                                    {symptomsList.map((symptom, index) => (
                                        <Grid className="content-row reservation-content-marginleft" xs={12} key={symptom.value}>
                                            <input
                                                type="checkbox"
                                                value={symptom.value}
                                                checked={selectedSymptoms.includes(symptom.value)}
                                                onClick={(e) => e.preventDefault()}
                                                readOnly={true}
                                            />
                                            <label className="text reservation-list-padding">{symptom.label}</label>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid className="hr"></Grid>
                            <Grid container item xs={12} style={{ marginTop: '5px' }}>
                                <label className="margin"> 助言項目</label>
                                <Select
                                    multiple
                                    value={adviseSelected}
                                    readOnly={true}
                                    onChange={(event) => {
                                        const selectedValues = event.target.value as string[];
                                        setAdviseSelected(selectedValues); // Update state immediately
                                        setValue("adviceselected", selectedValues.join(', ')); // Update form value
                                    }}
                                    renderValue={(selected: string[]) => {
                                        if (selected.length === 0) {
                                            return (
                                                <label className="left-aligned-text">
                                                    選択する
                                                </label>
                                            );
                                        }
                                        return (
                                            <label className="left-aligned-text">
                                                選択された
                                            </label>
                                        )
                                    }}
                                    displayEmpty className="custom-select"
                                    inputProps={{
                                        classes: { select: "text_input" },
                                    }}
                                    IconComponent={(props) => (
                                        <KeyboardArrowDownIcon {...props} sx={{ fontSize: '18px' }} />
                                    )}
                                >
                                    {adviseOptions.map((advise) => (
                                        <MenuItem key={advise.name} value={advise.name}>
                                            {advise.name}
                                        </MenuItem>
                                    ))}
                                </Select>

                                <TelInputText
                                    name="adviceselected"
                                    control={control}
                                    value={selectedAdvise.join(', ') || ""} // Update the value with selected advice immediately
                                    readOnly={true}
                                    className="text"
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
                                        defaultValue={apiTeldata?.data?.problemDetails}
                                        name={"problemDetails"}
                                        readOnly={true}
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
                                        defaultValue={apiTeldata?.data?.adviceDetails}
                                        name={"adviceDetails"}
                                        readOnly={true}
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

                                src={editbutton}
                                onClick={handleNavigation}
                            />
                        </Button>
                        <Button type="button" className="button-size" >
                            <img
                                src={removebutton}
                                onClick={handleRemove}
                            />
                        </Button>
                    </Grid>
                </form>

            </Grid>
        </Grid>
    )
}

export default TelephoneConsultationView;