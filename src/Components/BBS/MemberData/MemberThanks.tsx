import { Grid } from '@mui/material'
import React from 'react'
import LeftPanBBS from '../../Common/LeftPanBBS'
import MemberThanksHeader from './MemberThanksComp/MemberThanksHeader'

const MemberThanks = () => {
  return (
    <div>
        <Grid container xs={12} padding={1} spacing={1}>
            <Grid item xs={3} spacing={2}>
                <LeftPanBBS/>
            </Grid>
            <Grid item xs={9}>
              <MemberThanksHeader/> 
              <Grid className='hr'></Grid>
              <Grid  className='table_seven'>
                <Grid className='member_add_thanks_text'>
                <span className='member_add_thanks_text_span'>	データが保存されました!</span>
                </Grid>
              </Grid>
            </Grid>
        </Grid>
    </div>
  )
}

export default MemberThanks