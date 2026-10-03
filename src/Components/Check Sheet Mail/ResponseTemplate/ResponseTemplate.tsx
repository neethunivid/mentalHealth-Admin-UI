import { Box, Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import LeftPanChecksheet from "../LeftPanChecksheet";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMemberReg } from "../../../Redux/actions";
const ResponseTemplate = () => {
  const navigate = useNavigate();
  const dispatch =useDispatch();

  //  navigate to  create new template
  const handleNewButtonClick = (data: any) => {
    dispatch(setMemberReg('responseEditTemplate',''));
    navigate("/newtemplate", { state: data }); 
  };

// navigate to edit existing template
  const handleEditButtonClick = (data:any) => {
    navigate("/edittemplate",{state:data});
    dispatch(setMemberReg('responseEditTemplate',''));
    // window.location.reload();
  };

  useEffect(() => {
    
  }, []);
  return (
    <div>
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanChecksheet />
        </Grid>
        <Grid item xs={9}>
          <Grid className="content-row">
            <Grid className="p2red_bg_left size"></Grid>
            <Grid className="p2red_bg_midle">
              <Grid className="top-header">
                <span className="verdana_big">I. 回答用テンプレートの作成</span>
              </Grid>
            </Grid>
            <Grid className="p2red_bg_right size"></Grid>
          </Grid>
          <Grid className="hr"></Grid>

          <Grid container padding={4}>
            <Grid xs={12} container padding={1}>
              <Grid xs={3}>
                <span className="black">A. 森田神経質</span>
              </Grid>
              <Grid xs={2}>
                <Button
                  variant="contained"
                  className="buttonstyle "
                  onClick={() => handleNewButtonClick(1)}
                >
                  新規作成
                </Button>
              </Grid>
              <Grid xs={2}>
                <Button
                  variant="contained"
                  className="buttonstyle "
                  onClick={()=>handleEditButtonClick(1)}
                >
                  編集
                </Button>
              </Grid>
            </Grid>
            <Grid xs={12} container padding={1}>
              <Grid xs={3}>
                <span className="black"> B. 対人恐怖症</span>
              </Grid>
              <Grid xs={2}>
                <Button
                  variant="contained"
                  className="buttonstyle"
                  onClick={() => handleNewButtonClick(2)}
                >
                  新規作成
                </Button>
              </Grid>
              <Grid xs={2}>
                <Button
                  variant="contained"
                  className="buttonstyle"
                  onClick={() => handleEditButtonClick(2)}
                >
                  編集
                </Button>
              </Grid>
            </Grid>
            <Grid xs={12} container padding={1}>
              <Grid xs={3}>
                <span className="black">C. パニック障害</span>
              </Grid>
              <Grid xs={2}>
                <Button
                  variant="contained"
                  className="buttonstyle"
                  onClick={() => handleNewButtonClick(3)}
                >
                  新規作成
                </Button>
              </Grid>
              <Grid xs={2}>
                <Button
                  variant="contained"
                  className="buttonstyle"
                  onClick={() => handleEditButtonClick(3)}
                >
                  編集
                </Button>
              </Grid>
            </Grid>
            <Grid xs={12} container padding={1}>
              <Grid xs={3}>
                <span className="black">D. うつ病</span>
              </Grid>
              <Grid xs={2}>
                <Button
                  variant="contained"
                  className="buttonstyle"
                  onClick={() => handleNewButtonClick(4)}
                >
                  新規作成
                </Button>
              </Grid>
              <Grid xs={2}>
                <Button
                  variant="contained"
                  className="buttonstyle"
                  onClick={() => handleEditButtonClick(4)}
                >
                  編集
                </Button>
              </Grid>
            </Grid>
            <Grid xs={12} container padding={1}>
              <Grid xs={3}>
                <span className="black">E. 強迫性障害</span>
              </Grid>
              <Grid xs={2}>
                <Button
                  variant="contained"
                  className="buttonstyle"
                  onClick={() => handleNewButtonClick(5)}
                >
                  新規作成
                </Button>
              </Grid>
              <Grid xs={2}>
                <Button
                  variant="contained"
                  className="buttonstyle"
                  onClick={() => handleEditButtonClick(5)}
                >
                  編集
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default ResponseTemplate;
