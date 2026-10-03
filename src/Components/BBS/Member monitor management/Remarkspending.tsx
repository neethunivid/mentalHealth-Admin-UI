import React, { Component, useState, useEffect, useRef } from "react";
import { Grid, Typography, Box, IconButton, Button } from "@mui/material";
import LeftPanBBS from "../../Common/LeftPanBBS";
import calendericon from "../../../assets/images/icon_calender.gif";
import approvebtn from "../../../assets/images/pg_13_btn_left.gif";
import deletebtn from "../../../assets/images/pg_13_btn_middle.gif";
import options from "../Member monitor management/timedata";
import optionsdata from "../Member monitor management/minutesdata";
import "../Member monitor management/Member monitor Comp/memberMointer.scss";
import TreeData from "./Member monitor Comp/TreeData";
import { useLocation } from "react-router-dom";
import apiClient from "../../../API/API-client";
import { fetchData, setMemberReg } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import { Label } from "@mui/icons-material";
import Remark_Pen_Header from "./Member monitor Comp/Remark_Pen_Header";
import Remark_pentopSelect from "./Member monitor Comp/Remark_pentopSelect";
import Remark_pen_table_data from "./Member monitor Comp/Remark_pen_table_data";
import Remark_pen_TreeData from "./Member monitor Comp/Member_pen_TreeData";
import Remark_pen_Content_box from "./Member monitor Comp/Remark_pen_Content_box";
import Member_pen_selectBox from "./Member monitor Comp/Member_pen_selectBox";
import {
  convertTimestampToDateTime,
  convertTimestampToDateTime1,
  convertTimestampToDateTime2,
  convertTimestampToDateTime3,
} from "./Member monitor Comp/Functions/TimeConvert";
import { formatDateString } from "../../Common/Date_conversion";

