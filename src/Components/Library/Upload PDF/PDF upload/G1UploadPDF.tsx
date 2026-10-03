import { Grid } from '@mui/material';
import LeftPanLibrary from '../../Common/LeftPanLibrary';
import LibraryHeader from '../../Common/LibraryHeader';
import { useForm } from "react-hook-form";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { fetchData } from '../../../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import LibraryapiClient from '../../../../API/LibraryAPI-client';
import React, { useRef } from 'react';
const G1UploadPDF = () => {
    let bookldList: any
    const [selectedFilesList, setSelectedFilesList] = useState<any>([]);
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
    const onSubmit = async (data: any) => {

    }
    const navigate = useNavigate()
    const location = useLocation();
    if (location && location.state) {
        bookldList = location.state.data
    }
    const dispatch = useDispatch();
    const data = useSelector((state: any) => {
        return state?.reducer1.data?.book_list
    });
    useEffect(() => {
        fetchBookList();

    }, []);
    const [selectedFileNames, setSelectedFileNames] = useState({
        pdf1: "No file chosen",
        pdf2: "No file chosen",
        pdf3: "No file chosen",
    });

    const fileInputRef = useRef<any>(null);
    const fileInputRef2 = useRef<any>(null);
    const fileInputRef3 = useRef<any>(null);

    //column definition for datagrid
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
                    navigate('/G2edit', {
                        state: {
                            data: params.row.id,
                            bookldList: bookldList, documentname: params.row.name
                        }
                    });
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

    //styling for alernative row of datagrid
    const getRowClassName = (params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0
            ? "book-list-bg1"
            : "book-list-bg2";
    };

    //fetch book details
    const fetchBookList = async () => {

        try {
            const req = {
                bookId: bookldList

            };
            dispatch(fetchData("book_list", "library/upload/bookDetails", req));

            if (!data || !Array.isArray(data)) {
                return null;
            } else if (!data) {
            }
        } catch (error) {
            console.error("Error :", error);
        }
    };

    //delete document using bookid
    const DeleteDocument = async (id: any) => {
        const confirmed = window.confirm('文書を削除しますか？');
        if (confirmed) {
            try {

                const apiData = await LibraryapiClient.delete(
                    "library/upload/deleteDocument/" + id,
                    {}
                );
                if (apiData) {
                    window.location.reload()
                }
            } catch (error) {
                console.error("Error:", error);
            }
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

    //handle submit button action
    const handleSubmitButtonClick = async () => {
        if (selectedFilesList.length == 0) {
            alert("Please select the file")
        }
        else {
            UploadMultiplePDF()
        }
    }

    //upload multiple pdf
    const UploadMultiplePDF = async () => {

        try {
            const formData = new FormData();

            for (const selectedFile of selectedFilesList) {
                // Append each file with a custom field name "pdfFiles"
                formData.append('pdfFiles', selectedFile, selectedFile.name);
            }
            const bookIdsQueryParam = bookldList.join(',');
            const apiData = await LibraryapiClient.post(
                `library/upload/uploadBooksPdf?bookIds=${bookIdsQueryParam}`,
                formData
            );

            if (apiData) {
                window.location.reload()
            }
        } catch (error) {
            console.error("Error:", error);
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
                <Grid container xs={12}>
                    <Grid container className="middle_table up" >
                        <Grid className='hr'></Grid>
                        <Grid className='hr'></Grid>
                        <form name="booksearch" id="form" onSubmit={handleSubmit(onSubmit)}>
                            <Grid container xs={12} className="middle_table ">
                                <Grid className="p6red_bg_midle1">
                                    <Grid className="top-header">
                                        <span className="verdana_big g2up">PDFをアップロード</span>
                                    </Grid>
                                </Grid>

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
                                                id="fileInput2"
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
                                                id="fileInput3"
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
                                        <input type="button" name="sub" value="Upload" onClick={() => handleSubmitButtonClick()}></input>
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
                            />
                        </Grid>

                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    );
};

export default G1UploadPDF;