import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import "../../../assets/css/health.css";
import LeftPanBBS from "../../Common/LeftPanBBS";
import "./Member monitor Comp/memberMointer.scss";
import apiClient from "../../../API/API-client";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncError } from "react-router-dom";
import { setMemberReg } from "../../../Redux/actions";
import { useNavigate } from "react-router-dom";
import Remark_await_review_CountComp from "./Member monitor Comp/Remark_await_review_CountComp";
import Remark_await_additionComp from "./Member monitor Comp/Remark_await_additionComp";
import RemarkAwait_header from "./Member monitor Comp/RemarkAwait_header";

const Remarksawait_review = () => {
  const dispatch = useDispatch();



  useEffect(() => {
    fetchRemarkCount();
  }, []);
  const navigate = useNavigate();

  //calling api to get reviewCount
  const fetchRemarkCount = async () => {
    try {
      const apiData = await apiClient.get("api/pendingReviewCount");

      if (apiData) {
        //save the redux state api response data
        dispatch(setMemberReg("reviewCount", apiData.data.data));
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        console.log("403 error occurred");
      } else {
      }
    }
  };

  //get redux stored api response into a variable
  const reviewCountData: any = useSelector(
    (state: any) => state?.memberData?.reviewCount
  );

  //function to navigate to next screen with params
  const naviagteHandle = (data: any) => {
    //depends on data params changes
    if (data == "normal") {
      const normalStateObj = {
        param: "normal",
        count: reviewCountData?.normal,
        typeDivision: "普通神経症の部屋",
        counts: reviewCountData,
      };

      navigate("/remarkpending", { state: normalStateObj });
    } else if (data == "anxiety") {
      const normalStateObj = {
        param: "anxiety",
        count: reviewCountData?.anxiety,
        typeDivision: "不安神経症の部屋",
        counts: reviewCountData,
      };
      navigate("/remarkpending", { state: normalStateObj });
    } else if (data == "blackmail") {
      const normalStateObj = {
        param: "blackmail",
        count: reviewCountData?.blackmail,
        typeDivision: "強迫神経症の部屋",
        counts: reviewCountData,
      };
      navigate("/remarkpending", { state: normalStateObj });
    } else if (data == "other") {
      const normalStateObj = {
        param: "other",
        count: reviewCountData?.other,
        typeDivision: "その他の部屋",
        counts: reviewCountData,
      };
      navigate("/remarkpending", { state: normalStateObj });
    } else if (data == "growingup") {
      const normalStateObj = {
        param: "growingup",
        count: reviewCountData?.growingup,
        typeDivision: "成長の部屋",
        counts: reviewCountData,
      };
      navigate("/remarkpending", { state: normalStateObj });
    } else if (data == "addition1") {
      const normalStateObj = {
        param: "addition1",
        count: reviewCountData?.addition1,
        typeDivision: "日記",
        counts: reviewCountData,
      };
      navigate("/remarkpending", { state: normalStateObj });
    } else if (data == "addition2") {
      const normalStateObj = {
        param: "addition2",
        count: reviewCountData?.addition2,
        typeDivision: "新規2",
        counts: reviewCountData,
      };
      navigate("/remarkpending", { state: normalStateObj });
    }
  };
  return (
    <Grid container xs={12} className="mg_top">
      <Grid item xs={3}>
        <LeftPanBBS />
      </Grid>
      <Grid item className="mg_lftrgt" xs={9}>
        <RemarkAwait_header />
        <Grid className="tpspc_1"></Grid>
        <Grid item className="table_bordr">
          <Grid className="tpspc"></Grid>
          <Grid className="tpspc"></Grid>
          <Remark_await_review_CountComp
            btn_name="普通神経症の部屋へ"
            label={"A. 普通神経症の部屋"}
            reviewCountData={reviewCountData?.normal}
            handleClick={() => naviagteHandle("normal")}
          />
          <Remark_await_review_CountComp
            btn_name="不安神経症の部屋へ"
            label={"B. 不安神経症の部屋"}
            reviewCountData={reviewCountData?.anxiety}
            handleClick={() => naviagteHandle("anxiety")}
          />
          <Remark_await_review_CountComp
            btn_name="強迫神経症の部屋へ"
            label={"C.強迫神経症の部屋"}
            reviewCountData={reviewCountData?.blackmail}
            handleClick={() => naviagteHandle("blackmail")}
          />
          <Remark_await_review_CountComp
            btn_name="その他の部屋へ"
            label={"D. その他の部屋"}
            reviewCountData={reviewCountData?.other}
            handleClick={() => naviagteHandle("other")}
          />
          <Remark_await_review_CountComp
            btn_name="成長の部屋へ"
            label={"E. 成長の部屋"}
            reviewCountData={reviewCountData?.growingup}
            handleClick={() => naviagteHandle("growingup")}
          />
          <Grid className="mgtp_bt" container>
            <Grid item className="mglft_2" xs={12}>
              <label className="blacktxt_1">新規の部屋</label>
            </Grid>
          </Grid>
          <Remark_await_additionComp
            btn_name="日記へ"
            reviewCountData={reviewCountData?.addition1}
            //label="F.新規（１）名称"
            label="F. 日記"
            handleClick={() => naviagteHandle("addition1")}
          />
          <Remark_await_additionComp
            btn_name="新規2へ"
            reviewCountData={reviewCountData?.addition2}
            label="G.新規（２）名称"
            handleClick={() => naviagteHandle("addition2")}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Remarksawait_review;
