import { Grid } from '@mui/material'
import React from 'react'

interface LayoutProps{
    label:string
}


const CheckSheetHeader = ({label}:LayoutProps) => {
  return (
    <>
    <Grid className="hr"></Grid>
    <Grid className="content-row">
      <Grid className="p2red_bg_left size"></Grid>
      <Grid className="p2red_bg_midle">
        <Grid className="top-header">
          <span className="verdana_big">{label}</span>
          {/* <span className="verdana_big">会員DB管理</span> */}
        </Grid>
      </Grid>
      <Grid className="p2red_bg_right size"></Grid>
    </Grid>
    </>
  )
}

export default CheckSheetHeader