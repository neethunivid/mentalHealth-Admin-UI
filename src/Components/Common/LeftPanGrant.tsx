import React, { useEffect } from 'react';
import '../../assets/css/health.css';
import '../Common/leftstyles.scss';
import { Box, Grid, Link, Table, TableCell, TableRow } from '@mui/material';
import { useLocation } from 'react-router-dom';

const LeftPanGrant: React.FC = () => {

    const location = useLocation();
    useEffect(() => {

    });
    const isLocationActive = (path: any) => {

        return location.pathname === path;
    };
    return (
        <Grid container className='leftpan-container' >
            {/* <Grid item xs={12} >
                <Grid item xs={1} className="p6red_bg_left" ></Grid>
                <Grid item xs={1} className="p6red_bg_midle">
                    <Box className="black">電子申請管理</Box>
                </Grid>
                <Grid item xs={1} className="p6red_bg_right"></Grid>
            </Grid> */}
            {/* <Grid item xs={12} className="first_page">
                <Box className="p6red_bg_left" ></Box>
                <Box className="p6red_bg_midle">
                    <span >電子申請管理</span>
                </Box>
                <Box className="p6red_bg_right"></Box>
            </Grid> */}
            <Grid item xs={12} className="first_page">
                {/* <Box className="p6red_bg_left" ></Box>
                <Box className="p6red_bg_midle">
                    <span >電子申請管理</span>
                </Box>
                <Box className="p6red_bg_right"></Box> */}
                <Table>
                    <TableRow>
                        <TableCell valign="bottom">
                            <Table >
                                <TableRow>
                                    <TableCell className=" height p6red_bg_left ">&nbsp;</TableCell>
                                    <TableCell className=" height p6red_bg_midle ">
                                        <span className="black">電子申請管理</span>
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
                        <Link href="/grantlistview" className={isLocationActive('/grantlistview') ? 'active_link' : 'link'}>
                            A.申請内容の受付・閲覧・印刷
                        </Link>
                        <br />
                        <Link href="/grantedit" className={isLocationActive('/grantedit') ? 'active_link' : 'link'}>
                            B.申請内容の編集
                        </Link>
                        <br />
                        <Link href="/granthistory" className={isLocationActive('/granthistory') ? 'active_link' : 'link'}>
                            C.申請履歴とダウンロード
                        </Link>
                        <br />
                    </Box>
                </Box>
            </Grid>

        </Grid>

    );
};

export default LeftPanGrant;