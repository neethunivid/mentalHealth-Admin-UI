import { Button, Grid } from "@mui/material";
import React, { useEffect, useState,useRef } from "react";
import LeftPanBBS from "../../Common/LeftPanBBS";
import PreviewLeftRow from "./MemRegPrevComp/PreviewLeftRow";
import PreviewRightRow from "./MemRegPrevComp/PreviewRightRow";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../API/API-client";
import submit from "../../../assets/images/btn_submit_new.gif";
import back from "../../../assets/images/btn_back_new.gif";
import { setMemberReg } from "../../../Redux/actions";
import { getCurrentDate } from "../../Common/Date_conversion";

const MemberEditPreview = () => {
    const [shouldReload, setShouldReload] = useState(false);
    const [memberRegSex, setMemberSex] = useState<string>("");
    const [memberMailMagazine, setMailMagazine] = useState("");
    const [memberEditSituation, setEditSituation] = useState<string>("");
    const memberData: any = useSelector((state: any) => state.memberData?.Memberdata_by_id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checkboxValues, setCheckboxValues] = useState<any>([]);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [textareaHeight, setTextareaHeight] = useState("auto");
    const currentDate1 = getCurrentDate();
    const [prefList, setPrefList] = useState<any>([]);
    const [jobList, setJobList] = useState<any>([]);
    
    useEffect(() => {
        if(memberData==''||memberData==null){
            navigate('/memberedit');
        }
        window.scrollTo(0, 0);
        getPref();
        getJob();
             const values = [
                memberData?.checkboxGroup ? "普通神経症" : null,
                memberData?.checkboxGroup1 ? "その他" : null,
                memberData?.checkboxGroup2 ? "不安神経症" : null,
                memberData?.checkboxGroup3 ? "成長の部屋" : null,
                memberData?.checkboxGroup4 ? "強迫神経症" : null,
                memberData?.checkboxGroup5
                  ? "新規1" + memberData?.checkboxGroup5Title
                  : null,
                  memberData?.checkboxGroup6
                  ? "新規２," + memberData?.checkboxGroup6Title
                  : null,
              ].filter(Boolean);
              setCheckboxValues(values);
            
              // set gender
              if (memberData?.sex == "1") {
                setMemberSex("男性");
              } else {
                setMemberSex("女性");
              }
              //set mailmagazine
              if (memberData?.mailmagazine == "1") {
                setMailMagazine("購読");
              } else {
                setMailMagazine("中止");
              }
              // set situation
              if (memberData?.usertype[0] == "1") {
                setEditSituation("参加中");
              } else if (memberData?.usertype[0] == "2") {
                setEditSituation("	利用中止");
              } else if (memberData?.usertype[0] == "3") {
                setEditSituation("退会");
              }
          const textarea = textareaRef.current;
          if (textarea) {
            textarea.style.height = 'auto'; // first auto height then calculate height based on the textarea height
            const newHeight = textarea.scrollHeight + 'px';
            setTextareaHeight(newHeight);
          }
    }, []);

    useEffect(() => {
        // Trigger the window.location.reload() only when the shouldReload flag is true
        if (shouldReload) {
          window.location.reload();
        }
      }, [shouldReload]);
    
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

    //getting pref id to pass dataRequest
    let pref: any;
    if (memberData.prefecture) {
      prefList.map((item: any) => {
        if (item.name == memberData.prefecture) {
          pref = item.id;
        }
      });
    }

    //getting occupation id to pass dataRequest
    let occupat: any;
    if (memberData.occupation) {
      jobList.map((item: any) => {
        if (item.name == memberData.occupation) {
          occupat = item.id;
        }
      });
    }
    const firstJobName = jobList.length > 0 ? jobList[0].name : null;
    const firstPrefName = prefList.length > 0 ? prefList[0]?.name : null;

    //update the member details
    const updateMember = async (data: any) => {
        const firstJobId = jobList.length > 0 ? jobList[0]?.id : null;
        const firstPrefId = prefList.length > 0 ? prefList[0]?.id : null;
        setButtonDisabled(true);
        const formattedJoinDate = formatDate(joinDate);
        const formattedChangeDate = formatDate(changeDate);
        try {
            const dataRequest: any = {
                id: memberData?.id,
                memberno: memberData?.memberno,
                name: memberData?.name,
                namek: memberData?.namek,
                name2: memberData?.name2,
                namek2: memberData?.namek2,
                memberid: memberData?.memberid,
                password: memberData?.password,
                sex: memberData?.sex,
                dob:
                    memberData?.dob1 +
                    "-" +
                    memberData?.dob2 +
                    "-" +
                    memberData?.dob3,
                job: occupat ?? firstJobId,
                job_additional: memberData?.job_additional,
                zipcode:
                    memberData?.post1 + "-" + memberData?.post2,
                pref: pref ?? firstPrefId,
                address1: memberData?.address1,
                address2: memberData?.address2,
                address3: memberData?.address3,
                tel:
                    memberData?.tel1 +
                    "-" +
                    memberData?.tel2 +
                    "-" +
                    memberData?.tel3,
                mob: "",
                workplace: memberData?.workplace,
                remarks_initial: memberData?.remarkinitial? memberData.remarkinitial:0,
                howfound: memberData?.howfound,
                email_pc: memberData?.email_pc1 ? `${memberData.email_pc1}@${memberData.email_pc2}` : "",
                email_mob: memberData?.email_mob1 ? `${memberData.email_mob1}@${memberData.email_mob2}` : "",
                mailmagazine: memberData?.mailmagazine ?? "",
                // joinDate: memberData?.join_date ?? "",
                joinDate: formattedJoinDate,
                // changeDate: memberData?.change_date ?? "",
                changeDate: formattedChangeDate,
                changeCause: memberData?.changeCause ?? "",
                status: memberData?.usertype[0] == "1" ? 1 : memberData?.usertype[0] == 2 ? "4" : "3",
                ngMember: 0,
                deleteRequest: 0,
                date: currentDate1,
                normal: memberData.checkboxGroup ? 1 : 0,
                anxiety: memberData.checkboxGroup2 ? 1 : 0,
                blackmail: memberData.checkboxGroup4 ? 1 : 0,
                other: memberData.checkboxGroup1 ? 1 : 0,
                growingup: memberData.checkboxGroup3 ? 1 : 0,
                chk_add1:memberData.checkboxGroup5 ? 1 : 0,
                chk_add2:memberData.checkboxGroup6 ? 1 : 0,
                addition1: memberData.checkboxGroup5Title ? memberData.checkboxGroup5Title : "",
                addition2: memberData.checkboxGroup6Title ? memberData.checkboxGroup6Title : "",
                statement_title: memberData.statement_title ? memberData.statement_title : "",
                statement_text: memberData.statement_text ? memberData.statement_text : "",
            };
            const apiData = await apiClient.put(
                "api/members/admin/updatemember",
                dataRequest,
                {}
            );
            if (apiData) {
                setButtonDisabled(false);
                sessionStorage.removeItem("Memberdata_by_id");
                window.location.href = "/memberaddfinish";
            }
        } catch (error: any) {
            setButtonDisabled(false);
            console.error("Error:",error)
        }
    };
    const joinDate = memberData?.join_date ?? "";
    const changeDate = memberData?.change_date ?? "";
    const doB =
        memberData?.dob1 +
        memberData?.dob2 +
        memberData?.dob3;

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
                            <span className="verdana_big">C. 会員データの修正確認画面</span>
                            <span className="verdana_big">会員</span>
                        </Grid>
                    </Grid>
                    <Grid className="p2red_bg_right size"></Grid>
                </Grid>
                <Grid className="hr"></Grid>
                <span className="black_bold"> ★以下の項目内容を入力して下さい。</span>
                {memberData ?
                    <Grid>
                        <Grid container className="middle_table">
                            <Grid item xs={6}>
                                <Grid className="hr"></Grid>
                                <PreviewLeftRow
                                    title="・会員番号"
                                    value={memberData?.memberno} />
                                <PreviewLeftRow
                                    title="・名前（漢字） 姓"
                                    value={memberData?.name} />
                                <PreviewLeftRow
                                    title="  ・名前（漢字） 名"
                                    value={memberData?.name2} />
                                <PreviewLeftRow
                                    title="  ・ふりがな     姓"
                                    value={memberData?.namek} />
                                <PreviewLeftRow
                                    title="  ・ふりがな     名"
                                    value={memberData?.namek2} />
                                <PreviewLeftRow
                                    title="  ・ID"
                                    value={memberData?.memberid} />
                                <PreviewLeftRow
                                    title="    ・パスワード"
                                    value={memberData?.password} />
                                <PreviewLeftRow
                                    title="    ・性別"
                                    value={memberRegSex} />
                                <PreviewLeftRow
                                    title="    ・ 生年月日　　　　　（西暦）"
                                    value={memberData ? (`${memberData?.dob1} 年 ${memberData?.dob2} 月 ${memberData?.dob3} 日`) : null}
                                />
                                <PreviewLeftRow
                                    title="   ・職業"
                                    value={memberData? memberData?.occupation : firstJobName} />
                                <PreviewLeftRow
                                    title="  ・ 職業の詳細"
                                    value={memberData?.job_additional} />
                                <PreviewLeftRow
                                    title="  ・ 郵便番号" value={memberData ? (`〒${memberData?.post1} - ${memberData?.post2}`) : null} />
                                <PreviewLeftRow
                                    title=" ・ 都道府県"
                                    value={memberData? memberData?.prefecture : firstPrefName} />
                                <PreviewLeftRow
                                    title=" ・住所１ （市町村）"
                                    value={memberData?.address1} />
                                <PreviewLeftRow
                                    title=" ・住所2 （丁目番地）"
                                    value={memberData?.address2} />
                                <PreviewLeftRow
                                    title="   ・住所3 （マンション・ビル名）"
                                    value={memberData?.address3}
                                />
                                <PreviewLeftRow
                                    title=" ・電話 （例：0000-0000-0000）"
                                    value={memberData ? (`${memberData?.tel1}-${memberData?.tel2}-${memberData?.tel3}`) : null}
                                />
                                <PreviewLeftRow
                                    title=" ・勤め先・学校"
                                    value={memberData?.workplace} />
                                <PreviewLeftRow
                                    title="   ・何で知ったか"
                                    value={memberData?.howfound} />
                                <PreviewLeftRow
                                    title="   メールアドレス1"
                                    value={memberData?.email_pc1 ? (`${memberData.email_pc1}@${memberData.email_pc2}`) : null} />
                                <PreviewLeftRow
                                    title="  メールアドレス2"
                                    value={memberData?.email_mob1 ? (`${memberData?.email_mob1}@${memberData?.email_mob2}`) : null} />
                                <PreviewLeftRow title=" ・メルマガ購読の有無"
                                    value={memberMailMagazine} />
                            </Grid>
                            <Grid item xs={6}>

                                <Grid className="hr"></Grid>
                                <PreviewRightRow
                                    title="・発言タイトル"
                                    value={memberData?.statement_title} />
                                <PreviewRightRow
                                    title="・入会日"
                                    value={memberData?.join_date} />
                                <PreviewRightRow
                                    checkboxSize={checkboxValues.length + 2}
                                    typeInput={true}
                                    title="・タイプ区分"
                                    value={checkboxValues.join("\n")} />
                                <PreviewRightRow
                                    title="・状況"
                                    value={memberEditSituation} />
                                <PreviewRightRow
                                    title="・変更日"
                                    value={memberData?.change_date} />
                                <PreviewRightRow
                                    title="・理由"
                                    value={memberData?.changeCause} />
                                {/* <PreviewRightRow
                                    title="・発言内容"
                                    value={memberData?.statement_text} /> */}
                                <Grid className="content-row">
                                    <Grid xs={12}>
                                     <span className="black">・発言内容</span>
                                    </Grid>
                                </Grid>

                                <Grid className="content-row" xs={12} paddingRight={4}>
                                    <textarea
                                        ref={textareaRef}
                                        id="dynamic-textarea"
                                        style={{ height: textareaHeight }}
                                        className="bdr_text4"
                                        value={memberData?.statement_text}
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
                                        onClick={updateMember}
                                    />
                                </Button>
                                <Button type="button">
                                    <img
                                        className="padding_top"
                                        src={back}
                                        onClick={() => navigate('/memberedit', { state: { data: memberData?.id } })}
                                    />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid> : null}
            </Grid>
        </Grid>
    );
};

export default MemberEditPreview;
