import { Grid, Button } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import LeftPanLibrary from "../Common/LeftPanLibrary";
import { useForm, Controller } from "react-hook-form";
import C1AbookLeftRow from "./AdditionC1AbookComponent/C1AbookLeftRow";
import keep from "../../../../src/assets/admin_library/images/lib_save.png";
import del from "../../../../src/assets/admin_library/images/lib_delete.png";
import LibraryapiClient from "../../../API/LibraryAPI-client";
import InputSelect from "../../Common/Inputs/InputSelect";
import InputRadio from "../../Common/Inputs/InputRadio";
import InputTextArea from "../../Common/Inputs/InputTextArea";
import InputDatePicker from "../../Common/Inputs/InputDatePicker";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LibraryHeader from "../Common/LibraryHeader";
import { currencyFormat } from "../../Common/currency";
import { setMemberReg } from "../../../Redux/actions";
import fields from "./AdditionC1AbookComponent/fields";


const AddC1Abook = () => {
  const dispatch=useDispatch();
  const location = useLocation();
  const [mainCategory, setMainCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const someFunction = () => {
    fields.map((field:any)=>{
       setValue(field,'');
    })
    setTriggerEffect(true);
  };
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  let bookData: any;

  bookData = useSelector((state: any) => {
    return state?.memberData?.allBookItems;
  });

  const navigate = useNavigate();

  useEffect(() => {
    getMainCategory();
    getSubCategory();
    setTriggerEffect(false);
  }, [triggerEffect]);

  const getMainCategory = async () => {
    try {
      const apiData = await LibraryapiClient.post(
        "library/books/categoryList",
        {}
      );
      if (apiData) {
        setMainCategory(apiData.data.data);
      }
    } catch (error) {}
  };

  const getSubCategory = async () => {
    try {
      const apiData = await LibraryapiClient.post(
        "library/books/subCategoryList",
        {}
      );
      if (apiData) {
        setSubCategory(apiData.data.data);
      }
    } catch (error) {}
  };

  const {
    control,
    formState: { errors },
    setValue,
    setError,
reset,
    getValues,
  } = useForm();

  const handleAdd = () => {
    const data1 = getValues();

    if (!data1.addition_of_book_isb) {
      alert("ISBNコードをいれてください");
      setError("addition_of_book_isb", {
        type: "required",
      });
      return;
    } else if (!data1.addition_of_book_mainCategory) {
      setError("addition_of_book_mainCategory", {
        type: "required",
      });
      alert("大分類を選択してください");
      return;
    } else if (!data1.addition_of_book_subCategory) {
      setError("addition_of_book_subCategory", {
        type: "required",
      });
      alert("中分類を選択してください");
      return;
    } else if (!data1.addition_of_book_title) {
      setError("addition_of_book_title", {
        type: "required",
      });
      alert("タイトルを記入ください ");
      return;
    } else if (!data1.addition_of_book_publisher) {
      setError("addition_of_book_publisher", {
        type: "required",
      });
      alert("発売元を入れてください");
      return;
    } else if (!/^\d{1,3}(,\d{3})*(\.\d+)?$|^\d+(\.\d+)?$/.test(data1.addition_of_book_price)) {
      setError("addition_of_book_price", {
        type: "required",
      });
      alert("有効な価格を入力してください");
      return;
    } else if(!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(data1.addition_of_book_date_added)){
      setError("addition_of_book_date_added", {
        type: "true",
      });
      alert("有効な日付を入力してください");

      return;
    } else if (!/^\d+$/.test(data1.addition_of_book_continuously)) {
      setError("addition_of_book_continuously", {
        type: "true",
      });
      alert("Please provide a valid book no");
      return;
    } else if (!/^\d+$/.test(data1.addition_of_book_number_of_book)) {
      setError("addition_of_book_number_of_book", {
        type: "true",
      });
      alert("正しい追加冊数を入れてください");
      return;
    }
    else if (data1.addition_of_book_date_submission && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(data1.addition_of_book_date_submission)) {
      setError("addition_of_book_date_submission", {
        type: "validate",
      });
      alert("有効な日付を入力してください");
      return;
    }
    else if (data1.addition_of_book_release_date && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(data1.addition_of_book_release_date)) {
      setError("addition_of_book_release_date", {
        type: "validate",
      });
      alert("有効な日付を入力してください");
      return;
    }
      saveBookApi(data1);     
  };

  const saveBookApi = async (data: any) => {
    const dateString = data.addition_of_book_release_date;
    const yearPublished = new Date(dateString).getFullYear();
    let categoryId;
    let subCategoryId;
    mainCategory.map((item: any) => {
      if (data?.addition_of_book_mainCategory == item.id) {
        categoryId = item.id;
      }
    });
    subCategory.map((item: any) => {
      if (data?.addition_of_book_subCategory == item.id) {
        subCategoryId = item.id;
      }
    });
    try {
      const dataRequest = {
        bookNo: data?.addition_of_book_continuously ?? "",
        isbnCode: data?.addition_of_book_isb ?? "",
        category: categoryId ?? "",
        subCategory: subCategoryId ?? "",
        title: data?.addition_of_book_title ?? "",
        author: data?.addition_of_book_title_of_book ?? "",
        editSupervision: data?.addition_of_book_supervision ?? "",
        publisher: data?.addition_of_book_publisher ?? "",
        price: currencyFormat(data?.addition_of_book_price) ?? "",
        oldPrice:bookData[currentPage - 1]?.Price!=undefined ? currencyFormat(bookData[currentPage - 1]?.Price) : currencyFormat(data?.addition_of_book_price),
        summary: data?.addition_of_book_date_content1 ?? "",
        placement: data?.addition_of_book_placement ?? "",
        purchaseDate: data?.addition_of_book_date_added ?? "",
        purchaseNo: data?.addition_of_book_number_of_book==0?1:data?.addition_of_book_number_of_book,
        image: data.addition_of_book_date_image ?? "",
        link: data.addition_of_book_date_link ?? "",
        status: 1,
        isLended: 0,
        availCount:1,
        documents: "",
        releaseDate: data?.addition_of_book_release_date ?? "",
        overwriteDate: data?.addition_of_book_date_submission ?? "",
        publishedYear:yearPublished??""
      };


      const apiData = await LibraryapiClient.post(
        "library/amazon/savebooks",
        dataRequest,
        {}
      );
      if (apiData) {
        if (
          apiData.data.data === "Book number already registered" ||
          apiData.data.data === "Invalid book number provided for this category"
        ) {
          alert(apiData.data.data);
        } else {
     
          if(bookData.length>1){
            const id = bookData[currentPage - 1].id;
            if (bookData[currentPage - 1].id === id) {
              someFunction();
              const filteredData = bookData.filter((item:any, index:any) => {
                if (item.id === id) {
                  return false;
                }
                return true;
              });
              dispatch(setMemberReg("allBookItems", filteredData));
            }
          }else{
            navigate('/booklist');
          }
        }
      }
    } catch (error) {
      alert(error);
    }
  };



  const totalpageSetting = () => {
    const pageNumbers = [];
    const pageCount = 3; // Number of page numbers to display at a time
    const totalPageCount = bookData.length;

    // Calculate the start and end page numbers based on the current page
    let startPage = currentPage - Math.floor(pageCount / 2);
    let endPage = startPage + pageCount - 1;

    // Adjust start and end page numbers to ensure they are within valid bounds
    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPageCount, pageCount);
    } else if (endPage > totalPageCount) {
      endPage = totalPageCount;
      startPage = Math.max(1, endPage - pageCount + 1);
    }

    // Add "Previous" button if not on the first page
    if (currentPage > 1) {
      pageNumbers.push(
        <span
          style={{
            fontWeight: "bold",
            color: "darkblue",
            fontSize: "14px",
            cursor: "pointer",
            paddingRight: "5px",
            textDecoration: "underline",
          }}
          key="previous"
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          ≪前
        </span>
      );
    }

    // Add the page numbers to the array
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span
          style={{
            fontSize: "14px",
            cursor: "pointer",
            paddingLeft: "5px",
            ...(i === currentPage
              ? {
                  color: "black",
                  fontWeight: "bold",
                }
              : {
                  color: "darkblue",
                  textDecoration: "underline",
                  paddingBottom: "4px",
                  fontWeight: "bolder",
                }),
          }}
          key={i}
          onClick={() => {
            setCurrentPage(i);
          }}
        >
          {i}
        </span>
      );
    }

    // Add "Next" button if not on the last page
    if (currentPage<totalPageCount) {
      pageNumbers.push(
        <span
          style={{
            fontWeight: "bold",
            color: "darkblue",
            fontSize: "14px",
            cursor: "pointer",
            paddingLeft: "5px",
            textDecoration: "underline",
          }}
          key="next"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          次≫
        </span>
      );
    }

    return pageNumbers;
  };


  return (
    <Grid container xs={12} spacing={1} padding={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanLibrary />
      </Grid>
      <Grid item xs={9}>
        <LibraryHeader label1="C.1" label2="-A図書の追加" label3="図書室管理" />
        <Grid className="hr"></Grid>
        <br />
        <span className="black lib-marg">C-3</span>
        <form name="Additionofc1books" id="form">
          <Grid>
            <Grid container className="table_seven">
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
              <Grid className="member_monitor_content content-row">
                <Grid item xs={5}>
                  <C1AbookLeftRow
                    setValue={setValue}
                    value={bookData && bookData[currentPage - 1]?.ISBN}
                    title="● ISBN"
                    name="addition_of_book_isb"
                    control={control}
                    error={errors.addition_of_book_isb}
                  />
                  <Grid item xs={12} container>
                    <Grid item xs={5} className="black">
                      ● 管理コード
                    </Grid>
                    <Grid item xs={7}>
                      <InputSelect
                        defaultValue={
                          bookData && bookData[currentPage - 1]?.lbCode1
                        }
                        control={control}
                        options={mainCategory}
                        name="addition_of_book_mainCategory"
                        error={errors.addition_of_book_mainCategory}
                        sampleOption={"（大分類）"}
                        className="bdr_text4"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} container>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={7}>
                      <InputSelect
                        defaultValue={
                          bookData && bookData[currentPage - 1]?.lbCode2
                        }
                        control={control}
                        options={subCategory}
                        name="addition_of_book_subCategory"
                        error={errors.addition_of_book_subCategory}
                        sampleOption={"（中分類）"}
                        className="bdr_text4"
                      />
                    </Grid>
                  </Grid>

                  <C1AbookLeftRow
                  setValue={setValue}
                    value={bookData && bookData[currentPage - 1]?.bookNo}
                    title="● 連番"
                    name="addition_of_book_continuously"
                    control={control}
                    error={errors.addition_of_book_continuously}
                  />
                  <Grid item xs={12} container>
                    <Grid item xs={5} className="black">
                      ● 掲載場所
                    </Grid>
                    <Grid item xs={7}>
                      <InputRadio
                        defaultValue={
                          bookData && bookData[currentPage - 1]?.placement
                        }
                        control={control}
                        className={"mg_lftrgt"}
                        name={"addition_of_book_placement"}
                        defaultValueActive={"1"}
                        inputValue={"1"}
                      />
                      <label className="blacktxt mg_lftrgt">新刊書</label>
                      <InputRadio
                        defaultValue={
                          bookData && bookData[currentPage - 1]?.placement
                        }
                        control={control}
                        className={"mg_lftrgt"}
                        name={"addition_of_book_placement"}
                        defaultValueActive={"1"}
                        inputValue={"2"}
                      />
                      <label className="blacktxt mg_lftrgt">お薦め</label>
                      <br />
                      <InputRadio
                        defaultValue={
                          bookData && bookData[currentPage - 1]?.placement
                        }
                        control={control}
                        className={"mg_lftrgt"}
                        name={"addition_of_book_placement"}
                        defaultValueActive={"1"}
                        inputValue={"3"}
                      />
                      <label className="blacktxt mg_lftrgt">著作別</label>
                      <InputRadio
                        defaultValue={
                          bookData && bookData[currentPage - 1]?.placement
                        }
                        control={control}
                        className={"mg_lftrgt"}
                        name={"addition_of_book_placement"}
                        defaultValueActive={"1"}
                        inputValue={"4"}
                      />
                      <label className="blacktxt mg_lftrgt">症状別</label>
                      <br />
                      <InputRadio
                        defaultValue={bookData && bookData[currentPage - 1]?.placement}
                        control={control}
                        className={"mg_lftrgt"}
                        name={"addition_of_book_placement"}
                        defaultValueActive={"1"}
                        inputValue={"5"}
                      />
                      <label className="blacktxt mg_lftrgt">療法別</label>
                      <InputRadio
                        defaultValue={bookData && bookData[currentPage - 1]?.placement}
                        control={control}
                        className={"mg_lftrgt"}
                        name={"addition_of_book_placement"}
                        defaultValueActive={"1"}
                        inputValue={"6"}
                      />
                      <label className="blacktxt mg_lftrgt">その他</label>
                      <br />
                      <InputRadio
                        defaultValue={bookData && bookData[currentPage - 1]?.placement}
                        control={control}
                        className={"mg_lftrgt"}
                        name={"addition_of_book_placement"}
                        defaultValueActive={"1"}
                        inputValue={"7"}
                      />
                      <label className="blacktxt mg_lftrgt">非掲載</label>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} container>
                    <Grid item xs={5} className="black">
                      ● タイトル
                    </Grid>
                    <Grid item xs={7}>
                      <InputTextArea
                      setValue={setValue}
                        defaultValue={bookData && bookData[currentPage - 1]?.Title}
                        control={control}
                        name={"addition_of_book_title"}
                        error={errors.addition_of_book_title}
                      />
                    </Grid>
                  </Grid>
                  <C1AbookLeftRow
                    setValue={setValue}
                    value={bookData && bookData[currentPage - 1]?.Author}
                    title="● 著作名"
                    name="addition_of_book_title_of_book"
                    control={control}
                  />
                  <C1AbookLeftRow
                  setValue={setValue}
                    value={
                      bookData && bookData[currentPage - 1]?.editSupervision
                    }
                    title="	● 編集・監修"
                    name="addition_of_book_supervision"
                    control={control}
                  />
                  <C1AbookLeftRow
                    setValue={setValue}
                    value={bookData && bookData[currentPage - 1]?.publisher}
                    title="	● 発売元"
                    name="addition_of_book_publisher"
                    error={errors.addition_of_book_publisher}
                    control={control}
                  />
                  <C1AbookLeftRow
                    setValue={setValue}
                    value={bookData && bookData[currentPage - 1]?.Price}
                    title="	● 価格"
                    name="addition_of_book_price"
                    control={control}
                    error={errors.addition_of_book_price}
                  />
                  <Grid item xs={12} container>
                    <Grid item xs={5} className="black">
                      ● 発売日
                    </Grid>
                    <Grid item xs={7}>
                      <InputDatePicker
                        defaultValue={
                          bookData && bookData[currentPage - 1]?.ReleaseDate
                        }
                        setValue={setValue}
                        control={control}
                        className={"bdr_text4"}
                        name={"addition_of_book_release_date"}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} container>
                    <Grid item xs={5} className="black">
                      ● 追加日
                    </Grid>
                    <Grid item xs={7}>
                      <InputDatePicker
                        defaultValue={
                          bookData && bookData[currentPage - 1]?.dateRegistered
                        }
                        setValue={setValue}
                        control={control}
                        className={"bdr_text4"}
                        name={"addition_of_book_date_added"}
                        error={errors.addition_of_book_date_added}
                      />
                    </Grid>
                  </Grid>
                  <C1AbookLeftRow
                  setValue={setValue}
                    value={bookData && bookData[currentPage - 1]?.availCount}
                    error={errors.addition_of_book_number_of_book}
                    title="	● 追加冊数"
                    name="addition_of_book_number_of_book"
                    control={control}
                  />
                  <Grid item xs={12} container>
                    <Grid item xs={5} className="black">
                      ● 上書日
                    </Grid>
                    <Grid item xs={7}>
                      <InputDatePicker
                        defaultValue={
                          bookData && bookData[currentPage - 1]?.overwiteDate
                        }
                        setValue={setValue}
                        control={control}
                        className={"bdr_text4"}
                        name={"addition_of_book_date_submission"}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={7}>
                  <Grid className="black">● 内容</Grid>
                  <InputTextArea
                  setValue={setValue}
                    defaultValue={
                      bookData && bookData[currentPage - 1]?.summary
                    }
                    control={control}
                    name={"addition_of_book_date_content1"}
                    className={"bdr_text5"}
                  />
                  <Grid className="hr"></Grid>
                  <Grid className="hr"></Grid>
                  <InputTextArea
                  setValue={setValue}
                    defaultValue={bookData && bookData[currentPage - 1]?.image}
                    control={control}
                    name={"addition_of_book_date_image"}
                    className={"bdr_text5"}
                  />
                  <InputTextArea
                  setValue={setValue}
                    defaultValue={
                      bookData && bookData[currentPage - 1]?.AmazonLink
                    }
                    control={control}
                    name={"addition_of_book_date_link"}
                    className={"bdr_text5"}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container xs={12} flexDirection={"row"}>
              <Grid item xs={9}></Grid>
              <Grid item xs={3} flexDirection={"row"}>
                <Grid xs={6}>{bookData && totalpageSetting()}</Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container display={"flex"} justifyContent={"center"}>
                <Grid className="lib-mur">
                  <Button type="button" onClick={() => handleAdd()}>
                    <img src={keep} />
                  </Button>
                </Grid>
                <Grid className="">
                  <Button type="button" onClick={() => navigate(-1)}>
                    <img src={del} />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddC1Abook;
