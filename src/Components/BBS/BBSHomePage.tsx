import React,{useEffect} from "react";
import { Box, Grid, Typography } from "@mui/material";
import menuimage from '../../assets/images/menu.gif'
import { Link } from "react-router-dom";
import AdminHeaderComponent from "../Common/Admin-Header";
import '../../assets/css/bbs_homepage.css'
import { setMemberReg } from "../../Redux/actions";
import { useDispatch } from "react-redux";
const BBSHomePage = () => {
    const dispatch=useDispatch();

const handleClick = () => {
    dispatch(setMemberReg("memberReg", ''));
  };

  function handleBBSClick() {
    dispatch(setMemberReg('sendmailBBS',''));
  }
  function handleGeneralClick() {
    dispatch(setMemberReg('sendmailgeneral',''));
  }
  function handleThemeClick() {
    dispatch(setMemberReg('sendmailtheme',''));
  }
    return (

        <Grid container style={{ padding: 10 }}>

            <Grid item xs={12}>
                <Box className='container-main'>
                    <Box className='first_page'>
                        <Box className="flexrow">
                            <Box className="blue_bg_left"></Box>
                            <Box className="blue_bg_midle">
                                <Box className="flexrowcenter">
                                    <span className="white">体験フォーラム＆メルマガ管理メニュー</span>
                                    <img src={menuimage} width="67" height="44" />
                                </Box>
                            </Box>
                            <Box className="blue_bg_right"></Box>
                        </Box>
                        <Box className="flexrow">
                            <Box className="red_bg_left"></Box>
                            <Box className="red_bg_midle">
                                <span className="text_black_div">
                                    入会・退会管理
                                </span>
                            </Box>
                            <Box className="red_bg_right"></Box>
                        </Box>
                        <Box className='text_black_list'>
                            <a href="/underreview" id="underreview">A.入会待ち（審査中）のユーザー  </a><br />
                            <a href="/pendingreview" id="pendingreview" >B.審査保留中のユーザー </a><br />
                            <a href="/userwithdrawn" id="userwithdrawn">C.中止者（利用停止中）のユーザー </a><br />
                            <a href="/bbshistory" id="bbshistory">D.退会者の履歴 </a>
                        </Box>
                        <Box className="flexrow">
                            <Box className="red_bg_left"></Box>
                            <Box className="red_bg_midle">
                                <span className="text_black_div"> 会員DB管理</span>
                            </Box>
                            <Box className="red_bg_right"></Box>
                        </Box>
                        <Box className='text_black_list'>
                            <a href="/memberlist" id="memberlist">A.会員データ一覧  </a><br />
                            <a href="/membersearch" id="membersearch">B.会員検索・編集　member </a><br />
                            <a href="/memberjoin" id="memberjoin" onClick={handleClick}>C.新規会員の追加   </a><br />
                            <a href="/memberdownload" id="memberdownload" >D.会員データのダウンロード </a>
                        </Box>
                        <Box className="flexrow">
                            <Box className="red_bg_left"></Box>
                            <Box className="red_bg_midle">
                                <span className="text_black_div">会員モニター管理 </span>
                            </Box>
                            <Box className="red_bg_right"></Box>
                        </Box>
                        <Box className='text_black_list'>
                            <a href="/remarksawait" id="remarksawait">A.審査待ちの発言内容 </a> <br />
                            <a href="/membermonitor" id="membermonitor"> B.発言内容の検索・修正・削除 </a> <br />
                            <a href="/downloadremark" id="downloadremark">C.発言内容のダウンロード </a>  <br />
                            <a href="/ngword" id="ngword">D.NGワード</a>  <br />
                            <a href="/ngmember" id="ngmember">E.NG会員</a> <br />
                            <a href="/automaticapproval" id="automaticapproval">F.自動承認</a>
                        </Box>
                        <Box className="flexrow">
                            <Box className="red_bg_left"></Box>
                            <Box className="red_bg_midle">
                                <span className="text_black_div"> メルマガ管理</span>
                            </Box>
                            <Box className="red_bg_right"></Box>
                        </Box>
                        <Box className='text_black_list'>
                            <a href="/mailmagazinememberlist-bbs" id="mailmagazinememberlist-bbs">A. メルマガ会員一覧 (BBS)  </a><br />
                            <a href="/mailmagazinememberlist-gen" id="mailmagazinememberlist-gen">B. メルマガ会員一覧 (一般)   </a><br />
                            <a href="/searchmailmemberbbs" id="searchmailmemberbbs">C. メルマガ会員の検索・修正・削除（BBS)</a><br />
                            <a href="/searchmailmembergeneral" id="searchmailmembergeneral">D. メルマガ会員の検索・修正・削除(一般） </a><br />
                            <a href="/sendmailmagbbs" id="sendmailmagbbs" onClick={handleBBSClick}>E. メルマガ発信（BBS) </a><br />
                            <a href="/sendmailmaggeneral" id="sendmailmaggeneral" onClick={handleGeneralClick}>F. メルマガ発信（一般)</a><br />
                            <a href="/listmailmagazinebbs" id="listmailmagazinebbs">G. メルマガ一覧(BBS) </a><br />
                            <a href="/listmailmagazinegeneral" id="listmailmagazinegeneral">H. メルマガ一覧(一般) </a><br />
                            <a href="/mail_magazine" id="mail_magazine">I. テーマ別メルマガ登録のアップロード </a><br />
                            <a href="/sendmailmagtheme" id="sendmailmagtheme" onClick={handleThemeClick}>J. テーマ別メルマガ発信 </a><br />
                            <a href="/mailmagazinetheme" id="mailmagazinetheme">K. テーマ別メルマガ一覧 </a><br />
                            <a href="/adminsettings" id="adminsettings">L .管理者設定</a>
                        </Box>
                        {/* <Box className="flexrow">
                            <Box className="red_bg_left"></Box>
                            <Box className="red_bg_midle">
                                <span className="text_black_div"> カート管理</span>
                            </Box>
                            <Box className="red_bg_right"></Box>
                        </Box>
                        <Box className='text_black_list'>
                            <a href="">A.DVD送料と代引き設定</a><br />
                            <a href="">B.DVDの商品登録・編集</a><br />
                            <a href="">C.DVD商品の一覧</a>
                        </Box> */}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}
export default BBSHomePage
