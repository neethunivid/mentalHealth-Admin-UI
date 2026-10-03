import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Typography, Grid, Box } from '@mui/material';
import { Button } from '@mui/material';
import RestService from '../../API/API-helper';
import config from '../../config.json';
import axios from 'axios';

interface Column {
  label: string;
  fieldName: string;
  action: boolean;
}

const DataGridComponent: React.FC = () => {
  const apiUrl = config.api.url;
  const [data, setMemberData] = useState<any[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    console.log("useeffect ");
    // Fetch data from API and set it in the state
    fetchMemberList();

    // Set the columns configuration
    setColumns([
      {
        label: '会員番号',
        fieldName: 'memberno',
        action: false,
      },
      {
        label: '入会日',
        fieldName: 'join_date',
        action: false,
      },
      {
        label: '名前',
        fieldName: 'name',
        action: false,
      },
      {
        label: 'ID',
        fieldName: 'name',
        action: false,
      },
      {
        label: 'パスワード',
        fieldName: 'password',
        action: false,
      },
      {
        label: 'e-mail',
        fieldName: 'email_pc',
        action: false,
      },
      {
        label: '編集',
        fieldName: 'edit',
        action: true,
      },
      {
        label: 'NG',
        fieldName: 'ng',
        action: true,
      },
      // Add more columns as needed
    ]);
  }, []);

  const fetchMemberList = async () => {
    console.log("fetch member data");
    const req = {
      "pageNumber": 0,
      "pageSize": 7
    }
    var config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InByIiwic3ViIjoicHIiLCJpYXQiOjE2ODYwNDM4NTksImV4cCI6MTY4NjEzMDI1OX0.NOmzYFC7E7iXtElxYZpHvNUEKAteNK9f2WQFKZyz4wM`,
        'Content-Type': 'application/json',
        //Accept: 'application/json',
      },
    }
    //   axios.defaults.headers.common = {'Authorization': `bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InByIiwic3ViIjoicHIiLCJpYXQiOjE2ODU3MDA0NTIsImV4cCI6MTY4NTc4Njg1Mn0.22l9_l1330l-cjXvQyKjpBdwOmTbe-jIKTtNU20n9rw`}

    console.log(config);
    const apiData = await RestService.getAllData(apiUrl + 'members/memberSearch2', req,
      "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InByIiwic3ViIjoicHIiLCJpYXQiOjE2ODYwNDM4NTksImV4cCI6MTY4NjEzMDI1OX0.NOmzYFC7E7iXtElxYZpHvNUEKAteNK9f2WQFKZyz4wM");
    // return await axios.post(apiUrl + 'members/memberSearch2', req, {})
    // .then((response: any) => {
    //   console.log("result");
    //   console.log(response.data);
    //   setMemberData(response.data);
    // }).catch(err => {
    //   console.log(err);
    // })
    console.log(apiData);
    setMemberData(apiData.data);
  }

  return (
    <Box sx={{ marginLeft: 4 }}>
      <Grid container xs={12} sx={{ padding: 0, border: 0 }} spacing={0}>
        <Grid item className="p2red_bg_left" />
        {/* <Grid item xs={12} sx={{ padding: 0, margin: 0 }} > */}
        <Grid container xs={11} className="p2red_bg_midle" justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="subtitle1">
              <span className="verdana_big">A.</span>
              <span lang="ja">会員データの一覧</span>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" align="right">
              会員 <span className="black_bold">DB</span> 管理
            </Typography>
          </Grid>
          {/* </Grid> */}
        </Grid>
        <Grid item className="p2red_bg_right" />
      </Grid>

      <Grid container xs={12} sx={{ padding: 0, margin: 0 }}>
        <Grid item justifyContent="space-between" alignItems="center">
          <Grid item xs={8}>
            {/* Place your content here */}
          </Grid>
          {/*    <Grid item xs={4} >
          <Grid container>
            <Grid item xs={6}>
            
            </Grid>
            <Grid item xs={1}>
              <img src="images/6th_arrow_top.gif" width="10" height="10" alt="" />
            </Grid>
            <Grid item xs={5}>
              ソート降順
            </Grid>
            <Grid item xs={6}>
             
            </Grid>
            <Grid item xs={1}>
              <img src="images/6th_arrow_bottom.gif" width="10" height="10" alt="" />
            </Grid>
            <Grid item xs={5} className="black">
              ソート昇順
            </Grid>
          </Grid>
        </Grid>  */}
        </Grid>
      </Grid>

      <br />
      <Grid container xs={11} >

        <Table >
          <TableHead className="sixth_bdr_left_bottom">
            <TableRow className="sixth_bdr_left_bottom" >
              {columns.map(column => (

                <TableCell sx={{ padding: 0 }} key={column.fieldName} className="sixth_bdr_left_bottom">{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody  >
            {data.map((item, index) => (
              <TableRow key={item.id} className={index % 2 === 0 ? "bg_sixt_TableCell" : ""}>
                {columns.map(column => (
                  column.action === false ? (
                    column.fieldName === "name" ? (
                      <TableCell sx={{ padding: 0 }} key={column.fieldName} className="sixth_bdr_left_bottom">
                        {item[column.fieldName]} {item[column.fieldName + "2"]}
                      </TableCell>
                    ) : (
                      <TableCell sx={{ padding: 0 }} key={column.fieldName} className="sixth_bdr_left_bottom">
                        {item[column.fieldName]}
                      </TableCell>
                    )
                  ) : (
                    <TableCell sx={{ padding: 0 }} key={column.fieldName} className="sixth_right_btn">
                      <Button className="black">

                        {column.label}
                      </Button>
                    </TableCell>
                  )
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </Grid>
      <Grid container xs={11} >
        <Table sx={{ textDecoration: 'none', 'listStyle': 'none' }}>
          <TableRow>
            <TableCell >
              <Table width="84%">
                <TableRow>
                  <TableCell height="30" className="p6red_bg_left">&nbsp;</TableCell>
                  <TableCell height="30" className="p6red_bg_midle">
                    <Table width="100%" >
                      <TableRow>
                        <TableCell width="33%" align="right" className="black"></TableCell>
                        <TableCell width="25%" align="right" className="black">列を表示
                          &nbsp;
                          <select name="no_records" >

                          </select>
                        </TableCell>
                        <TableCell width="27%" align="right" className="black">20</TableCell>
                        <TableCell width="15%" align="right">
                          <Table width="100%" sx={{ textDecoration: 'none', 'listStyle': 'none' }}>
                            {/* <tr>
                      <TableCell width="27%">&nbsp;</TableCell>
                      <TableCell width="73%">
                      {if $showback}<a href="Javascript:loadpage({$curpage-1});"><img src="images/6th_btn_previous.gif" width="21" height="22" border="0" /></a>{/if}
                      {if $shownext}<a href="Javascript:loadpage({$curpage+1});"><img src="images/6th_btn_next.gif" width="21" height="22" border="0" /></a>{/if}
                      </TableCell>
                    </tr> */}
                          </Table>
                        </TableCell>
                      </TableRow>
                    </Table></TableCell>
                  <TableCell height="30" className="p6red_bg_right">&nbsp;</TableCell>
                </TableRow>
              </Table></TableCell>
          </TableRow>
        </Table>
      </Grid>
    </Box>
  );
};

export default DataGridComponent;

