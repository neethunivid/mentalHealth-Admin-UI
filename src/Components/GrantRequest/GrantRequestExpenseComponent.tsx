import { Box, Grid, Table, TableCell, TableRow } from "@mui/material";
import React from "react";
import '../GrantRequest/styles.scss';

const GrantRequestExpenseComponent = ({ label, equipcost, consumablecost, travelexpenses, expRewardMoney, others, total }: any) => {

    return (
        <Grid item xs={12} container className=" Grid-root-border-top">
            <Grid width="30%" className="Grid-root-border-right" >
                <label >{label}</label>
            </Grid>
            <Grid width="70%" container  >
                <Grid item xs={12} container>
                    <Grid item xs={10} container> <Grid xs={12} container >
                        <Grid xs={2} className="Grid-root-border-right">
                            <label>{equipcost}</label>
                        </Grid>
                        <Grid xs={2} container className="Grid-root-border-right">
                            <label>{consumablecost}</label>
                        </Grid>
                        <Grid xs={2} container className="Grid-root-border-right">
                            <label>{travelexpenses}</label>
                        </Grid>
                        <Grid xs={2} container className="Grid-root-border-right">
                            <label>{expRewardMoney}</label>
                        </Grid>
                        <Grid xs={2} container className="Grid-root-border-right">
                            <label>{others}</label>
                        </Grid>
                        <Grid xs={2} container>
                            <label>{total}</label>
                        </Grid>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
export default GrantRequestExpenseComponent;