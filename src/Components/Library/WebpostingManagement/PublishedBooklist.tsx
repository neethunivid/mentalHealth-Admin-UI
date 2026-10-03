import React, { useState, useEffect } from 'react';
import '../../../assets/css/health.css';
import { Button, Grid } from '@mui/material';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import LibraryHeader from '../Common/LibraryHeader';
import uparrow from '../../../assets/images/6th_arrow_top.gif';
import downarrow from '../../../assets/images/6th_arrow_bottom.gif';
import updatebtn from '../../../assets/images/lib_update.gif';
import LeftPanLibrary from '../Common/LeftPanLibrary';
import {  useLocation } from 'react-router-dom';
import LibraryapiClient from '../../../API/LibraryAPI-client';
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
import arrowForward from "../../../assets/images/6th_btn_next.gif";



const ManagementWebPosting=() => {
    const [BookData, setBookData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
//handles pagination according to page selection
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
    const[countvalue,setCount]=useState()
    let Range:any;
    //getting data passed from bookpublished screen
    const location = useLocation();
    if (location && location.state&& location.state.rangeValues) {
      Range = location.state.rangeValues;
    }
    useEffect(() => {
        listPublished_Books(10, 1, "", "");
      }, []);
   //api for publishedbooklist
    const listPublished_Books = async (pagesize: any, pageNumber: number = 1, sortField: any, sortOrder: any) => {
      pageNumber -= 1;
      try {
          const req = {
              
                  range1:Range.range1,
                  range2: Range.range2,
                  selSort:sortOrder?sortOrder: "ASC",
                  pageSize:pagesize,
                  type:1,
                  pageNumber:pageNumber,
              
          };
          
          const apiData = await LibraryapiClient.post("library/web/listPublishedbooks", req,{});
          if(apiData){
            setIsLoading(true)
            setBookData(apiData?.data?.data)
            setCount(apiData?.data?.count)
            
          }
      } catch (error) {
        setIsLoading(true);
          console.error("Error fetching users:", error);
      }
  };
  //api call for updating status at the submit button
  const handleSubmitClick=async()=>{
      const allIds = BookData.map((row: any) => row.id);
      const placementId = BookData.map((row: any) => parseInt(row.placement));
      const statusIds=BookData.map((row: any) => row.status);
     
  
      try {
        const dataRequest={
          
             bookIds:allIds,
             placement: placementId,
             statuses: statusIds
              
        
          }
         
         const apiData = await LibraryapiClient.post("library/web/PubChangeSortOrder",dataRequest,{});
         if (apiData) {
          window.location.reload();
         }
   
       } catch (error: any) {
         // Handle errors if necessary
         console.error("API Error:", error);
       }
  }
  //apicall for sort buttonclick
  const handleSortClick = (field: any, sortOrder: any) => {
      setSortField(field);
      setSortOrder(sortOrder)
      listPublished_Books(selectedValue ? selectedValue : 10, currentPage ? currentPage : 1, field, sortOrder)
  }
  //defining columns of datagrid
    const columns: GridColDef[] = [
      {
        field: 'bookNo', headerName: '連番', headerAlign:"center",
        headerClassName:'sixth_bdr_left_bottom booklist_header_background white_headertext',
        cellClassName:'gridcolumn-cells blacktext', sortable:false,width:80,
      },
      {
        field:'isbnCode', headerName:'ISBN', headerAlign:'center',
        headerClassName:'sixth_bdr_left_bottom booklist_header_background white_headertext',
        cellClassName:'gridcolumn-cells blacktext', sortable:false,width:130,
      },
      {
        field:'title', headerName:'タイトル',flex:1, headerAlign:'center',
        headerClassName:'sixth_bdr_left_bottom booklist_header_background white_headertext',
        cellClassName:'gridcolumn-cells blacktext', sortable:false,width:240,
        renderCell: (params:any) => {
            if (params.row?.title) {
             return(
             <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
             { params.row?.title}
           </div>
             );
             
            }
            return null;
          },
      },
      {
        field:'author', headerName:"著作名", headerAlign:'center',
        headerClassName:'sixth_bdr_left_bottom booklist_header_background white_headertext',
        cellClassName:'gridcolumn-cells blacktext', sortable:false,width:100,
      },
      {
        field:'price', headerName:"価格",headerAlign:'center',
        headerClassName:'sixth_bdr_left_bottom booklist_header_background white_headertext',
        cellClassName:'gridcolumn-cells blacktext', sortable:false,width:80,
       
      },
      {
        field:'publisher', headerName:"発売元", headerAlign:'center',
        headerClassName:'sixth_bdr_left_bottom booklist_header_background white_headertext',
        cellClassName:'gridcolumn-cells blacktext', sortable:false,width:90,
      },
      {
        field:'Placement', headerName:"掲載場所", headerAlign:'center',
        headerClassName:'sixth_bdr_left_bottom booklist_header_background white_headertext',
        cellClassName:'gridcolumn-cells blacktext', sortable:false,width:150,
        renderCell: (params) => {
          //to set the values when radiobutton onclick change
            const handleplacementChange = (rowId:any, newValue:any) => {
                const updatedData = BookData.map((row:any) => {
                  if (row.id === rowId) {
                    return { ...row, placement: parseInt(newValue) };
                  }
                  return row;
                });
      
              };
        return(
          <Grid className='library-pad-left-right'>
            <Grid className='content-row'>
             <input
            type="radio"
            className='mrg_left'
            name={`placement_${params?.row?.id}`} 
            value={1}
            defaultChecked={params?.row?.placement === "1"} 
            onChange={(e) => handleplacementChange(params?.row?.id, e.target.value)}
            />
            <label className='blacktxt mrg_right'>新刊書</label>
            
            <input
            type="radio"
            className="library-pad-left-right"
            value={2}
            name={`placement_${params?.row?.id}`} 
            defaultChecked={params?.row?.placement ==="2"} 
            onChange={(e) => handleplacementChange(params?.row?.id, e.target.value)}
            />
            <label className='blacktxt library-pad-left-right'>お薦め</label></Grid>
            <Grid className='content-row '>
             <input
            type="radio"
            className="mrg_left"
            value={3}
            name={`placement_${params.row.id}`} 
            defaultChecked={params.row.placement === "3"} 
            onChange={(e) => handleplacementChange(params?.row?.id, e.target.value)}
            />
            <label className='blacktxt mrg_right'>著作別</label>
        
             <input
            type="radio"
            className="library-pad-left-right"
            value={4}
            name={`placement_${params.row.id}`} 
            defaultChecked={params.row.placement === "4"} 
            onChange={(e) => handleplacementChange(params?.row?.id, e.target.value)}
            />
            <label>症状別</label></Grid>
            <Grid className='content-row'>
             <input
            type="radio"
            className="mrg_left"
            value={5}
            name={`placement_${params.row.id}`} 
            defaultChecked={params.row.placement === "5"} 
            onChange={(e) => handleplacementChange(params?.row?.id, e.target.value)}
            />
            <label className='blacktxt mrg_right'>療法別</label>
            
             <input
            type="radio"
            className="library-pad-left-right"
            value={6}
            name={`placement_${params.row.id}`} 
            defaultChecked={params.row.placement==="6"} 
            onChange={(e) => handleplacementChange(params?.row?.id, e.target.value)}
            />
            <label>その他</label></Grid>
          </Grid>
        )
        },

      },
      {
        field:'status', headerName:"表示", headerAlign:'center',
        headerClassName:'sixth_bdr_left_bottom booklist_header_background white_headertext',
        cellClassName:'gridcolumn-cells blacktext', sortable:false,width:130,
      renderCell: (params) => {
        const handleStatusChange = (rowId:any, newValue:any) => {
          //to set the values when radiobutton onclick change
          const updatedData =BookData.map((row:any) => {
            if (row.id === rowId) {
              return { ...row, status: parseInt(newValue) };
            }
            return row;
          });
        setBookData(updatedData)
        };
        return(
        <Grid className='library-pad-left-right'>
        <Grid className='content-row'>
           <input
          type="radio"
          className="mrg_left"
          value={1}
          name={`status_${params?.row?.id}`} 
          defaultChecked={params?.row?.status=== 1}
         
          onChange={(e) => handleStatusChange(params?.row?.id, e.target.value)}
          />
          <label className='blacktxt mrg_right'>掲載</label>
          
          <input
          type="radio"
          className="library-pad-left-right"
          value={0}
          name={`status_${params?.row?.id}`} 
          defaultChecked={params?.row?.status===0}  
          onChange={(e) => handleStatusChange(params?.row?.id, e.target.value)}
          />
          <label>非掲載</label></Grid>
        </Grid>
        )
      },
      },
    ]
  const getRowClassName = (params: any) => {
    return params.indexRelativeToCurrentPage % 2 === 0
        ? "book-list-bg1"
        : "book-list-bg2";
};
//to get unique id for each row
const getRowId = (row: any) => {
    if (row.id) {
      return row.id;
    }
    // Return a fallback value if the property is not available
    return '';
  };

const CustomHeader = (column: any) => {
  return (<Grid>
      <Grid container xs={12} display={"flex"} flexDirection={"row"}>
          <span>{column.column.colDef.headerName}</span>
          {column.column.field === "bookNo"?
              <div>
                  <img src={uparrow} className='sortarrow'  onClick={() => { handleSortClick(column.column.field, "ASC") }} />
                  <img src={downarrow} className='sortarrow' onClick={() => { handleSortClick(column.column.field, "DESC") }} />
              </div>
              : null}
      </Grid>
  </Grid>
  );
}
//handles pagination according to pageselection
const handleChangeRowsPerPage = (
    
    event: React.ChangeEvent<HTMLSelectElement>
) => {
    setRowsPerPage(event.target.value);
    setpagesizevalue(event.target.value);
    setSelectedValue(event.target.value);
    setCurrentPage(1);
    listPublished_Books(event.target.value, 1, sortField, sortOrder);
};
//pagination
const goToPage = (pageNumber: number) => {
  setCurrentPage(pageNumber);
  listPublished_Books(selectedValue,pageNumber, sortField??"", sortOrder??"")

};
const getPageInfo = (countvalue: any) => {
  let page: any = currentPage ? currentPage : 1;
  let offset: any = (page - 1) * selectedValue + 1;
  let count: any = page * selectedValue;
  let totalRows: any = countvalue ? countvalue : 0;
  let totalPages: number = Math.ceil(totalRows / selectedValue);
  if (count > totalRows) {
    count = totalRows;
  }
  
  return (
    <>
      <span className="padding">
        <span className="black">{countvalue + "件中"}</span>
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
    return(
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanLibrary/>
        </Grid>
        <Grid item xs={9}>
          <LibraryHeader
            label1="D."
            label2="WEB掲載の管理"
            label3="図書室管理"
          />
          <Grid className='hr'></Grid>
          
          <span className="black_text">掲載図書の一覧＜{Range.range1}～{Range.range2}＞</span>
          <span className="black lib-marg1">D-4</span>
          {isLoading&&
          <DataGrid
             columns={columns.map((col) => ({
              ...col,
              renderHeader: (params: any) => <CustomHeader column={params} />,
          }))}
          rows={BookData?BookData:[]}
          components={{
            NoRowsOverlay: () => (
              <div className="row_table_list_c1 registration_lending_return_no_row">
              "結果はありません。"
              </div>
            ),
          }}
          getRowId={getRowId}
          getRowClassName={getRowClassName}
          autoHeight
          rowCount={BookData?BookData.length: 0}
          disableColumnMenu={true}
          hideFooter
          hideFooterSelectedRowCount
          columnHeaderHeight={30}
          rowHeight={70}
          localeText={{ noRowsLabel: "結果はありません。" }}
        

          />}
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
                <Grid xs={4}>{BookData && getPageInfo(countvalue)}</Grid>
              </Grid>
              <Grid className="p6red_bg_right size"></Grid>
            </Grid>
                <Grid item xs={12} container display={'flex'} justifyContent={'center'}>
                <Grid item xs={12}>
                  <Button onClick={()=>handleSubmitClick()}><img className='padding_top' src={updatebtn} /></Button>
                </Grid>
        </Grid>
      </Grid></Grid>
    );
}

export default ManagementWebPosting;