import { Grid, Typography } from "@mui/material";
import React from "react";
import TreeData from "../Member monitor Comp/TreeData";
interface LayoutProps {
  reviewData: any;
  formattedDateTime: any;
}

const Remark_pen_TreeData = ({ reviewData, formattedDateTime }: any) => {
  return (
    <Grid item className="mglft " xs={6}>
      <Grid className="bdr_white_right itemgrid">
        <Typography className="white">
          <strong style={{ alignSelf: "center", justifySelf: "center" }}>
            関連ツリー一覧
          </strong>
        </Typography>
      </Grid>
      <Grid className="tree_box" style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
        <div className="black tree_box">
          {reviewData?.remarks == null ? (
            <div style={{ whiteSpace: 'nowrap' }}>
              {`★${reviewData?.member?.title} ${" "}
              ${reviewData?.member?.name}${" "} 
              By ${" "}
              ${formattedDateTime} ${" "} 
              ${reviewData?.member?.remark_no}`}
            </div>
          ) : (
            <div>{reviewData && <TreeData value={reviewData?.remarks} />}</div>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default Remark_pen_TreeData;
