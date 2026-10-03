import React, { useEffect } from 'react';
import '../../assets/css/health.css';
import '../Common/leftstyles.scss';
import { Box, Grid, Link, Table, TableCell, TableRow } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMemberReg } from '../../Redux/actions';

const LeftPanBBS: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {

    });
    const isLocationActive = (path: any) => {

        return location.pathname === path;
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

      const clearMembeRegState=()=>{
        dispatch(setMemberReg('memberReg',''));
      }
    return (
        <Grid container className='leftpan-container' >

            <Grid item xs={12} className="first_page">
                <Table>
                    <TableRow>
                        <TableCell valign="bottom">
                            <Table >
                                <TableRow>
                                    <TableCell className=" height p6red_bg_left ">&nbsp;</TableCell>
                                    <TableCell className=" height p6red_bg_midle ">
                                        <span className="black-text">入会・退会管理</span>
                                    </TableCell>
                                    <TableCell className=" height p6red_bg_right ">&nbsp;</TableCell>
                                </TableRow>
                            </Table>
                        </TableCell>
                    </TableRow>
                </Table>
            </Grid>
            <Grid item xs={12} className="gridcontainer" >
                <Box className="leftmenu_bg  box-container">
                    <Box className="black_left_menu">
                        <Link href="/underreview" className={isLocationActive('/underreview') ? 'active_link' : 'link'}>
                            A.入会待ち（審査中）のユーザー
                        </Link>
                        <br />
                        <Link href='/pendingreview' className={isLocationActive('/pendingreview') ? 'active_link' : 'link'}>
                            B.審査保留中のユーザー
                        </Link>
                        <br />
                        <Link href='/userwithdrawn' className={isLocationActive('/userwithdrawn') ? 'active_link' : 'link'}>
                            C.中止者（利用停止中）のユーザー
                        </Link>
                        <br />
                        <Link href='/bbshistory' className={isLocationActive('/bbshistory') ? 'active_link' : 'link'}>
                            D.退会者の履歴
                        </Link>
                        <br />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} className="first_page">
                <Table>
                    <TableRow>
                        <TableCell valign="bottom">
                            <Table >
                                <TableRow>
                                    <TableCell className=" height p6red_bg_left ">&nbsp;</TableCell>
                                    <TableCell className=" height p6red_bg_midle ">
                                        <span className="black-text">会員DB管理</span>
                                    </TableCell>
                                    <TableCell className=" height p6red_bg_right ">&nbsp;</TableCell>
                                </TableRow>
                            </Table>
                        </TableCell>
                    </TableRow>
                </Table>
            </Grid>
            <Grid item xs={12} className="gridcontainer" >
                <Box className="leftmenu_bg  box-container">
                    <Box className="black_left_menu">
                        <Link href='/memberlist' className={isLocationActive('/memberlist') ? 'active_link' : 'link'}>
                            A.会員データ一覧
                        </Link>
                        <br />
                        <Link href='/membersearch' className={isLocationActive('/membersearch') ? 'active_link' : 'link'}>
                            B.会員検索・編集 member
                        </Link>
                        <br />
                        <Link href='/memberjoin'onClick={()=>clearMembeRegState()} className={isLocationActive('/memberjoin') ? 'active_link' : 'link'}>
                            C.新規会員の追加
                        </Link>
                        <br />
                        <Link href='/memberdownload' className={isLocationActive('/memberdownload') ? 'active_link' : 'link'}>
                            D.会員データのダウンロード
                        </Link>
                        <br />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} className="first_page">
                <Table>
                    <TableRow>
                        <TableCell valign="bottom">
                            <Table >
                                <TableRow>
                                    <TableCell className=" height p6red_bg_left ">&nbsp;</TableCell>
                                    <TableCell className=" height p6red_bg_midle ">
                                        <span className="black-text">会員モニター管理</span>
                                    </TableCell>
                                    <TableCell className=" height p6red_bg_right ">&nbsp;</TableCell>
                                </TableRow>
                            </Table>
                        </TableCell>
                    </TableRow>
                </Table>
            </Grid>
            <Grid item xs={12} className="gridcontainer" >
                <Box className="leftmenu_bg  box-container">
                    <Box className="black_left_menu">
                        <Link href='/remarksawait' className={isLocationActive('/remarksawait') ? 'active_link' : 'link'}>
                            A.審査待ちの発言内容
                        </Link>
                        <br />
                        <Link href='/membermonitor' className={isLocationActive('/membermonitor') ? 'active_link' : 'link'}>
                            B.発言内容の検索・修正・削除
                        </Link>
                        <br />
                        <Link href='/downloadremark' className={isLocationActive('/downloadremark') ? 'active_link' : 'link'}>
                            C.発言内容のダウンロード
                        </Link>
                        <br />
                        <Link href='/ngword' className={isLocationActive('/ngword') ? 'active_link' : 'link'}>
                            D.NGワード
                        </Link>
                        <br />
                        <Link href='/ngmember' className={isLocationActive('/ngmember') ? 'active_link' : 'link'}>
                            E.NG会員
                        </Link>
                        <br />
                        <Link href='/automaticapproval' className={isLocationActive('/automaticapproval') ? 'active_link' : 'link'}>
                            F.自動承認
                        </Link>
                        <br />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} className="first_page">
                <Table>
                    <TableRow>
                        <TableCell valign="bottom">
                            <Table >
                                <TableRow>
                                    <TableCell className=" height p6red_bg_left ">&nbsp;</TableCell>
                                    <TableCell className=" height p6red_bg_midle ">
                                        <span className="black-text">メルマガ管理</span>
                                    </TableCell>
                                    <TableCell className=" height p6red_bg_right ">&nbsp;</TableCell>
                                </TableRow>
                            </Table>
                        </TableCell>
                    </TableRow>
                </Table>
            </Grid>
            <Grid item xs={12} className="gridcontainer" >
                <Box className="leftmenu_bg  box-container">
                    <Box className="black_left_menu">
                        <Link href='/mailmagazinememberlist-bbs' className={isLocationActive('/mailmagazinememberlist-bbs') ? 'active_link' : 'link'}>
                            A. メルマガ会員一覧 (BBS)
                        </Link>
                        <br />
                        <Link href='/mailmagazinememberlist-gen' className={isLocationActive('/mailmagazinememberlist-gen') ? 'active_link' : 'link'}>
                            B. メルマガ会員一覧 (一般)
                        </Link>
                        <br />
                        <Link href='/searchmailmemberbbs' className={isLocationActive('/searchmailmemberbbs') ? 'active_link' : 'link'}>
                            C. メルマガ会員の検索・修正・削除（BBS)
                        </Link>
                        <br />
                        <Link href='/searchmailmembergeneral' className={isLocationActive('/searchmailmembergeneral') ? 'active_link' : 'link'}>
                            D. メルマガ会員の検索・修正・削除(一般）
                        </Link>
                        <br />
                        <div onClick={handleBBSClick}>
                        <Link href='/sendmailmagbbs' className={isLocationActive('/sendmailmagbbs') ? 'active_link' : 'link'}>
                            E. メルマガ発信（BBS)
                        </Link>
                        </div>
                        <div onClick={handleGeneralClick}>
                        <Link href='/sendmailmaggeneral' className={isLocationActive('/sendmailmaggeneral') ? 'active_link' : 'link'}>
                            F. メルマガ発信（一般)
                        </Link>
                        </div>
                        <Link href='/listmailmagazinebbs' className={isLocationActive('/listmailmagazinebbs') ? 'active_link' : 'link'}>
                            G. メルマガ一覧(BBS)
                        </Link>
                        <br />
                        <Link href='/listmailmagazinegeneral' className={isLocationActive('/listmailmagazinegeneral') ? 'active_link' : 'link'}>
                            H. メルマガ一覧(一般)
                        </Link>
                        <br />
                        <Link href='/mail_magazine' className={isLocationActive('/mail_magazine') ? 'active_link' : 'link'}>
                            I. テーマ別メルマガ登録のアップロード
                        </Link>
                        <br />
                        <div onClick={handleThemeClick}>
                        <Link href='/sendmailmagtheme' className={isLocationActive('/sendmailmagtheme') ? 'active_link' : 'link'}>
                            J. テーマ別メルマガ発信
                        </Link>
                        </div>
                        <Link href='/mailmagazinetheme' className={isLocationActive('/mailmagazinetheme') ? 'active_link' : 'link'}>
                            K. テーマ別メルマガ一覧
                        </Link>
                        <br/>
                        <Link href='/adminsettings' className={isLocationActive('/adminsettings') ? 'active_link' : 'link'}>
                            L. 管理者設定
                        </Link>

                        <br />
                    </Box>
                </Box>
            </Grid>
            {/* <Grid item xs={12} className="first_page">
                <Table>
                    <TableRow>
                        <TableCell valign="bottom">
                            <Table >
                                <TableRow>
                                    <TableCell className=" height p6red_bg_left ">&nbsp;</TableCell>
                                    <TableCell className=" height p6red_bg_midle ">
                                        <span className="black-text">カート管理</span>
                                    </TableCell>
                                    <TableCell className=" height p6red_bg_right ">&nbsp;</TableCell>
                                </TableRow>
                            </Table>
                        </TableCell>
                    </TableRow>
                </Table>
            </Grid>
            <Grid item xs={12} className="gridcontainer" >
                <Box className="leftmenu_bg  box-container">
                    <Box className="black_left_menu">
                        <Link className={isLocationActive('/') ? 'active_link' : 'link'}>
                            A.DVD送料と代引き設定
                        </Link>
                        <br />
                        <Link className={isLocationActive('/') ? 'active_link' : 'link'}>
                            B.DVDの商品登録・編集
                        </Link>
                        <br />
                        <Link className={isLocationActive('/') ? 'active_link' : 'link'}>
                            C.DVD商品の一覧
                        </Link>
                        <br />
                    </Box>
                </Box>
            </Grid> */}
        </Grid>

    );
};

export default LeftPanBBS;