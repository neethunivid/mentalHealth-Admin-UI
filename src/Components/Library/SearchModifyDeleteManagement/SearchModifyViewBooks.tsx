import React from 'react';
import '../../../assets/css/health.css';
import { Button, Grid } from '@mui/material';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
// import LeftPanBBS from '../../Common/LeftPanBBS';
import { useForm, Controller } from "react-hook-form";
import submitbtn from '../../../assets/images/7nth_page_btn.gif'
import resetbtn from '../../../assets/images/7nth_page_btn_1.gif'
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import "../../../assets/css/health.css";
import LibraryHeader from '../Common/LibraryHeader';
import '../Common/library.scss'
import LeftPanLibrary from '../Common/LeftPanLibrary';
const SearchModifyViewBook= () => {
    const navigate = useNavigate();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

    const location = useLocation();
    const onSubmit = async (data: any) => {
        if(data.book_no&&!/^\d+$/.test(data.book_no)){
            alert ("連番を入力してください")
            return
        }
        else{
            navigate('/searchlist', { state: { data: data} });
        }
       
    }
    const resetField = () => {
        reset();
    }
    return (
        <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanLibrary />
        </Grid>
        <Grid item xs={9}>
          <LibraryHeader
            label1="A"
            label2="検索・修正・削除・閲覧"
            label3="図書室管理"
          />

                <Grid className="hr"></Grid>
                <span className="black">
                    	★いずれかの項目を入力して書籍を検索して下さい。
                </span>
                <Grid className="hr"></Grid>
                <Grid className="hr"></Grid>
                <form name="booksearch" id="form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container className="table_seven" >
                        <Grid item xs={12}>
                            <Grid className="hr"></Grid>
                            <Grid className="hr"></Grid>
                            <Grid className=" searchbook_content content-row">
                                <Grid item xs={12} container >
                                    <Grid item xs={2} className="black">● 連番 </Grid>
                                    <Grid item xs={8} > <input type="text"
                                        {...register('book_no')} className="bdr_text3"></input>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className=" searchbook_content content-row">
                                <Grid item xs={2} className="black" ><span>● ISBN</span> </Grid>
                                <Grid item xs={8} > <input type="text"
                                    {...register('isbn_code')} className="bdr_text3"></input>
                                </Grid>
                            </Grid>
                            <Grid className=" searchbook_content content-row">
                                <Grid item xs={2}></Grid>
                                <Grid item xs={8}> <span className='black'>（例：9784826910255 ）</span></Grid>
                               </Grid>
                            <Grid className="searchbook_content content-row">
                                <Grid item xs={2} className="black"> ● タイトル</Grid>
                                <Grid item xs={8} > <input type="text"
                                    {...register('title')} className="bdr_text3"></input>
                                </Grid>
                            </Grid>
                            
                            <Grid className="searchbook_content content-row">
                                <Grid item xs={2} className="black"> ● 著作名</Grid>
                                <Grid item xs={8} > <input type="text"
                                    {...register('author')} className="bdr_text3"></input>
                                </Grid>
                            </Grid>
                            <Grid className="searchbook_content content-row">
                                <Grid item xs={2} className="black"> ● 編集・監修</Grid>
                                <Grid item xs={8} > <input type="text"
                                    {...register('edit_supervision')} className="bdr_text3"></input>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                   
                    <Grid display={'flex'} justifyContent={'center'}>
                            <Button type="submit">
                                <img src={submitbtn}/>
                            </Button>
                            <Button type="reset">
                                <img src={resetbtn} onClick={() => resetField()} />
                            </Button>
                        </Grid> 
                </form>
            </Grid>
        </Grid >


    );
}

export default SearchModifyViewBook;
