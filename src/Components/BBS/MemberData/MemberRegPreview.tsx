import { Button, Grid } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import LeftPanBBS from "../../Common/LeftPanBBS";
import RegAddHeader from "./MemberRegComp/RegAddHeader";
import PreviewLeftRow from "./MemRegPrevComp/PreviewLeftRow";
import PreviewRightRow from "./MemRegPrevComp/PreviewRightRow";
import { useSelector, useDispatch } from "react-redux";
import submit from "../../../assets/images/btn_submit_new.gif";
import back from "../../../assets/images/btn_back_new.gif";
import apiClient from "../../../API/API-client";
import { useNavigate } from "react-router-dom";
import prefecture from "./MemberRegComp/Prefeture";
import occupation from "./MemberRegComp/RegOccupation";
import { setMemberReg } from "../../../Redux/actions";
import { formatDateString, getCurrentDate } from "../../Common/Date_conversion";

type job = {
  id: number;
  name: string;
};
type prefecture = {
  id: number;
  name: string;
  regionId: number;
  listOrder: number;
};

const MemberRegPreview = () => {
  const dispatch = useDispatch();
  const [shouldReload, setShouldReload] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [checkboxValues, setCheckboxValues] = useState<any>([]);
  const [memberRegSex, setMemberSex] = useState<string>("");
  const [memberRegMailMagazine, setRegMailMagazine] = useState("");
  const [memberRegSituation, setRegSituation] = useState<string>("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [prefList, setPrefList] = useState<prefecture[]>([]);
  const [jobList, setJobList] = useState<job[]>([]);
  const navigate = useNavigate();

  //to get redux stored fields to this variable
  const memberData: any = useSelector((state: any) => state.memberData);
  let jobId;
  let prefId;
  useEffect(() => {
    if(memberData.memberReg==''||memberData.memberReg==null){
      navigate('/memberjoin');
    }
    window.scrollTo(0, 0);
    getPref();
    getJob();
        const values = [
          memberData?.memberReg?.MemberReg_checkboxGroup ? "普通神経症" : null,
          memberData?.memberReg?.MemberReg_checkboxGroup1 ? "その他" : null,
          memberData?.memberReg?.MemberReg_checkboxGroup2 ? "不安神経症" : null,
          memberData?.memberReg?.MemberReg_checkboxGroup3 ? "成長の部屋" : null,
          memberData?.memberReg?.MemberReg_checkboxGroup4 ? "強迫神経症" : null,
          memberData?.memberReg?.MemberReg_checkboxGroup5
            ? "新規1" + memberData?.memberReg?.MemberReg_checkboxGroup5Title
            : null,
            memberData?.memberReg?.MemberReg_checkboxGroup6
            ? "新規２," + memberData?.memberReg?.MemberReg_checkboxGroup6Title
            : null,
        ].filter(Boolean);
        setCheckboxValues(values);

        // set gender
        if (memberData?.memberReg?.MemberReg_sex == "1") {
          setMemberSex("男性");
        } else {
          setMemberSex("女性");
        }
        //set mailmagazine
        if (memberData?.memberReg?.MemberReg_mailmagazine == "1") {
          setRegMailMagazine("購読");
        } else {
          setRegMailMagazine("中止");
        }
        // set situation
        if (memberData?.memberReg?.MemberReg_usertype == "1") {
          setRegSituation("参加中");
        } else if (memberData?.memberReg?.MemberReg_usertype == "2") {
          setRegSituation("	利用中止");
        } else if (memberData?.memberReg?.MemberReg_usertype == "3") {
          setRegSituation("退会");
        }
        // Other code for setting checkboxValues, gender, mailmagazine, and situation
      

    //this field to set height of the textarea based on the current textarea size using useRef
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // first auto height then calculate height based on the textarea height
      const newHeight = textarea.scrollHeight + "px";
      //setting new height to state
      setTextareaHeight(newHeight);
    }
  }, []);

  //get prefList
  const getPref = async () => {
    try {
      const apiData = await apiClient.post("api/members/prefList", {});
      if (apiData) {
       
        setPrefList(apiData.data.data);
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
    
        setJobList(apiData.data.data);
      }
    } catch (error) {}
  };
  const firstJobName = jobList.length > 0 ? jobList[0].name : null;
  const firstPrefName = prefList.length > 0 ? prefList[0]?.name : null;

  //create the new member function
  const createMember = async (data: any) => {
    const firstJobId = jobList.length > 0 ? jobList[0]?.id : null;
    const firstPrefId = prefList.length > 0 ? prefList[0]?.id : null;
    let userType;
    setButtonDisabled(true);
    //formatting date
    const formattedJoinDate = formatDateString(joinDate);
    const formattedChangeDate = formatDateString(changeDate);
    const formattedDob = formatDateString(doB);

    //getting pref id to pass dataRequest
    let pref: any;
    if (memberData.memberReg.MemberReg_prefecture) {
      prefList.map((item: any) => {
        if (item.name == memberData.memberReg.MemberReg_prefecture) {
          pref = item.id;
        }
      });
    }

    //getting occupation id to pass dataRequest
    let occupat: any;
    if (memberData.memberReg.MemberReg_occupation) {
      jobList.map((item: any) => {
        if (item.name == memberData.memberReg.MemberReg_occupation) {
          occupat = item.id;
        }
      });
    }

    const currentDate1 = getCurrentDate();
    if (memberData?.memberReg?.MemberReg_usertype == "1") {
      userType = memberData?.memberReg?.MemberReg_usertype;
    } else if (memberData?.memberReg?.MemberReg_usertype == "2") {
      userType = memberData?.memberReg?.MemberReg_usertype;
    } else if (memberData?.memberReg?.MemberReg_usertype == "3") {
      userType = memberData?.memberReg?.MemberReg_usertype;
    }

    try {
      const dataRequest: any = {
        name: memberData?.memberReg?.MemberReg_name,
        namek: memberData?.memberReg?.MemberReg_namek,
        name2: memberData?.memberReg?.MemberReg_name2,
        namek2: memberData?.memberReg?.MemberReg_namek2,
        memberid: memberData?.memberReg?.MemberReg_memberid,
        password: memberData?.memberReg?.MemberReg_password,
        sex: memberData?.memberReg?.MemberReg_sex,
        dob: formattedDob,
        job: occupat ?? firstJobId,
        job_additional: memberData?.memberReg?.MemberReg_job_additional,
        zipcode:
          memberData?.memberReg?.MemberReg_post1 +
          "-" +
          memberData?.memberReg?.MemberReg_post2,
        pref: pref ?? firstPrefId,
        address1: memberData?.memberReg?.MemberReg_address1,
        address2: memberData?.memberReg?.MemberReg_address2,
        address3: memberData?.memberReg?.MemberReg_address3,
        tel:
          memberData?.memberReg?.MemberReg_tel1 +
          "-" +
          memberData?.memberReg?.MemberReg_tel2 +
          "-" +
          memberData?.memberReg?.MemberReg_tel3,
        mob: "",
        workplace: memberData?.memberReg?.MemberReg_workplace,
        howfound: memberData?.memberReg?.MemberReg_howfound,
        email_pc: memberData?.memberReg?.MemberReg_email_pc1
          ? `${memberData?.memberReg?.MemberReg_email_pc1}@${memberData.memberReg.MemberReg_email_pc2}`
          : "",
        email_mob: memberData?.memberReg?.MemberReg_email_mob1
          ? `${memberData?.memberReg?.MemberReg_email_mob1}@${memberData.memberReg.MemberReg_email_mob2}`
          : "",
        mailmagazine: memberData?.memberReg?.MemberReg_mailmagazine ?? "",
        remarks_initial: 0,
        joinDate: formattedJoinDate,
        changeDate: formattedChangeDate,
        changeCause: memberData?.memberReg?.MemberReg_change_cause ?? "",
        // status: 1,
        ngMember: 0,
        statement_title: memberData?.memberReg?.MemberReg_statement_title ?? "",
        statement_text: memberData?.memberReg?.MemberReg_statement_text ?? "",
        user_type1: userType == "1" ? "1" : "",
        user_type2: userType == "2" ? "2" : "",
        user_type3: userType == "3" ? "3" : "",
        deleteRequest: 0,
        date: currentDate1,
        normal: memberData.memberReg.MemberReg_checkboxGroup ? 1 : 0,
        anxiety: memberData.memberReg.MemberReg_checkboxGroup2 ? 1 : 0,
        blackmail: memberData.memberReg.MemberReg_checkboxGroup4 ? 1 : 0,
        other: memberData.memberReg.MemberReg_checkboxGroup1 ? 1 : 0,
        growingup: memberData.memberReg.MemberReg_checkboxGroup3 ? 1 : 0,
        chk_add1: memberData.memberReg?.MemberReg_checkboxGroup5Title
          ? true
          : false,
        chk_add2: memberData.memberReg?.MemberReg_checkboxGroup6Title
          ? true
          : false,
        addition1: memberData.memberReg.MemberReg_checkboxGroup5Title
          ? memberData.memberReg.MemberReg_checkboxGroup5Title
          : "",
        addition2: memberData.memberReg.MemberReg_checkboxGroup6Title
          ? memberData.memberReg.MemberReg_checkboxGroup6Title
          : "",
      };
  
      const apiData = await apiClient.post(
        "api/members/admin/addMember",
        dataRequest,
        {}
      );
      if(apiData){
        setButtonDisabled(false);
        dispatch(setMemberReg('memberReg',''));
        navigate('/memberaddfinish');
      }
    } catch (error:any) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.error);
      } else if (error.response && error.response.status === 500) {
        alert(error.response.data.error);
      }
    }
  };

  const joinDate = memberData?.memberReg?.MemberReg_join_date ?? "";
  const changeDate = memberData?.memberReg?.MemberReg_change_date ?? "";
  const doB =
    memberData?.memberReg?.MemberReg_dob1 +
    "-" +
    memberData?.memberReg?.MemberReg_dob2 +
    "-" +
    memberData?.memberReg?.MemberReg_dob3;

  return (
    <Grid container xs={12} padding={1} spacing={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanBBS />
      </Grid>
      <Grid item xs={9}>
        <RegAddHeader />
        <Grid className="hr"></Grid>
        <span className="black_bold"> ★以下の項目内容を入力して下さい。</span>
        <Grid container className="middle_table">
          <Grid item xs={6}>
            <Grid className="hr"></Grid>
            <PreviewLeftRow
              title="・名前（漢字） 姓"
              value={memberData?.memberReg?.MemberReg_name}
            />
            <PreviewLeftRow
              title="  ・名前（漢字） 名"
              value={memberData?.memberReg?.MemberReg_name2}
            />
            <PreviewLeftRow
              title="  ・ふりがな     姓"
              value={memberData?.memberReg?.MemberReg_namek}
            />
            <PreviewLeftRow
              title="  ・ふりがな     名"
              value={memberData?.memberReg?.MemberReg_namek2}
            />
            <PreviewLeftRow
              title="  ・ID"
              value={memberData?.memberReg?.MemberReg_memberid}
            />
            <PreviewLeftRow
              title="    ・パスワード"
              value={memberData?.memberReg?.MemberReg_password}
            />
            <PreviewLeftRow title=" ・性別" value={memberRegSex} />
            <PreviewLeftRow
              title="    ・ 生年月日　　　　　（西暦）"
              value={
                memberData?.memberReg?.MemberReg_dob1 +
                " 年 " +
                memberData?.memberReg?.MemberReg_dob2 +
                " 月 " +
                memberData?.memberReg?.MemberReg_dob3 +
                " 日 "
              }
            />
            <PreviewLeftRow
              title="   ・職業"
              value={memberData?.memberReg?.MemberReg_occupation ?? firstJobName}
            />
            <PreviewLeftRow
              title="  ・ 職業の詳細"
              value={memberData?.memberReg?.MemberReg_job_additional}
            />
            <PreviewLeftRow
              title="  ・ 郵便番号"
              value={
                memberData?.memberReg?.MemberReg_post1 +
                "-" +
                memberData?.memberReg?.MemberReg_post2
              }
            />
            <PreviewLeftRow
              title=" ・ 都道府県"
              value={memberData?.memberReg?.MemberReg_prefecture ?? firstPrefName}
            />
            <PreviewLeftRow
              title=" ・住所１ （市町村）"
              value={memberData?.memberReg?.MemberReg_address1}
            />
            <PreviewLeftRow
              title=" ・住所2 （丁目番地）"
              value={memberData?.memberReg?.MemberReg_address2}
            />
            <PreviewLeftRow
              title="   ・住所3 （マンション・ビル名）"
              value={memberData?.memberReg?.MemberReg_address3}
            />
            <PreviewLeftRow
              title=" ・電話 （例：0000-0000-0000）"
              value={
                memberData?.memberReg?.MemberReg_tel1 +
                "-" +
                memberData?.memberReg?.MemberReg_tel2 +
                "-" +
                memberData?.memberReg?.MemberReg_tel3
              }
            />
            <PreviewLeftRow
              title=" ・勤め先・学校"
              value={memberData?.memberReg?.MemberReg_workplace}
            />
            <PreviewLeftRow
              title="   ・何で知ったか"
              value={memberData?.memberReg?.MemberReg_howfound}
            />
            <PreviewLeftRow
              title="   メールアドレス1"
              value={
                memberData?.memberReg?.MemberReg_email_pc1
                  ? `${memberData?.memberReg?.MemberReg_email_pc1}@${memberData.memberReg.MemberReg_email_pc2}`
                  : null
              }
            />
            <PreviewLeftRow
              title="  メールアドレス2"
              value={
                memberData?.memberReg?.MemberReg_email_mob1
                  ? `${memberData?.memberReg?.MemberReg_email_mob1}@${memberData.memberReg.MemberReg_email_mob2}`
                  : null
              }
            />
            <PreviewLeftRow
              title=" ・メルマガ購読の有無"
              value={memberRegMailMagazine}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid className="hr"></Grid>
            <PreviewRightRow
              title="・発言タイトル"
              value={memberData?.memberReg?.MemberReg_statement_title}
            />
            <PreviewRightRow
              title="・入会日"
              value={memberData?.memberReg?.MemberReg_join_date}
            />
            <PreviewRightRow
              checkboxSize={checkboxValues.length}
              typeInput={true}
              title="・タイプ区分"
              value={checkboxValues.join("\n")}
            />
            <PreviewRightRow title="・状況" value={memberRegSituation} />
            <PreviewRightRow
              title="・変更日"
              value={memberData?.memberReg?.MemberReg_change_date}
            />
            <PreviewRightRow
              title="・理由"
              value={memberData?.memberReg?.MemberReg_change_cause}
            />
            <Grid className="content-row">
              <Grid xs={12}>
                <span>・発言内容</span>
              </Grid>
            </Grid>

            <Grid className="content-row" xs={12} paddingRight={5}>
              <textarea
                ref={textareaRef}
                id="dynamic-textarea"
                style={{ height: textareaHeight }}
                className="bdr_text4"
                value={memberData?.memberReg?.MemberReg_statement_text}
              ></textarea>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12}>
          <Grid container display={"flex"} justifyContent={"center"}>
            <Button type="submit" disabled={isButtonDisabled}>
              <img
                className="padding_top"
                src={submit}
                onClick={createMember}
              />
            </Button>
            <Button type="button">
              <img
                className="padding_top"
                src={back}
                onClick={() => navigate("/memberjoin")}
              />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MemberRegPreview;
