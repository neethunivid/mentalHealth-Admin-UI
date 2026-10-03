import React, { useEffect, useRef, useState} from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import '../../../assets/css/health.css';
import { Box, Button, Grid} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../Redux/actions';
import uparrow from '../../../assets/images/6th_arrow_top.gif'
import downarrow from '../../../assets/images/6th_arrow_bottom.gif'
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import editbutton from '../../../assets/images/lib_browse_s.png';
import '../Common/library.scss';
import LeftPanLibrary from '../Common/LeftPanLibrary';
import pref from '../Common/pref';
import arrowBack from '../../../assets/images/6th_btn_previous.gif';
import arrowForward from '../../../assets/images/6th_btn_next.gif';
//stylling sorticon
export function SortedAscendingIcon() {
  return <img src={uparrow} width="10" height="10" />;
}
export function SortedDescendingIcon() {
  return <img src={downarrow} width="10" height="10" />;
}
const LenderList = () => {
  const navigate = useNavigate();
  let req: any;
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
  

  //pagination handling rows of datagrid
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(event.target.value);
    setpagesizevalue(event.target.value);
    setSelectedValue(event.target.value);
    setCurrentPage(1);
    lenderList(event.target.value, 1, sortField, sortOrder);
  };
//defining columns of datagrid
  const columns: GridColDef[] = [
    {
      field: 'lendingNo', headerName: '貸出No ', width: 70, headerAlign: "center",
      headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
    },
    {
      field: 'lendingDay', headerName: '貸出日 ',
      headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
      headerAlign: "center",width: 100
    },
    {
        field: 'dateReturn', headerName: '返却予定 ',
        headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
        headerAlign: "center",
        renderCell: (params) => {
          if (params?.row?.dateReturn) {
            return params?.row?.dateReturn
          }
          else{
            return null
          } // Return a fallback value if the array is undefined or doesn't have enough elements
  
  
        },
        width:100
      },
      {
        field: 'returnDate', headerName: '返却日  ',
        headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
        headerAlign: "center",
        renderCell: (params) => {
          if (params?.row?.returnDate) {
            return params?.row?.retunDate;
          }
          else{
            return null
          } // Return a fallback value if the array is undefined or doesn't have enough elements
  
  
        },
        width: 100
      },
      {
        field: 'memberNo', headerName: '登録 No ', width: 70, headerAlign: "center",
        headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
      },
    {
      field: 'name', headerName: '貸出者氏名', width: 130, headerAlign: "center",
      cellClassName: "gridcolumn-cells blacktxt", sortable: false,
      renderCell: (params) => {
        if(params?.row?.name){
          return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params?.row?.name}</div>
        }
        else{
          return null;
        }
      }, headerClassName: "headergridcell_blue1"
    },
    {
        field: 'prefecture', headerName: '都道府県', width: 70, headerAlign: "center",
        cellClassName: "gridcolumn-cells blacktxt", sortable: false,
        renderCell: (params) => {
        
            if (params?.row?.state) {
                const prefecture = pref.find((pref:any) => pref.id === params.row?.state);
                return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{prefecture?.name}</div>
                //<div className='wordprewrap'>{params.value}</div>;
            
        }
          else{
            return null
          } // Return a fallback value if the array is undefined or doesn't have enough elements
  
        }, headerClassName: "headergridcell_blue1"
      },
    {
      field: 'muncipality', headerName: '市町村', width:150, headerAlign: "center",
      headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
      renderCell: (params) => (
      
          <Tooltip title={params?.row?.address1}>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {params?.row?.address1}
          </div>
        </Tooltip>
        
    

      ),
    },
    {
        field: 'email', headerName: 'E-mail', flex: 1, headerAlign: "center",align:'center',
        headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
        renderCell: (params) => (
            <Tooltip title={params?.row?.email}>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {params?.row?.email}
            </div>
          </Tooltip>
        ),
      },
    {
      field: 'dateRegistered', headerName: '登録日', width: 100, headerAlign: "center",
      headerClassName: "headergridcell_blue1", cellClassName: "gridcolumn-cells blacktxt", sortable: false,
      renderCell: (params) => {
        if (params?.row?.dateRegistered) {
          return params?.row?.dateRegistered
        }
        else{
          return null
        } // Return a fallback value if the array is undefined or doesn't have enough elements


      },
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
         
          navigate('/editlender', { state: { data: params?.row?.member } });
        };

        return (

          <Button onClick={handleEditButtonClick}>
         <img src={editbutton} alt='editbutton'/>
          </Button>

        );
      },
    },
   
  ];
  //handling sort function
  const handleSortClick = (field: any, sortOrder: any) => {
    setSortField(field);
    setSortOrder(sortOrder)
    lenderList(selectedValue ? selectedValue : 10, currentPage ? currentPage : 1, field, sortOrder)
  }
  
 
  //jsondata for pagination
  const jsonData = [
    { value: '10', label: '10' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
    { value: '75', label: '75' },
    { value: '100', label: '100' },
];
  const [pagesizevalue, setpagesizevalue] = useState<any>(10);
  const [sortField, setSortField] = useState()
  const [sortOrder, setSortOrder] = useState()
  //getting data from redux store
  const dispatch = useDispatch();
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.lender_list
  });
  const gridRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState<any>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  //stylling alternative rows of datagrid
  const getRowClassName = (params: any) => {
    return params.indexRelativeToCurrentPage % 2 === 0
      ? "mbr-list-bg1" : "mbr-list-bg1";
  };
  useEffect(() => {
    lenderList(10, 1, "", "");

  }, []);
