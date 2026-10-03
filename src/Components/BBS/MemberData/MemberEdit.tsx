import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "../../../assets/css/health.css";
import { Button, Checkbox, Grid } from "@mui/material";
import "../MemberData/member.scss";
import { useForm, Controller } from "react-hook-form";
import submit from "../../../assets/images/page_ten_btn_left.gif";
import deletebtn from "../../../assets/images/page_ten_btn.gif";
import ApiClient from "../../../API/API-client";
import LeftPanBBS from "../../Common/LeftPanBBS";
import RegAddHeader from "./MemberRegComp/RegAddHeader";
import RegInputField from "./MemberRegComp/RegInputField";
import RegDobInput from "./MemberRegComp/RegDobInput";
import occupation from "./MemberRegComp/RegOccupation";
import RegEmailImput from "./MemberRegComp/RegEmailImput";
import RegRadioIn from "./MemberRegComp/RegRadioIn";
import RegCheckBox from "./MemberRegComp/RegCheckBox";
import RegInpRight from "./MemberRegComp/RegInpRight";
import RegPostInp from "./MemberRegComp/RegPostInp";
import { error } from "console";
import RegRightTop_Inp from "./MemberRegComp/RegRightTop_Inp";
import apiClient from "../../../API/API-client";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../Redux/actions';
import { setMemberReg } from "../../../Redux/actions";
import { useNavigate } from "react-router-dom";
import prefecture from "./MemberRegComp/Prefeture";
import InputComponent from "../MembershipManage/InputComponent";
import InputEditComponent from "../../GrantRequest/InputEditComponent";
import EditInputField from "./MemberEditComp/EditInputField";
import { setConstantValue } from "typescript";
import EditCheckBox from "./MemberEditComp/EditCheckbox";
import { checkDate, formatDateArray1, getCurrentDate } from "../../Common/Date_conversion";


