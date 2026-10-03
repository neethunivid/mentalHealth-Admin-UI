import React, { useEffect, useRef, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "../../../assets/css/health.css";
import {

  Grid,

} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, setMemberReg } from "../../../Redux/actions";
import LeftPanBBS from "../../Common/LeftPanBBS";
import { useNavigate, useLocation } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import editbutton from "../../../assets/images/lib_browse.gif";
import "../Common/library.scss";
import reset from "../../../assets/admin_library/images/lib_reset.png";
import LeftPanLibrary from "../Common/LeftPanLibrary";
import LibraryHeader from "../Common/LibraryHeader";
import EditModifying_Lender_Table from "./components/EditModifying_Lender_Table";
import LibraryapiClient from "../../../API/LibraryAPI-client";
import EditModifying_Book_Table from "./components/EditModifying_Book_Table";
import { formatDateArray, getCurrentDate } from "../../Common/Date_conversion";
import pref from "../Common/pref";

const Editing_loan_modifying = () => {
  const [isLoading,setIsLoading]=useState(true);
const dispatch=useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
let state:any;
useEffect(()=>{
    getLoanBookList();
},[]);

//get loan book list according to member id after selecting a loan book 
const getLoanBookList=async()=>{

try{
    const dataRequest={
      'sortDirection':'DESC',
      'sortField':'id',
        "pageNumber":1,
        "pageSize":1000,
        "memberId":location?.state?.data?.memberLibrary?.id
    };
    const apiData=await LibraryapiClient.post('library/books/listLendingBooks',dataRequest);
    if(apiData){
      const date=getCurrentDate();
      setIsLoading(false);
      //re arrange data in a new format for showing the loan list book
        const newFormattedData=apiData.data.data.map((item:any)=>{
          /* Check if "returnDate" is null, and if it is, empty string */
          const returnDate = item.returnDate ? formatDateArray(item.returnDate) : date;//empty if there is no date
            return{
                'id':item.id,
                'LendingNo':item.lendingNo,
                'lendingDay':formatDateArray(item.lendingDay),
                'dateReturn':formatDateArray(item.dateReturn),
                'returnDate':returnDate,
                'bookNo':item.book.bookNo,
                'isbnCode':item.book.isbnCode,
                'title':item.book.title,
                'author':item.book.author,
                'editSupervision':item.book.editSupervision,
                'publisher':item.book.publisher,
                'memberNo':item.memberLibrary.id,
                'status':item.status,
                'bookId':item.book.id
            }
        })
     //stores to the redux state
dispatch(setMemberReg('member_loan_book_list',newFormattedData));
pref.map((place:any)=>{
  if(place.id===apiData.data.data[0].memberLibrary.state){
    state= place.name
  }
 
});

    }
}catch(error){

}
}
const booklist:any=useSelector((state:any)=>state.memberData.member_loan_book_list);
  return (
    <Grid container xs={12} padding={1} spacing={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanLibrary />
      </Grid>
      <Grid item xs={8}>
        <LibraryHeader
          label1="B-4."
          label2="貸出内容の編集（貸出・返却・修正）"
          label3="図書室管理"
        />
        <Grid className="hr"></Grid>
        <label className="black">【貸出者】</label>
        <label className="black library_flex_end">B-10</label>
        {/* Lender Details shows in this table */}
       { !isLoading&&<EditModifying_Lender_Table data={location.state.data} data2={state}/>}
        <Grid className="hr"></Grid>
        <Grid className="hr"></Grid>
        <label className="black">【貸出書籍】</label>
        <Grid className="hr"></Grid>
        {/* Edit Lender book here in this table */}
          {booklist &&  <EditModifying_Book_Table data1={location.state?.data.id} data2={booklist} data3={location.state?.isBookList}/>}
        {/* </Grid> */}
      </Grid>
    </Grid>
  );
};

export default Editing_loan_modifying;
