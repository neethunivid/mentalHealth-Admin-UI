import { Grid, Button} from '@mui/material';
import LeftPanLibrary from '../../Common/LeftPanLibrary';
import LibraryHeader from '../../Common/LibraryHeader';
import { DataGrid,GridColDef} from '@mui/x-data-grid';
import { useSelector} from 'react-redux';
import uparrow from '../../../../assets/images/6th_arrow_top.gif';
import downarrow from '../../../../assets/images/6th_arrow_bottom.gif';
import { useState,useEffect} from 'react';
import savebtn from '../../../../assets/images/lib_save.gif';
import resetbtn from '../../../../assets/images/lib_reset.gif';
import LibraryapiClient from '../../../../API/LibraryAPI-client';
import arrowForward from "../../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../../assets/images/6th_btn_previous.gif";

const NewbooksMoritaOther=()=>{
const [Data, setData] = useState<any>([]);
const [selectedValue, setSelectedValue] = useState<any>(10);
const [currentPage, setCurrentPage] = useState(1);
const [sortField, setSortField] = useState()
const [sortOrder, setSortOrder] = useState()
const [isLoaded, setLoaded] = useState(false)
const [rowsPerPage, setRowsPerPage] = useState<any>(10);
const [pagesizevalue, setpagesizevalue] = useState<any>(10);
const [isMoritaOthersClicked, setIsMoritaOthersClicked] = useState(true);
const [isMoritaClicked, setIsMoritaClicked] = useState(false);
useEffect(() => {
    moritaOthers(10, 1, "", "","1");

}, []);
const data = useSelector((state: any) => {
return state?.reducer1.data?.new_books

});

const jsonData = [
  { value: '10', label: '10' },
  { value: '25', label: '25' },
  { value: '50', label: '50' },
  { value: '75', label: '75' },
  { value: '100', label: '100' },
 
];
const handleSortClick = (field: any, sortOrder: any) => {
setSortField(field);
setSortOrder(sortOrder);
moritaOthers(selectedValue ? selectedValue : 10, currentPage ? currentPage : 1, field, sortOrder, isMoritaOthersClicked? "1" :"2");
}
const getRowClassName = (params: any) => {
return params.indexRelativeToCurrentPage % 2 === 0
  ? "book-list-bg1"
  : "book-list-bg2";
};
const getRowId = (row: any) => {
if (row.id) {
return row.id;
}
// Return a fallback value if the property is not available
return '';
};
const moritaOthers = async (pagesize: any, pageNumber: number = 1, sortField: any, sortOrder: any, type:any) => {
pageNumber -= 1;
try {
  const req = {
    
      type:type,
      pageSize:pagesize,
      pageNumber:pageNumber,
      selSort:sortOrder
  };
  const apiData = await LibraryapiClient.post("library/web/listNewbooks", req, {});
  if(apiData){
    setLoaded(true)
    setData(apiData?.data?.data)
    setCount(apiData?.data?.count)
  }
} catch (error) {
  setLoaded(true)
  console.error("Error fetching users:", error);
}
};
const resetField = async () => {
  try {
    // Make the API call to reset the sort order
    const req = {
      type: 1,
    }

    const apiData = await LibraryapiClient.post("library/web/resetSortOrder", req, {});
    
    if (apiData) {
      setLoaded(true)
      // If the API call is successful, reset the 'sort' field values to 0
      const updatedData = Data.map((row:any) => ({
        ...row,
        sort: 0,
      }));
      // Update the state with the modified data
      setData(updatedData);
    }
  } catch (error) {
    // Handle API errors if necessary
    setLoaded(true)
    console.error("API Error:", error);
  }
};


const onSubmit = async () => {
  try {
    // Create an array of objects containing book data
    const bookData = Data?.map((row:any) => ({
      bookId: row.id,
      rank: row.sort, // 'sort field' represents the rank
      status: row.status,
    })) || [];
      const ranks = bookData.map((book:any) => book.rank);
    const isDuplicateRank = ranks.some((rank:any, index:any) => ranks.indexOf(rank) !== index);

    if (isDuplicateRank) {
      // Display an alert if duplicate ranks are found
      window.alert("同じ順位はすでに記入されています");
      return; // Exit the function
    }
    // Prepare the request payload
    const req = {
      bookIds: bookData.map((book:any) => book.bookId), // Extract book IDs
      ranks: bookData.map((book:any) => book.rank),
      statuses: bookData.map((book:any) => book.status),
      type: 1,
    };

    // Send the request to the API to update the sort order
    const apiData = await LibraryapiClient.post("library/web/changeSortOrder", req, {});

    if (apiData) {
      window.location.reload()
    }
  } catch (error) {
    // Handle errors if necessary
    console.error("API Error:", error);
  }
};

  const columns: GridColDef[] = [
    {
      field: 'id', headerName:'掲載順位', headerAlign:"center",
      headerClassName:"sixth_bdr_left_bottom booklist_header_background white_headertext",
      cellClassName: "gridcolumn-cells blacktxt",width:80,
      sortable: false,
    },
    {
      field: 'sort', headerName: '変更順位',width:90, headerAlign: "center",
      headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
      cellClassName: "gridcolumn-cells blacktxt", sortable: false,
      renderCell: (params) => {
        const handleSortChange = (rowId:any, newValue:any) => {
          const updatedData = Data.map((row:any) => {
            const parsedValue = newValue !== '' ? parseInt(newValue) : 0;
            if (row.id === rowId) {
              
              return { ...row, sort: parsedValue };
            }
            return row;
          });
        setData(updatedData)
        };
        return (
          
          <input name="rank" className="bdr-text" type="text"  value={params?.row?.sort}  onChange={(e) => handleSortChange(params.row.id, e.target.value)}/>
        );
      },
  },
  {
    field: 'status',
    headerName: '掲載・非掲載',
    width:90,
    headerAlign: "center",
    headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
    cellClassName: "gridcolumn-cells blacktxt",
    sortable: false,
    renderCell: (params) => {
      const handleStatusChange = (rowId:any, newValue:any) => {
        const updatedData =Data.map((row:any) => {
          if (row.id === rowId) {
            return { ...row, status: parseInt(newValue) };
          }
          return row;
        });
        setData(updatedData)
      };
     
      return(
        <Grid>
        <div style={{display:"flex",flexDirection:"column"}}>
        <Grid className='content-row'>
          <input type='radio' name={`status_${params.row.id}`} value={1} defaultChecked={params.row.status === 1} onChange={(e) => handleStatusChange(params.row.id, e.target.value)} />
          <label>掲載</label>
        </Grid>
        <Grid  className='content-row'>
          <input type='radio' name={`status_${params.row.id}`} value={0} defaultChecked={params.row.status === 0} onChange={(e) => handleStatusChange(params.row.id, e.target.value)} />
          <label>非掲載</label>
        </Grid>
        </div>
        </Grid>
       );
      }
  },
  
  {
      field: 'bookNo', headerName: '連番', flex:1, headerAlign: "center",
      headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
      cellClassName: "gridcolumn-cells blacktxt", sortable: false,
  },
  {
      field: 'isbnCode', headerName: 'ISBN', width:130, headerAlign: "center",
      headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
      cellClassName: "gridcolumn-cells blacktxt", sortable: false,
  },
  {
      field: 'title', headerName: 'タイトル', width:250, headerAlign: "center",
      headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
      cellClassName: "gridcolumn-cells blacktxt", sortable: false,
  },
  {
      field: 'author', headerName: '著作名', width:100, headerAlign: "center",
      headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
      cellClassName: "gridcolumn-cells blacktxt", sortable: false,
  },
  {
    field: 'publisher', headerName: '発売元', width:100, headerAlign: "center",
    headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
    cellClassName: "gridcolumn-cells blacktxt", sortable: false,
},
  {
      field: 'releaceDate', headerName: '発売日', width:90, headerAlign: "center",
      headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
      cellClassName: "gridcolumn-cells blacktxt", sortable: false,
      renderCell: (params) => {
          if (params.row.joinDate) {
              const year = params.row.joinDate[0];
              const month = String(params.row.joinDate[1]).padStart(2, '0');
              const day = String(params.row.joinDate[2]).padStart(2, '0');
              const formattedDate = `${year}-${month}-${day}`;
              return (
                  formattedDate
              );
          }
        }
      },
  ];
  const[countvalue,setCount]=useState()
  const handleChangeRowsPerPage=(
    event: React.ChangeEvent<HTMLSelectElement>
  )=>{
    const newSelectedValue = event.target.value;
    setRowsPerPage(newSelectedValue);
    setpagesizevalue(newSelectedValue);
    setSelectedValue(newSelectedValue);
    setCurrentPage(1);
    // Modify the type parameter based on your condition (for example, a state variable)
    const type = isMoritaOthersClicked ? "1" : "2";
    
    moritaOthers(newSelectedValue, 1, sortField, "", type);
  };
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    moritaOthers(selectedValue, pageNumber, sortField,"","1");
  }
  const getPageInfo = (data: any) => {
    let page: any = currentPage ? currentPage : 1;
    let offset: any = ((page - 1) * selectedValue) + 1
    let count: any = page * selectedValue;
    let totalRows: any = countvalue ? countvalue : 0;
    let totalPages: number = Math.ceil(totalRows / selectedValue);
    if (count > totalRows) {
      count = totalRows;
    }
    return (<>
      <span className='padding'>
        <span className='black'>{countvalue + "件中"}</span>
        <span className='black'>{offset}〜{count}件 </span>
        {page > 1 && <img onClick={() => { goToPage(currentPage - 1) }} src={arrowBack}></img>}
        {totalPages > page && <img onClick={() => { goToPage(currentPage + 1) }} src={arrowForward}></img>}
      </span>
    </>
    );
  }
 //function called in the MoritaOthers click
  const handleMoritaOthers = () => {
    setIsMoritaOthersClicked(true);
    setIsMoritaClicked(false);
   moritaOthers(10, 1,sortField??"",sortOrder??"", "1");
   setpagesizevalue(0);
   setSelectedValue(10);
   setCurrentPage(1);
  };