const MemberEdit = () => {
    let id: any
    let items: any
    let prefLists:any
    let jobLists:any
    useEffect(() => {
        getPref();
        getJob();
        if (!memberData) {
            fetchMemberById()
        }
        if(memberData){
            setSelectedCheckbox(memberData?.usertype[0]);
        }
        

    }, []);
    const [apiMemberdata, setData] = useState<any>({})
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        setError,
        formState: { errors },
        setValue
    } = useForm();


    //const [data, setdata] = useState<any>([]);
    const watchField = watch("memberid");
    const location = useLocation();
    const [userType, setUserTypeSaved] = useState("")
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
    const [changedate, setChangedate] = useState("");
    const [zipcode1, setZipCode1] = useState();
    const [zipcode2, setZipCode2] = useState();
    const [memberIdChecks, setMemberIdChecks] = useState<boolean>(false);
    const [selectedCheckbox, setSelectedCheckbox] = useState<String>("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [prefvalue, Setprefvalue] = useState();
    const [occupatvalue, Setoccupatvalue] = useState();
    const currentDate1 = getCurrentDate();
    const [prefList, setPrefList] = useState<any>([]);
    const [jobList, setJobList] = useState<any>([]);
    const memberData :any= useSelector((state: any) => state.memberData?.Memberdata_by_id);
    const getDate = () => {
        const year = apiMemberdata?.data[0]?.date[0];
        const month = String(apiMemberdata?.data[0]?.date[1]).padStart(2, '0');
        const day = String(apiMemberdata?.data[0]?.date[2]).padStart(2, '0');
        const formattedDate = `${year}.${month}.${day}`
        return (formattedDate)
    }
    if (location && location.state && location.state.data) {
        id = location.state.data
    }
    const fetchMemberById = async () => {
        try {
            const apiData = await ApiClient.get('api/members/getMemberById/' + id);
            // dispatch(setMemberReg("fetch_Member_by_id_api", apiData.data.data));
            setData(apiData.data.data)
            if (apiData) {
                setData(apiData?.data?.data)
                initializevalue(apiData?.data?.data)

            }

        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    const initializevalue = (data: any) => {
        setRemarkInitial(data?.member?.remarks_initial) 
        setSelectedCheckbox(!memberData??data?.member?.status === 1 ? "1" : data?.member?.status === 4 ? "2" : "3")           
        if(data?.member?.email_pc){
        const splitEmail = data?.member?.email_pc?.split('@');
        setEmailpcuser(splitEmail[0])
        setEmailpcDomain(splitEmail[1])
        }
        if(data?.member?.email_mob){
        const splitmobEmail = data?.member?.email_mob?.split('@');
        setEmailmobuser(splitmobEmail[0])
        setEmailmobDomain(splitmobEmail[1])
        }
        if(data?.member?.tel){
        const tel = data?.member?.tel?.split('-')
        setTel1(tel[0]);
        setTel2(tel[1]);
        setTel3(tel[2]);
        }
        if(data?.member?.zipcode){
        const zipcodeval = data?.member?.zipcode?.split('-');
        setZipCode1(zipcodeval[0]);
        setZipCode2(zipcodeval[1]);
        }
        if(data?.member?.joinDate){
            let formattedJoinDate =formatDateArray1(data?.member?.joinDate)
            setJoindate(formattedJoinDate);
        }
        if(data?.member?.changeDate){
            let formattedChangeDate =formatDateArray1(data?.member?.changeDate)
            setChangedate(formattedChangeDate);
        }
        if(data?.member?.dob){
        setdobyear(data?.member?.dob[0]);
        setdobmonth(String(data?.member?.dob[1])?.padStart(2, '0'));
        setdobday(String(data?.member?.dob[2])?.padStart(2, '0'))
        }
        setRemarkInitial(data?.member?.remarks_initial)
       
        if (data?.member?.pref) {
            prefLists.map((item: any) => {
              if (item.id == data?.member?.pref) {
                Setprefvalue(item.name);
              }
            });
          }
          if (data?.member?.job) {
            jobLists.map((item: any) => {
              if (item.id == data?.member?.job) {
                Setoccupatvalue(item.name);
              }
            });
          }
    }
    const onSubmit = async (data: any,event:any) => {
        if (!data.statement_title) {
            alert("発言タイトルを入力してください。");
            setError("statement_title", {
                type: "required",
            });
            return
        } else if (!data.statement_text) {
            alert("テキストを記入ください");
            setError("statement_text", {
                type: "required",
            });
            return
        } else if (!data.join_date) {
            alert("Please review the value you provided for join_date");
            setError("join_date", {
                type: "required",
            });
            return
        } else if (!data.name) {
            alert("  お名前(姓）を入力してください。  ");
            setError("name", {
                type: "required",
            });
            return
        } else if (!data.name2) {
            alert("お名前(名）を入力してください。");
            setError("name2", {
                type: "required",
            });
            return
        } else if (!data.namek) {
            alert("  ふりがな(姓）を入力してください。");
            setError("namek", {
                type: "required",
            });
            return
        } else if (!data.namek2) {
            alert("お名前(名）を入力してください。");
            setError("namek2", {
                type: "required",
            });
            return
        } else if (!data.memberid) {
            alert("希望IDを入力してください。");
            setError("memberid", {
                type: "required",
            });
            return
        }
        else if (data.password != data.password2) {
            alert("パスワードが間違っています");
            setError("password2", {
                type: "required",
            });
            return
        } else if (!data.sex) {
            setError("sex", {
                type: "required",
            });
            return
        } else if (!(data.dob1)) {
           
            alert("生年月日には年を入力してください");
            setError("dob1", {
                type: "required",
            });
            return
        } else if (!(data.dob2)) {
            alert("生年月日には月を入力してください");
            setError("dob2", {
                type: "required",
            });
            return
        } else if (!(data.dob3)){
            alert("生年月日には日付を入力してください");
            setError("dob3", {
                type: "required",
            });
            return
        } else if(!checkDate(`${data.dob1}-${data.dob2}-${data.dob3}`)){
              alert("生年月日の正しい日付形式を入力してください");
              setError("dob1", {
                type: "required",
              });
              return;
            
          }
        else if (!data.post1) {
            alert("郵便番号を入力してください。");
            setError("post1", {
                type: "required",
            });
            return
        }
         else if (!data.post2) {
            alert("郵便番号を入力してください。");
            setError("post2", {
                type: "required",
            });
            return
        }
       else if (!data.address1) {
            alert("市区郡町村を入力してください。");
            setError("address1", {
                type: "required",
            });
            return
        } else if (!data.address2) {
            alert("Please review the value you provided for address2");
            setError("address2", {
                type: "required",
            });
            return
        } else if (!data.address2) {
            alert("Please review the value you provided for address2");
            setError("address2", {
                type: "required",
            });
            return
        } else if (!data.tel1) {
            alert("電話番号を入力してください。");
            setError("tel1", {
                type: "required",
            });
            return
        } else if (!data.tel2) {
            alert("電話番号を入力してください。");
            setError("tel2", {
                type: "required",
            });
            return
        } else if (!data.tel3) {
            alert("電話番号を入力してください。");
            setError("tel2", {
                type: "required",
            });
            return
        } else if (!data.checkboxGroup && !data.checkboxGroup1 &&
            !data.checkboxGroup2 && !data.checkboxGroup3 &&
            !data.checkboxGroup4 && !data.checkboxGroup5 && !data.checkboxGroup6) {
            alert("部屋を選んでください。");
            return;
        } else if (data.checkboxGroup5 == true && data.checkboxGroup5Title == "") {
            alert("新規1の部屋に入ってください。");
            setError("checkboxGroup5", {
                type: "required",
            });
            return 
        }
        else if (data.checkboxGroup5 == false && data.checkboxGroup5Title) {
            alert("新しい1を選択");
            setError("checkboxGroup5", {
                type: "required",
            });
            return
        }
        else if (data.checkboxGroup6 == true && data.checkboxGroup6Title == "") {
            alert("新規2の部屋に入ってください。");
            setError("checkboxGroup6", {
                type: "required",
            });
            return
        } 

        else if (data.checkboxGroup6 == false && data.checkboxGroup6Title) {
            alert("新しい2を選択");
            setError("checkboxGroup6", {
                type: "required",
            });
            return
        } 
        else if (!(/^\d+$/.test(data.post1))) {
            alert("郵便番号を入力してください。");
            setError("post1", {
              type: "required",
            });
            return;
          } else if (!(/^\d+$/.test(data.post2))) {
            alert("郵便番号を入力してください。");
            setError("post2", {
              type: "required",
            });
            return;
          }
          else if (!(checkDate(data.join_date))) {
           
              alert(`正しい日付形式を入力してください ${data.join_date}`);
              setError("join_date", {
                type: "required",
              });
              return;
          }
        else if (data.usertype == false) {
            alert("状状況を選択してください");
            return
        }
    else if(!data.email_pc1 &&data.email_pc2){
        alert("メールアドレス1を正しく入力してください");
      setError("email_pc1", {
        type: "required",
      });
      return;
      }else if(data.email_pc1 &&!data.email_pc2){
        alert("メールアドレス2を正しく入力してください");
        setError("email_pc2", {
          type: "required",
        });
        return;
      

      }else if(!data.email_mob1&&data.email_mob2){
        alert("メールアドレス1を正しく入力してください");
        setError("email_mob1", {
          type: "required",
        });
        return;
      }else if(data.email_mob1&&!data.email_mob2){
        alert('メールアドレス2を正しく入力してください');
        setError("email_mob2", {
        type: "required",
        });
      }
         else {
            if (data.change_date) {
                if (!(checkDate(data.change_date))) {
                  alert(`正しい日付形式を入力してください ${data.change_date}`);
                  return;
                }
              }

            if (data.submitButton === 'submitButton') {
            dispatch(setMemberReg("Memberdata_by_id", {
                ...data, id: memberData ? memberData?.id : id,
                remarkinitial: memberData ? memberData?.remarkinitial : remarkinitial
            }));
          
            const userConfirmation = window.confirm("これで登録しますか? ");
            if (userConfirmation) {
                navigate('/membereditpreview');
            } else {
                // User clicked Cancel, do nothing or perform any additional actions
            }
            }
            else{
                handledelete(data)
            }
        }
    };
    const handleCheckboxChange = (event: any) => {
        setSelectedCheckbox(event.target.value);
    };

     //get prefList
  const getPref = async () => {
    try {
      const apiData = await apiClient.post("api/members/prefList", {});
      if (apiData) {
        prefLists=apiData.data.data
        setPrefList(apiData.data.data)
      }
    } catch (error) {
      alert(error);
    }
  };

  //get jobList
  const getJob = async () => {
    try {
      const apiData = await apiClient.post("api/members/job", {});
      if (apiData) {
        jobLists=apiData.data.data
        setJobList(apiData.data.data)
      }
    } catch (error) {}
  };
    const handledelete = async(data:any) => {
        let pref:any;
        let occupat:any
        const firstJobId = jobList.length > 0 ? jobList[0]?.id : null;
        const firstPrefId = prefList.length > 0 ? prefList[0]?.id : null;
        const confirmed = window.confirm('本当に削除しますか？');
        if(confirmed){
        const doB =data.dob1 +"-" +data.dob2 +"-" +data.dob3;
        const formattedJoinDate = formatDate(data.join_date);
        const formattedChangeDate = formatDate(data.change_date);
       
        if (data.prefecture) {
            prefList.map((item: any) => {
              if (item.name == data.prefecture) {
                pref = item.id;
              }
            });
          }
          if (data.occupation) {
            jobList.map((item: any) => {
              if (item.name == data.occupation) {
                occupat = item.id;
              }
            });
          }
        try {
            const dataRequest: any = {
                id:memberData?memberData?.id:apiMemberdata?.member?.id,
                memberno: data.memberno,
                name: data.name,
                namek: data.namek,
                name2: data.name2,
                namek2: data.namek2,
                memberid:data.memberid,
                password: data.password,
                sex: data.sex,
                dob:data.dob1 +"-" +data.dob2 +"-" +data.dob3,
                job: occupat ?? firstJobId,
                job_additional: data.job_additional,
                zipcode:
                    data.post1 + "-" + data.post2,
                pref: pref ?? firstPrefId,
                address1: data.address1,
                address2: data.address2,
                address3: data.address3,
                tel:
                data.tel1 +
                    "-" +
                    data.tel2 +
                    "-" +
                    data.tel3,
                mob: "",
                workplace: data.workplace,
                remarks_initial:memberData?memberData?.remarkinitial:apiMemberdata?.member?.remarks_initial,
                howfound: data.howfound,
                email_pc: data.email_pc1?`${data.email_pc1}@${data.email_pc2}`:"",
                email_mob: data.email_mob1 ? `${data.email_mob1}@${data.email_mob2}` : "",
                mailmagazine: data.mailmagazine,
                // joinDate: memberData?.join_date ?? "",
                joinDate: formattedJoinDate,
                // changeDate: memberData?.change_date ?? "",
                changeDate: formattedChangeDate,
                changeCause:data.changeCause?? "",
                status: 5,
                ngMember: 0,
                deleteRequest: 0,
                date: new Date().toISOString().split('T')[0],
                normal: data.checkboxGroup ? 1 : 0,
                anxiety: data.checkboxGroup2 ? 1 : 0,
                blackmail: data.checkboxGroup4 ? 1 : 0,
                other: data.checkboxGroup1 ? 1 : 0,
                growingup: data.checkboxGroup3 ? 1 : 0,
                addition1: data.checkboxGroup5Title ? data.checkboxGroup5Title : "",
                addition2: data.checkboxGroup6Title ? data.checkboxGroup6Title : "",
                statement_title: data.statement_title ? data.statement_title : "",
                statement_text: data.statement_text ? data.statement_text : "",
            };
            const apiData = await apiClient.put(
                "api/members/admin/updatemember",
                dataRequest,
                {}
            );
            if (apiData) {
                window.location.href = "/memberlist";
            }
        } catch (error: any) {
          console.error("Error:",error)
        }
    }
    };
    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    return (
        <Grid container xs={12} padding={1} spacing={1}>
            <Grid item xs={3} spacing={2}>
                <LeftPanBBS />
            </Grid>
            <Grid item xs={9}>
                <Grid className="content-row">
                    <Grid className="p2red_bg_left size"></Grid>
                    <Grid className="p2red_bg_midle">
                        <Grid className="top-header">
                            <span className="verdana_big">C. 会員データの修正・変更・削除（編集画面）</span>
                            <span className="verdana_big">会員管理</span>
                        </Grid>
                    </Grid>
                    <Grid className="p2red_bg_right size"></Grid>
                </Grid>
                <Grid className="hr"></Grid>

                <span className="black_bold"> ★以下の項目内容を入力して下さい。</span>
                <span className="red_font">＊印</span>
                <span className="black_bold"> は必須項目です。</span>
                {apiMemberdata && apiMemberdata.member || memberData ?

                    <form name="Edit" id="form" onSubmit={handleSubmit(onSubmit)}>
                        <Grid container className="middle_table">
                            <Grid item xs={6}>
                                <Grid className="hr"></Grid>
                                <EditInputField
                                    error={errors.name}
                                    firstrowHeading="・会員番号"
                                    control={control}
                                    name="memberno"
                                    defaultValue={memberData ? memberData.memberno : apiMemberdata?.member?.memberno}
                                    textBoxDisabled={true}
                                />
                                <Grid className="hr"></Grid>
                                <EditInputField
                                    error={errors.name}
                                    firstrowHeading="・名前（漢字）姓"
                                    control={control}
                                    name="name"
                                    defaultValue={memberData ? memberData.name : apiMemberdata?.member?.name}
                                />
                                <Grid className="hr"></Grid>
                                <EditInputField
                                    error={errors.name2}
                                    firstrowHeading="・名前（漢字） 名"
                                    control={control}
                                    name="name2"
                                    defaultValue={memberData ? memberData.name2 : apiMemberdata?.member?.name2}
                                />
                                <Grid className="hr"></Grid>
                                <EditInputField
                                    error={errors.namek}
                                    firstrowHeading="・ふりがな 姓"
                                    control={control}
                                    name="namek"
                                    defaultValue={memberData ? memberData.namek : apiMemberdata?.member?.namek}
                                />
                                <Grid className="hr"></Grid>
                                <EditInputField
                                    error={errors.namek2}
                                    firstrowHeading="・ふりがな 名"
                                    control={control}
                                    name="namek2"
                                    defaultValue={memberData ? memberData.namek2 : apiMemberdata?.member?.namek2}
                                />
                                <Grid className="hr"></Grid>
                                <EditInputField
                                    //handleSubmit={memberIdCheck}
                                    error={errors.memberid}
                                    firstrowHeading="・ID"
                                    firstrowHeading1="（4~15字以内英数ひらがな）"
                                    control={control}
                                    defaultValue={memberData ? memberData.memberid : apiMemberdata?.member?.memberid}
                                    name="memberid"
                                    memberButton={true}
                                    textBoxDisabled={true}
                                />
                                <Grid className="hr"></Grid>
                                <EditInputField
                                    error={errors.password}
                                    firstrowHeading="・パスワード"
                                    firstrowHeading1="（6~15字以内英数ひらがな）"
                                    control={control}
                                    name="password"
                                    inputTypePassword={true}
                                    defaultValue={memberData ? memberData.password : apiMemberdata?.member?.password}
                                />
                                <Grid className="hr"></Grid>
                                <EditInputField
                                    error={errors.password2}
                                    firstrowHeading="・パスワード再入力 "
                                    control={control}
                                    name="password2"
                                    inputTypePassword={true}
                                    defaultValue={memberData ? memberData.password : apiMemberdata?.member?.password}
                                />
                                <Grid className="hr"></Grid>
                                <Grid container >
                                    <Grid item xs={5}>
                                        <span className='black'>・性別</span>

                                    </Grid>
                                    <Grid item xs={7}>
                                        <Grid container flexDirection={'row'}>
                                            <input type='radio' value={1}
                                                {...register("sex")}
                                                defaultChecked={memberData ? memberData.sex == 1 : apiMemberdata?.member?.sex == 1} />
                                            <span className='black'>男性 </span>
                                            <input type='radio' value={2}
                                                {...register("sex")}
                                                defaultChecked={memberData ? memberData.sex == 2 : apiMemberdata?.member?.sex == 2}
                                            />
                                            <span className='black'>女性 </span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid className="hr"></Grid>
                                <RegDobInput
                                    error={errors.dob1}
                                    error1={errors.dob2}
                                    error2={errors.dob3}
                                    firstrowHeading=" ・ 生年月日"
                                    firstrowHeading1="（西暦）"
                                    defaultValue={memberData ? memberData.dob1 : apiMemberdata?.member?.dob[0]}
                                    defaultValue1={memberData ? memberData.dob2 : String(apiMemberdata?.member?.dob[1]).padStart(2, '0')}
                                    defaultValue2={memberData ? memberData.dob3 : String(apiMemberdata?.member?.dob[2]).padStart(2, '0')}
                                    control={control}
                                    spanText1="年"
                                    spanText2="月"
                                    spanText3="日"
                                    name="dob1"
                                    name1="dob2"
                                    name2="dob3"
                                />
                                <Grid className="hr"></Grid>
                                <EditInputField
                                    firstrowHeading="・職業"
                                    control={control}
                                    name="occupation"
                                    defaultValue={memberData ? memberData.occupation : occupatvalue}
                                    textInput={true}
                                    select1={false}
                                />
                                <Grid className="hr"></Grid>
                                <EditInputField
                                    span={true}
                                    firstrowHeading="・ 職業の詳細"
                                    name="job_additional"
                                    defaultValue={memberData ? memberData.job_additional : apiMemberdata?.member?.job_additional}
                                    control={control}
                                />
                                <Grid className="hr"> </Grid>
                                <RegPostInp
                                    firstRowHeading="・郵便番号"
                                    firstRowHeading1="〒"
                                    firstRowHeading2=" - "
                                    name="post1"
                                    name1="post2"
                                    control={control}
                                    defaultValue={memberData ? memberData.post1 : zipcode1}
                                    defaultValue1={memberData ? memberData.post2 : zipcode2}
                                    error={errors.post1}
                                    error1={errors.post2}
                                />
                                <Grid className="hr"></Grid>
                                <EditInputField
                                    firstrowHeading="・都道府県"
                                    name="prefecture"
                                    defaultValue={memberData ? memberData.prefecture :prefvalue}
                                    control={control}
                                    textInput={true}
                                    select1={true}
                                />
                                <Grid className="hr"></Grid>
                                <EditInputField
                                    error={errors.address1}
                                    firstrowHeading="・住所１ （市町村）"
                                    name="address1"
                                    defaultValue={memberData ? memberData.address1 : apiMemberdata?.member?.address1}
                                    control={control}
                                />
                                <Grid className="hr" />
                                <EditInputField
                                    error={errors.address2}
                                    firstrowHeading="・住所2 （丁目番地））"
                                    name="address2"
                                    defaultValue={memberData ? memberData.address2 : apiMemberdata?.member?.address2}
                                    control={control}
                                />
                                <Grid className="hr" />
                                <EditInputField
                                    span={true}
                                    firstrowHeading="・住所3 （マンション・ビル名）"
                                    name="address3"
                                    defaultValue={memberData ? memberData.address3 : apiMemberdata?.member?.address3}
                                    control={control}
                                />
                                <Grid className="hr" />
                                <RegDobInput
                                    error={errors.tel1}
                                    firstrowHeading="電話・携帯番号 （例：0000-0000-0000）"
                                    // firstrowHeading1="（西暦）"
                                    defaultValue={memberData ? memberData.tel1 : tel1}
                                    defaultValue1={memberData ? memberData.tel2 : tel2}
                                    defaultValue2={memberData ? memberData.tel3 : tel3}
                                    control={control}
                                    spanText1="-"
                                    spanText2="-"
                                    spanText3=""
                                    name="tel1"
                                    name1="tel2"
                                    name2="tel3"
                                    error1={errors.tel2}
                                    error2={errors.tel3}
                                />
                                <Grid className="hr"></Grid>
                                <EditInputField
                                    firstrowHeading="・勤め先・学校"
                                    name="workplace"
                                    defaultValue={memberData ? memberData.workplace : apiMemberdata?.member?.workplace}
                                    control={control}
                                />
                                <Grid className="hr"></Grid>
                                <EditInputField
                                    firstrowHeading="・何で知ったか"
                                    name="howfound"
                                    defaultValue={memberData ? memberData.howfound : apiMemberdata?.member?.howfound}
                                    control={control}
                                />
                                <Grid className="hr"></Grid>
                                <RegEmailImput
                                    control={control}
                                    firstrowHeading="メールアドレス1"
                                    defaultValue={memberData ? memberData.email_pc1 : emailpcuser}
                                    defaultValue1={memberData ? memberData.email_pc2 : emailpcdomain}
                                    name="email_pc1"
                                    name1="email_pc2"
                                />
                                <Grid className="hr"></Grid>
                                <RegEmailImput
                                    control={control}
                                    firstrowHeading="メールアドレス2"
                                    defaultValue={memberData ? memberData.email_mob1 : emailmobuser}
                                    defaultValue1={memberData ? memberData.email_mob2 : emailmobdomain}
                                    name="email_mob1"
                                    name1="email_mob2"
                                />
                                <Grid className="hr"></Grid>
                                {/* <RegRadioIn
                                    span={false}
                                    firstRowHeading="・メルマガ購読の有無"
                                    control={control}
                                    defaultValue={memberData ? memberData.mailmagazine : data?.member?.mailmagazine}
                                    defaultValue1={memberData ? memberData.mailmagazine : data?.member?.mailmagazine}
                                    name="mailmagazine"
                                    name1="mailmagazine"
                                /> */}
                                <Grid container >
                                    <Grid item xs={5}>
                                        <span className='black'>・メルマガ購読の有無</span>

                                    </Grid>
                                    <Grid item xs={7}>
                                        <Grid container flexDirection={'row'}>
                                            <input type='radio' value={1}
                                                {...register("mailmagazine")}
                                                defaultChecked={memberData ? memberData.mailmagazine == 1 : apiMemberdata?.member?.mailmagazine == 1} />
                                            <span className='black'>購読 </span>
                                            <input type='radio' value={2}
                                                {...register("mailmagazine")}
                                                defaultChecked={memberData ? memberData.mailmagazine == 2 : apiMemberdata?.member?.mailmagazine == 2}
                                            />
                                            <span className='black'>中止 </span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Right Section of input fields */}
                            <Grid item xs={6}>
                                <Grid className="hr"></Grid>
                                <Grid>
                                    <Grid item xs={12}>
                                        <span className="black">・発言タイトル</span>
                                        <span className="red_font">*</span>
                                    </Grid>
                                    <RegRightTop_Inp
                                        title="・発言内容"
                                        control={control}
                                        defaultValue1={memberData ? memberData.statement_title : apiMemberdata?.remarks[0]?.title}
                                        defaultValue2={memberData ? memberData.statement_text : apiMemberdata?.remarks[0]?.text}
                                        error1={errors.statement_title}
                                        error2={errors.statement_text}
                                        name1="statement_title"
                                        name2="statement_text"
                                    />
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <span className="black">・タイプ区分</span>
                                            <span className="red_font">*</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <span className="black">（チエックして下さい）</span>
                                        </Grid>
                                    </Grid>
                                    <Grid className="hr"></Grid>
                                    <EditCheckBox
                                        defaultValue={memberData ? memberData.checkboxGroup : apiMemberdata?.remarks[0]?.normal == 1 ? true : false}
                                        control={control}
                                        setValue={setValue}
                                        defaultValue1={memberData ? memberData.checkboxGroup1 : apiMemberdata?.remarks[0]?.other == 1 ? true : false}
                                        defaultValue2={memberData ? memberData.checkboxGroup2 : apiMemberdata?.remarks[0]?.anxiety == 1 ? true : false}
                                        defaultValue3={memberData ? memberData.checkboxGroup3 : apiMemberdata?.remarks[0]?.growingup == 1 ? true : false}
                                        defaultValue4={memberData ? memberData.checkboxGroup4 : apiMemberdata?.remarks[0]?.blackmail == 1 ? true : false}
                                        defaultValue5={memberData ? memberData.checkboxGroup5 : 
                                            apiMemberdata?.remarks[0]?.addition1!==""&&apiMemberdata?.remarks[0]?.addition1!==null ? true : false}
                                        defaultValue6={memberData ? memberData.checkboxGroup6 : 
                                            apiMemberdata?.remarks[0]?.addition2!==""&&apiMemberdata?.remarks[0]?.addition2!==null ? true : false}
                                        defaultTitle1={memberData ? memberData.checkboxGroup5Title : apiMemberdata?.remarks[0]?.addition1}
                                        defaultTitle2={memberData ? memberData.checkboxGroup6Title : apiMemberdata?.remarks[0]?.addition2}
                                    />
                                    <Grid className="hr"></Grid>
                                    <Grid container item xs={12}>
                                        <Grid xs={2}></Grid>
                                        <Grid item xs={6} className="content-row">
                                            <label className="black">（入力欄） </label>
                                        </Grid>
                                        <Grid item xs={4} className="content-row">
                                            <label className="black">（入力欄） </label>
                                        </Grid>
                                    </Grid>
                                    <Grid className="hr"></Grid>
                                    <RegInpRight
                                        error={errors.join_date}
                                        firstrowHeading=" .入会日"
                                        firstrowHeading1="（例：2008.05.01）"
                                        defaultValue={memberData ? memberData.join_date : joindate}
                                        control={control}
                                        name="join_date"
                                    />
                                    <Grid className="hr"></Grid>
                                    <RegInpRight
                                        control={control}
                                        firstrowHeading="・状況"
                                        firstrowHeading1="（チエックして下さい）"
                                    />
                                    <Grid className="hr"></Grid>
                                    <Grid container item xs={12}>
                                        <Grid item xs={4} className="content-row">
                                            <Controller
                                                control={control}
                                                defaultValue={"1"}
                                                name="usertype"
                                                render={({ field }) => (
                                                    <>
                                                        <input
                                                            {...field}
                                                            type="checkbox"
                                                            id="user_type1"
                                                            value="1"
                                                            {...register("usertype")}
                                                            checked={selectedCheckbox === "1"}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                    </>
                                                )}
                                            />

                                            <label className="verdana">A .参加中</label>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Controller
                                                control={control}
                                                name="usertype"
                                                render={({ field }) => (
                                                    <>
                                                        <input
                                                            {...field}
                                                            type="checkbox"
                                                            id="user_type2"
                                                            value="2"
                                                            {...register("usertype")}
                                                            checked={selectedCheckbox === "2"}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                    </>
                                                )}
                                            />

                                            <label className="verdana">B .利用中止</label>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Controller
                                                control={control}
                                                name="usertype"
                                                render={({ field }) => (
                                                    <>
                                                        <input
                                                            {...field}
                                                            type="checkbox"
                                                            id="user_type3"
                                                            value="3"
                                                            {...register("usertype")}
                                                            checked={selectedCheckbox === "3"}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                    </>
                                                )}
                                            />
                                            <label className="verdana">D. 退会</label>
                                        </Grid>
                                    </Grid>
                                    <Grid className="hr"></Grid>

                                    <Grid container item xs={12}>
                                        <Grid item xs={3}>
                                            <label className="black">・変更日 </label>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Grid item xs={12} className="content-row">
                                                <Grid xs={3}></Grid>
                                                <Grid item xs={3}>
                                                    <input
                                                        type="text"
                                                        className=" bdr_text_medium"
                                                        {...register("change_date")}
                                                        defaultValue={memberData ? memberData?.change_date : changedate}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <span className="black">（例：2008.05.01）</span>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="hr"></Grid>
                                    <Grid container item xs={12}>
                                        <Grid item xs={4}>
                                            <span className="black">・理由</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <input
                                                type="text"
                                                className="bdr_text"
                                                {...register("changeCause")}
                                                defaultValue={memberData ? memberData.changeCause : apiMemberdata?.member?.changeCause}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className="hr"></Grid>
                        <Grid item xs={12}>
                        <Grid container display={"flex"} justifyContent={"center"}>
                        <Controller
                            name="submitButton"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <>
                            <Button type="submit" name ="submitButton" value="submitButton2" >
                                    <img className="padding_top" src={submit}
                                     onClick={() => setValue('submitButton', 'submitButton')}
                                     {...field} />
                            </Button>
                    
                            <Button type="submit" name ="submitButton" value="submitButton2" >
                                    <img className="padding_top" src={deletebtn}
                                     onClick={() => setValue('submitButton', 'deleteButton')}
                                     {...field} />
                            </Button>
          
                                </>
                             )}
                            />
                             </Grid>
                        </Grid>
                    </form> : null}
            </Grid>
        </Grid>
    );
};

export default MemberEdit;
