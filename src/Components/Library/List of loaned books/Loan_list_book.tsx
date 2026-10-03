import React, { useEffect, useRef, useState} from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import '../../../assets/css/health.css';
import { Box, Button, Grid} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../Redux/actions';
import { useLocation } from 'react-router-dom';
import uparrow from '../../../assets/images/6th_arrow_top.gif'
import downarrow from '../../../assets/images/6th_arrow_bottom.gif'
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../API/API-client';
import Tooltip from '@mui/material/Tooltip';
import editbutton from '../../../assets/admin_library/images/lib_browse.png';
import '../Common/library.scss';
import LeftPanLibrary from '../Common/LeftPanLibrary';
import { formatDateArray } from '../../Common/Date_conversion';
import editButton from '../../../assets/images/lib_browse_s.png'
import LibraryHeader from '../Common/LibraryHeader';
import arrowBack from '../../../assets/images/6th_btn_previous.gif';
import arrowForward from '../../../assets/images/6th_btn_next.gif';

export function SortedAscendingIcon() {
    return <span style={{color:'white'}}>▲</span>;
  }
  export function SortedDescendingIcon() {
    return <img src={downarrow} width="10" height="10" />;
  }
const Loan_list_book = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    //useSelector to get redux stored value using it's id
    const data = useSelector((state: any) => {
        return state?.reducer1.data?.loan_book_list
    });

    const jsonData = [
        { value: '10', label: '10' },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
        { value: '75', label: '75' },
        { value: '100', label: '100' },
    ];
    const [selectedValue, setSelectedValue] = useState<any>(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState()
    const [sortOrder, setSortOrder] = useState()
    const [rowsPerPage, setRowsPerPage] = useState<any>(10);
    const [pagesizevalue, setpagesizevalue] = useState<any>(10);

    useEffect(()=>{
      
fetchLoanBookList(10,1,'','');

    },[]);

    //defined all the columns defined and it's cell values are setting here 
    const columns: GridColDef[] = [
   
        {
            field:'lendingNo', headerName: '貸出No ', width: 80, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params: any) => {
                if (params.row?.lendingNo) {
                    return <label className='black'>{params.row?.lendingNo}</label>;
                }

                return null;
            },

        },
        {
            field: 'lendingDay', headerName: '貸出日 ', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params: any) => {
                if (params.row?.lendingDay) {
                    return <label className='black'>{params.row?.lendingDay&&formatDateArray(params.row?.lendingDay)}</label>;
                }

                return null;
            },
        },
        {
            field: 'dateReturn', headerName: '返却予定', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params: any) => {
                if (params.row?.dateReturn) {
                   return <label className='black'>{params.row?.dateReturn&&formatDateArray(params.row?.dateReturn)}</label>;                    
                }
                return null;
            },
        },
        {
            field: 'returnDate', headerName: '返却日 ', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params: any) => {
                return <label>{params.row.returnDate&&formatDateArray(params?.row?.returnDate)}</label> 
            },
        },
        {
            field: 'bookNo', headerName: '連番', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params: any) => {
                if (params.row?.book) {
                    return <div className='black' style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.book.bookNo}</div>
                }

                return null;
            },
        },
        {
            field: 'ISBN', headerName: 'ISBN',flex:1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params: any) => {
                if (params.row?.book) {
                    return <div className='black' style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.book.isbnCode}</div>
                }

                return null;
            },
        },
        {
            field: 'title', headerName: 'タイトル', width:200, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params: any) => {
                if (params.row?.book) {
                    return <div className='black' style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.book.title}</div>
                }
                return null;
            },
        },
        {
            field: 'RegistrationNo', headerName: '登録 No', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params) => {
                if (params.row?.memberLibrary) {
               return <label className='black'>{params.row?.memberLibrary?.memberNo}</label> ;
                } else
                    return null

            },
        },
        {
            field: 'Lender name', headerName: '貸出者氏名', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params) => {
                if (params.row?.memberLibrary) {
                    const formattedName = `${params.row.memberLibrary.nameLast}${' '}${params.row.memberLibrary.nameFirst}`
                    return (
                       <label className='black'>{formattedName}</label> 
                    );
                } else
                    return null

            },
        },
        {
            field: 'edit', headerName: '編集', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params) => {
                const handleEditButtonClick = () => {
                  //edit screen of book loan date
                    navigate('/editloancontents', { state: { data: params.row } });
                  };
                  return (
                    <Button >
                   <img src={editButton} alt='editbutton' onClick={handleEditButtonClick}/>
                    </Button>
                  );  
            },
        },
    ];
    //table cell styles
    const getRowClassName = (params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0
            ? "row_table_list_c1"
            : "row_table_list_c1";
    };
    //fetching loan book list api
    const fetchLoanBookList = async (pagesize: any, pageNumber: number = 1, sortField: any, sortOrder: any) => {
        try {
            const req = {
                pageNumber: pageNumber,
                pageSize: pagesize,
                ...(sortField && { sortField: sortField }),
                ...(sortOrder && { sortDirection: sortOrder }),

            };
            //save the response in the redux state and call api also here 
            dispatch(fetchData("loan_book_list", "/library/books/listLendingBooks", req));

            if (!data || !Array.isArray(data)) {
                return null;
            } else if (!data) {
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    //sorting is handle here with respect to field name,sorting order
    const handleSortClick = (field: any, sortOrder: any) => {
        setSortField(field);
        setSortOrder(sortOrder)
        fetchLoanBookList(selectedValue ? selectedValue : 10, currentPage ? currentPage : 1, field, sortOrder)
    }
    //custom header used to display sorting icon
    const CustomHeader = (column: any) => {
        return (<Grid>
            <Grid container xs={12} display={"flex"} flexDirection={"row"}>
                <span>{column.column.colDef.headerName}</span>
                {column.column.field === "lendingNo" || column.column.field === "lendingDay"||column.column.field==='dateReturn'||column.column.field==='returnDate' ?
                    <div>
                        <a onClick={()=>{ handleSortClick(column.column.field, "ASC") }} >▲</a>
                        <a onClick={()=>{handleSortClick(column.column.field, "DESC")}}>▼</a>
                        {/* <img src={uparrow} onClick={() => { handleSortClick(column.column.field, "ASC") }} /> */}
                         {/* <img src={downarrow} onClick={() => { handleSortClick(column.column.field, "DESC") }} /> */}
                    </div>
                    : null}
            </Grid>
        </Grid>
        );
    }

    //to setup row length in the list
    const handleChangeRowsPerPage = (
        // event: React.ChangeEvent<HTMLInputElement>
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setRowsPerPage(event.target.value);
        setpagesizevalue(event.target.value);
        setSelectedValue(event.target.value);
        setCurrentPage(1);
        fetchLoanBookList(event.target.value, 1, sortField, sortOrder);
    };
    const getPageInfo = (data: any) => {
      let page: any = currentPage ? currentPage : 1;
      let offset: any = (page - 1) * selectedValue + 1;
      let count: any = page * selectedValue;
      let totalRows: any = data && data["count"] ? data["count"] : 0;
  
      let totalPages: number = Math.ceil(totalRows / selectedValue);
      if (count > totalRows) {
        count = totalRows;
      }
      if(offset>count){
        goToPage(currentPage - 1);
      }
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
    const goToPage = (pageNumber: number) => {
      setCurrentPage(pageNumber);
      fetchLoanBookList(selectedValue, pageNumber, sortField, sortOrder);
    };
  return (
    <div>
        <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanLibrary/>
        </Grid>
        <Grid item xs={9} >
         <LibraryHeader
         label1='B-5.'
         label2='貸出書籍一覧'
         label3='図書室管理'
         />
          <Grid className='hr' />
          <Grid container item xs={12} display={'flex'} alignItems={'flex-end'} flexDirection={'column'}>
           
            <Grid>
              <span className='black'>B-11</span>
            </Grid>

          </Grid>
          <Grid className='hr' />
            <Grid>
              <Grid xs={12}>
                <DataGrid
                localeText={{ noRowsLabel:" 結果はありません" }}
                components={{
                  NoRowsOverlay: () => (
                    <div className="row_table_list_c1 registration_lending_return_no_row">
                      結果はありません
                    </div>
                  ),
                }}
                  sx={{
                    '.MuiDataGrid-iconButtonContainer': {
                      visibility: 'visible',
                    },
                    '.MuiDataGrid-sortIcon': {
                      opacity: 'inherit !important',
                    },
                  }}
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
                  getRowHeight={() => 'auto'}
                />
              </Grid>
              <Grid className='hr'></Grid>
              <Grid className="content-row">
                <Grid className="blue_bg_left size"></Grid>
                <Grid xs={12} container className="blue_bg_midle size">
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
                  <Grid>  {data?.data && getPageInfo(data)}</Grid>
                  {/* <Grid> <Grid >{data?.data && getPageInfo(data)}</Grid></Grid> */}
                </Grid>
                <Grid className="blue_bg_right size"></Grid>
              </Grid>
            </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Loan_list_book