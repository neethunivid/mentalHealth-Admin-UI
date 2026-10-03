import React, { useEffect, useRef, useState, useMemo } from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import '../../../assets/css/health.css';
import { Box, Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../Redux/actions';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../API/API-client';
import Tooltip from '@mui/material/Tooltip';
import '../Common/library.scss';



const LenderBookListcomp = () => {
  const navigate = useNavigate();
  let req: any;
  let searchrequest: any
  let searchflag: any
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
  const [sortModel, setSortModel] = useState<any>([]);

 

  const columns: GridColDef[] = [
    {
      field: 'memberno', headerName: '貸出No ', width: 85, headerAlign: "center",
      headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
    },
    {
      field: 'joinDate', headerName: '貸出日 ',
      headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        if (params.row.joinDate) {
          const year = params.row.joinDate[0];
          const month = String(params.row.joinDate[1]).padStart(2, '0');
          const day = String(params.row.joinDate[2]).padStart(2, '0');
          const formattedDate = `${year}.${month}.${day}`;
          return (
            formattedDate
          );
        }

      },
      width: 100
    },
    {
        field: 'plantoreturn', headerName: '返却予定 ',
        headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
        headerAlign: "center",
        renderCell: (params) => {
          if (params.row.joinDate) {
            const year = params.row.joinDate[0];
            const month = String(params.row.joinDate[1]).padStart(2, '0');
            const day = String(params.row.joinDate[2]).padStart(2, '0');
            const formattedDate = `${year}.${month}.${day}`;
            return (
              formattedDate
            );
          }
  
        },
        width:160
      },
      {
        field: 'returndate', headerName: '返却日  ',
        headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
        headerAlign: "center",
        renderCell: (params) => {
          if (params.row.joinDate) {
            const year = params.row.joinDate[0];
            const month = String(params.row.joinDate[1]).padStart(2, '0');
            const day = String(params.row.joinDate[2]).padStart(2, '0');
            const formattedDate = `${year}.${month}.${day}`;
            return (
              formattedDate
            );
          }
  
        },
        width: 100
      },
      {
        field: 'regno', headerName: '登録 No ', width: 150, headerAlign: "center",
        headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
      },
    {
      field: 'name', headerName: '貸出者氏名', width: 150, headerAlign: "center",
      cellClassName: "gridcolumn-cells blacktxt", sortable: false,
      renderCell: (params) => {
        const fullName = `${params.row.name} ${params.row.name2}`; // Combine name and name2 fields

        return (
          fullName
        );
      }, headerClassName: "headergridcell_blue1"
    },
    {
        field: 'prefecture', headerName: '都道府県', width:150, headerAlign: "center",
        cellClassName: "gridcolumn-cells blacktxt", sortable: false,
        renderCell: (params) => {
          const fullName = `${params.row.name} ${params.row.name2}`; // Combine name and name2 fields
  
          return (
            fullName
          );
        }, headerClassName: "headergridcell_blue1"
      },
    {
      field: 'memberid', headerName: '市町村', flex:1, headerAlign: "center",
      headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false
    },
    {
        field: 'email_pc', headerName: 'E-mail', flex: 1, headerAlign: "center",align:'center',
        headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
        renderCell: (params) => (
            <Tooltip title={params.row.email_pc}>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {params.row.email_pc}
            </div>
          </Tooltip>
        ),
      },
    {
      field: 'password', headerName: '登録日', width: 100, headerAlign: "center",
      headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false
    },
   

    
   
  ];
  const handleSortClick = (field: any, sortOrder: any) => {
    setSortField(field);
    setSortOrder(sortOrder)
    fetchMember(selectedValue ? selectedValue : 10, currentPage ? currentPage : 1, field, sortOrder)
  }
  const ToNgMember = async (id: any) => {
    try {
      const apiData = await apiClient.get('api/members/blockMember/' + id);
      if (apiData) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating ngMember status:', error);
    }
  };
 
  const location = useLocation();
  if (location && location.state && location.state.flag) {
    searchrequest = location.state.data
    searchflag = location.state.flag;
  }
  const jsonData = [
    { value: '10', label: '10' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
    { value: '200', label: '200' },
    { value: '500', label: '500' },
    { value: '1000', label: '1000' },
    { value: '1500', label: '1500' },
  ];
  const [users, setUsers] = useState<any>([]);
  const [pagesizevalue, setpagesizevalue] = useState<any>(10);
  const [RowsData, setRowsData] = useState<any>([]);
  const [sortField, setSortField] = useState()
  const [sortOrder, setSortOrder] = useState()
  const dispatch = useDispatch();
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.member_list
  });
  const gridRef = useRef(null);

  const [rowId, setRowId] = useState(null);
  const [selectedValue, setSelectedValue] = useState<any>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const handleSelectChange = (event: any) => {
    setpagesizevalue(event.target.value)
    setSelectedValue(event.target.value)
    fetchMember(event.target.value, 1, "", "");
  };
  const getRowClassName = (params: any) => {
    return params.indexRelativeToCurrentPage % 2 === 0
      ? "mbr-list-bg1" : "mbr-list-bg1";
  };
  useEffect(() => {
    fetchMember(10, 1, "", "");

  }, []);

  const fetchMember = async (pagesize: any, pageNumber: number = 1, sortField: any, sortOrder: any) => {
    setIsLoading(true);
    pageNumber -= 1;
    try {
      req = {
        pageNumber: pageNumber,
        pageSize: pagesize,
        withdrawList: false,
        ...(sortField && { sortField: sortField }),
        ...(sortOrder && { sortDirection: sortOrder }),
        status: 1
      };
      if (searchflag == 1) {
        req = {
          ...req,
          ...(searchrequest.email_pc && { email_pc: searchrequest.email_pc }),
          ...(searchrequest.memberno && { memberno: searchrequest.memberno }),
          ...(searchrequest.memberid && { memberid: searchrequest.memberid }),
          ...(searchrequest.name && { name: searchrequest.name }),
        }

      }
      dispatch(fetchData("member_list", "api/members/memberlistsearch", req));
      setIsLoading(false);
      if (!data || !Array.isArray(data)) {
        return null;
      } else if (!data) {
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

 
   
  
  return (
    <Box >
       
        <Grid container xs={12} ref={gridRef}>
          
          <Grid className='hr' />
        
          <Grid className='hr' />
          {data && data.data && data.data.length !== 0 ?
            <Grid>
              <Grid xs={12}>
                <DataGrid
                  sx={{
                    '.MuiDataGrid-iconButtonContainer': {
                      visibility: 'visible',
                    },
                    '.MuiDataGrid-sortIcon': {
                      opacity: 'inherit !important',
                    },
                  }}
                  columns={columns}
                 
                  rows={data?.data ?? []}
                  getRowClassName={getRowClassName}
                  disableColumnMenu={true}
                  autoHeight
                  // autoPageSize
                  hideFooter
                  hideFooterSelectedRowCount
                  rowHeight={38} 
                  columnHeaderHeight={38}

                />
              </Grid>
              <Grid className='hr'></Grid>
             
            </Grid>
            : <div></div>}
        </Grid>

    


    </Box>
  );
};

export default LenderBookListcomp;
