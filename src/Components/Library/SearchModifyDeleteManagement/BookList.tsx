import React, { useState, useEffect } from 'react';
import '../../../assets/css/health.css';
import { Button, Grid } from '@mui/material';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import "../../../assets/css/health.css";
import LibraryHeader from '../Common/LibraryHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../Redux/actions';
import uparrow from '../../../assets/images/6th_arrow_top.gif'
import downarrow from '../../../assets/images/6th_arrow_bottom.gif'
import submitbtn from '../../../assets/images/lib_browse.gif'
import resetbtn from '../../../assets/images/lib_reset.gif'
import LeftPanLibrary from '../Common/LeftPanLibrary';
import { formatDateArray } from '../../Common/Date_conversion';
import '../Common/library.scss'
import arrowForward from "../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
import { setMemberReg } from "../../../Redux/actions";
const BookList = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch();

    //the useSelector hook to extract the book_list data from the Redux state
    const data = useSelector((state: any) => {
        return state?.reducer1.data?.book_list
    });
    const [selectedIds, setSelectedIds] = useState<any>([]);
    const location = useLocation();
    const pagesizeOption = [
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
    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
        fetchBookList(10, 1, "", "");
        dispatch(setMemberReg("bookIdlist", []));
    }, []);

    //handle submit action
    const handleSubmitClick = async () => {
        
        if (!selectedIds||selectedIds?.length==0) {
            alert("本を選択し、チェックボックスにチェックをいれてください。")
            return
        } else {
            dispatch(setMemberReg("bookIdlist", selectedIds));
            navigate('/bookview');
        }

    }
    
    //reset the selected checkbox
    const resetField = () => {
        setSelectedIds([])
        reset();
    }

    //column definition for datagrid
    const columns: GridColDef[] = [
        {
            field: 'checkbox', headerName: ' ', width: 50, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false, align: 'center',
            renderCell: (params) => (
                <input
                    type="checkbox"
                    checked={selectedIds?.includes(params.row.id)}
                    value={params.row.id}
                    onChange={(e) => {
                        handleCheckboxChange(e, params.row.id);
                        // Handle individual row selection here
                    }}
                />
            ),
        },
        {
            field: 'bookNo', headerName: '連番', width: 80, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params: any) => {
                if (params.row?.bookNo) {
                    return params.row?.bookNo;
                }

                return null;
            },

        },
        {
            field: 'ISBNs', headerName: 'ISBN', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params: any) => {
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
            renderCell: (params: any) => {
                if (params.row?.title) {
                    if (params.row?.title) {
                        return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.title}</div>
                        //<div className='wordprewrap'>{params.value}</div>;
                    }
                }

                return null;
            },
        },
        {
            field: 'tilework', headerName: '著作名', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params: any) => {
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
            renderCell: (params: any) => {
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
            renderCell: (params: any) => {
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
            renderCell: (params: any) => {
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
                } else
                    return null

            },
        },
    ];

    //style for alternative datagrid row
    const getRowClassName = (params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0
            ? "book-list-bg1"
            : "book-list-bg2";
    };

    //to get list of books
    const fetchBookList = async (pagesize: any, pageNumber: number = 1, sortField: any, sortOrder: any) => {
        pageNumber -= 1;
        try {
            const req = {
                pageNumber: pageNumber,
                pageSize: pagesize,
                ...(sortField && { sortField: sortField }),
                ...(sortOrder && { sortDirection: sortOrder }),

            };
            dispatch(fetchData("book_list", "library/books/booksSearch", req));
            setIsLoaded(true)
            if (!data || !Array.isArray(data)) {
                return null;
            } else if (!data) {
            }
        } catch (error) {
            setIsLoaded(true)
            console.error("Error", error);
        }
    };

    //handle sort action based on selected sortfield
    const handleSortClick = (field: any, sortOrder: any) => {
        setSortField(field);
        setSortOrder(sortOrder)
        fetchBookList(selectedValue ? selectedValue : 10, currentPage ? currentPage : 1, field, sortOrder)
    }

    //customize the header with sort arrow for specific column field
    const CustomHeader = (column: any) => {
        return (<Grid>
            <Grid container xs={12} display={"flex"} flexDirection={"row"}>
                <span>{column.column.colDef.headerName}</span>
                {column.column.field === "dateRegistered" || column.column.field === "bookNo" ?
                    <div>
                        <img src={uparrow} className='cursor_pointer' onClick={() => { handleSortClick(column.column.field, "ASC") }} />
                        <img src={downarrow}  className='cursor_pointer' onClick={() => { handleSortClick(column.column.field, "DESC") }} />
                    </div>
                    : null}
            </Grid>
        </Grid>
        );
    }
    //handling indivindual checkboxe
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: any) => {
        const isChecked = event.target.checked;
        setSelectedIds((prevIds:any) => {
            // if is checked select box which will store the state that id
            if (isChecked) {
                return [...prevIds, id];
            } else {
                //when unselected already selected checkbox unselect using filter
                return prevIds.filter((selectedIds:any) => selectedIds !== id);
            }
        });
    };

    //handle pagesize value
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(event.target.value);
        setpagesizevalue(event.target.value);
        setSelectedValue(event.target.value);
        setCurrentPage(1);
        fetchBookList(event.target.value, 1, sortField, sortOrder);
    };

    //got to page based on  pagesize and pagenumber
    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        fetchBookList(selectedValue, pageNumber, sortField, sortOrder);
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
        <Grid container xs={12} padding={1} spacing={1}>
            <Grid item xs={3} spacing={2}>
                <LeftPanLibrary />
            </Grid>
            <Grid item xs={9}>
                <LibraryHeader
                    label1="A"
                    label2="検索・修正・削除・閲覧"
                    label3="図書室管理"
                />

                <Grid className="hr"></Grid>
                <Grid className="hr"></Grid>
                <Grid className="hr"></Grid>
                {isLoaded &&
                <Grid>
                <DataGrid
                    columns={columns.map((col) => ({
                        ...col,
                        renderHeader: (params: any) => <CustomHeader column={params} />,
                    }))}
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
                    components={{
                        NoRowsOverlay: () => (
                          <div className="row_table_list_c1 registration_lending_return_no_row">
                            結果はありません。
                          </div>
                        ),
                      }}
                />

                <Grid className="hr"></Grid>
                <Grid className="hr"></Grid>
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
                
                <Grid display={'flex'} justifyContent={'center'}>
                            <Button type="submit">
                                <img src={submitbtn} onClick={() => handleSubmitClick()}/>
                            </Button>
                            <Button type="reset">
                                <img src={resetbtn} onClick={() => resetField()} />
                            </Button>
                        </Grid> 
            </Grid>}
        </Grid >
        </Grid>

    );
}

export default BookList;
