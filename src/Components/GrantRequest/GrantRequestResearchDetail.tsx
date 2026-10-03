import { Box, Grid, Table, TableCell, TableRow } from "@mui/material";
import React from "react";
import '../GrantRequest/styles.scss';

const GrantRequestResearchComponent = ({ name, age, department, role }: any) => {


    return (
        <Grid item xs={12} container className=" Grid-root-border-top">
            <Grid item xs={2} className="Grid-root-border-right" >
                <label>{name}</label>
            </Grid>
            <Grid item xs={10} container >
                <Grid item xs={12} container>
                    <Grid item xs={2} className="Grid-root-border-right">
                        <label >{age}</label>
                    </Grid>
                    <Grid item xs={10} container> <Grid xs={12} container >
                        <Grid item xs={12} container>
                            <Grid xs={5} className="Grid-root-border-right">
                                <label>{department}</label>
                            </Grid>
                            <Grid xs={7}>
                                <label >{role}</label>
                            </Grid>

                        </Grid>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
export default GrantRequestResearchComponent;