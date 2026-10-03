import React, { useEffect } from 'react';
import '../../assets/css/health.css';
import '../Common/leftstyles.scss';
import { Box, Grid, Link, Table, TableCell, TableRow } from '@mui/material';
import { useLocation } from 'react-router-dom';

const LeftPanChecksheet: React.FC = () => {

    const location = useLocation();
    useEffect(() => {

    });
    const isLocationActive = (path: any) => {

        return location.pathname === path;
    };
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
                                        <span className="black-text">メール相談 作成管理</span>
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
                        <Link href="/checksheet1" className={isLocationActive('/checksheet1') ? 'active_link' : 'link'}>
                        A. 森田神経質
                        </Link>
                        <br />
                        <Link href='/checksheet2' className={isLocationActive('/checksheet2') ? 'active_link' : 'link'}>
                        B. 対人恐怖症
                        </Link>
                        <br />
                        <Link href='/checksheet3' className={isLocationActive('/checksheet3') ? 'active_link' : 'link'}>
                        C. パニック障害
                        </Link>
                        <br />
                        <Link href='/checksheet4' className={isLocationActive('/checksheet4') ? 'active_link' : 'link'}>
                        D. うつ病
                        </Link>
                        <br />
                        <Link href='/checksheet5' className={isLocationActive('/checksheet5') ? 'active_link' : 'link'}>
                        E. 強迫性障害  
                        </Link>
                        <br />
                        <Link href='/diagnosismailing_list' className={isLocationActive('/diagnosismailing_list') ? 'active_link' : 'link'}>
                        F. メール送信と予約一覧
                        </Link>
                        <br /><Link href='/mailsend_and_reservation_oneyearlist' className={isLocationActive('/mailsend_and_reservation_oneyearlist') ? 'active_link' : 'link'}>
                        G. メール受付・送信履歴（1年）
                        </Link>
                        <br /><Link href='/pasthistory' className={isLocationActive('/pasthistory') ? 'active_link' : 'link'}>
                        H. 過去の履歴（年度別）
                        </Link>
                        <br /><Link href='/responsetemplate' className={isLocationActive('/responsetemplate') ? 'active_link' : 'link'}>
                        I.回答テンプレート作成・編集
                        </Link>
                        <br /><Link href='/checksheetdeletedemail' className={isLocationActive('/checksheetdeletedemail') ? 'active_link' : 'link'}>
                        J. 削除済みメール（ゴミ箱）
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
                                        <span className="black-text">メール相談 レポートの管理</span>
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
                        <Link href='/dailymailcount' className={isLocationActive('/dailymailcount') ? 'active_link' : 'link'}>
                        A.メール相談の日別レポート
                        </Link>
                        <br />
                        <Link href='/monthlymailcount' className={isLocationActive('/monthlymailcount') ? 'active_link' : 'link'}>
                        B. メール相談の月別レポート  	
                        </Link>
                        <br />
                        <Link href='/dailycountchecksheet' className={isLocationActive('/dailycountchecksheet') ? 'active_link' : 'link'}>
                        C.チェックシート別の日別レポート
                        </Link>
                        <br />
                        <Link href='/monthlycountchecksheet' className={isLocationActive('/monthlycountchecksheet') ? 'active_link' : 'link'}>
                        D.チェックシートの月別レポート
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
                                        <span className="black-text">電話相談管理</span>
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
                        <Link href='/telephoneconsultation' className={isLocationActive('/telephoneconsultation')||isLocationActive('/telephoneconsultationview')|| isLocationActive('/telephoneconsultationedit') ? 'active_link' : 'link'}>
                        A.電話相談の入力・閲覧・編集
                        </Link>
                        <br />
                        <Link href='/telcounsellingdiagramlist' className={isLocationActive('/telcounsellingdiagramlist') ? 'active_link' : 'link'}>
                        B. 電話相談表一覧
                        </Link>
                        <br />
                        <Link href='/telcounsellingsearch' className={isLocationActive('/telcounsellingsearch') ? 'active_link' : 'link'}>
                        C.検索・ダウンロード
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
                                        <span className="black-text">電話相談レポートの管理 </span>
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
                        <Link href='/dailygenderreport' className={isLocationActive('/dailygenderreport') ? 'active_link' : 'link'}>
                        A. 日別性別レポート
                        </Link>
                        <br />
                        <Link href='/dailyagereport' className={isLocationActive('/dailyagereport') ? 'active_link' : 'link'}>
                        B. 日別年齢別レポート
                        </Link>
                        <br />
                        <Link href='/daily-illness-report' className={isLocationActive('/daily-illness-report') ? 'active_link' : 'link'}>
                        C. 日別助言項目別レポート
                        </Link>
                        <br />
                        <Link href='/daily-counselling-report' className={isLocationActive('/daily-counselling-report') ? 'active_link' : 'link'}>
                        D. 月別属性別レポート
                        </Link>
                        <br />
                        <Link href='/monthly-gender-report' className={isLocationActive('/monthly-gender-report') ? 'active_link' : 'link'}>
                        E. 月別性別レポート
                        </Link>
                        <br />
                        <Link href='/monthly-age-report' className={isLocationActive('/monthly-age-report') ? 'active_link' : 'link'}>
                        F. 月別年齢別レポート
                        </Link>
                        <br />
                        <Link href='/monthly-illness-report' className={isLocationActive('/monthly-illness-report') ? 'active_link' : 'link'}>
                        G.月別主訴別レポート
                        </Link>
                        <br />
                        <Link href='/monthly-counselling-report' className={isLocationActive('/monthly-counselling-report') ? 'active_link' : 'link'}>  
                        H.月別助言項目別レポート
                        </Link>
                        
                    </Box>
                </Box>
            </Grid> 
        </Grid>

    );
};

export default LeftPanChecksheet;