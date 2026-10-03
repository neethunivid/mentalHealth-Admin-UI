import React, { useEffect, useRef, useState} from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import '../../../assets/css/health.css';
import { Box, Button, Grid} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../Redux/actions';
import { useNavigate,useLocation } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
// import editbutton from '../../../assets/images/lib_browse.gif';
import editButton from '../../../assets/images/lib_browse_s.png';
import '../Common/library.scss';
import reset from '../../../assets/admin_library/images/lib_reset.png'
import { Api } from '@mui/icons-material';
import LibraryapiClient from '../../../API/LibraryAPI-client';
import LeftPanLibrary from '../Common/LeftPanLibrary';
import arrowForward from "../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
import pref from '../Common/pref';
const Registrant_list = () => {
    const navigate = useNavigate();
    const location=useLocation();
    const jsonData = [
      { value: '10', label: '10' },
      { value: '25', label: '25' },
      { value: '50', label: '50' },
      { value: '75', label: '75' },
      { value: '100', label: '100' },
     
  ];
  const [selectedValue, setSelectedValue] = useState<any>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
  const [pagesizevalue, setpagesizevalue] = useState<any>(10);
    let req: any;
    let searchrequest: any
    let searchflag: any
    if(location&&location.state){
        searchrequest=location.state.data
    }
  
    const columns: GridColDef[] = [
      {
        field: 'name', headerName: '貸出者氏名', width: 180, headerAlign: "center",
        cellClassName: "gridcolumn-cells blacktxt", sortable: false,
        // renderCell: (params) => {
        //   const fullName = `${params.row.name} ${params.row.name2}`; // Combine name and name2 fields
  
        //   return (
        //     fullName
        //   );
        // }, 
        headerClassName: "headergridcell_blue1"
      },
      {
        field: 'phoneticCom1', headerName: 'ふりがな', width: 180, headerAlign: "center",
        headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
      },
     
      {
          field: 'state', headerName: '都道府県', width:120, headerAlign: "center",
          cellClassName: "gridcolumn-cells blacktxt", sortable: false,
          renderCell: (params) => {
            let state;
            pref.map((place:any)=>{
              if(place.id===params.row?.state){
                state= place.name
              }
            });
           return state;
          }, 
          headerClassName: "headergridcell_blue1"
        },
      {
        field: 'address1', headerName: '市町村', headerAlign: "center",width:160,
        headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false
      },
      {
          field: 'email', headerName: 'E-mail',flex:1, headerAlign: "center",align:'center',
          headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
          // renderCell: (params) => (
          //     <Tooltip title={params.row.email_pc}>
          //     <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          //       {params.row.email_pc}
          //     </div>
          //   </Tooltip>
          // ),
        },
  
      {
        field: 'edit',
        headerName: '編集',
        width:80,
         headerAlign: "center",
        headerClassName: "headergridcell_blue1",
        cellClassName: "gridcolumn-cells blacktxt",
        hideable: false,
        align:'center',
        sortable: false,
        renderCell: (params) => {
          const handleEditButtonClick = () => {
            // localStorage.setItem('editpreviewloaded', "false");
            navigate('/editlender', { state: { data: params.row.id } });
          };
  
          return (
  
            <Button>
           <img src={editButton} alt='editbutton' onClick={handleEditButtonClick}/>
            </Button>
  
          );
        },
      },
     
    ];
    

    const dispatch = useDispatch();
    const data = useSelector((state: any) => {
      return state?.reducer1.data?.editLenderList
    });
    const gridRef = useRef(null);

   
    const getRowClassName = (params: any) => {
      return params.indexRelativeToCurrentPage % 2 === 0
        ? "mbr-list-bg1" : "mbr-list-bg1";
    };
    useEffect(() => {
      // fetchMember(10, 1, "", "");
      fetchLenderList(10,1);
  
    }, []);


    const fetchLenderList=async(pagesize:any,pageNumber:any)=>{
      // {search_registrant_registerNo: '2', search_registrant_furigana: '', search_registrant_phone: '', search_registrant_email: ''} 
      let dataRequest;

      
      if(searchrequest.isEmpty==true){
        

dataRequest={
  pageSize:pagesize,
  pageNumber:pageNumber,
  ...(searchrequest.param.search_registrant_registerNo&&{regNo:searchrequest.param.search_registrant_registerNo}),
  ...(searchrequest.param.search_registrant_furigana&&{phoneticCom1:searchrequest.param.search_registrant_furigana}),
  ...(searchrequest.param.search_registrant_phone&&{phone:searchrequest.param.search_registrant_phone}),
  ...(searchrequest.param.search_registrant_email&&{email:searchrequest.param.search_registrant_email}),
  ...(searchrequest.param.search_registrant_lender_name&&{name:searchrequest.param.search_registrant_lender_name})
}
      }else{
        dataRequest=
        { pageSize:pagesize,
          pageNumber:pageNumber,
          "name": "",
          "phoneticCom1": "",
          "phone": "",
          "email": "",
          "regNo": ""
      }
      }

        try{
        dispatch(fetchData('editLenderList','library/books/searchlender',dataRequest));
        if(!data||!Array.isArray(data)){
          return null;
        }else if(!data){

        }

        }catch(error){
            alert(error);
        }
    }
  

    
  
    const CustomHeader = (column: any) => {
      return (
      <Grid>
        <Grid container className='text_grid'>
          <span>{column.column.colDef.headerName}</span>
        </Grid>
      </Grid>
      );
    }

    const handleChangeRowsPerPage = (
      // event: React.ChangeEvent<HTMLInputElement>
      event: React.ChangeEvent<HTMLSelectElement>
  ) => {
      setRowsPerPage(event.target.value);
      setpagesizevalue(event.target.value);
      setSelectedValue(event.target.value);
      setCurrentPage(1);
      fetchLenderList(event.target.value, 1);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchLenderList(selectedValue, pageNumber);
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
    return (
      <Box >
  
        <Grid container xs={12} padding={1} spacing={1}>
          <Grid item xs={3} spacing={2}>
            <LeftPanLibrary />
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
          
              <Grid>
                <Grid xs={12}>
                  <DataGrid
                  localeText={{ noRowsLabel:" 結果はありません" }}
                    // sx={{
                    //   '.MuiDataGrid-iconButtonContainer': {
                    //     visibility: 'visible',
                    //   },
                    //   '.MuiDataGrid-sortIcon': {
                    //     opacity: 'inherit !important',
                    //   },
                    // }}
                    // columns={columns}
                    columns={columns.map((col) => ({
                      ...col,
                      renderHeader: (params: any) => <CustomHeader column={params} />,
                    }))}
                    rows={data?.data??[] }
                    components={{
                      NoRowsOverlay: () => (
                        <div className="row_table_list_c1 registration_lending_return_no_row">
                          結果はありません
                        </div>
                      ),
                    }}
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
                <Grid className="content-row">
                    <Grid className="p6red_bg_left size"></Grid>
                    <Grid xs={12} container className="p6red_bg_midle">
                        <Grid xs={4} className="black"></Grid>
                        <Grid xs={4} className="black">
                            <Grid
                                container
                                flexDirection={"row"}
                                justifyContent={"flex-end"}
                                alignSelf={"center"}
                                padding={1}
                            >
                                <span className="black">行の表示 </span>
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
                        {data?.data && getPageInfo(data)}
                        </Grid>
                    </Grid>
                    <Grid className="p6red_bg_right size"></Grid>
                </Grid>

                <Grid item xs={12}>
                          <Grid container display={"flex"} justifyContent={"left"}>
                          <Grid className='g2up'>
                          <Button type="button" onClick={()=>navigate(-1)}><img src={reset}/></Button>
                          </Grid>
                          </Grid>
                </Grid>
                <Grid className='hr'></Grid>
              </Grid>
              {/* : <div></div>} */}
          </Grid>
        </Grid>
  
  
      </Box>
    );
  };

export default Registrant_list