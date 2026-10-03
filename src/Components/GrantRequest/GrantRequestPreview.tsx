import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import ApiClient from '../../API/API-client';
import '../GrantRequest/styles.scss';
import GrantRequestComponent from "./GrantRequestComponent";
import GrantRequestExpenseComponent from "./GrantRequestExpenseComponent";
import GrantRequestResearchComponent from "./GrantRequestResearchDetail";

const GrantRequestPreview = () => {
    const location = useLocation();
    const data = location.state;
    const [itemdata, setitemdata] = useState([])


    useEffect(() => {
        fetchUsers();
    }, []);
    const printClick = () => {
        window.print()
    }
    const fetchUsers = async () => {
        try {
            const apiData = await ApiClient.get('api/grant-requests/view/' + data.toString());
            if (apiData) {
                setitemdata(apiData?.data?.data)

            }
        } catch (error: any) {
            if (error.response && error.response.status === 403) {

                console.log("403 error occurred");
            } else {
                // Handle other errors
                console.log("Error occurred:", error);
            }
        }
    };
    return (
        <>  <Grid container xs={12} className=" grid-button-container">

            <Link to={{ pathname: '/grantlistview' }}><input type="button" id="back" name="back" value=" 戻る"
                className="button-style buttoncontainer"
            /></Link>


            <input type="button" id="back" name="back" value=" 印刷"
                className="button-style" onClick={() => printClick()}
            />

        </Grid>

            {itemdata?.map((item: any) => {
                const year = item.dateCreated[0];
                const month = String(item.dateCreated[1]).padStart(2, '0');
                const day = String(item.dateCreated[2]).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                return (
                    <Grid className="page-break" >

                        <Grid container xs={12} className="grid-main-container">
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={10} container >
                                <Grid container xs={12} justifyContent={"center"}>
                                    令和4年度　研究活動助成申請個票
                                </Grid>
                                <Grid item xs={12} container>
                                    <Grid xs={6}>
                                    </Grid>
                                    <Grid xs={3} >
                                        <label >（申請受付No.{item.id}  ）</label>
                                    </Grid>
                                    <Grid xs={3}>
                                        <label> 申請日：{formattedDate}</label>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className="Grid-root">
                                    <Grid item xs={12} container className="Grid-root-border-bottom ">
                                        <Grid item xs={2}  >
                                            <label >助成申請区分</label>
                                        </Grid>
                                        <Grid item xs={10} container >
                                            <Grid item xs={2} className="Grid-root-border-right"></Grid>
                                            <Grid item xs={10} container>
                                                <Grid item xs={2} className="Grid-root-border-right">
                                                    <label>研究助成</label>
                                                </Grid>
                                                <Grid item xs={2} className="Grid-root-border-right">
                                                    <label >	財団区分</label>
                                                </Grid>
                                                <Grid item xs={2} className="Grid-root-border-right">
                                                    <label >{item.remark}</label>
                                                </Grid>
                                                <Grid item xs={4} className="Grid-root-border-right">
                                                    <label> 	新規・継続の区分</label>
                                                </Grid>
                                                <Grid item xs={2} className="Grid-root-border-right">
                                                    <label >{item.newCont}</label>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} container>
                                        <Grid item xs={2} >
                                            <label>研究名または 活動課題名</label>
                                        </Grid>
                                        <Grid item xs={10} container>
                                            <Grid item xs={2} className="Grid-root-border-right"></Grid>
                                            <Grid item xs={10} container>
                                                <Grid item xs={6} >
                                                    <label >{item.researchName}</label>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <GrantRequestComponent label={"研究助成"} item={item}></GrantRequestComponent>
                                    <GrantRequestComponent label={"活動助成"} item={item}></GrantRequestComponent>
                                    <GrantRequestComponent label={"推薦者"} item={item}></GrantRequestComponent>
                                    <Grid xs={12} className="Grid-root-border-bottom" >
                                        <label>研究代表者の略歴または団体の活動歴</label>
                                    </Grid>
                                    <Grid xs={12} className="grid-container-biography">
                                        <label >{item.biography}</label>
                                    </Grid>

                                    <GrantRequestExpenseComponent label={""} equipcost={"設備備品費"} consumablecost={"消耗品費"} travelexpenses={"旅費"}
                                        expRewardMoney={"謝金"} others={"その他"} total={"合計"}></GrantRequestExpenseComponent>
                                    <GrantRequestExpenseComponent label={"研究活動に要する今年度経費"} equipcost={item.expEquipmentCosts} consumablecost={item.expConsumablesCosts} travelexpenses={item.expTravelExpenses}
                                        expRewardMoney={item.expRewardMoney} others={item.expOther} total={(item.expTotal * 10000).toLocaleString()}></GrantRequestExpenseComponent>
                                    <GrantRequestExpenseComponent label={"上記に対する助成金申請額"} equipcost={item.subEquipmentCosts} consumablecost={item.subConsumablesCosts} travelexpenses={item.subTravelExpenses}
                                        expRewardMoney={item.subRewardMoney} others={item.subOther} total={(item.subTotal * 10000).toLocaleString()}></GrantRequestExpenseComponent>
                                    <Grid xs={12} className="Grid-root-border-bottom Grid-root-border-top ">
                                        <label >上記助成金申請額の明細</label>
                                    </Grid>
                                    <Grid xs={12} className="Grid-root-border-bottom grid-container-detail">
                                        <label >{item.details}</label>
                                    </Grid>
                                    <Grid xs={12} className="Grid-root-border-bottom">
                                        <label >■研究または活動の内容</label>
                                    </Grid>
                                    <Grid item xs={12} container className="Grid-root-border-bottom ">

                                        <Grid item xs={2} className=" Grid-root-border-right">
                                            <label>別紙の有無</label>
                                        </Grid>
                                        <Grid item xs={10} container>
                                            <Grid item xs={12} container>
                                                <Grid item xs={2} className="Grid-root-border-right">
                                                    <label>あり・なし</label>
                                                </Grid>
                                                <Grid item xs={10}> </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid xs={12} className="Grid-root-border-bottom">
                                        <label >①目的</label>
                                    </Grid>

                                    <Grid xs={12} className="Grid-root-border-bottom gridContainer">
                                        <label>{item.purpose}</label>
                                    </Grid>
                                    <Grid xs={12} className="Grid-root-border-bottom">
                                        <label>②対象</label>
                                    </Grid>
                                    <Grid xs={12} className="Grid-root-border-bottom gridContainer">
                                        <label >{item.target}</label>
                                    </Grid>
                                    <Grid xs={12} className="Grid-root-border-bottom">
                                        <label >③方法</label>
                                    </Grid>

                                    <Grid xs={12} className="Grid-root-border-bottom gridContainer">
                                        <label >{item.contents}</label>
                                    </Grid>
                                    <Grid xs={12} className="Grid-root-border-bottom">
                                        <label >④予想される成果</label>
                                    </Grid>
                                    <Grid xs={12} className="Grid-root-border-bottom gridContainer">
                                        <label >{item.expectedResults}</label>
                                    </Grid>
                                    <Grid item xs={12} container className="Grid-root-border-bottom" >
                                        <Grid width="30%" className="Grid-root-border-right">
                                            <label>個人への調査・研究に対する 人権・プライバシーへの配慮</label>
                                        </Grid>
                                        <Grid width="70%" container>
                                            <Grid xs={12} container className="Grid-root-border-bottom">
                                                <Grid xs={5} className="Grid-root-border-right">
                                                    <label >（A）所属機関の倫理審査委員会等の承認について</label>
                                                </Grid>
                                                <Grid xs={7} >
                                                    <label >{item.approval}</label>
                                                </Grid>
                                            </Grid>
                                            <Grid xs={12} container>
                                                <Grid xs={5} className="Grid-root-border-right">
                                                    <label >（B）調査・研究対象者個人に対して</label>
                                                </Grid>
                                                <Grid xs={7}>
                                                    <label >{item.approval}</label>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} container className="Grid-root-border-bottom">
                                        <Grid xs={2} className="Grid-root-border-right">
                                            <label >キーワード</label>
                                        </Grid>
                                        <Grid xs={10}>
                                            <label >{item.keywords}</label>
                                        </Grid>
                                    </Grid>
                                    <Grid xs={12} container className="Grid-root-border-bottom" >
                                        <label>本研究の独創性</label>

                                    </Grid>
                                    <Grid xs={12} container className="Grid-root-border-bottom gridContainer">
                                        <label >{item.originality}</label>

                                    </Grid>
                                    <Grid xs={12} container className="Grid-root-border-bottom" >
                                        <label >関連領域における研究発表、実績（投稿論文や学会発表論文など）</label>

                                    </Grid>
                                    <Grid xs={12} container className="gridContainer">
                                        <label >{item.achievements}</label>

                                    </Grid>
                                    <GrantRequestResearchComponent name={"研究代表者氏名"} age={"年齢"} department={"所属機関・部局・職名"} role={"役割負担（研究実施計画に対する分担事項）"}></GrantRequestResearchComponent>
                                    <GrantRequestResearchComponent name={item.orgPrincipal} age={item.age0} department={item.affiliation} role={item.role0}></GrantRequestResearchComponent>
                                    <GrantRequestResearchComponent name={"研究分担者氏名"} age={"年齢"} department={"所属機関・部局・職名"} role={"役割負担（研究実施計画に対する分担事項）"}></GrantRequestResearchComponent>
                                    <GrantRequestResearchComponent name={item.coordinator1} age={item.age1} department={item.affiliation1} role={item.role1}></GrantRequestResearchComponent>
                                    <GrantRequestResearchComponent name={item.coordinator2} age={item.age2} department={item.affiliation2} role={item.role2}></GrantRequestResearchComponent>
                                    <GrantRequestResearchComponent name={item.coordinator3} age={item.age3} department={item.affiliation3} role={item.role3}></GrantRequestResearchComponent>
                                    <Grid xs={12} className="Grid-root-border-bottom Grid-root-border-top" >
                                        <label >過年度助成の研究内容と実績の要約</label>
                                    </Grid>
                                    <Grid xs={12} container className="gridContainer">
                                        <label>{item.researchContents}</label>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid xs={1}>

                            </Grid>
                        </Grid>

                    </Grid>
                )
            })
            }

        </>

    );
}
export default GrantRequestPreview