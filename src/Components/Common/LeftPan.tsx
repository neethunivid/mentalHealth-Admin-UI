import React from 'react';
import '../../assets/css/health.css';
//import '../../assets/css/bbs_leftpan.css'
import makeStyles from '@mui/styles/makeStyles';
import { Box, Link, Table, TableBody, Grid, TableCell, TableContainer, TableRow } from '@mui/material';

// const useStyles = makeStyles({
//     root: {
//         width: '23%',
//         verticalAlign: 'top',
//     },
//     redBgLeft: {
//         backgroundColor: 'red',
//     },
//     redBgMiddle: {
//         backgroundColor: 'red',
//         textAlign: 'center',
//         color: 'black',
//     },
//     redBgRight: {
//         backgroundColor: 'red',
//     },
// });

const LeftPanComponent: React.FC = () => {
    // const classes = useStyles();

    return (
   
        <div>
            <Box className="display-flexrow">
                <Box className="bg_left"></Box>
                <Box className="bg_middle">
                    <span className="black">入会・退会管理</span>
                </Box>
                <Box className="bg_right"></Box>
            </Box>
            <Box className="leftmenu_bg">
                <Box className='black_left_menu'>
                    <a href="">A.入会待ち（審査中）のユーザー </a><br />
                    <a href="">B.審査保留中のユーザー </a> <br />
                    <a href="">C.中止者（利用停止中）のユーザー</a> <br />
                    <a href="">D.退会者の履歴 </a>
                </Box>

            </Box>
            <Box className="display-flexrow">
                <Box className="bg_left"></Box>
                <Box className="bg_middle">
                    <span className="black">会員DB管理</span>
                </Box>
                <Box className="bg_right"></Box>
            </Box>
            <Box className="leftmenu_bg">
                <Box className='black_left_menu'>
                    <a href="">A.会員データ一覧</a> <br />
                    <a href="">B.会員検索・編集 member</a><br />
                    <a href="">C.新規会員の追加  </a><br />
                    <a href="">D.会員データのダウンロード </a>
                </Box>
            </Box>
            <Box className="display-flexrow">
                <Box className="bg_left"></Box>
                <Box className="bg_middle">
                    <span className="black">会員モニター管理</span>
                </Box>
                <Box className="bg_right"></Box>
            </Box>
            <Box className="leftmenu_bg">
                <Box className='black_left_menu'>
                    <a href="/list">A.審査待ちの発言内容</a>  <br />
                    <a href="">B.発言内容の検索・修正・削除 </a><br />
                    <a href="">C.発言内容のダウンロード </a><br />
                    <a href="">D.NGワード</a> <br />
                    <a href="">E.NG会員</a><br />
                    <a href="">F.自動承認</a>
                </Box>
            </Box>
            <Box className="display-flexrow">
                <Box className="bg_left"></Box>
                <Box className="bg_middle">
                    <span className="black">メルマガ管理</span>
                </Box>
                <Box className="bg_right"></Box>
            </Box>
            <Box className="leftmenu_bg">
                <Box className='black_left_menu'>
                    <a href="/list">A. メルマガ会員一覧 (BBS)  </a><br />
                    <a href="">B. メルマガ会員一覧 (一般)   </a><br />
                    <a href="">C. メルマガ会員の検索・修正・削除（BBS)</a><br />
                    <a href="">D. メルマガ会員の検索・修正・削除(一般） </a><br />
                    <a href="">E. メルマガ発信（BBS) </a><br />
                    <a href="">F. メルマガ発信（一般) </a><br />
                    <a href="">G. メルマガ一覧(BBS) </a><br />
                    <a href="">H. メルマガ一覧(一般) </a><br />
                    <a href="">I. テーマ別メルマガ登録のアップロード </a><br />
                    <a href="">J. テーマ別メルマガ発信 </a><br />
                    <a href="">K. テーマ別メルマガ一覧 </a><br />
                    <a href="">L. 管理者設定</a>
                </Box>
            </Box>
            <Box className="display-flexrow">
                <Box className="bg_left"></Box>
                <Box className="bg_middle">
                    <span className="black">カート管理</span>
                </Box>
                <Box className="bg_right"></Box>
            </Box>
            <Box className="leftmenu_bg">
                <Box className='black_left_menu'>
                    <a href="admin.php?section=video_dvd&action=setDvdCost">A.DVD送料と代引き設定</a><br />
                    <a href="admin.php?section=video_dvd&action=registerDvdItems">B.DVDの商品登録・編集</a><br />
                    <a href="admin.php?section=video_dvd&action=listDvdItems">C.DVD商品の一覧</a>
                </Box>
            </Box>
        </div>

    );
};

export default LeftPanComponent;
