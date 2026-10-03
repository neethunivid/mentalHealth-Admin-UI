import { Button, Grid } from '@mui/material';
import React from 'react'
import LeftPanChecksheet from '../LeftPanChecksheet';
import { useNavigate, useLocation } from "react-router-dom";
const TemplatePreview_2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmitButtonClick = () => {
   
        navigate("/edittemplate");
      };
      console.log(location.state,'fulll;;')
      console.log(location.state.formData,'ffffffffffffffff')
  return (
    <div>
    <Grid  container xs={12} padding={1} spacing={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanChecksheet />
      </Grid>
      <Grid item xs={9}>
        <Grid className="content-row">
          <Grid className="p2red_bg_left size"></Grid>
          <Grid className="p2red_bg_midle">
            <Grid className="top-header">
              <span className="verdana_big">
                I-2.新規の回答用テンプレートの確認
              </span>
            </Grid>
          </Grid>
          <Grid className="p2red_bg_right size"></Grid>
        </Grid>
        <Grid className="hr"></Grid>
        <Grid>
          <Grid xs={12} container className="response-temp-margintop">
            <Grid xs={2}></Grid>
            <Grid xs={8}>
              <span className="black"> テンプレート名</span>
              <Grid className="black">
                {location?.state?.formData?.editTemplate_name}
              </Grid>
            </Grid>
            <Grid
              xs={2}
              container
              spacing={1}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
              <Grid
                item
                // onClick={() => handleOptionClick("PC")}
                style={{
                  color:
                    location.state?.deviceType === "PC"
                      ? "red"
                      : "black",
                  cursor: "pointer",
                }}
              >
                PC
              </Grid>
              <Grid item>|</Grid> {/* This is the vertical bar */}
              <Grid
                item
                // onClick={() => handleOptionClick("SP")}
                style={{
                  color:
                    location.state?.deviceType === "SP"
                      ? "red"
                      : "black",
                  cursor: "pointer",
                }}
              >
                SP
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} container className="response-temp-margintop">
            <Grid xs={2}></Grid>
            <Grid xs={10}>
              <span className="black">内容{ location.state?.deviceType === "PC"?"(PC)":"(SP)"} </span>
              <Grid className="black">
                {
                  location.state?.formData
                    ?.editTemplate_content
                }
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} container className="response-temp-margintop">
            <Grid xs={2}></Grid>
            <Grid xs={10}>
              <Button
                variant="contained"
                className="buttonstyle"
                onClick={handleSubmitButtonClick}
              >
                戻る
              </Button>
              <Grid></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
  )
}

export default TemplatePreview_2