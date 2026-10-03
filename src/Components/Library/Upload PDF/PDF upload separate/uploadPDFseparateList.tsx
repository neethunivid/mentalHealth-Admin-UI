import {Grid} from '@mui/material';
import React, { useState, useEffect } from 'react';
import LeftPanLibrary from '../../Common/LeftPanLibrary';
import LibraryHeader from '../../Common/LibraryHeader';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {fetchData} from '../../../../Redux/actions';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDateArray } from '../../../Common/Date_conversion';
import { useLocation } from 'react-router-dom';
import arrowForward from "../../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../../assets/images/6th_btn_previous.gif";

const BookSearchUploadSeparateList=() => {
    let searchrequest:any
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //the useSelector hook to extract the book_searchlist data from the Redux state
    const data = useSelector((state: any) => {
        return state?.reducer1.data?.book_searchlist
    });
    
    const [selectedBooks, setSelectedIds] = useState<any>([]);
    const pagesizeOption = [
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

    const location = useLocation();
    if (location && location.state) {
        searchrequest = location.state.data
    }
    useEffect(() => {
        fetchBooklist(10, 1);

    }, []);

    //handle the input submitted by user
    const onSubmit = async (data: any) => {
        if (!selectedBooks||selectedBooks?.length==0) {
            alert("本を選択し、チェックボックスにチェックをいれてください。")
            return
        } else {
            navigate('/G2uploadseparate', { state: { data: selectedBooks } });
        }
        
    }
    //datagrid column defintition
    const columns: GridColDef[] = [
        {
            field: 'checkbox', headerName: ' ', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false, align: 'center',
            renderCell: (params) => (
                <input
                    type="checkbox"
                    checked={params.row.selected}
                    value={params.row.bookNo}
                    onChange={(e) => {
                        handleCheckboxChange(e)
                        // Handle individual row selection here
                    }}
                />
            ),
        },
        {
            field: 'bookNo', headerName: '連番', width:80, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params:any) => {
                if (params.row?.bookNo) {
                  return params.row?.bookNo;
                }
          
                return null;
            },

        },
        {
            field: 'isbnCode', headerName: 'ISBN', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params:any) => {
                if (params.row?.isbnCode) {
                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.isbnCode}</div>
                }
                
                return null;
            },
        },
        {
            field: 'title', headerName: 'タイトル', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params:any) => {
                if (params.row?.title) {
                    if (params.row?.title) {
                        return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.title}</div>
                       
                    }
                }
               
                return null;
            },
        },
        {
            field: 'tilework', headerName: '著作名', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params:any) => {
                if (params.row?.author) {
                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.author}</div>
                }
          
                return null;
            },
        },
        {
            field: 'editing', headerName: '編集・監修', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params:any) => {
                if (params.row?.editSupervision) {
                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.editSupervision}</div>
                }
                
                return null;
            },
        },
        {
            field: 'listprice', headerName: '定価', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params:any) => {
                if (params.row?.price) {
                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.price}</div>
                }
               
                return null;
            },
        },
        {
            field: 'agency', headerName: '発売元', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params:any) => {
                if (params.row?.publisher) {
                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.publisher}</div>
                }
                return null;
            },
        },
        {
            field: 'dateRegistered', headerName: '追加日', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params) => {
                if (params.row?.dateRegistered) {
                    const formattedDate = formatDateArray(params.row?.dateRegistered);
                    return (
                        formattedDate
                    );
                }else
                return null

            },
        },
    ];

    //style for datagrid row
    const getRowClassName = (params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0
            ? "book-list-bg1"
            : "book-list-bg2";
    };

    //fetch booklist depending upon user input
    const fetchBooklist = async (pagesize: any, pageNumber: number = 1) => {
        pageNumber -= 1;
        try {
            const req = {
                pageNumber: pageNumber,
                pageSize: pagesize,
                ...(searchrequest.book_no && { bookNo: searchrequest.book_no }),
                ...(searchrequest.isbn_code && { isbnCode: searchrequest.isbn_code }),
                ...(searchrequest.author && { author: searchrequest.author }),
                ...(searchrequest.title && { title: searchrequest.title }),
                ...(searchrequest.edit_supervision && { editSupervision: searchrequest.edit_supervision }),
            };
            dispatch(fetchData("book_searchlist", "library/books/booksSearch", req));

            if (!data || !Array.isArray(data)) {
                return null;
            } else if (!data) {
            }
        } catch (error) {
            console.error("Error", error);
        }
    };
    
   //handle checkbox 
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.value;
          // Get the ID and checked status from the checkbox event
        const isChecked = event.target.checked;
         // Update the selected IDs based on the checkbox state
        setSelectedIds((prevIds: any) => {
            if (isChecked) {
                 // If the checkbox is checked, add the ID to the selected IDs array
                return [...prevIds, id];
            } else {
                 // If the checkbox is unchecked, remove the ID from the selected IDs array
                return prevIds.filter((selectedId: any) => selectedId !== id);
            }
        });
    };

    //handle the pagesize selected by the user
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(event.target.value);
        setpagesizevalue(event.target.value);
        setSelectedValue(event.target.value);
        setCurrentPage(1);
        fetchBooklist(event.target.value, 1);
    };

     //got to page based on  pagesize and pagenumber
     const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        fetchBooklist(selectedValue, pageNumber);
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
    return(
        <Grid container xs={12} padding={1} spacing={1}>
           <Grid item xs={3} spacing={2}>
              <LeftPanLibrary/>
           </Grid>
           <Grid item xs={9}>
            <LibraryHeader
              label1="G."
              label2="Upload PDF - Separate"
              label3="図書室管理"
            />
            <Grid className='hr'></Grid>
            <Grid className='hr'></Grid>
            <Grid className='hr'></Grid>
            <DataGrid
                    columns={columns}
                    rows={data?.data ?? []}
                    getRowClassName={getRowClassName}
                    autoHeight
                    rowCount={data?.data?.length ?? 0}
                    disableColumnMenu={true}
                    hideFooter
                    hideFooterSelectedRowCount
                    columnHeaderHeight={30}
                    getRowHeight={() => "auto"}
                    localeText={{ noRowsLabel: "結果はありません。" }}
                />
            <Grid className="hr"></Grid>
            <Grid className='hr'></Grid>
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
                                    defaultValue={pagesizeOption[0].label}
                                    {pagesizeOption.map((option) => (
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
                <Grid item xs={12} container display={'flex'} justifyContent={'center'}>
                <Grid item xs={4}>
                <input type="submit" name="Sub2" value="アップロード" onClick={onSubmit}/>
                </Grid>
                </Grid>
           </Grid>
        </Grid>
    );
}

export default BookSearchUploadSeparateList;