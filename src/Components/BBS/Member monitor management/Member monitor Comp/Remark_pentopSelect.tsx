import { Grid } from '@mui/material'
import React from 'react'

interface LayoutProps {
  handleClick: () => void
  reviewButton: any
}

const Remark_pentopSelect = ({ handleClick, reviewButton }: any) => {
  return (
    <div>  <Grid className='cursor_pointer' xs={10}>
      <span className="blacktxt">｜A.</span>
      <a
        className={reviewButton == "normal" ? "red_font_2" : "navtxt"}
        onClick={() => handleClick("normal")}
      >
        普通
      </a>
      <span className="blacktxt">｜B.</span>
      <a
        className={reviewButton == "anxiety" ? "red_font_2" : "navtxt"}
        onClick={() => handleClick("anxiety")}
      >
        不安
      </a>
      <span className="blacktxt">｜C.</span>
      <a
        className={reviewButton == "blackmail" ? "red_font_2" : "navtxt"}
        onClick={() => handleClick("blackmail")}
      >
        強迫
      </a>
      <span className="blacktxt">｜D.</span>
      <a
        className={reviewButton == "other" ? "red_font_2" : "navtxt"}
        onClick={() => handleClick("other")}
      >
        その他
      </a>
      <span className="blacktxt">｜E.</span>
      <a
        className={reviewButton == "growingup" ? "red_font_2" : "navtxt"}
        onClick={() => handleClick("growingup")}
      >
        成長
      </a>
      <span className="blacktxt">｜F.</span>
      <a
        className={reviewButton == "addition1" ? "red_font_2" : "navtxt"}
        onClick={() => handleClick("addition1")}
      >
        日記
      </a>
      <span className="blacktxt">｜G.</span>
      <a
        className={reviewButton == "addition2" ? "red_font_2" : "navtxt"}
        onClick={() => handleClick("addition2")}
      >
        新規2
      </a>
    </Grid></div>
  )
}

export default Remark_pentopSelect