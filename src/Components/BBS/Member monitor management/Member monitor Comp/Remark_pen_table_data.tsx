import { Grid, Typography } from '@mui/material'
import React from 'react'

interface LayoutProps{
    reviewData:any;
    formattedDateTime:any;
    typeDivision:any;
    reviewButton:any
}

const Remark_pen_table_data = ({reviewData,formattedDateTime,typeDivision,reviewButton}:any) => {

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
    <><Grid item xs={6}>
    <Grid className="text_grid">
      <Grid xs={5} className="bdr_white_right itemgrid">
        <Typography className="white">
          <strong> 項目</strong>
        </Typography>
      </Grid>
      <Grid xs={7} className="bdr_white_right itemgrid">
        <Typography className="white">
          <strong>審査待ちの内容</strong>
        </Typography>
      </Grid>
    </Grid>
    <Grid className="tpspc"></Grid>
    <Grid className="bg_grey text_grid">
      <Grid xs={6}>
        <li className="blacktxt">発言No.</li>
      </Grid>
      <Grid xs={6}>
        <label className="blacktxt">
          {reviewData?.member.remark_no}
        </label>
      </Grid>
    </Grid>
    <Grid className="text_grid mgtp_bt bg_white">
      {" "}
      <Grid xs={6}>
        <li className="blacktxt">発言日</li>
      </Grid>
      <Grid xs={6}>
        <label className="blacktxt">{formattedDateTime}</label>
      </Grid>
    </Grid>
    <Grid className="bg_grey text_grid greytopbtm">
      <Grid xs={6}>
        <li className="blacktxt">ID.</li>
      </Grid>
      <Grid xs={6}>
        <label className="blacktxt">
          {reviewData?.member.memberId}
        </label>
      </Grid>
    </Grid>
    <Grid className="text_grid mgtp_bt bg_white">
      <Grid xs={6}>
        <li className="blacktxt">タイプ区分</li>
      </Grid>
      <Grid xs={6}>
        <label className="blacktxt">
          {typeDivisionFun()}
        </label>
      </Grid>
    </Grid>
    <Grid className="bg_grey text_grid">
      <Grid xs={6}>
        <li className="blacktxt">E-MAIL.</li>
      </Grid>
      <Grid xs={6}>
        <label className="blacktxt">
          {reviewData?.member.email_pc}
        </label>
      </Grid>
    </Grid>
    <Grid className="text_grid mgtp_bt bg_white">
      <Grid xs={6}>
        <li className="blacktxt">タイトル</li>
      </Grid>
      <Grid xs={6}>
        <label className="blacktxt">
          {`${reviewData?.member.title}`}
        </label>
      </Grid>
    </Grid>
    <Grid className="bg_grey greytopbtm1 text_grid">
      <Grid xs={6}>
        <li className="blacktxt">発言内容.</li>
      </Grid>
      <Grid xs={6}>
        <label className="blacktxt">
          {reviewData?.member?.text}
        </label>
      </Grid>
    </Grid>
  </Grid></>
  )
}

export default Remark_pen_table_data