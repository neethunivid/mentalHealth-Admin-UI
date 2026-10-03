import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import '../../../assets/css/health.css';
import { Box, Grid,Button} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../Redux/actions';
import { useLocation } from 'react-router-dom';
import LeftPanBBS from '../../Common/LeftPanBBS';
import uparrow from '../../../assets/images/6th_arrow_top.gif'
import downarrow from '../../../assets/images/6th_arrow_bottom.gif'
import { useNavigate } from 'react-router-dom';
import arrowForward from "../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
import ApiClient from '../../../API/API-client';
import { formatDateArray1 } from '../../Common/Date_conversion';

interface User {
  memberid: number;
  memberno: number;
  name: string;
  name2: string;
  joinDate: string;
  email_pc: string;
  password: string;
  searchrequest: any
}

const NgMember = () => {
  const navigate = useNavigate();
  let req: any;
  let searchrequest: any
  let searchflag: any
  let pagesize: any
  let rows: any;
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
  const [sortModel, setSortModel] = useState<any>([]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(event.target.value);
    setpagesizevalue(event.target.value);
    setSelectedValue(event.target.value);
    setCurrentPage(1);
    fetchMember(event.target.value, 1, sortField, sortOrder);
  };



  const columns: GridColDef[] = [
    {
      field: 'memberno', headerName: '会員番号', width: 110,   headerAlign: "center",
      headerClassName: "sixth_bdr_left_bottom", cellClassName: "dgridcolumn-cell",sortable: false,
    },
    {
      field: 'joinDate', headerName: '入会日',
      headerClassName: "sixth_bdr_left_bottom", cellClassName: "dgridcolumn-cell", sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        if (params?.row?.joinDate) {
          return formatDateArray1(params?.row?.joinDate)
        }
        else{
          return null
        }

      },
      width: 160
    },
    {
      field: 'name', headerName: '名前', width: 130,
      cellClassName: "dgridcolumn-cell", sortable: false,   headerAlign: "center",
      renderCell: (params) => {
        const fullName = `${params.row.name} ${params.row.name2}`; // Combine name and name2 fields

        return (
          fullName
        );
      }, headerClassName: "sixth_bdr_left_bottom"
    },
    { field: 'memberid', headerName: 'ID',   headerAlign: "center", width: 110, headerClassName: "sixth_bdr_left_bottom", cellClassName: "dgridcolumn-cell", sortable: false },
    { field: 'password', headerName: 'パスワード',   headerAlign: "center", width: 120, headerClassName: "sixth_bdr_left_bottom", cellClassName: "dgridcolumn-cell",sortable: false  },
    { field: 'email_pc', headerName: 'eメール',    headerAlign: "center",flex:1, headerClassName: "sixth_bdr_left_bottom", cellClassName: "dgridcolumn-cell", sortable: false,
    renderCell: (params) => (
      <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.value}</div>
    ),
  },

    {
      field: 'NG',
      headerName: 'NG解除',
      width: 110,   headerAlign: "center",
      headerClassName: "sixth_bdr_left_bottom",
      cellClassName: "dgridcolumn-cell",
      hideable: false,
      align:"center",
      sortable:false,
      renderCell: (params) => {
        const handleButtonClick = () => {
          updatengmember(params.id);
        };
        const { ngMember } = params.row;
        const RenderNGButton = ngMember == 1;
        return (
            <Button onClick={handleButtonClick} className="sixth_right_btn cursor_pointer">
              <span className="black">NG解除</span>
            </Button>
        );
      },
    },
  ];
  const handleSortClick = (field: any, sortOrder: any) => {
    setSortField(field);
    setSortOrder(sortOrder)
    fetchMember(selectedValue ? selectedValue : 10, currentPage ? currentPage : 1, field, sortOrder)
  }
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
    return state?.reducer1.data?.ng_member_list
  });

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] =useState<any>(10);
  const handleSelectChange = (event: any) => {
    setpagesizevalue(event.target.value)
    setSelectedValue(event.target.value)
    fetchMember(event.target.value, 1, "", "");
  };
  const getRowClassName = (params: any) => {
    return params.indexRelativeToCurrentPage % 2 === 0
      ? 'mbr-list-blue-bg' : '';
  };
  useEffect(() => {
    fetchMember(10, 1,"","");
  }, []);

  const updatengmember = async (id:any) => {
    try {
      
        req = {

        };
      const apiData = await ApiClient.get('api/members/unBlockMember/' + id);
      if(apiData){
        window.location.reload();
      }
     
      
      if (!data || !Array.isArray(data)) {
        return null; // Return null or a fallback component if the data is not available or is not an array
      }
      else if (!data) {

      }

    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const fetchMember = async (pagesize: any, pageNumber: number = 1, sortField: any, sortOrder: any) => {
    setIsLoading(true);
    pageNumber -= 1;
    try {
      req = {
        pageNumber: pageNumber,
        pageSize: pagesize,
        withdrawList: false,
        ngMember:1,
        ...(sortField && { sortField: sortField }),
        ...(sortOrder && { sortDirection: sortOrder }),
       
      };
      dispatch(fetchData("ng_member_list", "api/members/memberlistsearch", req));
      // window.location.reload();
      setIsLoading(false);
      if (!data || !Array.isArray(data)) {
        return null; // Return null or a fallback component if the data is not available or is not an array
      }
      else if (!data) {

      }

    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchMember(selectedValue, pageNumber, sortField, sortOrder);
  }
  const getPageInfo = (data: any) => {
    let page: any = currentPage ? currentPage : 1;
    let offset: any = ((page - 1) * selectedValue) + 1
    let count: any = page * selectedValue;
    let totalRows: any = data && data['count'] ? data['count'] : 0;
    let totalPages: number = Math.ceil(totalRows / selectedValue);
    if (count > totalRows) {
      count = totalRows;
    }
    return (<>
      <span className='padding'>
        <span className='black'>{data?.count + "件中"}</span>
        <span className='black'>{offset}〜{count}件 </span>
        {page > 1 && <img onClick={() => { goToPage(currentPage - 1) }} src={arrowBack}></img>}
        {totalPages > page && <img onClick={() => { goToPage(currentPage + 1) }} src={arrowForward}></img>}
      </span>
    </>
    );
  }

  const getRowStyleParams = (params: any) =>
    params.indexRelativeToCurrentPage % 2 === 0 ? 'bg_sixt_TableCell' : 'sixth_bdr_left_bottom';

  const CustomHeader = (column: any) => {
    return (<Grid>
      <Grid container xs={12} display={"flex"} flexDirection={"row"}>
        <span>{column.column.colDef.headerName}</span>
        {column.column.field != "edit" && column.column.field != "NG" ?
          <div className='sort-arrow-container'>
            <img src={uparrow} className='sortarrow' onClick={() => { handleSortClick(column.column.field, "ASC") }} />
            <img src={downarrow} className='sortarrow' onClick={() => { handleSortClick(column.column.field, "DESC") }} />
          </div>
          : null}
      </Grid>
    </Grid>
    );
  }
  return (
    <Box >
     <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanBBS />
        </Grid>
        <Grid item xs={9}>
          <Grid container>
            <Box className='p2red_bg_left'></Box>
            <Box className='p2red_bg_midle'>
              <Grid justifyContent={'space-between'}>
              <span className='verdana_big'style={{marginRight:"600px"}}>E.NG会員 </span>
              <span className='verdana_big'>会員DB管理 </span>
              </Grid>
            </Box>
            <Box className='p2red_bg_right'></Box>
          </Grid>
          <Grid className ='hr'></Grid>
          <Grid container item xs={12} display={'flex'} alignItems={'flex-end'} flexDirection={'column'}>
            <Grid >
              <img src={uparrow} width="10" height="10" />
              <span className='black'>ソート降順</span>
            </Grid>
            <Grid>
              <img src={downarrow} width="10" height="10" />
              <span className='black'>ソート昇順</span>
            </Grid>

          </Grid>
          <Grid className="hr"></Grid>
          {data && data?.data?
            <Grid>
              <Grid>
                <DataGrid
                  sx={{
                    '.MuiDataGrid-iconButtonContainer': {
                      visibility: 'visible',
                    },
                    '.MuiDataGrid-sortIcon': {
                      opacity: 'inherit !important',
                    },
                  }}
                  // rows={data?.data}
                  columns={columns.map((col) => ({
                    ...col,
                    renderHeader: (params: any) => <CustomHeader column={params} />,
                  }))}
                  rows={data?.data ?? []}
                  getRowClassName={getRowClassName}
                  disableColumnMenu={true}
                  autoHeight
                  hideFooter
                  hideFooterSelectedRowCount
                />
              </Grid>
              <Grid className='hr'></Grid>
              <Grid className="content-row">
                <Grid className="p6red_bg_left size"></Grid>
                <Grid xs={12} container className="p6red_bg_midle">
                  <Grid xs={4} className="black"></Grid>
                  <Grid xs={4} className="black">
                    <Grid
                      container
                      flexDirection={"row"}
                      justifyContent={"center"}
                      alignSelf={"center"}
                      padding={1}
                    >
                      <span className="black">列を表示</span>
                      <select
                        value={selectedValue}
                        onChange={handleChangeRowsPerPage}
                      >
                        defaultValue={jsonData[0].label}
                        {jsonData.map((option) => (
                          <option key={option.value} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <Grid></Grid>
                    </Grid>
                  </Grid>
                  <Grid xs={4}>
                    {!isLoading && getPageInfo(data)}
                  </Grid>
                </Grid>
                <Grid className="p6red_bg_right size"></Grid>

            </Grid></Grid>
            : <div></div>}
      </Grid></Grid></Box>
  );
};

export default NgMember;
