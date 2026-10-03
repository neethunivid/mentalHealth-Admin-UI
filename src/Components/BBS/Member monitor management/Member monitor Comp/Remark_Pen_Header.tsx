import { Box, Grid, Typography } from '@mui/material'
import React from 'react'


interface LayoutProps{
    typeDivision:any;
    reviewButton:any;
}
const Remark_Pen_Header = ({typeDivision,reviewButton}:any) => {
    const typeDivisionFun=()=>{
        if(typeDivision=="普通神経症の部屋"&&!reviewButton){
    return typeDivision
        }else if(typeDivision=="不安神経症の部屋" &&!reviewButton){
            return typeDivision;
        }else if(typeDivision=="強迫神経症の部屋"&&!reviewButton){
            return typeDivision;
        }else if(typeDivision=="その他の部屋"&&!reviewButton){
            return typeDivision;
        }else if(typeDivision=="成長の部屋"&&!reviewButton){
            return typeDivision;
        }else if(typeDivision=="新規1"&&!reviewButton){
            return typeDivision;
        }else{
            if(reviewButton=="normal"){
    return "普通神経症の部屋";
            }else if(reviewButton=="anxiety"){
                return "不安神経症の部屋";
            }else if(reviewButton=="blackmail"){
                return "強迫神経症の部屋";
            }else if(reviewButton=="other"){
      
                return "その他の部屋";
            }else if(reviewButton=="growingup"){
                return "成長の部屋";
            }else if(reviewButton=="addition1"){
                return "新規1";
            }else if(reviewButton=="addition2"){
                return "新規2";
            }
        }
    
        }
  return (
    <div>  <Grid container>
    <Box className="p2red_bg_left"></Box>
    <Box className="p2red_bg_midle">
      <Grid xs={12} className="text_grid">
        <Grid xs={4}>
          <Typography className="txtverdana mg_lftrgt">
            A.審査待ちの発言内容
          </Typography>
        </Grid>
        <Grid xs={5} className="text_grid">
        
          <Typography className="txtverdana1">{typeDivisionFun()}</Typography>
        </Grid>
        <Grid xs={3} className="text_grid">
          {" "}
          <Typography className="txtverdana1">
            会員モニター管理
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Box className="p2red_bg_right"></Box>
  </Grid></div>
  )
}

export default Remark_Pen_Header