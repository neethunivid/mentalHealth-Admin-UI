import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import menuimage from '../../../assets/images/menu.gif'
import { Link } from "react-router-dom";
import '../../assets/css/bbs_homepage.css'
const LibraryHomePage = () => {
    return (

        <Grid container style={{ padding: 10 }}>

            <Grid item xs={12}>
                <Box className='container-main'>
                    <Box className='first_page'>
                        <Box className="flexrow">
                            <Box className="blue_bg_left"></Box>
                            <Box className="blue_bg_midle">
                                <Box className="flexrowcenter">
                                    <span className="white">図書室管理</span>
                                </Box>
                            </Box>
                            <Box className="blue_bg_right"></Box>
                        </Box>
                        <Box className="flexrow">
                            <Box className="red_bg_left"></Box>
                            <Box className="red_bg_midle">
                                <span className="text_black_div">
                                A.検索・修正・削除・閲覧管理
                                </span>
                            </Box>
                            <Box className="red_bg_right"></Box>
                        </Box>
                        <Box className='text_black_list'>
                            <a href="/booksearch"> 1.図書の検索・修正・削除・閲覧</a><br />
                            <a href="/booklist" >2.図書の一覧 </a><br />
                        </Box>
                        <Box className="flexrow">
                            <Box className="red_bg_left"></Box>
                            <Box className="red_bg_midle">
                                <span className="text_black_div"> B.貸出・返却管理</span>
                            </Box>
                            <Box className="red_bg_right"></Box>
                        </Box>
                        <Box className='text_black_list'>
                            <a href="/newlenderregister"> 1.新規貸出者の登録</a><br />
                            <a href="/editlendersearch">2.既存登録者の編集</a><br />
                            <a href="/lenderlist">3.貸出者の一覧</a><br />
                            <a href="/searchbooklender">4.貸出登録・返却</a><br/>
                            <a href="/loanlistbooks">5.貸出書籍の一覧 </a>
                        </Box>
                        <Box className="flexrow">
                            <Box className="red_bg_left"></Box>
                            <Box className="red_bg_midle">
                                <span className="text_black_div">C.図書の追加管理</span>
                            </Box>
                            <Box className="red_bg_right"></Box>
                        </Box>
                        <Box className='text_black_list'>
                            <a href="/adddel"> 1.新規図書の登録</a> <br />
                            <a href="/booksearch">2.図書の上書き </a> <br />
                        </Box>
                        <Box className="flexrow">
                            <Box className="red_bg_left"></Box>
                            <Box className="red_bg_midle">
                                <span className="text_black_div">D.WEB掲載の管理</span>
                            </Box>
                            <Box className="red_bg_right"></Box>
                        </Box>
                        <Box className='text_black_list'>
                            <a href="/manageMoritaOthers"> 1.新刊書の管理</a><br />
                            <a href="/recommendbooks"> 2.おすすめ図書の管理</a><br />
                            <a href="/webbookpublish">3.WEB掲載図書の管理</a><br />
                        </Box>
                        <Box className="flexrow">
                            <Box className="red_bg_left"></Box>
                            <Box className="red_bg_midle">
                                <span className="text_black_div">E.図書室データの管理</span>
                            </Box>
                            <Box className="red_bg_right"></Box>
                        </Box>
                        <Box className='text_black_list'>
                            <a href="/allbooks">1.図書室データダウンロード</a><br />
                            <a href="/lendingbooks">2.貸出データのダウンロード</a><br />
                        </Box>
                        <Box className="flexrow">
                            <Box className="red_bg_left"></Box>
                            <Box className="red_bg_midle">
                                <span className="text_black_div">F.Upload CSV</span>
                            </Box>
                            <Box className="red_bg_right"></Box>
                        </Box>
                        <Box className='text_black_list'>
                            <a href="/librarycsvupload"> 1.Upload CSV</a><br />
                            <a href="/libraryexcelupload"> 2.Upload Excel</a><br />
                        </Box>
                        <Box className="flexrow">
                            <Box className="red_bg_left"></Box>
                            <Box className="red_bg_midle">
                                <span className="text_black_div">G. PDFをアップロード</span>
                            </Box>
                            <Box className="red_bg_right"></Box>
                        </Box>
                        <Box className='text_black_list'>
                            <a href="/uploadPDF">1.PDFをアップロード</a><br />
                            <a href="/uploadPDFseparate ">2.PDF upload - Separate</a><br />
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}
export default LibraryHomePage
