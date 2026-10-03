import React from 'react';
import { Button, Grid } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import submitbtn from '../../../../assets/images/7nth_page_btn.gif'
import resetbtn from '../../../../assets/images/7nth_page_btn_1.gif'
import { useNavigate } from 'react-router-dom';
import LibraryHeader from '../../Common/LibraryHeader';
import LeftPanLibrary from '../../Common/LeftPanLibrary';

const BookSearchUploadSeparate= () => {
    const navigate = useNavigate();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

    //on submitting the data navigate to uploadPDFseparatelist screen with form data 
    const onSubmit = async (data: any) => {
        navigate('/uploadPDFseparatelist', { state: { data: data} });
    }
    //reset the form fields
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
            label1="G."
            label2="Upload PDF - Separate"
            label3="図書室管理"
          />

                <Grid className="hr"></Grid>
                <span className="black">
                    Book search & PDFをアップロード
                </span>
                <form name="booksearch" id="form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container className="table_seven" >
                        <Grid item xs={12}>
                            <Grid className="hr"></Grid>
                            <Grid className="hr"></Grid>
                            <Grid className=" searchbook_content content-row">
                                <Grid item xs={12} container >
                                    <Grid item xs={2} className="black">● 連番</Grid>
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
                                <Grid item xs={2} className="black">● 編集・監修</Grid>
                                <Grid item xs={8} > <input type="text"
                                    {...register('edit_supervision')} className="bdr_text3"></input>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid display={'flex'} justifyContent={'center'}>
                            <Button type="submit">
                                <img src={submitbtn} />
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

export default BookSearchUploadSeparate;
