import { Grid } from '@mui/material'
import React from 'react'

interface LayoutProps{
    reviewCountData: any;
    handleClick: () => void;
    label:any;
    btn_name:string;
}

const Remark_await_review_CountComp = ({reviewCountData,handleClick,label,btn_name}:any) => {
  return (
    <div>   <Grid className="mgtp_bt" container>
    <Grid item className="mglft_1" xs={6}>
      <label className="blacktxt_1">{label}</label>
    </Grid>
    <Grid item xs={2} className="content-row">
      <label className="red_font_2">審査待ち</label>
      <label className="red_font_2 remark_await_padding">
        {reviewCountData}件
      </label>
    </Grid>
    <Grid item xs={4}>
      <input
        onClick={ handleClick}
        className="mg_lftrgt cursor_pointer"
        type="button"
        name="btn_a"
        value={btn_name}
      />
    </Grid>
  </Grid></div>
  )
}

export default Remark_await_review_CountComp