//function called in the Morita click
  const handleMorita = () => {
    setIsMoritaOthersClicked(false);
    setIsMoritaClicked(true);
    moritaOthers(10, 1,sortField??"",sortOrder??"", "2");
    setpagesizevalue(0);
    setSelectedValue(10);
    setCurrentPage(1);
  };
  const CustomHeader = (column:any)=>{
    return(
      <Grid>
        <Grid container xs={12} display={"flex"} flexDirection={"row"}>
          <span>{column.column.colDef.headerName}</span>
          {column.column.field === "releaceDate" ?
                    <div>
                        <img src={uparrow} onClick={() => { handleSortClick(column.column.field, "ASC") }} /> 
                        <img src={downarrow} onClick={() => { handleSortClick(column.column.field, "DESC") }} /> 
                    </div>
                    : null}
        </Grid>
      </Grid>
    )
  }
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

            <Grid className='hr'/>
             <Grid item xs={12} container>
             <Grid item xs={10} className="upload_mem_span">新刊書</Grid>
             <Grid item xs={2}>
             {" "}
              <button className={isMoritaOthersClicked?'Active_btnmailmag':'Inactive_btnmailmag'}
                onClick={handleMoritaOthers} 
              >
                森田
              </button>
              {" | "}
              <button
                onClick={handleMorita} className={isMoritaClicked?'Active_btnmailmag':'Inactive_btnmailmag'}
              >
                森田以外
              </button>
              <span className='black lib'>D-2</span></Grid></Grid>
              {isLoaded&&
           <DataGrid
           columns={columns.map((col) => ({
               ...col,
               renderHeader: (params:any) => <CustomHeader column={params}/>,
           }))}
          rows={Data ?Data: []}
           getRowClassName={getRowClassName}
           getRowId={getRowId}
           autoHeight
           rowCount={Data ? Data.length : 0}
           disableColumnMenu={true}
           hideFooter
           hideFooterSelectedRowCount
           columnHeaderHeight={30}
           />
          }

           <Grid className='hr'/>
           <Grid className='hr'/>
           <Grid className='content-row'>
            <Grid className='p6red_bg_left size'></Grid>
            <Grid xs={12} container className='p6red_bg_midle'>
              <Grid xs={4} className='black'></Grid>
              <Grid xs={4} className='black'>
                <Grid
                 container
                 flexDirection={"row"}
                 justifyContent={"flex-end"}
                 alignSelf={"center"}
                 padding={1}
                >
                  <span className='black'>行の表示</span>
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
            
           <Grid xs={4}>
                {Data && getPageInfo(countvalue)}
            </Grid>
          
             </Grid>
             <Grid className="p6red_bg_right size"></Grid>
             </Grid>
           <Grid item xs={12} container>

           <Grid item xs={2}>
              <Button type='submit'><img src={savebtn} onClick={onSubmit} /></Button>
           </Grid>
           <Grid item xs={10}>
             <Button type='reset' ><img src={resetbtn} onClick={() => resetField()}  /></Button>
           </Grid>
      </Grid>
        </Grid>
        </Grid>
      
    );
}

export default NewbooksMoritaOther;