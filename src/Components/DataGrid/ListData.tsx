import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import '../../../assets/css/health.css';
import { Box, Grid, TableRow, } from '@mui/material';
import AdminHeaderComponent from '../Common/Admin-Header';
import LeftPanComponent from '../Common/LeftPan';
import { join } from 'path';
import apiClient from '../../API/API-client';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../Redux/actions';
import { headers } from '../../API/header';
interface User {
  memberid: number;
  memberno: number;
  name: string;
  name2: string;
  joinDate: string;
  email_pc: string;
  password: string;
}

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 100,  },
  { field: 'memberno', headerName: '会員番号', width: 100, headerClassName: "sixth_bdr_left_bottom" },
  {
    field: 'joinDate', headerName: '入会日',
    renderCell: (params) => {
      // console.log(params.row.joinDate[0]);
      const year = params.row.joinDate[0];
      const month = String(params.row.joinDate[1]).padStart(2, '0');
      const day = String(params.row.joinDate[2]).padStart(2, '0');
      const formattedDate = `${year}.${month}.${day}`;
      return (
        formattedDate
      );
    },
    width: 100, headerClassName: "sixth_bdr_left_bottom"
  },
  {
    field: 'name', headerName: '名前', width: 160,
    renderCell: (params) => {
      const fullName = `${params.row.name} ${params.row.name2}`; // Combine name and name2 fields

      return (
        fullName
      );
    }, headerClassName: "sixth_bdr_left_bottom"
  },
  { field: 'memberid', headerName: 'ID', width: 100, headerClassName: "sixth_bdr_left_bottom" },
  { field: 'password', headerName: 'パスワード', width: 100, headerClassName: "sixth_bdr_left_bottom" },
  { field: 'email_pc', headerName: 'email_pc', width: 160, headerClassName: "sixth_bdr_left_bottom" },
  {
    field: '編集',
    headerName: 'edit',
    width: 100,
    headerClassName: "sixth_bdr_left_bottom",
    renderCell: (params) => {
      const handleButtonClick = () => {
        // Handle button click logic here
        console.log(`Button clicked for row with ID: ${params.id}`);
      };

      return (
        <button onClick={handleButtonClick} className="sixth_right_btn">
          編集
        </button>
      );
    },
  },
  {
    field: 'NG',
    headerName: 'NG',
    width: 100,
    headerClassName: "sixth_bdr_left_bottom",
    renderCell: (params) => {
      const handleButtonClick = () => {
        // Handle button click logic here
        console.log(`Button clicked for row with ID: ${params.id}`);
      };

      return (
        <button onClick={handleButtonClick} className="sixth_right_btn">
          NG
        </button>
      );
    },
  },
];

const MyComponent = () => {
  const [users, setUsers] = useState<any>([]);
  const dispatch = useDispatch();
  const data = useSelector((state: any) => {
    return state?.data['member_list']
  });


  // console.log(JSON.stringify(data), 'datassss')
  // const loading = useSelector((state:any) => state.reducer.loading);
  // const error = useSelector((state:any) => state.reducer.error);

  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem('token');
      console.log("fetch users");
      const req = {
        pageNumber: 0,
        pageSize: 7
      };
      dispatch(fetchData("member_list", "members/memberSearch2", req));
      if (!data || !Array.isArray(data)) {
        console.log("dataa>>");
        return null; // Return null or a fallback component if the data is not available or is not an array
      }

    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const getRowStyleParams = (params: any) =>
    params.rowIndex % 2 === 0 ? 'bg_sixt_TableCell' : 'sixth_bdr_left_bottom';

  const getCellStyleParams = (params: any) =>
    params.rowIndex % 2 === 0 ? 'bg_sixt_TableCell' : 'sixth_bdr_left_bottom';


  return (
    <Box >
      <Box>
        <Grid container xs={12} spacing={2}>
          <Grid item xs={4}>
            <LeftPanComponent />
          </Grid>
          <Grid item xs={8}>
            {data && data.data && data.data.length !== 0 ?
              <DataGrid
                rows={data?.data}
                columns={columns}
                //className='sixth_bdr_left_bottom'
                getRowClassName={getRowStyleParams}
                // getCellClassName={getCellStyleParams}
                // autoPageSize
                // autoHeight
                // initialState={{
                //   ...data.initialState,
                //   pagination: { paginationModel: { pageSize: 5 } },
                // }}
                pageSizeOptions={[5, 10, 25]}
              />
              : <div>No record</div>}
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
};

export default MyComponent;
