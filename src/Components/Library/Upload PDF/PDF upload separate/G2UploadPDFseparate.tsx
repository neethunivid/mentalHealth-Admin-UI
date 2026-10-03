import { Grid } from '@mui/material';
import LeftPanLibrary from '../../Common/LeftPanLibrary';
import LibraryHeader from '../../Common/LibraryHeader';
import { useForm, Controller } from "react-hook-form";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { fetchData } from '../../../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import prevButton from '../../../../assets/images/cssdyn/btn_back.gif';
import nxtButton from '../../../../assets/images/cssdyn/btn_next.gif';
import { useLocation, useNavigate } from 'react-router-dom';
import LibraryapiClient from '../../../../API/LibraryAPI-client';
import noimage from '../../../../assets/images/no_image.jpg'
import React, { useRef } from 'react';

const G1UploadPDF = () => {
    let bookNolist: any
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
    const onSubmit = async (data: any) => {

    }
    const [selectedFilesList, setSelectedFilesList] = useState<any>([]);
    const [dataIndex, setDataIndex] = useState<any>(0);
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const data = useSelector((state: any) => {
        return state?.reducer1.data?.book_list
    });
    const [isLoaded, setLoaded] = useState(false);
    const [bookdata, setBookData] = useState<any>([]);
    if (location && location.state) {
        bookNolist = location.state.data
    }
    const [selectedValue, setSelectedValue] = useState<any>(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState<any>(10);
    const [pagesizevalue, setpagesizevalue] = useState<any>(10);
    const [bookDataId,setBookDataId]=useState<any>()
    useEffect(() => {
        fetchBookData(bookNolist[0]);

    }, []);

    const [selectedFileNames, setSelectedFileNames] = useState({
        pdf1: "No file chosen",
        pdf2: "No file chosen",
        pdf3: "No file chosen",
    });

    const fileInputRef = useRef<any>(null);
    const fileInputRef2 = useRef<any>(null);
    const fileInputRef3 = useRef<any>(null);

    const columns: GridColDef[] = [
        {
            field: 'isbnCode', headerName: 'ISBN', headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false, flex: 1,
        },
        {
            field: 'bookNo', headerName: 'Book NO', headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false, flex: 1,
        },
        {
            field: 'name', headerName: 'PDF名', headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false, flex: 1,
        },
        {
            field: '編集', headerName: '編集', headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false, flex: 1, align: 'center',
            renderCell(params) {
                const handleEditClick = () => {
                    navigate('/G2editseparate',{state:{data:params.row.id,bookNolist:bookNolist ,documentname:params.row.name}});
                }
                return (<input type="submit" name="Sub1" value="編集" onClick={handleEditClick} />)
            },

        },
        {
            field: '.削除', headerName: '.削除', headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false, flex: 1, align: 'center',
            renderCell(params) {
                const handleDeleteClick = () => {
                    DeleteDocument(params?.row?.id)
                }
                return (<input type="submit" name="Sub2" value="削除" onClick={handleDeleteClick} />)
            },
        },
    ];
    const getRowClassName = (params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0
            ? "book-list-bg1"
            : "book-list-bg2";
    };
    const fetchBookDocumentDetails = async (bookId: any) => {

        try {
            const req = {
                bookId: [bookId]
            }
            dispatch(fetchData("book_list", "library/upload/bookDetails", req));

            if (!data || !Array.isArray(data)) {
                return null;
            } else if (!data) {
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchBookData = async (bookno: any) => {
        try {

            const dataRequest = {
                bookNo: bookno,
            }
            setLoaded(false)
            const apiData = await LibraryapiClient.post("library/books/booksSearch", dataRequest, {});
            if (apiData) {
                setBookData(apiData?.data?.data[0])
                fetchBookDocumentDetails(apiData.data?.data[0].id)
                setBookDataId(apiData?.data?.data[0].id)
                setLoaded(true)
            }
        } catch (error) {
            console.error("Error ", error);
            setLoaded(true)
        }
    };
   const DeleteDocument=async(id:any)=>{
    const confirmed = window.confirm('文書を削除しますか？');
    if (confirmed) {
        try {
       
        const apiData = await LibraryapiClient.delete(
          "library/upload/deleteDocument/"+id,
         {}
        );
        if (apiData) {
             window.location.reload()
        }
        } catch (error) {
        console.error("Error:",error);
        }
     }
    }
    const renderPageButtons = () => {
        const pageNumbers = [];
        const pageCount = 4; // Number of page numbers to display at a time
        const totalPageCount = bookNolist?.length;

        // Calculate the start and end page numbers based on the current page
        let startPage = currentPage - Math.floor(pageCount / 2);
        let endPage = startPage + pageCount - 1;

        // Adjust start and end page numbers to ensure they are within valid bounds
        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPageCount, pageCount);
        }
        else if (endPage > totalPageCount) {
            endPage = totalPageCount;
            startPage = Math.max(1, endPage - pageCount + 1);
        }

        // Add the page numbers to the array
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button key={i} className="pagination-button" style={{
                    textDecoration: currentPage === i ? "none" : "underline",
                }} onClick={() => handleClick(i)}>
                    {i}
                </button>
            );
        }


        return pageNumbers;
    };

    //navigate to previous book details
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
            setDataIndex(dataIndex - 1)

        }
        const bookno = bookNolist[dataIndex - 1];
        if (bookno) {
            fetchBookData(bookno);
        }
    };

    //navigate to next book details
    const nextPage = () => {
        if (currentPage < bookNolist?.length) {
            setCurrentPage((prevPage) => prevPage + 1);
            setDataIndex(currentPage)
        }
        const bookno = bookNolist[currentPage];
        if (bookno) {
            fetchBookData(bookno);

        }
    };

    //get book details on clicking the page number 
    const handleClick = (pageNo: any) => {
        setCurrentPage(pageNo);
        const bookId = bookNolist[pageNo - 1];
        if (bookId) {
            fetchBookData(bookId);

        }
    };
    const handleBackButton=()=>{
        navigate('/uploadPDFseparate')
    }

    // Handle file select event
    const handleFileSelect = (event: any, name: any) => {
        const file = event.target.files[0];
        if (!file) {
            return
        }

        // Check if the file extension is .pdf
        const allowedExtensions = ["pdf"];
        const extension = file.name.split(".").pop()?.toLowerCase();
        if (extension && allowedExtensions.includes(extension)) {
            const newSelectedFiles = [...selectedFilesList, file];
            setSelectedFilesList(newSelectedFiles);
            setSelectedFileNames({
                ...selectedFileNames,
                [name]: file.name,
            });

        } else {
            // Display an error message or perform any other validation logic
            alert("Invalid file format. Please choose pdf file format");
        }
    };

      //hadle submit button action
      const handleSubmitButtonClick = async()=>{
        if(selectedFilesList.length==0){
            alert("Please select the file")
        }
        else{
           UploadMultiplePDF()
        }
    }

    //upload multiple PDF 
    const UploadMultiplePDF=async()=>{
        try {            
            const formData = new FormData();
            for (const selectedFile of selectedFilesList) {
              // Append each file with a custom field name "pdfFiles"
              formData.append('pdfFiles', selectedFile, selectedFile.name);
            }
            const apiData = await LibraryapiClient.post(
                `library/upload/uploadPdf?bookId=${bookDataId}`,
                formData
              );
            if (apiData) {
                window.location.reload();
              }
           
          } catch (error) {
            console.error("Error:", error);
          }
     }
     // Handle click event for file input button
    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // If the file input ref is available, click it to open the file dialog
        if (fileInputRef.current) {
            fileInputRef.current.click();

        }
    }

    const handleButtonClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // If the file input ref is available, click it to open the file dialog
        if (fileInputRef2.current) {
            fileInputRef2.current.click();

        }
    }
    const handleButtonClick3 = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // If the file input ref is available, click it to open the file dialog
        if (fileInputRef3.current) {
            fileInputRef3.current.click();

        }
    }
    return (
        <Grid container xs={12} padding={1} spacing={1}>
            <Grid item xs={3} spacing={2}>
                <LeftPanLibrary />
            </Grid>
            <Grid item xs={9}>
                <LibraryHeader
                    label1="G-1."
                    label2="PDFをアップロード"
                    label3=""
                />
                <Grid className='hr'></Grid>
                <Grid className='hr'></Grid>
                <Grid className='hr'></Grid>
                {isLoaded &&
                <Grid container xs={12}>
                    <Grid container className="middle_table up" >
                        <Grid className='hr'></Grid>
                        <Grid className='hr'></Grid>
                       
                        <form name="booksearch" id="form" onSubmit={handleSubmit(onSubmit)}>
                            <Grid container xs={12}>
                                <Grid container xs={9} className="middle_table ">
                                    <Grid className="p6red_bg_midle1">
                                        <Grid className="top-header">
                                            <span className="verdana_big g2up">PDFをアップロード</span>
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={12} className='up1'>
                                    {bookdata?.image ? <img src={bookdata.image} width={165} height={200} alt="book_image" />:
                                    <img src={noimage} width={165} height={200} alt="book_image" />}
                                    </Grid>
                                    <Grid>
                                        <label className='titletextcolor'><b>{bookdata&&bookdata?.title}</b></label>
                                    </Grid>
                                    <Grid container xs={12} className='up1'>
                                        <label className='black_text'><b>{bookdata&&`ISBN:${bookdata?.isbnCode}`}</b></label>
                                    </Grid>
                                    <Grid container xs={12} className='up1'>
                                        <label className='black_text'><b>{bookdata&&`No:${bookdata?.bookNo}`}</b></label>
                                    </Grid>
                                    <hr className='horizontal-line' />
                                    <Grid container xs={12} className='up1'>
                                    <Grid item xs={3}>
                                        <label className='black'>PDF 1:</label>
                                    </Grid>
                                    <Grid item xs={9}>
                                    <label htmlFor="fileInput">
                                            <input
                                                hidden
                                                id="fileInput"
                                                type="file"
                                                onChange={(e) => handleFileSelect(e, "pdf1")}
                                                ref={fileInputRef}
                                            />
                                            <button onClick={handleButtonClick}>Choose a File</button>
                                        </label>
                                        {selectedFileNames.pdf1 ? (
                                            <span className="upload_mem_span">{selectedFileNames.pdf1}</span>
                                        ) : (
                                            <span className="upload_mem_span">No file Chosen</span>
                                        )}

                                    </Grid>
                                </Grid>
                                <Grid container xs={12} className='up1'>
                                    <Grid item xs={3}>
                                        <label className='black'>PDF 2:</label>
                                    </Grid>
                                    <Grid item xs={9}>
                                    <label htmlFor="fileInput">
                                            <input
                                                hidden
                                                id="fileInput"
                                                type="file"
                                                onChange={(e) => handleFileSelect(e, "pdf2")}
                                                ref={fileInputRef2}
                                            />
                                            <button onClick={handleButtonClick2}>Choose a File</button>
                                        </label>
                                        {selectedFileNames.pdf2 ? (
                                            <span className="upload_mem_span">{selectedFileNames.pdf2}</span>
                                        ) : (
                                            <span className="upload_mem_span">No file Chosen</span>
                                        )}

                                    </Grid>
                                </Grid>
                                <Grid container xs={12} className='up1'>
                                    <Grid item xs={3}>
                                        <label className='black'>PDF 3:</label>
                                    </Grid>
                                    <Grid item xs={9}>
                                    <label htmlFor="fileInput">
                                            <input
                                                hidden
                                                id="fileInput"
                                                type="file"
                                                onChange={(e) => handleFileSelect(e, "pdf3")}
                                                ref={fileInputRef3}
                                            />
                                            <button onClick={handleButtonClick3}>Choose a File</button>
                                        </label>
                                        {selectedFileNames.pdf3 ? (
                                            <span className="upload_mem_span">{selectedFileNames.pdf3}</span>
                                        ) : (
                                            <span className="upload_mem_span">No file Chosen</span>
                                        )}

                                    </Grid>
                                </Grid>
                                    <Grid container xs={12} className='up1'>
                                        <Grid item xs={3}>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <input type="button" name="sub" value="Upload" onClick={()=>handleSubmitButtonClick()}></input>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid container xs={12} flexDirection={"row"}>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={7} flexDirection={"row"}>
                                            <div>
                                              
                                                {renderPageButtons()}
                                                {currentPage !== 1 ?

                                                <button onClick={prevPage} style={{ border: 'none' }} disabled={currentPage === 1}>
                                                    <img src={prevButton} />
                                                </button> : null}
                                                {currentPage !== bookNolist?.length ?
                                                    <button onClick={nextPage} style={{ border: 'none' }} disabled={currentPage === bookNolist?.length}>
                                                       <img src={nxtButton} />
                                                    </button> : null}</div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>

                        <Grid className='hr'></Grid>
                            <Grid className='hr'></Grid>
                            <Grid className='hr'></Grid>
                            <Grid item xs={12} container paddingTop={3} >
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
                                /></Grid>
                            <Grid container xs={12} className='g2up'>
                                <input type="button" name="sub" value="Cancel" onClick={()=>handleBackButton()}></input>
                            </Grid>

                    </Grid>
                </Grid>
                }
            </Grid>
        </Grid>
    );
};

export default G1UploadPDF;