//calling list api to load datagrid
  const lenderList = async (pagesize: any, pageNumber: number = 1, sortField: any, sortOrder: any) => {
    setIsLoading(false);
   // pageNumber -= 1;
    try {
      req = {
        pageNumber: pageNumber,
        pageSize: pagesize,
        sortField:sortField?sortField: "lendingDay",
        sortDirection:sortOrder?sortOrder: "DESC"
      
      };
      
      dispatch(fetchData("lender_list", "library/books/lenderlist", req));
      setIsLoading(true);
      if (!data || !Array.isArray(data)) {
        return null;
      } else if (!data) {
      }
    } catch (error) {
      setIsLoading(true);
      console.error("Error fetching users:", error);
    }
  };
  //pagination
  const getPageInfo = (data: any) => {
    let page: any = currentPage ? currentPage : 1;
    let offset: any = (page - 1) * selectedValue + 1;
    let count: any = page * selectedValue;
    let totalRows: any = data && data["count"] ? data["count"] : 0;

    let totalPages: number = Math.ceil(totalRows / selectedValue);
    if (count > totalRows) {
      count = totalRows;
    }
    // if(offset>count){
    //   goToPage(currentPage - 1);
    // }
    return (
      <>
        <span className="padding">
          <span className="black">{data?.count + "件中"}</span>
          <span className="black">
            {offset}〜{count}件{" "}
          </span>
          {page > 1 && (
            <img
              onClick={() => {
                goToPage(currentPage - 1);
              }}
              src={arrowBack}
            ></img>
          )}
          {totalPages > page && (
            <img
              onClick={() => {
                goToPage(currentPage + 1);
              }}
              src={arrowForward}
            ></img>
          )}
        </span>
      </>
    );
  };
  //handling pagination
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    lenderList(selectedValue, pageNumber, sortField, sortOrder);
  };
 
//customising header style
  const CustomHeader = (column: any) => {
    return (
    <Grid>
      <Grid container className='text_grid'>
        <span>{column.column.colDef.headerName}</span>
        {column.column.field != "name"&&column.column.field != "edit" && column.column.field !="dateRegistered" &&column.column.field !="prefecture"  &&column.column.field !="email" && column.column.field!="muncipality"&& column.column.field!="memberNo" ?
          <div className='sorticonarrow'>
            <img src={uparrow} className='sortarrow'  onClick={() => { handleSortClick(column.column.field, "ASC") }} />
            <img src={downarrow} className='sortarrow' onClick={() => { handleSortClick(column.column.field, "DESC") }} />
          </div>
          : null}
      </Grid>
    </Grid>
    );
  }
  //to get unique id for each row
  const getRowId = (row: any) => {
    if (row.lendingNo) {
      return row.lendingNo;
    }
    // Return a fallback value if the property is not available
    return '';
  };
  return (
    <Box >

      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanLibrary/>
        </Grid>
        <Grid item xs={9} ref={gridRef}>
          <Grid className="content-row">
            <Grid className="p2red_bg_left "></Grid>
            <Grid className="p2red_bg_midle">
              <Grid className="top-header">
                <span className="verdana_big">B-3.貸出者一覧</span>
                <span className="verdana_big">図書室管理</span>
              </Grid>
            </Grid>
            <Grid className="p2red_bg_right"></Grid>
          </Grid>
          <Grid className='hr' />
          <Grid container item xs={12} display={'flex'} alignItems={'flex-end'} flexDirection={'column'}>
           
            <Grid>
              <span className='black'>B-5</span>
            </Grid>

          </Grid>
          <Grid className='hr' />
          
            <Grid>
              <Grid xs={12}>
                <DataGrid
                 
              
                  columns={columns.map((col) => ({
                    ...col,
                    renderHeader: (params: any) => <CustomHeader column={params} />,
                  }))}
                  rows={data?.data?.list ?? []}
                  components={{
                    NoRowsOverlay: () => (
                      <div className="row_table_list_c1 registration_lending_return_no_row">
                      "結果はありません。"
                      </div>
                    ),
                  }}
                  getRowId={getRowId}
                  getRowClassName={getRowClassName}
                  getRowHeight={() => "auto"}
                  disableColumnMenu={true}
                  autoHeight
                  hideFooter
                  hideFooterSelectedRowCount
                  rowHeight={36} 
                  columnHeaderHeight={36}
                  localeText={{ noRowsLabel: "結果はありません。" }}
                />
              </Grid>
              <Grid className='hr'></Grid>
              <Grid className="content-row">
                <Grid className="p6red_bg_left size"></Grid>
                <Grid xs={12} container className="p6red_bg_midle">
                  <Grid xs={8} className="black"></Grid>
                  <Grid xs={2} className="black content-row">
                    <Grid
                      container
                      flexDirection={"row"}
                      justifyContent={"center"}
                      alignSelf={"center"}
                      // padding={1}
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
                      
                    </Grid>
                   
                  </Grid>
                  <Grid>{data?.data && getPageInfo(data)}</Grid>
                </Grid>
                <Grid className="p6red_bg_right size"></Grid>
              </Grid>
            </Grid>
            
        </Grid>

      </Grid>


    </Box>
  );
};

export default LenderList;
