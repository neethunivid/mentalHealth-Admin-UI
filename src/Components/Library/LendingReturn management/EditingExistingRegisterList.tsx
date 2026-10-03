import React, { useEffect, useRef, useState} from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import '../../../assets/css/health.css';
import { Box, Button, Grid} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../Redux/actions';
import LeftPanBBS from '../../Common/LeftPanBBS';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import editbutton from '../../../assets/images/lib_browse.gif';
import '../Common/library.scss';
import reset from '../../../assets/admin_library/images/lib_reset.png'


const EditingExistingRegisterList = () => {
  const navigate = useNavigate();
  let req: any;
  let searchrequest: any
  let searchflag: any

  const columns: GridColDef[] = [
    {
      field: 'name', headerName: '貸出者氏名', width: 160, headerAlign: "center",
      cellClassName: "gridcolumn-cells blacktxt", sortable: false,
      renderCell: (params) => {
        const fullName = `${params.row.name} ${params.row.name2}`; // Combine name and name2 fields

        return (
          fullName
        );
      }, headerClassName: "headergridcell_blue1"
    },
    {
      field: 'Furigana', headerName: 'ふりがな', width: 130, headerAlign: "center",
      headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
    },
   
    {
        field: 'prefecture', headerName: '都道府県', width: 100, headerAlign: "center",
        cellClassName: "gridcolumn-cells blacktxt", sortable: false,
        renderCell: (params) => {
          const fullName = `${params.row.name} ${params.row.name2}`; // Combine name and name2 fields
  
          return (
            fullName
          );
        }, headerClassName: "headergridcell_blue1"
      },
    {
      field: 'muncipality', headerName: '市町村', headerAlign: "center",width:150,
      headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false
    },
    {
        field: 'email_pc', headerName: 'E-mail', width: 250, headerAlign: "center",align:'center',
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
      field: 'edit',
      headerName: '編集',
      flex:1, headerAlign: "center",
      headerClassName: "headergridcell_blue1",
      cellClassName: "gridcolumn-cells blacktxt",
      hideable: false,
      align:'center',
      sortable: false,
      renderCell: (params) => {
        const handleEditButtonClick = () => {
          localStorage.setItem('editpreviewloaded', "false");
          navigate('/editlender', { state: { data: params.row.id } });
        };

        return (

          <Button>
         <img src={editbutton} alt='editbutton' onClick={handleEditButtonClick}/>
          </Button>

        );
      },
    },
   
  ];
  
  const jsonData = [
    { value: '10', label: '10' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
    { value: '200', label: '200' },
    { value: '500', label: '500' },
    { value: '1000', label: '1000' },
    { value: '1500', label: '1500' },
  ];
  const dispatch = useDispatch();
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.member_list
  });
  const gridRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
 
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
  

  const CustomHeader = (column: any) => {
    return (
    <Grid>
      <Grid container className='text_grid'>
        <span>{column.column.colDef.headerName}</span>
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
        <Grid item xs={9} ref={gridRef}>
          <Grid className="content-row">
            <Grid className="p2red_bg_left size"></Grid>
            <Grid className="p2red_bg_midle">
              <Grid className="top-header">
                <span className="verdana_big">B-2.既存登録者の編集</span>
                <span className="verdana_big">図書室管理</span>
              </Grid>
            </Grid>
            <Grid className="p2red_bg_right size"></Grid>
          </Grid>
          <Grid className='hr'></Grid>
          <span className="black"> ★貸出者を選択して編集ボタンをクリックして下さい。</span><br/>
                <span className="black lib-marg">B-2</span>
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
                  // columns={columns}
                  columns={columns.map((col) => ({
                    ...col,
                    renderHeader: (params: any) => <CustomHeader column={params} />,
                  }))}
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
              <Grid item xs={12}>
                        <Grid container display={"flex"} justifyContent={"left"}>
                        <Grid className='g2up'>
                        <Button type="button"><img src={reset}/></Button>
                        </Grid>
                        </Grid>
              </Grid>
              <Grid className='hr'></Grid>
            </Grid>
            : <div></div>}
        </Grid>
      </Grid>


    </Box>
  );
};

export default EditingExistingRegisterList;
