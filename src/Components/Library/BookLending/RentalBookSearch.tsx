import React, { useState, useEffect } from 'react';
import '../../../assets/css/health.css';
import { Button, Grid } from '@mui/material';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
// import LeftPanBBS from '../../Common/LeftPanBBS';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import "../../../assets/css/health.css";
import LibraryHeader from '../Common/LibraryHeader';
import '../Common/library.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../Redux/actions';
import searchbtn from '../../../assets/images/lib_search.gif'
import submitbtn from '../../../assets/images/lib_browse.gif'
import resetbtn from '../../../assets/admin_library/images/lib_reset.png'
import LeftPanLibrary from '../Common/LeftPanLibrary';
import LibraryapiClient from '../../../API/LibraryAPI-client';
import pref from '../Common/pref';
import arrowForward from "../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
const RentalBookSearch = () => {
    let rowdata: any;
    let countvalue:any;
    const navigate = useNavigate();
    const { register, handleSubmit, control, formState: { errors }, reset, setValue } = useForm();
    const dispatch = useDispatch();

    //the useSelector hook to extract the book_searchlist data from the Redux state
    const bookdata = useSelector((state: any) => {
        return state?.reducer1.data?.book_searchlist
    });
    const [bookData,setBookData]=useState<any>([])
    const [selectedIds, setSelectedIds] = useState<any[]>([]);
    const[selectedValue,setSelectedValue]=useState<any>(10)
    const [formData,setFormData]=useState<any>()
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const [isLoaded, setIsLoaded] = useState(false);
    const pagesizeOption = [
        { value: '10', label: '10' },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
        { value: '75', label: '75' },
        { value: '100', label: '100' },
    ];
    if (location && location.state) {
        rowdata = location.state.data
    }
    useEffect(() => {
    }, []);

    //reset the form field
    const resetField = () => {
        reset();
    }

    //column definition for datagrid
    const columns: GridColDef[] = [

        {
            field: 'name', headerName: '貸出者氏名', width: 80, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params: any) => {
                if (params.row?.nameFirst || params.row?.nameLast) {
                    const name = `${params.row?.nameLast} ${params.row?.nameFirst}`;
                    return name
                }

                return null;
            },

        },
        {
            field: 'phonetic', headerName: 'ふりがな', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params: any) => {
                if (params.row?.phonetic1 || params.row?.phonetic2) {
                    const phonetic = `${params.row?.phonetic1} ${params.row?.phonetic2}`;
                    return phonetic
                }

                return null;
            },
        },
        {
            field: 'prefecture', headerName: '都道府県', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params:any) => {
                if (params.row?.state) {
                    if (params.row?.state) {
                        const prefecture = pref.find((pref:any) => pref.id === params.row?.state);
                        return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{prefecture?.name}</div>
                        //<div className='wordprewrap'>{params.value}</div>;
                    }
                }
               
                return null;
            },
        },
        {
            field: 'address', headerName: '市町村', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params: any) => {
                if (params.row?.address1) {
                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.address1}</div>
                }

                return null;
            },
        },
        {
            field: 'email', headerName: 'E-mail', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params: any) => {
                if (params.row?.email) {
                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.email}</div>
                }

                return null;
            },
        },
        {
            field: 'phonenumber', headerName: '電話番号', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params) => {
                if (params.row?.phone) {
                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.phone}</div>
                }

                return null;
            },
        },

    ];

    //column definition for datagrid
    const columns2: GridColDef[] = [
        {
           field: 'checkbox', headerName: ' ', flex: 1, headerAlign: "center",
           headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
           cellClassName: "gridcolumn-cells blacktxt", sortable: false, align: 'center',
           renderHeader: () => (
                <input
                    type="checkbox"
                   name="checkboxall"
                    checked={selectedIds?.length==bookdata?.data?.length}
                    onChange={(e) => { handleCheckboxAllChange(e) }}
                />
            ),
            renderCell: (params) => (
                <input
                    type="checkbox"
                    name="checkboxsingle"
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
            field: 'isbnCode', headerName: 'ISBN', flex: 1, headerAlign: "center",
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

    ];

    //styling for alernative datagrid row
    const getRowClassName = (params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0
            ? "book-list-bg1"
            : "book-list-bg2";
    };

    //handling indivindual checkboxe
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: any) => {
        const isChecked = event.target.checked;
        setSelectedIds((prevIds) => {
            // if is checked select box which will store the state that id
            if (isChecked) {
                return [...prevIds, id];
            } else {
                //when unselected already selected checkbox unselect using filter
                return prevIds.filter((selectedId) => selectedId !== id);
            }
        });
    };
   
    //handling all checkbox change 
    const handleCheckboxAllChange = (e: any) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            const allIds = bookdata?.data.map((row: any) => row.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }

    }

    //handle form submit action
    const onSubmit = (data: any) => {
       countvalue=1;
        fetchBookList(10,1,data)
        setFormData(data)
    }

    //handling submit action
    const handleSubmitButtonClick = () => {

        if (!selectedIds || selectedIds?.length == 0) {
            alert("本を選択し、チェックボックスにチェックをいれてください。")
            return
        } else {
            SaveLending(selectedIds)
           
        }
    }

    //save lending book 
    const SaveLending = async (selectedId:any) => {
        try {
            const req={
                "bookIdsArr":selectedId,
                "member": rowdata.id
            }
           
            const apiData = await LibraryapiClient.post("library/books/savelending", req, {});
            if (apiData) {
                navigate('/editloancontents', { state: { data: {memberLibrary:rowdata},isBookList:true} });
            }
        } catch (error) {
            console.error("Error fetching users:", error);
         
        }
    }

    //reset the checkbox field
    const resetCheckboxField = () => {
       
        setSelectedIds([])
        setValue("checkboxall", false);
    }

    //get the nonlended book list
    const fetchBookList = async (pagesize:any,pageNumber: number = 1,formdata: any) => {
        pageNumber -= 1;
        
        try {

            const req = {
                    pageSize:pagesize,
                    pageNumber: pageNumber,
                    isLended:0,
                ...(formdata.bookno && { bookNo: formdata.bookno }),
                ...(formdata.isbn_code && { isbnCode: formdata.isbn_code }),
            }

            dispatch(fetchData("book_searchlist", "library/books/lendedBooksSearch", req));
            setIsLoaded(true)
            setSelectedValue(pagesize)
            if(countvalue==1){
                setCurrentPage(1);
              }
            if (!bookdata || !Array.isArray(bookdata)) {
                return null;
             } else if (!bookdata) {
            }
        } catch (error) {
            setIsLoaded(true)
            console.error("Error fetching users:", error);
        }
    };

    //handle the pagesize selected by the user
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
        setCurrentPage(1);
        countvalue=1;
        fetchBookList(event.target.value,1,formData);
        
    };

    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        fetchBookList(selectedValue, pageNumber,formData);
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
                <DataGrid
                    columns={columns}
                    rows={location.state.data ? [location.state.data] : []}
                    getRowClassName={getRowClassName}
                    autoHeight
                    disableColumnMenu={true}
                    hideFooter
                    hideFooterSelectedRowCount
                    columnHeaderHeight={30}
                    getRowHeight={() => "auto"}
                />

                <Grid className="hr"></Grid>
                <Grid className="hr"></Grid>
                <Grid item xs={12}>
                    <Grid className="hr"></Grid>
                    <Grid className="hr"></Grid>
                    <form name="booksearch" id="form" onSubmit={handleSubmit(onSubmit)}>
                        <Grid container className="table_seven" padding={3}>
                            <Grid><span className='black'>
                                ★連番またはISBNコードを入力して、貸出書籍を検索して下さい。複数册ある場合は、改行コードを入力して検索して下さい。
                            </span>
                            </Grid>
                            <Grid xs={12} container className=" content-row padding_top">

                                <Grid className="black">● 連番 </Grid>
                                <Grid > <input type="text"
                                    {...register('bookno')} className="bdr_text3"></input>
                                </Grid>


                                <Grid className="black"> ● ISBN </Grid>
                                <Grid > <input type="text"
                                    {...register('isbn_code')} className="bdr_text3"></input>
                                </Grid>
                                <Grid justifyContent={'center'}></Grid>
                                <Button type="submit">
                                    <img src={searchbtn} />
                                </Button>
                                <Button type="reset">
                                    <img src={resetbtn} onClick={() => resetField} />
                                </Button>
                            </Grid>

                            <DataGrid
                               columns={columns2}
                                rows={bookdata?.data ? bookdata?.data : []}
                                getRowClassName={getRowClassName}
                                autoHeight
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
                        <Grid className='hr'></Grid>
                        <Grid className='hr'></Grid>
                        {bookdata?.data?.length>0&&
                        <Grid item xs={12}>
                        <Grid className="content-row">
                        <Grid className="p6red_bg_left size"></Grid>
                        <Grid xs={12} container className="p6red_bg_midle">
                        <Grid xs={4} className="black"></Grid>
                        <Grid xs={4} className="black">
                            <Grid
                                container
                                flexDirection={"row"}
                                justifyContent={"flex-end"}
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
                        {isLoaded && getPageInfo(bookdata)}
                        </Grid>
                        </Grid>
                        </Grid>
                    
                        </Grid>
                        }
                        </Grid>
                    </form>

                    {bookdata?.data?.length>0?
                        <Grid display={'flex'} justifyContent={'center'}>
                            <Button type="submit">
                                <img src={submitbtn} onClick={() => handleSubmitButtonClick()} />
                            </Button>
                            <Button type="reset">
                                <img src={resetbtn} onClick={() => resetCheckboxField()} />
                            </Button>
                        </Grid> : <></>}
                </Grid>


            </Grid>
        </Grid >


    );
}

export default RentalBookSearch;
