import React, { useState, useEffect } from 'react';
import LeftPanBBS from '../../Common/LeftPanBBS';
import '../../../assets/css/health.css';
import "../Member monitor management/Member monitor Comp/memberMointer.scss";
import { Box, Grid, Typography } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../Redux/actions';
import apiClient from "../../../API/API-client";
const NGword = () => {

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.member_list
  });
  const dispatch = useDispatch();
  useEffect(() => {
    fetchNgWord();
  }, []);
  const fetchNgWord = () => {
    try {

      dispatch(fetchData("member_list", "api/listNgWords", {}));
      if (!data || !Array.isArray(data)) {
        return null;
      } else if (!data) {
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  function handleReset() {
    reset();
  }

  const handleDelete = async (index: number) => {
    try {
      const apiData = await apiClient.delete(
        "api/deleteNgwords/" + index,
        // dataRequest,
        {}
      );
      if (apiData?.data) {
        window.location.reload()
      }
    } catch (e) {
      console.log(e, "error");
    }
  }
  const onSubmit = async (data: any) => {
    saveNgWord(data);
  }

  const saveNgWord = async (data: any) => {
    const dataRequest: any = {
      text: data.NgWord_text_input,
    }
    try {
      if (data.NgWord_text_input) {
        const apiData = await apiClient.post(
          "api/ngword",
          dataRequest,
          {}
        );
        if (apiData?.data) {
          window.location.reload()
        }
      }
    } catch (e) {
      console.log(e, "error");
    }


  }
  return (

    <Grid container xs={12} padding={1} spacing={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanBBS />
      </Grid>
      <Grid item xs={9}>
        <Grid container>
          <Box className='p2red_bg_left'></Box>
          <Box className='p2red_bg_midle'>
            <Grid xs={12} className='text_grid'>
              <Grid xs={4}>
                <Typography className='txtverdana mg_lftrgt'>D. NGワード</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Typography className='ngtwo'>★ NGワードの追加</Typography>
        <div className="toggle-switch-box">
          {/* <div className="toggle-switch-content"> */}
          <form
            name="ngWord"
            id="ngWord"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container alignItems="center">
              <Grid item>
                <p className="ngone">NGワード</p>
              </Grid>
              <Grid item>
                <input type="text" id="input-field"  {...register("NgWord_text_input")} className='bdr_text' />
              </Grid>
            </Grid>
            <Grid xs={12} container justifyContent="center" display={"flex"}>
              <input className='toggle-switch-buttons' type="submit" name="btn_1" value="保存する" />
              <input className='toggle-switch-buttons' type="reset" name="btn_2" value="リセットする" onClick={handleReset} />
            </Grid>
          </form>
          {/* </div> */}
        </div><br /><br />
        {data?.data?.length > 0 ?
          <>
            <Typography style={{ fontSize: "14px" }}>★ NGワードのリスト</Typography><br />
            <Grid container>

              <Grid item xs={8}>
                <Box className='p2red_bg_word'>
                  <Typography>名前</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className='p2red_bg_word'>
                  <Typography>更新</Typography>
                </Box>
              </Grid>
              {data?.data.map((item: any, index: any) => (
                <Grid key={index} item xs={12}>
                  <Grid container>
                    <Grid item xs={8}>
                      <Box className='p2red_bg_word1'>
                        <Typography >{item.text}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box className='p2red_bg_word1'>
                        <Typography> < a href="#" onClick={() => handleDelete(item.id)}>削除</a></Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid></> : <div></div>}
      </Grid>
    </Grid>
  );
}

export default NGword;
