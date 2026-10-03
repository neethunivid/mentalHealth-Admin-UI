import { Grid } from '@mui/material'
import React from 'react'

interface LayoutProps{
    label1:string;
    label2:string;
}

const ListMailMagThemeHeader = ({label1,label2}:LayoutProps) => {
  return (
    <div>         <Grid className="content-row">
    <Grid className="p2red_bg_left size"></Grid>
    <Grid className="p2red_bg_midle">
      <Grid className="top-header">
        <span className="verdana_big">{label1} </span>
        <span className="verdana_big">{label2}</span>
      </Grid>
    </Grid>
    <Grid className="p2red_bg_right size"></Grid>
  </Grid></div>
  )
}

export default ListMailMagThemeHeader