const Remarkspending_review = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const stateFromPreviousScreen = location.state;

  const reviewData = useSelector((state: any) => {
    return state?.reducer1.data?.reviewLists;
  });

  // const reviewCountData: any = useSelector(
  //   (state: any) => state?.memberData?.reviewCount
  // );

  const [dataIndex, setDataIndex] = useState<any>(0);
  const [remarkCount, setRemarkCount] = useState<any>(0);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, settotalPages] = useState<number>(0);
  // // const pageSize = 1;
  // const [currentDataPage, setcurrentDataPage] = useState<any>([]);

  const datePickerRef = useRef<ReactDatePicker>(null);
  const [reviewButton, setReviewButton] = useState<string>();
  useEffect(() => {
    setReviewButton(stateFromPreviousScreen.param);

    fetchRemark();
  }, []);

  const fetchRemark = async (data?: any) => {
    try {
      let dataRequest: any = {
        type: data ?? stateFromPreviousScreen.param,
      };

      dispatch(fetchData("reviewLists", "api/viewRemarks", dataRequest));
      // window.location.reload();

      if (!reviewData || !Array.isArray(reviewData)) {
        // Now you have the parent remark and the total remark count
        if (reviewData && reviewData.data && currentPage > 0) {
        }
        fetchRemarkCount();
        return null; // Return null or a fallback component if the data is not available or is not an array
      } else if (!reviewData) {
      }
    } catch (e) {
      console.log(e, "error");
    }
  };

  const reviewCountData: any = useSelector(
    (state: any) => state?.memberData?.reviewCount
  );

  //this function for pagination

  const totalpageSetting = () => {
    let data;
    let count;
    let remarkCount1;
    //counts set for data variable
    if (reviewButton == "normal") {
      if (reviewData?.data[currentPage - 1]?.remarks == null) {
        remarkCount1 = 1;
      } else {
        remarkCount1 = reviewData?.data[currentPage - 1]?.remarks.length;
      }

      setValue(
        "review_title",
        `${reviewData?.data[currentPage - 1]?.member.title}`
        // `Re${remarkCount1+1 ?? 1}${" "}${
        //   reviewData?.data[currentPage - 1]?.member.title
        // }`
      );
      setValue("st_hr", formatedHr);
      setValue("st_min", formatedMin);
      count = reviewCountData?.normal;
      data = stateFromPreviousScreen.counts.normal;
    } else if (reviewButton == "anxiety") {
      if (reviewData?.data[currentPage - 1]?.remarks == null) {
        remarkCount1 = 1;
      } else {
        remarkCount1 = reviewData?.data[currentPage - 1]?.remarks.length;
      }
      setValue(
        "review_title",
        `${reviewData?.data[currentPage - 1]?.member.title}`
        // `Re${remarkCount1+1 ?? 1}${" "}${
        //   reviewData?.data[currentPage - 1]?.member.title
        // }`
      );
      setValue("st_hr", formatedHr);
      setValue("st_min", formatedMin);
      count = reviewCountData?.anxiety;
      data = stateFromPreviousScreen.counts.anxiety;
    } else if (reviewButton == "blackmail") {
      if (reviewData?.data[currentPage - 1]?.remarks == null) {
        remarkCount1 = 1;
      } else {
        remarkCount1 = reviewData?.data[currentPage - 1]?.remarks.length;
      }
      setValue("review_title", reviewData?.data[currentPage - 1]?.member.title);
      setValue(
        "review_title",
        `${reviewData?.data[currentPage - 1]?.member.title}`
        // `Re${remarkCount1+1 ?? 1}${" "}${
        //   reviewData?.data[currentPage - 1]?.member.title
        // }`
      );
      setValue("st_hr", formatedHr);
      setValue("st_min", formatedMin);
      count = reviewCountData?.blackmail;
      data = stateFromPreviousScreen.counts.blackmail;
    } else if (reviewButton == "other") {
      if (reviewData?.data[currentPage - 1]?.remarks == null) {
        remarkCount1 = 1;
      } else {
        remarkCount1 = reviewData?.data[currentPage - 1]?.remarks.length;
      }

      setValue(
        "review_title",
        `${reviewData?.data[currentPage - 1]?.member.title}`
        // `Re${remarkCount1+1 ?? 1}${" "}${
        //   reviewData?.data[currentPage - 1]?.member.title
        // }`
      );
      setValue("st_hr", formatedHr);
      setValue("st_min", formatedMin);
      count = reviewCountData?.other;
      data = stateFromPreviousScreen.counts.other;
    } else if (reviewButton == "growingup") {
      if (reviewData?.data[currentPage - 1]?.remarks == null) {
        remarkCount1 = 1;
      } else {
        remarkCount1 = reviewData?.data[currentPage - 1]?.remarks.length;
      }

      setValue(
        "review_title",
        `${reviewData?.data[currentPage - 1]?.member.title}`
        // `Re${remarkCount1+1 ?? 1}${" "}${
        //   reviewData?.data[currentPage - 1]?.member.title
        // }`
      );
      setValue("st_hr", formatedHr);
      setValue("st_min", formatedMin);
      count = reviewCountData?.growingup;
      data = stateFromPreviousScreen.counts.growingup;
    } else if (reviewButton == "addition1") {
      if (reviewData?.data[currentPage - 1]?.remarks == null) {
        remarkCount1 = 1;
      } else {
        remarkCount1 = reviewData?.data[currentPage - 1]?.remarks.length;
      }

      setValue(
        "review_title",
        `${reviewData?.data[currentPage - 1]?.member.title}`
        // `Re${remarkCount1+1 ?? 1}${" "}${
        //   reviewData?.data[currentPage - 1]?.member.title
        // }`
      );
      setValue("st_hr", formatedHr);
      setValue("st_min", formatedMin);
      count = reviewCountData?.addition1;
      data = stateFromPreviousScreen.counts.addition1;
    } else if (reviewButton == "addition2") {
      if (reviewData?.data[currentPage - 1]?.remarks == null) {
        remarkCount1 = 1;
      } else {
        remarkCount1 = reviewData.data[currentPage - 1].remarks.length;
      }

      setValue(
        "review_title",
        `${reviewData?.data[currentPage - 1]?.member.title}`
        // `Re${remarkCount1+1 ?? 1}${" "}${
        //   reviewData?.data[currentPage - 1]?.member.title
        // }`
      );
      setValue("st_hr", formatedHr);
      setValue("st_min", formatedMin);
      count = reviewCountData?.addition2;
      data = stateFromPreviousScreen.counts.addition2;
    }

    const pageNumbers = [];
    const pageCount = 2; // Number of page numbers to display at a time
    const totalPageCount = count ?? data;

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

    // Add the page numbers to the array
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        // <button key={i} onClick={() => setCurrentPage(i)}>
        //   {i}
        // </button>

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
          key="next"
          onClick={() => {
            setCurrentPage(i);
          }}
        >
          {i}
        </span>
      );
    }

    // Add "Next"  after pageSize
    if (endPage < totalPageCount) {
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
            setCurrentPage(endPage + 1);
          }}
        >
          {endPage + 1}
        </span>
      );
    }

    return pageNumbers;
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelection = (date: any) => {
    setSelectedDate(date);
  };

  const fetchRemarkCount = async () => {
    try {
      const apiData = await apiClient.get("api/pendingReviewCount");
      if (apiData) {
        //save the redux state api response data
        dispatch(setMemberReg("reviewCount", apiData.data.data));
      }
    } catch (error:any) {
      if (error.response && error.response.status === 403) {
        console.log("403 error occurred");
      } else {
      }
    }
  };

  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const date = formatDateString(data.reviewDate1);

    approvalRemark(data);
  };

  //when date change set the date to the state
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setValue("reviewDate1", date);
  };
  interface RenderTree {
    id: string;
    name: string;
    children?: readonly RenderTree[];
  }
  const handleButtonClick = () => {
    datePickerRef.current?.setOpen(true);
  };

  //review approval dialog
  const approvalRemark = (data: any) => {
    //confirmation window show approval
    const userConfirmation = window.confirm("承認してもよろしいですか？");
    if (userConfirmation) {
      approvalRemarkApi(data);
    } else {
      // User clicked Cancel, do nothing or perform any additional actions
    }
  };

  //review approval api is called
  const approvalRemarkApi = async (data: any) => {
    const id = reviewData?.data[currentPage - 1].member.rid;
    let date1;
    const date = formatDateString(data.reviewDate1);
    if (data?.reviewDate1 == null) {
      date1 = formatDateString(fomatedDate);
    } else {
      date1 = formatDateString(data.reviewDate1);
    }

    try {
      const dataRequest = {
        status: 1,
        text: data.Remarkspending_textfield,
        title: data.review_title,
        date: `${date1}T${data.st_hr}:${data.st_min}:00`,
      };
      const apiData = await apiClient.put(
        "api/updateRemark/" + id,
        dataRequest,
        {}
      );

      if (apiData) {
        //to update the ui calling remark api and reset function clear textarea field
        fetchRemark(reviewButton);
       // Check if the current page is lastpage then after aprroval the current page is set to current page - 1
       if (currentPage === reviewData?.data.length && currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
        reset();
      }
    } catch (error) {
      console.log(error, "error is there");
    }
  };

  //to delete function
  const deleteRemark = () => {
    const userConfirmation = window.confirm("本当に削除しますか？");
    if (userConfirmation) {
      deleteRemarkApi();
    } else {
      // User clicked Cancel, do nothing or perform any additional actions
    }
  };

  //remove review here
  const deleteRemarkApi = async () => {
    const id = reviewData?.data[currentPage - 1].member.rid;

    try {
      const apiData = await apiClient.delete("api/deleteRemark/" + id, {});

      if (apiData) {
        fetchRemark(reviewButton);
      // Check if the current page is lastpage then after deletion the current page is set to current page - 1
      if (currentPage === reviewData?.data.length && currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
      reset();
      }
    } catch (error) {
      console.log(error, "Error");
    }
  };

  //timestamp to Date and time
  const formattedDateTime = convertTimestampToDateTime(
    reviewData?.data[currentPage - 1]?.member?.date
  );

  //timestamp to Date
  const fomatedDate = convertTimestampToDateTime1(
    reviewData?.data[currentPage - 1]?.member?.date
  );

  //timestamp to Hour
  const formatedHr = convertTimestampToDateTime2(
    reviewData?.data[currentPage - 1]?.member?.date
  );

  //timestamp to minutes
  const formatedMin = convertTimestampToDateTime3(
    reviewData?.data[currentPage - 1]?.member?.date
  );

  /*
  this function is fetch each remark review and it's pagination by selecting each room
  */
  const fetchEachRemark = (data: any) => {
    //set reviewButton name to state
    setReviewButton(data);

    //pagination to selected room
    totalpageSetting();

    //calling remark api for selected room
    fetchRemark(data);
    totalpageSetting();
    //  fetchRemark(data);
  };

  return (
    <Grid container xs={12} className="mg_top">
      <Grid item xs={3}>
        <LeftPanBBS />
      </Grid>
      <Grid item className="mg_lftrgt" xs={7}>
        <Remark_Pen_Header
          reviewButton={reviewButton}
          typeDivision={stateFromPreviousScreen.typeDivision}
        />
        <Grid item xs={12} className="text_grid mgtp_bt mglft">
          <Grid xs={10}>
            <Remark_pentopSelect
              handleClick={fetchEachRemark}
              reviewButton={reviewButton}
            />
          </Grid>
          <Grid xs={2}>{totalpageSetting()}</Grid>
        </Grid>
        {reviewData && reviewData?.data.length !== 0 ? (
          <div>
            <form id="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container>
                <Remark_pen_table_data
                  reviewButton={reviewButton}
                  reviewData={reviewData?.data[currentPage - 1]}
                  formattedDateTime={formattedDateTime}
                  typeDivision={stateFromPreviousScreen.typeDivision}
                />
                <Remark_pen_TreeData
                  reviewData={reviewData?.data[currentPage - 1]}
                  formattedDateTime={formattedDateTime}
                />
              </Grid>
              <Grid className="tpspc_1"></Grid>
              <Grid container>
                <Grid item xs={6}>
                  <Remark_pen_Content_box
                    reviewData={reviewData?.data[currentPage - 1]}
                  />
                  <Grid className="text_grid bg_white">
                    <Grid xs={2}>
                      <li className="blacktxt">タイトル</li>
                    </Grid>
                    <Grid xs={10} className="bgorange">
                      <Controller
                        control={control}
                        defaultValue={
                          reviewData?.data[currentPage - 1]?.member.title
                        }
                        name="review_title"
                        render={({ field }) => {
                          return (
                            <input
                              {...field}
                              type="text"
                              className="inputstyles"
                            />
                          );
                        }}
                      />

                      <Grid className="text_grid greytopbtm1">
                        <Controller
                          control={control}
                          name={"reviewDate1"}
                          render={({ field }) => (
                            <ReactDatePicker
                              className="bdr_text"
                              {...field}
                              ref={datePickerRef}
                              selected={selectedDate ?? fomatedDate}
                              onChange={handleDateChange}
                              dateFormat="yyyy-MM-dd"
                            />
                          )}
                        />
                        <img
                          className="bg_white"
                          src={calendericon}
                          alt="calendar"
                          width={14}
                          height={14}
                          onClick={handleButtonClick}
                        />
                        <Member_pen_selectBox
                          name={"st_hr"}
                          control={control}
                          defaultValue={formatedHr}
                          label={"時"}
                        />
                        <Member_pen_selectBox
                          name={"st_min"}
                          control={control}
                          defaultValue={formatedMin}
                          label={"分"}
                          isHr={false}
                        />
                      </Grid>
                      <Grid className="text_grid">
                        <Button type="submit">
                          <img
                            className="text_grid"
                            src={approvebtn}
                            width={121}
                            height={24}
                          />
                        </Button>
                        <Button>
                          <img
                            onClick={() => deleteRemark()}
                            src={deletebtn}
                            width={64}
                            height={24}
                          />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid item className="mglft ">
                    <Grid className="bdr_white_right itemgrid">
                      <Typography className="white">
                        <strong>フォロー発言</strong>
                      </Typography>
                    </Grid>
                    <Grid className="bgorange blacktxt">
                      <Controller
                        name="Remarkspending_textfield"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <textarea
                            className="remark_pen_textarea"
                            style={{ padding: "2px", marginTop: "3px" }}
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </div>
        ) : (
          <></>
        )}
      </Grid>

      <Grid xs={2}></Grid>
    </Grid>
  );
};

export default Remarkspending_review;
