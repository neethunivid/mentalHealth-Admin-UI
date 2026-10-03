import { Box, Grid, Table, TableCell, TableRow } from "@mui/material";
import React, { FC } from "react";
import '../../assets/css/health.css';
import LeftPanGrant from "../Common/LeftPanGrant";
import { useForm } from 'react-hook-form';
import '../GrantRequest/styles.scss';
const GrantRequestComponent = ({ label, item }: any) => {
    return (
        <div>
            {label === '研究助成' ?

                <Grid item xs={12} container className="Grid-root-border-top ">
                    <Grid item xs={2} className=" Grid-root-border-bottom  Grid-root-border-right">
                        <label >研究助成</label>
                    </Grid>
                    <Grid item xs={10} container className=" Grid-root-border-bottom  ">
                        <Grid item xs={12} container>
                            <Grid item xs={2} className="Grid-root-border-right">
                                <label >研究代表者所属 機関の所在地</label>
                            </Grid>
                            <Grid item xs={10}> <Grid xs={12} container >
                                <Grid xs={12}><label >{item.country1}</label></Grid>
                                <Grid xs={12}><label >{item.location1}</label></Grid>
                                <Grid xs={12}><label >{item.prefectures1}</label></Grid>
                                <Grid xs={12}><label >{item.municipality1}</label></Grid>
                                <Grid xs={12}><label >{item.address1}</label></Grid>
                                <Grid xs={12}><label >{item.building1}</label></Grid>
                            </Grid> </Grid>
                        </Grid>
                        <Grid item xs={12} container className="Grid-root-border-top">
                            <Grid item xs={2} className="Grid-root-border-right">
                                <label >研究代表者の 所属・職位</label>
                            </Grid>
                            <Grid item xs={10} container>
                                <Grid xs={12}><label >{item.institution}</label></Grid>
                                <Grid xs={12}><label >{item.dept}</label></Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container className="Grid-root-border-top">
                            <Grid item xs={2} className="Grid-root-border-right">
                                <label >研究代表者</label>
                            </Grid>
                            <Grid item xs={10} container>

                                <Grid xs={12} container>
                                    < Grid xs={12}><label >{item.fullname}</label></Grid>
                                    <Grid xs={12}><label >{item.furigana}</label></Grid>
                                    <Grid xs={12}><label >{item.dob}</label></Grid>
                                    <Grid xs={12}><label >{item.age}</label></Grid>
                                    <Grid xs={12}><label >{item.country2}</label></Grid>
                                    <Grid xs={12}><label >{item.home}</label></Grid>
                                    <Grid xs={12}><label >{item.prefectures2}</label></Grid>
                                    <Grid xs={12}><label >{item.municipality2}</label></Grid>
                                    <Grid xs={12}><label >{item.address2}</label></Grid>
                                    <Grid xs={12}><label >{item.building2} </label></Grid>
                                    <Grid xs={12}><label >{item.phone}</label></Grid>
                                    <Grid xs={12}><label >{item.email2}</label></Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                :
                label === '活動助成' ?
                    <Grid item xs={12} container >
                        <Grid item xs={2} className=" Grid-root-border-bottom  Grid-root-border-right">
                            <label >活動助成</label>
                        </Grid>
                        <Grid item xs={10} container className=" Grid-root-border-bottom  ">
                            <Grid item xs={12} container>
                                <Grid item xs={2} className="Grid-root-border-right">
                                    <label> 団体活動機関</label>
                                </Grid>
                                <Grid item xs={10}> <Grid xs={12} container >
                                    <Grid xs={12}><label>{item.representative}</label></Grid>
                                    <Grid xs={12}><label >{item.country3}</label></Grid>
                                    <Grid xs={12}><label >{item.repLocation}</label></Grid>
                                    <Grid xs={12}><label>{item.repPrefectures}</label></Grid>
                                    <Grid xs={12}><label >{item.repMunicipality}</label></Grid>
                                    <Grid xs={12}><label >{item.repAddress}</label></Grid>
                                    <Grid xs={12}><label >{item.repBuilding}</label></Grid>
                                    <Grid xs={12}><label >{item.repPhone}</label></Grid>
                                    <Grid xs={12}><label >{item.repEmail}</label></Grid>
                                    <Grid xs={12}><label>{item.inCharge}</label></Grid>
                                </Grid> </Grid>
                            </Grid>


                        </Grid>
                    </Grid> :
                    <Grid item xs={12} container  >
                        <Grid item xs={2} className=" Grid-root-border-bottom">
                            <label >推薦者</label>
                        </Grid>
                        <Grid item xs={10} container className=" Grid-root-border-bottom  ">
                            <Grid item xs={12} container>
                                <Grid item xs={2} className="Grid-root-border-right">

                                </Grid>
                                <Grid item xs={10}> <Grid xs={12} container >
                                    <Grid xs={12}><label >{item.recomdPernInst}</label></Grid>
                                    <Grid xs={12}><label>{item.recomdPernJob}</label></Grid>
                                    <Grid xs={12}><label >{item.recomdPernFullname} </label></Grid>
                                    <Grid xs={12}><label >{item.country4}</label></Grid>
                                    <Grid xs={12}><label >{item.recomdPernLocation}</label></Grid>
                                    <Grid xs={12}><label >{item.recomdPernPrefectures4}</label></Grid>
                                    <Grid xs={12}><label>{item.recomdPernMunicipality}</label></Grid>
                                    <Grid xs={12}><label >{item.recomdPernAddress}</label></Grid>
                                    <Grid xs={12}><label >{item.recomdPernBuilding}</label></Grid>
                                    <Grid xs={12}><label >{item.recomdPernPhone}</label></Grid>
                                </Grid> </Grid>
                            </Grid>


                        </Grid>
                    </Grid>

            }
        </div>
    );
}
export default GrantRequestComponent;