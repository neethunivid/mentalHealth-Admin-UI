import {
    Grid, Button, TableContainer,
    Paper,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
} from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import submitbtn from "../../../../src/assets/admin_library/images/lib_save.png";
import deletebtn from "../../../../src/assets/admin_library/images/lib_delete.png";
import calendericon from '../../../assets/images/icon_calender.gif';
import ReactDatePicker from 'react-datepicker';
import LeftPanLibrary from '../Common/LeftPanLibrary';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../Redux/actions';
import LibraryapiClient from '../../../API/LibraryAPI-client';
import { convertReactFormatDate, formatDateArray } from '../../Common/Date_conversion';
import '../Common/library.scss'
import { useNavigate } from 'react-router-dom';
import LibraryHeader from '../Common/LibraryHeader';
import { setMemberReg } from "../../../Redux/actions";

const BookView = () => {
    let bookIdlist: any;
    const [currentPage, setCurrentPage] = useState(1);
    const [dataIndex, setDataIndex] = useState<any>(0);
    const [bookdata, setBookData] = useState<any>([]);
    const [categorybookdata, setCategoryBookData] = useState<any>([]);
    const [subcategorybookdata, setsubCategoryBookData] = useState<any>([]);
    const [isLoaded, setLoaded] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedoption ,setSelectedOption]=useState<any>()
    const [selectedPurchaseDate, setSelectedPurchaseDate] = useState<Date>();
    const [selectedOverwriteDate, setSelectedOverwriteDate] = useState<Date>();
    const navigate=useNavigate()

    //the useSelector hook to extract the bookloan_list data from the Redux state
    const data = useSelector((state: any) => {
        return state?.reducer1.data?.bookloan_list
    });
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        reset,
    } = useForm();
    const location = useLocation();
    const dispatch = useDispatch()
    
    //the useSelector hook to extract the bookIdlist data from the Redux state
    bookIdlist = useSelector((state: any) => {
        return state?.memberData?.bookIdlist;
      });

    useEffect(() => {
        // to retrieve data from "bookIdlist" in sessionStorage.
        const localStorageData1 = sessionStorage.getItem("bookIdlist");
        if (localStorageData1) {
            // If data was found, parse it as JSON to obtain an array.
            bookIdlist= JSON.parse(localStorageData1);
            // This action sets the "bookIdlist" value in the Redux store.
          dispatch(setMemberReg("bookIdlist", bookIdlist));
        }
        fetchBookData(bookIdlist&&bookIdlist[0]);
        fetchCategoryList()
        fetchSubCategoryList()
        setCurrentPage(1)
    }, []);
    const [formData, setFormData] = useState<any>({
        bookNo: '',
        isbnCode: '',
        title: '',
        author: '',
        editSupervision:"",
        publisher:'',
        price:'',
        summary:'',
        image:'',
        link:'',
        lbCode1:'',
        lbCode2:'',
        placement:'',
        purchaseDate:Date,
        releaceDate:Date,
        overwriteDate:Date,
    });

    //handling the input details
    const onSubmit = async (data: any) => {
    
        if (!formData.isbnCode) {
            alert("ISBNコードをいれてください")
            return
        }
        else if (!formData.bookNo) {
            alert("書籍番号を入力してください")
            return
        }
        else if(!/^\d+$/.test(formData.bookNo)){
            alert("有効な書籍番号を入力してください")
        }
        else if (!formData.author) {
            alert("著者名を入力してください")
            return
        } else if (!formData.title) {
            alert("タイトルを入力してください")
            return
        }
        else if (!formData.publisher) {
            alert("発行者を入力してください")
            return
        }
        
         else {
            if (data.submitButton === 'submitButton') {
                updateBookData(formData)
            }
            else {

                DeleteBook()
            }
        }
    }

    //update the book details based on book id
    const updateBookData = async (formData:any) => {
             let selectedplacement:any;
                try {
                    if(formData.placement=="newBookChecked"){
                        selectedplacement=1
                    }else if(formData.placement=="RecommendedChecked"){
                        selectedplacement=2
                    }else if(formData.placement=="ByWorkChecked"){
                        selectedplacement=3
                    }else if(formData.placement=="BySymptomChecked"){
                        selectedplacement=4
                    }else if(formData.placement=="ByTherapyChecked"){
                        selectedplacement=5
                    }else if(formData.placement=="OthersChecked"){
                        selectedplacement=6
                    }else if(formData.placement=="NotlistedChecked"){
                        selectedplacement=7
                    }
            const datareq = {

                "bookNo": formData.bookNo,
                "isbnCode": formData.isbnCode,
                "lbCode1": formData.lbCode1,
                "lbCode2": formData.lbCode2,
                "title": formData.title,
                "author": formData.author,
                "editSupervision": formData.editSupervision,
                "publisher": formData.publisher,
                "price": formData.price,
                "oldPrice": bookdata.price,
                "summary": formData.summary,
                "placement": selectedplacement?selectedplacement:formData.placement,
                "purchaseDate": formData.purchaseDate?convertReactFormatDate(formData.purchaseDate):"",
                "purchaseNo": 1,
                "image": formData.image,
                "link": formData.link,
                "status": 1,
                "isLended": 0,
                "availCount": 1,
                "sort": 1,
                "dateRegistered": bookdata.dateRegistered?formatDateArray(bookdata.dateRegistered):"",
                "documents": bookdata.documents,
                "releaceDate": formData.releaceDate? convertReactFormatDate(formData.releaceDate):"",
                "overwiteDate": formData.overwriteDate ? convertReactFormatDate(formData.overwriteDate) : ""

            }
            const apiData = await LibraryapiClient.put(
                "library/books/updateBook/" + bookdata.id,
                datareq,
                {}
            );
            if (apiData) {
                //remove the updated id from the booklist if length greater than 1, otherwise navigate to booklist
                 if(bookIdlist.length>1){
                    const indexToRemove = bookIdlist.indexOf(bookdata.id);
                    if (indexToRemove !== -1) {
                    bookIdlist?.splice(indexToRemove, 1);
                    }
                    reset();
                    window.location.reload()
                    dispatch(setMemberReg("bookIdlist", bookIdlist));
                
                }
                else{
                    navigate('/booklist')
                }

            }
        } catch (error: any) {
            console.error(error)
        }
    }

    //delete the book based on id
    const DeleteBook = async () => {
        const confirmed = window.confirm('削除はしますか？');
        if (confirmed) {
            try {

                const apiData = await LibraryapiClient.delete(
                    "library/books/bookDelete/" + bookdata.id,
                    {}
                );
                if (apiData) {
                    //remove the deleted id from the booklist if length greater than 1, otherwise navigate to booklist
                    if(bookIdlist.length>1){
                        
                        const indexToRemove = bookIdlist.indexOf(bookdata.id);
                        if (indexToRemove !== -1) {
                        bookIdlist?.splice(indexToRemove, 1);
                        }
                        reset();
                        dispatch(setMemberReg("bookIdlist", bookIdlist));
                        window.location.reload()
                    }else{
                        navigate('/booklist')
                        
                    }
                }
            } catch (error: any) {
                console.error(error)
            }
        }
    }

    // Create a reference to a ReactDatePicker component.
    const datePickerRef = useRef<ReactDatePicker>(null);
    const datePickerRef3 = useRef<ReactDatePicker>(null);
    const datePickerRef2 = useRef<ReactDatePicker>(null);
   
    const handleButtonClick1 = () => {
        //Check if the datePickerRef.current is defined
        if (datePickerRef.current) {
             // If it is defined, open the date picker by calling the setOpen method with true as an argument
            datePickerRef.current.setOpen(true);
        }
    };
    const handleButtonClick2 = () => {
        //Check if the datePickerRef2.current is defined
        if (datePickerRef2.current) {
             // If it is defined, open the date picker by calling the setOpen method with true as an argument
            datePickerRef2.current.setOpen(true);
        }
    };
    const handleButtonClick3 = () => {
        //Check if the datePickerRef3.current is defined
        if (datePickerRef3.current) {
             // If it is defined, open the date picker by calling the setOpen method with true as an argument
            datePickerRef3.current.setOpen(true);
        }
    };
    
    //get details of book based on bookNo
    const fetchBookData = async (bookid: any) => {
        try {

            const dataRequest = {
                id: bookid,
            }
            setLoaded(false)
            const apiData = await LibraryapiClient.post("library/books/booksSearch", dataRequest, {});
            if (apiData) {
                setBookData(apiData?.data?.data[0])
                initializeDataValues(apiData?.data?.data[0])
                fetchBookLoanList(apiData.data?.data[0].id)
                setLoaded(true)
            }
        } catch (error) {
            console.error("Error ", error);
            setLoaded(true)
        }
    };

    //get details of book loan list
    const fetchBookLoanList = async (bookid: any) => {

        try {
            const req = {
                bookId: bookid

            };
            dispatch(fetchData("bookloan_list", "/library/books/loanList", req));

            if (!data || !Array.isArray(data)) {
                return null;
            } else if (!data) {
            }
        } catch (error) {
            console.error("Error :", error);
        }
    };

    //initialize datavalues
    const initializeDataValues = (bookdata: any) => {
        setFormData({
            bookNo: bookdata.bookNo || '',
            isbnCode: bookdata.isbnCode || '',
            title:  bookdata.title || '',
            author:  bookdata.author || '',
            editSupervision: bookdata.editSupervision || '',
            publisher: bookdata.publisher || '',
            price: bookdata.price || '',
            summary: bookdata.summary || '',
            image: bookdata.image || '',
            link: bookdata.link || '',
            lbCode1:bookdata.lbCode1|| '',
            lbCode2:bookdata.lbCode2||'',
            placement:bookdata.placement||'',
            purchaseDate:bookdata.purchaseDate||'',
            releaceDate:bookdata.releaceDate||'',
            overwriteDate:bookdata.overwriteDate||'',
         
        });
        if (bookdata.releaceDate) {
            const initialDateParts = bookdata.releaceDate.split('-');
            const initialYear = parseInt(initialDateParts[0]);
            const initialMonth = parseInt(initialDateParts[1]) - 1; // Subtract 1 from month since it's zero-based

            const initialDate = new Date(initialYear, initialMonth);
            setValue("releace_date", initialDate);
            setSelectedDate(initialDate)
        }
        if (bookdata.purchaseDate) {
            const datepurchasedString = formatDateArray(bookdata.purchaseDate);
            // Split the date string into year, month, and day parts
            const [pyear, pmonth, pday] = datepurchasedString.split('-').map(Number);
            // Create a JavaScript Date object
            const purchasedparsedDate = new Date(pyear, pmonth - 1, pday);
            setValue("purchase_date", purchasedparsedDate);
            setSelectedPurchaseDate(purchasedparsedDate);
        }
        if (bookdata.overwiteDate) {
            
            const dateoverwriteString = formatDateArray(bookdata.overwiteDate);
            // Split the date string into year, month, and day parts
            const [pyear, pmonth, pday] = dateoverwriteString.split('-').map(Number);
            // Create a JavaScript Date object
            const overwriteparsedDate = new Date(pyear, pmonth - 1, pday);
            setValue("overwrite_date", overwriteparsedDate);
            setSelectedOverwriteDate(overwriteparsedDate);
        }
        if (bookdata.placement) {
            if(bookdata.placement == 1 ){
                setSelectedOption("newBookChecked")
            }else if(bookdata.placement==2){
                setSelectedOption("RecommendedChecked")
            }else if(bookdata.placement==3){
                setSelectedOption("ByWorkChecked")
            }else if(bookdata.placement==4){
                setSelectedOption("BySymptomChecked")
            }else if(bookdata.placement==5){
                setSelectedOption("ByTherapyChecked")
            }else if(bookdata.placement==6){
                setSelectedOption("OthersChecked")
            }else {
                setSelectedOption("NotlistedChecked")
             }     
        }
    }
    //get categorylist
    const fetchCategoryList = async () => {
        try {
            setLoaded(false)
            const apiData = await LibraryapiClient.post("library/books/categoryList", {}, {});
            if (apiData) {

                setCategoryBookData(apiData?.data?.data)
                setLoaded(true)
            }
        } catch (error) {
            console.error("Error :", error);
            setLoaded(true)
        }
    }
    //get subcategorylist
    const fetchSubCategoryList = async () => {
        try {
            setLoaded(false)
            const apiData = await LibraryapiClient.post("library/books/subCategoryList", {}, {});
            if (apiData) {

                setsubCategoryBookData(apiData?.data?.data)
                setLoaded(true)
            }
        } catch (error) {
            console.error("Error:", error);
            setLoaded(true)
        }
    }

    //render page buttons
    const renderPageButtons = () => {
        const pageNumbers = [];
        const pageCount = 4; // Number of page numbers to display at a time
        const totalPageCount = bookIdlist?.length;

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
                <button key={i} className="pagination-button-lib" style={{
                    color: currentPage === i ? "blue" : "none",
                }} onClick={() => handleClick(i)}>
                    {`[${i}]`}
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
        const bookid = bookIdlist[dataIndex - 1];
        if (bookid) {
            fetchBookData(bookid);
        }
    };

    //navigate to next book details
    const nextPage = () => {
        if (currentPage < bookIdlist?.length) {
            setCurrentPage((prevPage) => prevPage + 1);
            setDataIndex(currentPage)
        }
        const bookid = bookIdlist[currentPage];
        if (bookid) {
            fetchBookData(bookid);
        }
    };

    //get book details on clicking the page number 
    const handleClick = (pageNo: any) => {
        setCurrentPage(pageNo);
        const bookid = bookIdlist[pageNo - 1];
        if (bookid) {
            fetchBookData(bookid);
        }
    };

    //handle release date change
    const handleDateChange = (date: Date) => {
        setSelectedDate(date);

        setValue("releace_date", date);
        setFormData({
            ...formData,
            ["releaceDate"]: date,
        });
    };

    //handle purchase date change
    const handlePurchaseDateChange = (date: Date) => {
        setSelectedPurchaseDate(date);
        setValue("purchase_date", date);
        setFormData({
            ...formData,
            ["purchaseDate"]: date,
        });
    };

    //handle overwrite date change
    const handleOverwriteDateChange = (date: Date) => {
        setSelectedOverwriteDate(date);
        setValue("overwrite_date", date);
        setFormData({
            ...formData,
            ["overwriteDate"]: date,
        });
    };
    
    //handle input change
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
       
        
    };
  
    //handle placememnt option change
   const  handleOptionChange = (e:any) => {
    setSelectedOption(e.target.value);
    const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
      };
    return (
        <Grid container xs={12} spacing={1} padding={1}>
            <Grid item xs={3} spacing={2}>
                <LeftPanLibrary />
            </Grid>
            <Grid item xs={9}>
            <LibraryHeader
                    label1="A"
                    label2=".検索・修正・削除・閲覧"
                    label3="図書室管理"
                />
                <Grid className='hr'></Grid><br />
              
                {isLoaded && bookdata && bookdata.bookNo&& formData&&
                    <form name="vieweditdelete" id="form" onSubmit={handleSubmit(onSubmit)}>
                        <Grid>
                            <Grid container className="table_seven">
                                <Grid className="hr"></Grid>
                                <Grid className="hr"></Grid>
                                
                                <Grid className="member_monitor_content content-row">
                             
                                    <Grid item xs={5} padding={2}>
                                       
                                        <Grid className="content-row" item xs={12} container >
                                            <Grid className="black" item xs={5} paddingBottom={0.5}>
                                                <span>● ISBN</span>
                                            </Grid>
                                            <Grid  item xs={7} >
                                            
                                            <input className="bdr_text4" type="text"
                                            name="isbnCode"
                                            defaultValue={bookdata.isbnCode}
                                            onChange={handleInputChange}
                                             />

                                            </Grid>
                                        </Grid>
                                       
                                        <Grid item xs={12} container paddingTop={1}>
                                            <Grid item xs={5} className="black">● 管理コード</Grid>
                                            <Grid item xs={7}>
                                                
                                                        <select
                                                        name="lbCode1"
                                                            className='bdr_text4'
                                                            
                                                          value={formData.lbCode1}
                                                            onChange={handleInputChange}>
                                                           
                                                            {categorybookdata.map((option: any) => (
                                                                <option key={option.value} value={option.id}>
                                                                    {option.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    {/* )}
                                                /> */}
                                            </Grid></Grid>
                                        <Grid item xs={12} container paddingTop={1}>
                                            <Grid item xs={5}></Grid>
                                            <Grid item xs={7}>
                                            
                                                        <select 
                                                        name="lbCode2"
                                                            className='bdr_text4'
                                                            value={formData.lbCode2}
                                                            onChange={handleInputChange}>
                                                           
                                                            {subcategorybookdata.map((option: any) => (
                                                                <option key={option.value} value={option.id}>
                                                                    {option.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                   
                                                </Grid></Grid>

                                         <Grid className="content-row" item xs={12} container >
                                            <Grid className="black" item xs={5} paddingBottom={0.5}>
                                                <span>● 連番</span>
                                            </Grid>
                                            <Grid  item xs={7} >
                                            
                                            <input className="bdr_text4" type="text"
                                            name="bookno"
                                            defaultValue={bookdata.bookNo}
                                            onChange={handleInputChange}
                                             />

                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} container paddingTop={1}>
                                            <Grid item xs={5} className="black">● 掲載場所</Grid>
                                            <Grid item xs={7}>
                                                <input
                                                    type="radio"
                                                    className="mg_lftrg"
                                                    name="placement"
                                                    value="newBookChecked"
                                                    checked={selectedoption=="newBookChecked"}
                                                    onChange={handleOptionChange}
                                                />
                                               
                                                <label className="blacktxt mg_lftrgt">新刊書</label>
                                                <input className='mg_lftrgt' type="radio" 
                                                    name="placement"
                                                    value="RecommendedChecked"
                                                    checked={selectedoption=="RecommendedChecked"}
                                                    onChange={handleOptionChange}
                                                    />
                                                <label className="blacktxt mg_lftrgt">お薦め</label><br />

                                                <input type="radio" className="mg_lftrgt" 
                                                name="placement"
                                                value="ByWorkChecked"
                                                checked={selectedoption=="ByWorkChecked"}
                                                onChange={handleOptionChange}
                                                />
                                                <label className="blacktxt mg_lftrgt">著作別</label>
                                                <input className='mg_lftrgt' type="radio" 
                                                name="placement"
                                                value="BySymptomChecked"
                                                checked={selectedoption=="BySymptomChecked"}
                                                onChange={handleOptionChange}
                                                />
                                                <label className="blacktxt mg_lftrgt">症状別</label><br />

                                                <input type="radio" className="mg_lftrgt" 
                                                name="placement"
                                                value="ByTherapyChecked"
                                                checked={selectedoption=="ByTherapyChecked"}
                                                onChange={handleOptionChange}
                                                />
                                                <label className="blacktxt mg_lftrgt">療法別</label>
                                                <input className='mg_lftrgt' type="radio" 
                                                name="placement"
                                                value="OthersChecked"
                                                checked={selectedoption=="OthersChecked"}
                                                onChange={handleOptionChange}
                                                 />
                                                <label className="blacktxt mg_lftrgt">その他</label><br />

                                                <input type="radio" className="mg_lftrgt"  
                                                name="placement"
                                                value="NotlistedChecked"
                                                checked={selectedoption=="NotlistedChecked"}
                                                onChange={handleOptionChange}
                                                />
                                                <label className="blacktxt mg_lftrgt">非掲載</label>
                                            </Grid></Grid>
                                        
                                        <Grid className="content-row" item xs={12} container >
                                            <Grid className="black" item xs={5} paddingBottom={0.5}>
                                                <span>● タイトル</span>
                                            </Grid>
                                            <Grid  item xs={7} >
                                            
                                            <input className="bdr_text4" type="text"
                                            name="title"
                                            defaultValue={bookdata.title}
                                            onChange={handleInputChange}
                                             />

                                            </Grid>
                                        </Grid>
                                     
                                        <Grid className="content-row" item xs={12} container >
                                            <Grid className="black" item xs={5} paddingBottom={0.5}>
                                                <span>● 著作名</span>
                                            </Grid>
                                            <Grid  item xs={7} >
                                            
                                            <input className="bdr_text4" type="text"
                                            name="author"
                                            defaultValue={bookdata.author}
                                            onChange={handleInputChange}
                                             />

                                            </Grid>
                                        </Grid>
                                        
                                        <Grid className="content-row" item xs={12} container >
                                            <Grid className="black" item xs={5} paddingBottom={0.5}>
                                                <span>● 編集</span>
                                            </Grid>
                                            <Grid  item xs={7} >
                                            
                                            <input className="bdr_text4" type="text"
                                            name="editSupervision"
                                            defaultValue={bookdata.editSupervision}
                                            onChange={handleInputChange}
                                             />

                                            </Grid>
                                        </Grid>
                                       
                                        <Grid className="content-row" item xs={12} container >
                                            <Grid className="black" item xs={5} paddingBottom={0.5}>
                                                <span>● 発売元</span>
                                            </Grid>
                                            <Grid  item xs={7} >
                                            
                                            <input className="bdr_text4" type="text"
                                            name="publisher"
                                            defaultValue={bookdata.publisher}
                                            onChange={handleInputChange}
                                             />

                                            </Grid>
                                        </Grid>
                                        
                                        <Grid className="content-row" item xs={12} container >
                                            <Grid className="black" item xs={5} paddingBottom={0.5}>
                                                <span>● 価格</span>
                                            </Grid>
                                            <Grid  item xs={7} >
                                            
                                            <input className="bdr_text4" type="text"
                                            name="price"
                                            defaultValue={bookdata.price}
                                            onChange={handleInputChange}
                                             />

                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} container paddingTop={1}>
                                            <Grid item xs={5} className="black">● 発売日</Grid>
                                            <Grid item xs={7}>
                                               
                                                        <ReactDatePicker
                                                            className="bdr_text4"
                                                            name={"releace_date"}
                                                            ref={datePickerRef}
                                                            selected={selectedDate}
                                                            onChange={handleDateChange}
                                                            dateFormat="yyyy-MM-dd"
                                                        />
                                                
                                                <img
                                                    className="bg_white cursor_pointer"
                                                    src={calendericon}
                                                    alt="calendar"
                                                    width={14}
                                                    height={14}
                                                    onClick={handleButtonClick1}
                                                />
                                            </Grid></Grid>
                                        <Grid item xs={12} container paddingTop={1}>
                                            <Grid item xs={5} className="black">● 追加日</Grid>
                                            <Grid item xs={7}>
                                             
                                                        <ReactDatePicker
                                                            className="bdr_text4"
                                                            name={"purchase_date"}
                                                            ref={datePickerRef2}
                                                            selected={selectedPurchaseDate}
                                                            onChange={handlePurchaseDateChange}
                                                            dateFormat="yyyy-MM-dd"
                                                        />
                                                  
                                                <img
                                                    className="bg_white cursor_pointer"
                                                    src={calendericon}
                                                    alt="calendar"
                                                    width={14}
                                                    height={14}
                                                    onClick={handleButtonClick2}
                                                /> </Grid></Grid>

                                        <Grid item xs={12} container paddingTop={1}>
                                            <Grid item xs={5} className="black">● 上書日</Grid>
                                            <Grid item xs={7}>
                                            
                                                        <ReactDatePicker
                                                            className="bdr_text4"
                                                            name={"overwrite_date"}
                                                            ref={datePickerRef3}
                                                            selected={selectedOverwriteDate}
                                                            onChange={handleOverwriteDateChange}
                                                            dateFormat="yyyy-MM-dd"
                                                        />
                                               
                                                <img
                                                    className="bg_white cursor_pointer"
                                                    src={calendericon}
                                                    alt="calendar"
                                                    width={14}
                                                    height={14}
                                                    onClick={handleButtonClick3}
                                                /> </Grid></Grid>
                                    </Grid>
                                    <Grid item xs={7} >
                                        <Grid className="black">● 内容</Grid>
                                       
                                         <textarea className='bdr_text5'
                                             
                                            name="summary"
                                            defaultValue={bookdata.summary}
                                            onChange={handleInputChange}>
                                        </textarea>
                                        <Grid className="hr"></Grid>
                                        <Grid className="hr"></Grid>
                                    
                                             <textarea className='bdr_text5'
                                             
                                             name="image"
                                             defaultValue={bookdata.image}
                                             onChange={handleInputChange}>
                                         </textarea>
                                        
                                             <textarea className='bdr_text5'
                                             
                                            name="link"
                                             defaultValue={bookdata.link}
                                             onChange={handleInputChange}>
                                         </textarea>
                                        <Grid className='hr'></Grid>
                                        <Grid container xs={12} flexDirection={"row"}>
                                            <Grid item xs={4} >{bookdata.image && <img src={bookdata.image} width={165} height={200} alt="book_image" />}</Grid>
                                            <Grid container xs={7} flexDirection={"column"}>
                                                <Grid ><span className='black'>● 貸出履歴</span></Grid>
                                                <Grid >
                                                    <TableContainer className="edit-table-root">
                                                        <Table>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell className="edit-table-root-col7 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
                                                                        貸出No
                                                                    </TableCell>
                                                                    <TableCell className="edit-table-root-col7 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
                                                                        貸出日
                                                                    </TableCell>
                                                                    <TableCell className="edit-table-root-col7 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
                                                                        返却日
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody className="editModifying_cell_background">
                                                                {data?.data?.map((item: any, index: any) => (
                                                                    <TableRow
                                                                        key={item.id}
                                                                        className="editModifying_cell_background"
                                                                    >
                                                                        <TableCell className="edit-table-root-col9 cell-paddingreserv edit-table-root-border-right-bottom">
                                                                            {item.lendingNo&&item.lendingNo}
                                                                        </TableCell>
                                                                        <TableCell className="edit-table-root-col9 cell-paddingreserv edit-table-root-border-right-bottom">
                                                                            {item.lendingDay && formatDateArray(item.lendingDay)}
                                                                        </TableCell>
                                                                        <TableCell
                                                                            className="edit-table-root-col9 cell-paddingreserv edit-table-root-border-right-bottom"
                                                                        >
                                                                            {item.returnDate && formatDateArray(item.returnDate)}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>


                            <Grid container xs={12} flexDirection={"row"}>
                                <Grid item xs={10}></Grid>
                                <Grid item xs={2} flexDirection={"row"}>
                                    <div>
                                        {currentPage !== 1 ?

                                            <button onClick={()=>prevPage()} style={{ border: 'none' }} disabled={currentPage === 1}>
                                                <span>≪前</span>
                                            </button> : null}
                                        {renderPageButtons()}
                                        {currentPage !== bookIdlist?.length ?
                                            <button onClick={()=>nextPage()} style={{ border: 'none' }} disabled={currentPage === bookIdlist?.length}>
                                                <span>次≫</span>
                                            </button> : null}</div>
                                </Grid>
                            </Grid>


                            <Grid
                                item
                                xs={12}
                                container
                                display={"flex"}
                                justifyContent={"center"}
                            >

                                <Controller
                                    name="submitButton"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <>
                                            <Button type="submit" name="submitButton" value="submitButton1"
                                            >
                                                <img className="padding_top" src={submitbtn}
                                                    onClick={() => setValue('submitButton', 'submitButton')}
                                                    {...field} />
                                            </Button>

                                            <Button type="submit" name="submitButton" value="submitButton2"
                                            >
                                                <img className="padding_top" src={deletebtn}
                                                    onClick={() => setValue('submitButton', 'deleteButton')}
                                                    {...field} />
                                            </Button>
                                        </>
                                    )}
                                />

                            </Grid>
                        </Grid>
                    </form>}
            </Grid>
        </Grid>
    );
}

export default BookView;