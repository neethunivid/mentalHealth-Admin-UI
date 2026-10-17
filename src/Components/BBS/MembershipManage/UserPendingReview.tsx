import "../../../assets/css/health.css";
import { Button, Grid, Pagination, Typography } from "@mui/material";
import {Box} from "@mui/material";
import LeftPanBBS from "../../Common/LeftPanBBS";
import { useForm, Controller } from "react-hook-form";
import InputComponent from "./InputComponent";
import submitbtn from "../../../assets/images/second_page_btn2.gif";
import onhold from "../../../assets/images/second_page_btn3.gif";
import deletebtn from "../../../assets/images/second_page_btn4.gif";
import ApiClient from "../../../API/API-client";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../Redux/actions";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../MembershipManage/membermanagestyle.scss";
import occupation from "../MemberData/MemberRegComp/RegOccupation";
import prefecture from "../MemberData/MemberRegComp/Prefeture";
import prevButton from '../../../assets/images/btn_back.gif';
import nxtButton from '../../../assets/images/btn_next.gif'
import { formatDateArray, formatDateArray1 } from "../../Common/Date_conversion";
import moment from "moment";

const UserPendingReview = () => {
    let indexvalue: any;
    let dataindex: any = 0;
    let memberid: any;
    let req: any;

    const navigate = useNavigate();
    const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [isDeleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        setError,
        getValues,
    } = useForm();
    const onSubmit = async (data: any) => {

        if (!data.statement_title) {
            alert("発言タイトルを入力してください。");
            setError("statement_title", {
                type: "required",
            });
            return;
        } else if (!data.statement_text) {
            alert("テキストを記入ください");
            setError("statement_text", {
                type: "required",
            });
            return;
        } else if (!data.join_date) {
            alert("Please review the value you provided for join_date");
            setError("join_date", {
                type: "required",
            });
            return;
        }
        else if (!normalChecked && !anxietyChecked &&
            !blackmailChecked && !otherChecked &&
            !growingupChecked && !ischeckadd1Checked && !ischeckadd2Checked) {
            alert("部屋を選んでください。");
            return;
        }
        else if (data.isChk_add1 == "true" && data.addition1 == "") {
            alert("新規1の部屋に入ってください。");
            setError("addition1", {
                type: "required",
            });
            return;
        }
        else if (data.isChk_add2 == "true" && data.addition2 == "") {
            alert("新規2の部屋に入ってください。");
            setError("addition2", {
                type: "required",
            });
            return;
        } else {
            if (data.submitButton === 'submitButton') {
                updateUserPendingreview(data)
            }
            else{
                    DeleteUser()
             }
        }
    };
    const [itemData, setItemData] = useState<any>([]);
    const [dataIndex, setDataIndex] = useState<any>(0);
    const [normalChecked, setNormalChecked] = useState(false);
    const [otherChecked, setOtherChecked] = useState(false);
    const [anxietyChecked, setAnxietyChecked] = useState(false);
    const [blackmailChecked, setBlackMailChecked] = useState(false);
    const [growingupChecked, setGrowingupChecked] = useState(false);
    const [ischeckadd1Checked, setadd1Checked] = useState(false);
    const [ischeckadd2Checked, setadd2Checked] = useState(false);
    const [isMailMagazineSubsribe,setMailMagazineSubscribe]=useState(false)
    const [isMailMagazineCancel,setMailMagazineCancel]=useState(false)
    const [isgendermale,setGenderMale]=useState(false)
    const [isgenderfemale,setGenderFemale]=useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [emailpcuser, setEmailpcuser] = useState();
    const [emailpcdomain, setEmailpcDomain] = useState();
    const [emailmobuser, setEmailmobuser] = useState();
    const [emailmobdomain, setEmailmobDomain] = useState();
    const [remarkinitial, setRemarkInitial] = useState();
    const [tel1, setTel1] = useState();
    const [tel2, setTel2] = useState();
    const [tel3, setTel3] = useState();
    const [dobyear, setdobyear] = useState("");
    const [dobmonth, setdobmonth] = useState("");
    const [dobday, setdobday] = useState("");
    const [joindate, setJoindate] = useState("");
    const [zipcode1, setZipCode1] = useState();
    const [zipcode2, setZipCode2] = useState();
    const [job, setJob] = useState();
    const [pref, setPref] = useState();
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const dispatch = useDispatch();
    const [pageNumber, setpageNumber] = useState(0);
    const [listData, setListData] = useState<any[]>([]);

    const data = useSelector((state: any) => {
        return state?.reducer1.data?.user_pendingreview;
    });

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, settotalPages] = useState<number>(0);
    const pageSize = 1;
    useEffect(() => {
        if (data?.['data']) {
            setListData((prevListData: any[]) => {
                const newData = data['data'].filter((newItem: any) =>
                    !prevListData.some((existingItem: any) => existingItem.id === newItem.id)
                );
                return [...prevListData, ...newData];
                });
    
                initializevalues(data);
        }
    }, [data]);

    useEffect(() => {
        fetchUserPendingreview(pageNumber);
    }, []);
    const fetchUserPendingreview = async (pageNumber:any) => {
        let req: any;

        try {
            req = {
                status: 2,
                withdrawList:false,
                pageNumber : pageNumber
            };
            dispatch(fetchData("user_pendingreview", "api/members/memberlistsearch", req));
            setLoaded(true)
            // initializevalues(dataval);

            if (!data || !Array.isArray(data)) {
                return null; // Return null or a fallback component if the data is not available or is not an array
            } else if (!data) {
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoaded(true)
        }
    };
    const initializevalues = (data: any) => {
        if(data?.data?.length>0){
        fetchMemberById(data?.data[0]?.id);
        }

    };
    const getoccupation = (job: any) => {
        if (job) {
            occupation.map((item: any) => {
                if (item.label == job) {
                    setJob(item.id);
                }
            });
        }
    }
    const getprefecture = (pref: any) => {
        if (pref) {
            prefecture.map((item: any) => {
                if (item.value == pref) {
                    setPref(item.label);
                }
            });
        }
    }
    const updateUserPendingreview = async (dataValue: any) => {
        setSubmitButtonDisabled(true)
        try {
            const dataRequest: any = {
                id: itemData?.member?.id,
                memberno: itemData?.member?.memberno,
                name: itemData?.member?.name,
                namek: itemData?.member?.namek,
                name2: itemData?.member?.name2,
                namek2: itemData?.member?.namek2,
                memberid: itemData?.member?.memberid,
                password: itemData?.member?.password,
                sex: itemData?.member?.sex,
                dob: getdob(),
                job: itemData?.member?.job,
                job_additional: itemData?.member?.job_additional,
                zipcode: itemData?.member?.zipcode,
                pref: itemData?.member?.pref,
                address1: itemData?.member?.address1,
                address2: itemData?.member?.address2,
                address3: itemData?.member?.address3,
                tel: gettel1() + "-" + gettel2() + "-" + gettel3(),
                mob: itemData.member.mob ?? "",
                workplace: itemData?.member?.workplace,
                howfound: itemData?.member?.howfound,
                email_pc: itemData?.member?.email_pc,
                email_mob: itemData?.member?.email_mob,
                mailmagazine: itemData?.member?.mailmagazine,
                remarks_initial: itemData?.member?.remarks_initial,
                joinDate:  moment(joindate, ['YYYY.M.D', 'YYYY.MM.DD']).format('YYYY-MM-DD'),
                changeDate: itemData && itemData.member && itemData.member.changeDate !== null ? getChangedate() : "",
                changeCause: itemData?.member?.changeCause,
                status: 1,
                ngMember: 0,
                deleteRequest: 0,
                date: getdate(),
                email_smart: itemData?.member?.email_pc ? itemData?.member?.email_pc : itemData?.member?.email_mob ?
                    itemData?.member?.email_mob : "",
                statement_title: itemData?.remarks[0]?.title,
                statement_text: itemData?.remarks[0]?.text,
                isChk_add1: ischeckadd1Checked == false ? 0 : 1,
                isChk_add2: ischeckadd2Checked == false ? 0 : 1,
                normal: normalChecked == false ? 0 : 1,
                anxiety: anxietyChecked == false ? 0 : 1,
                blackmail: blackmailChecked == false ? 0 : 1,
                other: otherChecked == false ? 0 : 1,
                growingup: growingupChecked == false ? 0 : 1,
                addition1: itemData?.remarks[0]?.addition1,
                addition2: itemData?.remarks[0]?.addition2,
            };
            
            const apiData = await ApiClient.put("api/members/admin/updatemember", dataRequest, {});
            if(apiData){
                setSubmitButtonDisabled(false)
                navigate ('/updateresponsepage',{state:{data:" B.審査保留中のユーザー",action:"update"}})
            } 
        } catch (error: any) {
            setSubmitButtonDisabled(false)
            if (error.response && error.response.status === 400) {

                alert(error.response.data.error);
            } else {

                console.log("Error:", error);
            }
        }
    };
    const DeleteUser = async () => {
        setDeleteButtonDisabled(true)
        const Data = getValues()
        const confirmed = window.confirm('削除してもよろしいですか？');
        if (confirmed) {
        try {
            const dataRequest: any = {
                id: itemData?.member?.id,
                memberno: itemData?.member?.memberno,
                name: itemData?.member?.name,
                namek: itemData?.member?.namek,
                name2: itemData?.member?.name2,
                namek2: itemData?.member?.namek2,
                memberid: itemData?.member?.memberid,
                password: itemData?.member?.password,
                sex: itemData?.member?.sex,
                dob: getdob(),
                job: itemData?.member?.job,
                job_additional: itemData?.member?.job_additional,
                zipcode: itemData?.member?.zipcode,
                pref: itemData?.member?.pref,
                address1: itemData?.member?.address1,
                address2: itemData?.member?.address2,
                address3: itemData?.member?.address3,
                tel: gettel1() + "-" + gettel2() + "-" + gettel3(),
                mob: itemData.member.mob ?? "",
                workplace: itemData?.member?.workplace,
                howfound: itemData?.member?.howfound,
                email_pc: itemData?.member?.email_pc,
                email_mob: itemData?.member?.email_mob,
                mailmagazine: itemData?.member?.mailmagazine,
                remarks_initial: itemData?.member?.remarks_initial,
                joinDate:  moment(joindate, ['YYYY.M.D', 'YYYY.MM.DD']).format('YYYY-MM-DD'),
                changeDate: itemData && itemData.member && itemData.member.changeDate !== null ? getChangedate() : "",
                changeCause: itemData?.member?.changeCause,
                status: 5,
                ngMember: 0,
                deleteRequest: 0,
                date: getdate(),
                email_smart: itemData?.member?.email_pc ? itemData?.member?.email_pc :
                    itemData?.member?.email_mob ? itemData?.member?.email_mob : "",
                statement_title: Data?.statement_title ?? "",
                statement_text: Data?.statement_text ?? "",
                isChk_add1: ischeckadd1Checked == false ? 0 : 1,
                isChk_add2: ischeckadd2Checked == false ? 0 : 1,
                normal: normalChecked == false ? 0 : 1,
                anxiety: anxietyChecked == false ? 0 : 1,
                blackmail: blackmailChecked == false ? 0 : 1,
                other: otherChecked == false ? 0 : 1,
                growingup: growingupChecked == false ? 0 : 1,
                addition1: Data.addition1,
                addition2: Data.addition2,

            };
            const apiData = await ApiClient.put(
                "api/members/admin/updatemember",
                dataRequest,
                {}
            );
            if(apiData){
                setDeleteButtonDisabled(false)
                navigate ('/updateresponsepage',{state:{data:" B.審査保留中のユーザー",action:"delete"}})
            } 
        } catch (error: any) {
            setDeleteButtonDisabled(false)
            if (error.response && error.response.status === 400) {
                alert(error.response.data.error);
            } else {
                console.log("Error:", error);
            }
        }
    }

    }

    const getJoinDate = () => {
        if(itemData?.member?.joinDate){
            const FormatDate = formatDateArray(itemData?.member?.joinDate)
            return (FormatDate)
            }
    }
    const getdate = () => {
        if(itemData?.member?.date){
            const FormatDate = formatDateArray(itemData?.member?.date)
            return (FormatDate)
            }
    }
    const getChangedate = () => {
        if(itemData?.member?.changeDate){
            const FormatDate = formatDateArray(itemData?.member?.changeDate)
            return (FormatDate)
            }
    }

    const getdob = () => {
        if(itemData?.member?.dob){
            const FormatDate = formatDateArray(itemData?.member?.dob)
            return (FormatDate)
            }
    }
    const gettel1 = () => {
        const tel = itemData?.member?.tel?.split('-');
        return (tel[0]);
    }
    const gettel2 = () => {
        const tel = itemData?.member?.tel?.split('-');
        return (tel[1]);
    }
    const gettel3 = () => {
        const tel = itemData?.member?.tel?.split('-');
        return (tel[2]);
    }

     //get member details on clicking the page number 
    const handleClick = (pageNo: any) => {
        setCurrentPage(pageNo);
        setDataIndex(pageNo-1)
        const id = listData[pageNo - 1]?.id;
        const item = data?.data.find((item: any) => item.memberno === pageNo);
        if (id) {

            fetchMemberById(id);
        }
    };
    
    //fetch member by id
    const fetchMemberById = async (id: any) => {
        setIsLoading(true);
        try {
            const apiData = await ApiClient.get("api/members/getMemberById/" + id);
            setItemData(apiData.data.data);
            initializeDataValues(apiData.data.data);

            if (apiData) {
                setItemData(apiData?.data?.data);
                initializeDataValues(apiData?.data?.data)
            }
            setIsLoading(false);

            if (!data || !Array.isArray(data)) {
                return null; // Return null or a fallback component if the data is not available or is not an array
            } else if (!data) {
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    //inintialize the values
    const initializeDataValues = (data: any) => {
        if(data?.member?.email_pc){
        const splitEmail = data?.member?.email_pc?.split("@");
        setEmailpcuser(splitEmail[0]);
        setEmailpcDomain(splitEmail[1]);
        }
        if(data?.member?.email_mob){
        const splitmobEmail = data?.member?.email_mob?.split("@");
        setEmailmobuser(splitmobEmail[0]);
        setEmailmobDomain(splitmobEmail[1]);
        }
        if(data?.member?.tel){
        const tel = data?.member?.tel?.split("-");
        setTel1(tel[0]);
        setTel2(tel[1]);
        setTel3(tel[2]);
        }
        if(data?.member?.zipcode){
        const zipcodeval = data?.member?.zipcode?.split("-");
        setZipCode1(zipcodeval[0]);
        setZipCode2(zipcodeval[1]);
        }
        if(data?.member?.joinDate){
        const year = data?.member?.joinDate[0];
        const month = String(data?.member?.joinDate[1])?.padStart(2, "0");
        const day = String(data?.member?.joinDate[2])?.padStart(2, "0");
        let formattedDate = `${year}.${month}.${day}`;
        setJoindate(formattedDate);
        }
        if(data?.member?.dob){
        setdobyear(data?.member?.dob[0]);
        setdobmonth(String(data?.member?.dob[1])?.padStart(2, "0"));
        setdobday(String(data?.member?.dob[2])?.padStart(2, "0"));
        }
        setRemarkInitial(data?.member?.remarks_initial);
        setNormalChecked(data?.remarks[0]?.normal == 1 ? true : false);
        setBlackMailChecked(data?.remarks[0]?.blackmail == 1 ? true : false);
        setOtherChecked(data?.remarks[0]?.other == 1 ? true : false);
        setAnxietyChecked(data?.remarks[0]?.anxiety == 1 ? true : false);
        setGrowingupChecked(data?.remarks[0]?.growingup == 1 ? true : false);
        setadd1Checked(data?.remarks[0]?.addition1 != ""&&data?.remarks[0]?.addition1 != null ? true : false);
        setadd2Checked(data?.remarks[0]?.addition2 != ""&&data?.remarks[0]?.addition2 != null? true : false);
        getoccupation(data?.member?.job);
        getprefecture(data?.member?.pref);
        setGenderMale(data?.member?.sex===1?true:false)
        setGenderFemale(data?.member?.sex===2?true:false)
        setMailMagazineSubscribe(data?.member?.mailmagazine===1?true:false)
        setMailMagazineCancel(data?.member?.mailmagazine===2?true:false)
    };

    //render the navigation page buttons to disaply the member details on page number click
    const renderPageButtons = () => {
        const pageNumbers = [];
        const pageCount = 4; // Number of page numbers to display at a time
        const totalPageCount = data.count;

        // Calculate the start and end page numbers based on the current page
        let startPage = currentPage - Math.floor(pageCount / 2);
        let endPage = startPage + pageCount - 1;

        // Adjust start and end page numbers to ensure they are within valid bounds
        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPageCount, pageCount);
        } else if (endPage > totalPageCount) {
            endPage = totalPageCount;
            startPage = Math.max(1, endPage - pageCount + 1);
        }

        // Add the page numbers to the array
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button key={i} className="pagination-button" style={{
                    textDecoration: currentPage === i ? "none" : "underline",
                }} onClick={() => handleClick(i)}>
                    {i}
                </button>
            );
        }


        return pageNumbers;
    };

    //dispaly the previous member details
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
            setDataIndex(dataIndex - 1)
        }
        const id = listData[dataIndex - 1]?.id;
        if (id) {
            fetchMemberById(id);
        }
    };

    //dispaly the next member details
    const nextPage = () => {
            let maxPageNo = Math.floor(data.count/10)
            if (currentPage % 10==0 && maxPageNo > pageNumber){ 
            fetchUserPendingreview(pageNumber+1)
            setpageNumber(pageNumber+1)
        }
        
        if (currentPage < data?.count ) {
            setCurrentPage((prevPage) => prevPage + 1);
            setDataIndex(currentPage)
        }
        const id = listData[currentPage]?.id;
        if (id) {
            fetchMemberById(id);
        }
    };
    return (
        <Grid container xs={12} padding={1} spacing={1}>
            <Grid item xs={3} spacing={2}>
                <LeftPanBBS />
            </Grid>
            <Grid item xs={9}>
                <Grid container>
                    <Box className="p2red_bg_left"></Box>
                    <Box className="p2red_bg_midle">
                        <Grid justifyContent={"space-between"} display={"flex"}>
                            <span className="verdana_big">B.審査保留中のユーザー </span>
                            <span className="verdana_big">入会・退会管理</span>
                        </Grid>
                    </Box>
                    <Box className="p2red_bg_right"></Box>
                </Grid>
                {isLoaded &&
                <Grid>
                {listData?.length > 0 ?<>
                    {itemData && itemData?.member?.id && itemData?.remarks[0] ? (
                    <Grid>
                        <Grid container xs={12} flexDirection={"row"}>
                            <Grid item xs={9}></Grid>
                            <Grid item xs={3} flexDirection={"row"}>
                                <div className="black">ページ  {renderPageButtons()}
                                    {currentPage !== 1 ?
                                        <button onClick={prevPage} style={{ border: 'none' }} disabled={currentPage === 1}>
                                            <img src={prevButton} alt="prevbutton" />
                                        </button> : null}
                                    {currentPage !== data.count ?
                                        <button onClick={nextPage} style={{ border: 'none' }} disabled={currentPage === data?.count}>
                                            <img src={nxtButton} alt="nxtbutton" />
                                        </button> : null}</div>
                            </Grid>
                        </Grid>
                        <Grid container flexDirection={'row'}>
                            <Grid xs={3} className='mglft'><label className='black'>管理</label></Grid>
                            <Grid xs={9} className='mglft'><label className='black'>（例）</label></Grid>
                        </Grid>
                        <form
                            name="userwithdrawn"
                            id="form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Grid container className="middle_table" padding={2}>
                                {/* <div>{itemData?.member?.memberno}</div> */}
                                <Grid item xs={6}>
                                    <Grid container>
                                        <InputComponent
                                            id={dataIndex}
                                            label="・会員番号"
                                            control={control}
                                            defaultValue={itemData?.member?.memberno}
                                            textBoxEnabled={true}
                                            name={"memberno"}
                                            // setValue={setValue}
                                            type={"text"}
                                        />
                                    </Grid>

                                    <Grid container>
                                        <InputComponent
                                            label="・名前（漢字）  姓"
                                            control={control}
                                            defaultValue={itemData?.member?.name}
                                            textBoxEnabled={false}
                                            name={"name"}
                                            type={"text"}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <InputComponent
                                            label="・名前（漢字）  名"
                                            control={control}
                                            defaultValue={itemData?.member?.name2}
                                            textBoxEnabled={false}
                                            name={"name2"}
                                            type={"text"}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <InputComponent
                                            label="・ふりがな     姓"
                                            control={control}
                                            defaultValue={itemData?.member?.namek}
                                            textBoxEnabled={false}
                                            name={"namek"}
                                            type={"text"}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <InputComponent
                                            label="  ・ふりがな     名"
                                            control={control}
                                            defaultValue={itemData?.member?.namek2}
                                            textBoxEnabled={false}
                                            name={"namek2"}
                                            type={"text"}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <InputComponent
                                            label="・ID"
                                            control={control}
                                            defaultValue={itemData?.member?.memberid}
                                            textBoxEnabled={false}
                                            name={"memberid"}
                                            type={"text"}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <InputComponent
                                            label="・パスワード"
                                            control={control}
                                            defaultValue={itemData?.member?.password}
                                            textBoxEnabled={false}
                                            name={"password"}
                                            type={"password"}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <span className="black">・性別</span>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Grid container flexDirection={"row"}>
                                            <input
                                                type="radio"
                                                value={1}
                                                {...register("sex")}
                                                checked={isgendermale}
                                                onClick={(evt: any) => {
                                                     setGenderMale(evt.target.checked ? true : false)
    
                                                    }}
                                             />
                                            <span className="black">男性 </span>
                                             <input
                                                type="radio"
                                                value={2}
                                                {...register("sex")}
                                                checked={isgenderfemale}
                                                onClick={(evt: any) => {
                                                    setGenderFemale(evt.target.checked ? true : false)
    
                                                }}
                                            />
                                            <span className="black">女性 </span>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <span className="black"> ・ 生年月日 （西暦）</span>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Grid container flexDirection={"row"}>
                                                <input
                                                    value={dobyear}
                                                    disabled
                                                    className="bdr_text_small_1"
                                                    {...register("dob1")}
                                                />
                                                <span className="verdana"> 年 </span>
                                                <input
                                                    value={dobmonth}
                                                    disabled
                                                    className="bdr_text_small_1"
                                                    {...register("dob2")}
                                                />
                                                <span className="verdana"> 月 </span>
                                                <input
                                                    value={dobday}
                                                    disabled
                                                    className="bdr_text_small_1"
                                                    {...register("dob3")}
                                                />
                                                <span className="verdana"> 日 </span>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <InputComponent
                                            label=" ・職業"
                                            control={control}
                                            defaultValue={job}
                                            textBoxEnabled={false}
                                            name={"job"}
                                            type={"text"}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <InputComponent
                                            label="・職業の詳細"
                                            control={control}
                                            defaultValue={itemData?.member?.job_additional}
                                            textBoxEnabled={false}
                                            name={"job_additional"}
                                            type={"text"}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <InputComponent
                                            label="・都道府県"
                                            control={control}
                                            defaultValue={pref}
                                            textBoxEnabled={false}
                                            name={"pref"}
                                            type={"text"}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <InputComponent
                                            label="・住所１ （市町村）"
                                            control={control}
                                            defaultValue={itemData?.member?.address1}
                                            textBoxEnabled={false}
                                            name={"address1"}
                                            type={"text"}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <InputComponent
                                            label="・住所2 （丁目番地）"
                                            control={control}
                                            defaultValue={itemData?.member?.address2}
                                            textBoxEnabled={false}
                                            name={"address2"}
                                            type={"text"}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <InputComponent
                                            label=" ・住所3 （マンション・ビル名）"
                                            control={control}
                                            defaultValue={itemData?.member?.address3}
                                            textBoxEnabled={false}
                                            name={"address3"}
                                            type={"text"}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <span className="black"> ・電話</span>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Grid container flexDirection={"row"}>
                                                <input
                                                    type="number"
                                                    value={tel1}
                                                    disabled
                                                    className="bdr_text_smalltel"
                                                    {...register("tel1")}
                                                />
                                                <span className="verdana"> -</span>
                                                <input
                                                    type="number"
                                                    value={tel2}
                                                    disabled
                                                    className="bdr_text_smalltel"
                                                    {...register("tel2")}
                                                />
                                                <span className="verdana">-</span>
                                                <input
                                                    type="number"
                                                    value={tel3}
                                                    disabled
                                                    className="bdr_text_smalltel"
                                                    {...register("tel3")}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <InputComponent
                                            label="・勤め先・学校"
                                            control={control}
                                            defaultValue={itemData?.member?.workplace}
                                            textBoxEnabled={false}
                                            name={"workplace"}
                                            type={"text"}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <InputComponent
                                            label="・何で知ったか"
                                            control={control}
                                            defaultValue={itemData?.member?.howfound}
                                            textBoxEnabled={false}
                                            name={"howfound"}
                                            type={"text"}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <InputComponent
                                            label="・メールアドレス1"
                                            control={control}
                                            defaultValue={itemData?.member?.email_pc}
                                            textBoxEnabled={false}
                                            name={"email_pc1"}
                                            type={"text"}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <InputComponent
                                            label="・メールアドレス2"
                                            control={control}
                                            defaultValue={itemData?.member?.email_mob}
                                            textBoxEnabled={false}
                                            name={"email_mob1"}
                                            type={"text"}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <span className="black">・メルマガ購読の有無</span>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Grid container flexDirection={"row"}>
                                                <input
                                                    type="radio"
                                                    value={1}
                                                    {...register("mailmagazine")}
                                                    checked={isMailMagazineSubsribe}
                                                    onClick={(evt: any) => {
                                                        setMailMagazineSubscribe(evt.target.checked ? true : false)

                                                    }}
                                                />
                                                <span className="black">購読 </span>
                                                <input
                                                    type="radio"
                                                    value={2}
                                                    {...register("mailmagazine")}
                                                    checked={isMailMagazineCancel}
                                                        onClick={(evt: any) => {
                                                        setMailMagazineCancel(evt.target.checked ? true : false)
    
                                                        }}
                                                />
                                                <span className="black">中止 </span>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={6}>
                                    <Grid item xs={12}>
                                        <span className="black">・発言タイトル</span>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <input
                                            type="text"
                                            id="statement_title"
                                            className="bdr_text2"
                                            {...register("statement_title")}
                                            value={itemData?.remarks[0]?.title}
                                            onChange={(e) =>
                                                setItemData((prevData: any) => ({
                                                    ...prevData,
                                                    remarks: [{ ...prevData.remarks[0], title: e.target.value }],
                                                }))
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <span className="black">・発言内容</span>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <textarea
                                            rows={11}
                                            cols={40}
                                            className="text_area"
                                            {...register("statement_text")}
                                            value={itemData?.remarks[0]?.text}
                                            onChange={(e) =>
                                                setItemData((prevData: any) => ({
                                                    ...prevData,
                                                    remarks: [{ ...prevData.remarks[0], text: e.target.value }],
                                                }))
                                            }
                                        ></textarea>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <span className="black">・タイプ区分</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <span className="black">（チエックして下さい）</span>
                                        </Grid>
                                    </Grid>

                                    <Grid container item xs={12}>
                                        <Grid item xs={7} flexDirection={"row"}>
                                        <input
                                            type="checkbox"
                                            {...register("normal")}
                                            checked={normalChecked}
                                            onClick={() => {
                                            setNormalChecked(true);
                                            setAnxietyChecked(false);
                                            setBlackMailChecked(false);
                                            setOtherChecked(false);
                                            setGrowingupChecked(false);
                                            setadd1Checked(false);
                                            setadd2Checked(false);
                                            }}
                                        />
                                        
                                            <label className="verdana">
                                                A.普通神経症
                                            </label>
                                        </Grid>
                                        <Grid item xs={5}>
                                        <input
                                            type="checkbox"
                                            {...register("other")}
                                            checked={otherChecked}                                                           
                                            id="other"
                                            onClick={() => {
                                            setNormalChecked(false);
                                            setAnxietyChecked(false);
                                            setBlackMailChecked(false);
                                            setOtherChecked(true);
                                            setGrowingupChecked(false);
                                            setadd1Checked(false);
                                            setadd2Checked(false);
                                        }}
                                        />
                                            <label className="verdana">
                                                D.その他
                                            </label>
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12}>
                                        <Grid item xs={7} flexDirection={"row"}>
                                        <input
                                            type="checkbox"
                                            {...register("anxiety")}
                                            checked={anxietyChecked}
                                            onClick={() => {
                                            setNormalChecked(false);
                                            setAnxietyChecked(true);
                                            setBlackMailChecked(false);
                                            setOtherChecked(false);
                                            setGrowingupChecked(false);
                                            setadd1Checked(false);
                                            setadd2Checked(false);
                                             }}
                                        />
                                            <label className="verdana">
                                                B.不安神経症
                                            </label>
                                        </Grid>
                                        <Grid item xs={5}>
                                        <input
                                            type="checkbox"
                                            {...register("growingup")}
                                            checked={growingupChecked}             
                                            id="growingup"
                                            onClick={() => {
                                                setNormalChecked(false);
                                                setAnxietyChecked(false);
                                                setBlackMailChecked(false);
                                                setOtherChecked(false);
                                                setGrowingupChecked(true);
                                                setadd1Checked(false);
                                                setadd2Checked(false);
                                            }}
                                        />

                                            <label className="verdana">
                                                E.成長の部屋
                                            </label>
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12}>

                                        <Grid item xs={7} flexDirection={"row"}>
                                        <input
                                            type="checkbox"
                                            {...register("blackmail")}
                                            checked={blackmailChecked}                                                           
                                            id="blackmail"
                                            onClick={() => {
                                                setNormalChecked(false);
                                                setAnxietyChecked(false);
                                                setBlackMailChecked(true);
                                                setOtherChecked(false);
                                                setGrowingupChecked(false);
                                                setadd1Checked(false);
                                                setadd2Checked(false);
                                            }}
                                            />
                                            <span className="verdana">
                                                {" "}
                                                C.強迫神経症
                                            </span>
                                        </Grid>

                                        <Grid item xs={5}>
                                        <input
                                            type="checkbox"
                                            {...register("isChk_add1")}
                                            checked={ischeckadd1Checked}
                                            id="isChk_add1"
                                            onClick={() => {
                                                setNormalChecked(false);
                                                setAnxietyChecked(false);
                                                setBlackMailChecked(false);
                                                setOtherChecked(false);
                                                setGrowingupChecked(false);
                                                setadd1Checked(true);
                                                setadd2Checked(false);
                                            }}
                                        />
                                            <label className="verdana"> F.新規1</label>
                                            <input
                                                type="text"
                                                className="bdr_text_small"
                                                {...register("addition1")}
                                                value={itemData?.remarks[0]?.addition1}
                                                onChange={(e) =>
                                                    setItemData((prevData: any) => ({
                                                        ...prevData,
                                                        remarks: [{ ...prevData.remarks[0], addition1: e.target.value }],
                                                    }))
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12}>
                                        <Grid item xs={7} flexDirection={"row"}>
                                        <input
                                            type="checkbox"
                                            {...register("isChk_add2")}
                                            checked={ischeckadd2Checked}                
                                            id="isChk_add2"
                                            onClick={() => {
                                                setNormalChecked(false);
                                                setAnxietyChecked(false);
                                                setBlackMailChecked(false);
                                                setOtherChecked(false);
                                                setGrowingupChecked(false);
                                                setadd1Checked(false);
                                                setadd2Checked(true);
                                            }}
                                        />
                                            <label className="verdana"> G.新規２</label>
                                            <input
                                                type="text"
                                                className="bdr_text_small"
                                                {...register("addition2")}
                                                value={itemData?.remarks[0]?.addition2}
                                                onChange={(e) =>
                                                    setItemData((prevData: any) => ({
                                                        ...prevData,
                                                        remarks: [{ ...prevData.remarks[0], addition2: e.target.value }],
                                                    }))
                                                }
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container item xs={12}>
                                        <Grid item xs={4} flexDirection={"row"}>
                                            <label className="black">入会日 </label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <input type="text" className=" bdr_text_medium" value={joindate}
                                                {...register("join_date")}
                                                onChange={(e) => setJoindate(e.target.value)}
                                            />
                                            <span className="black">（例：2008.5.1）</span>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid
                                item
                                xs={12}
                                container
                                display={"flex"}
                                justifyContent={"center"}
                            >

                                <Controller
                                    name="submitButton"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <>
                                        <Button type="submit" name ="submitButton" value="submitButton1"
                                            disabled={isSubmitButtonDisabled}>
                                            <img className="padding_top" src={submitbtn}
                                                 onClick={() => setValue('submitButton', 'submitButton')}
                                                {...field} />
                                        </Button>
                    
                                        <Button type="submit" name ="submitButton" value="submitButton2"
                                            disabled={isDeleteButtonDisabled} >
                                            <img className="padding_top" src={deletebtn}
                                            onClick={() => setValue('submitButton', 'deleteButton')}
                                            {...field} />
                                         </Button>
                                     </>
                                    )}
                                />
                              
                            </Grid>
                        </form>
                    </Grid>
                ) : null}
                </>:
                data?.data?.length == 0 &&
                <div className="mrg_top">
                    <Grid className="middle_table">
                        <Typography className="red_font"><b>このカテゴリーにデータはありませんでした。</b></Typography>
                    </Grid>
                </div>}
                </Grid>}
            </Grid>
        </Grid>
    );
};

export default UserPendingReview;
