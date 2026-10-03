import React, { useEffect } from 'react';
import '../../../assets/css/health.css';
import '../../Common/leftstyles.scss';
import { Box, Grid, Link, Table, TableCell, TableRow } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setMemberReg } from '../../../Redux/actions';
const LeftPanLibrary: React.FC = () => {
const dispatch=useDispatch();
    const location = useLocation();
    useEffect(() => {

    });
    const isLocationActive = (path: any) => {

        return location.pathname === path;
    };

    const clearLenderRegisterState=()=>{
        dispatch(setMemberReg("lender_reg",''));
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
                                        <span className="black-text">A.検索・修正・削除・閲覧管理</span>
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
                        <Link href="/booksearch" className={isLocationActive('/booksearch') ? 'active_link' : 'link'}>
                        1.図書の検索・修正・削除・閲覧
                        </Link>
                        <br />
                        <Link href='/booklist' className={isLocationActive('/booklist') ? 'active_link' : 'link'}>
                        2.図書の一覧
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
                                        <span className="black-text">B.貸出・返却管理</span>
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
                        <Link href='/newlenderregister' onClick={()=>clearLenderRegisterState()} className={isLocationActive('/newlenderregister') ? 'active_link' : 'link'}>
                        1.新規貸出者の登録
                        </Link>
                        <br />
                        <Link href='/editlendersearch' className={isLocationActive('/editlendersearch') ? 'active_link' : 'link'}>
                        2.既存登録者の編集
                        </Link>
                        <br />
                        <Link href='/lenderlist' className={isLocationActive('/lenderlist') ? 'active_link' : 'link'}>
                        3.貸出者の一覧
                        </Link>
                        <br />
                        <Link href='/searchbooklender' className={isLocationActive('/searchbooklender') ? 'active_link' : 'link'}>
                        4.貸出登録・返却
                        </Link>
                        <br/>
                        <Link href='/loanlistbooks' className={isLocationActive('/loanlistbooks') ? 'active_link' : 'link'}>
                        5.貸出書籍の一覧
                        </Link>
                        <br />
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
                                        <span className="black-text">C.図書の追加管理</span>
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
                        <Link href='/adddel' className={isLocationActive('/adddel') ? 'active_link' : 'link'}>
                        1.新規図書の登録
                        </Link>
                        <br />
                        <Link href='/booksearch' className={isLocationActive('/') ? 'active_link' : 'link'}>
                        2.図書の上書き
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
                                        <span className="black-text">D.WEB掲載の管理</span>
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
                        <Link href='/manageMoritaOthers' className={isLocationActive('/manageMoritaOthers') ? 'active_link' : 'link'}>
                        1.新刊書の管理
                        </Link>
                        <br />
                        <Link href='/recommendbooks' className={isLocationActive('/recommendbooks') ? 'active_link' : 'link'}>
                        2.おすすめ図書の管理
                        </Link>
                        <br />
                        <Link href='/webbookpublish' className={isLocationActive('/webbookpublish') ? 'active_link' : 'link'}>
                        3.WEB掲載図書の管理
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
                                        <span className="black-text">E.図書室データの管理</span>
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
                        <Link  href ="/allbooks" className={isLocationActive('/allbooks') ? 'active_link' : 'link'}>
                        1.図書室データダウンロード
                        </Link>
                        <br />
                        <Link href="/lendingbooks" className={isLocationActive('/lendingbooks') ? 'active_link' : 'link'}>
                        2.貸出データのダウンロード
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
                                        <span className="black-text">F.CSV Upload</span>
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
                        <Link href ="/librarycsvupload "className={isLocationActive('/librarycsvupload') ? 'active_link' : 'link'}>
                        1.csv upload
                        </Link>
                        <br />
                        <Link  href ="/libraryexcelupload" className={isLocationActive('/libraryexcelupload') ? 'active_link' : 'link'}>
                        2.Excel upload
                        </Link>
                        <br />
                    </Box>
                </Box>
            </Grid> <Grid item xs={12} className="first_page">
                <Table>
                    <TableRow>
                        <TableCell valign="bottom">
                            <Table >
                                <TableRow>
                                    <TableCell className=" height p6red_bg_left ">&nbsp;</TableCell>
                                    <TableCell className=" height p6red_bg_midle ">
                                        <span className="black-text">G. PDFをアップロード</span>
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
                        <Link href="/uploadPDF" className={isLocationActive('/uploadPDF') ? 'active_link' : 'link'}>
                        1.PDFをアップロード
                        </Link>
                        <br />
                        <Link  href ="/uploadPDFseparate"className={isLocationActive('/uploadPDFseparate') ? 'active_link' : 'link'}>
                        2.PDF upload - Separate
                        </Link>
                        <br />
                    </Box>
                </Box>
            </Grid>
            
        </Grid>

    );
};

export default LeftPanLibrary;