import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";

import LeftPanLibrary from "../Common/LeftPanLibrary";
import LibraryHeader from "../Common/LibraryHeader";
import { useForm, Controller } from "react-hook-form";
import submitbtn from "../../../assets/images/7nth_page_btn.gif";
import resetbtn from "../../../assets/images/7nth_page_btn_1.gif";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMemberReg } from "../../../Redux/actions";

const Search_registrant = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    dispatch(setMemberReg("search_registrant", ''));
    // const sessionData = sessionStorage.getItem("search_registrant");
    // if (sessionData != null) {
    //   const parsedObject: any = JSON.parse(sessionData);
    //   dispatch(setMemberReg("search_registrant", parsedObject));
    //   setValue('search_registrant_registerNo',parsedObject.search_registrant_registerNo);
    //   setValue('search_registrant_lender_name',parsedObject.search_registrant_lender_name);
    //   setValue('search_registrant_furigana',parsedObject.search_registrant_furigana);
    //   setValue('search_registrant_phone',parsedObject.search_registrant_phone);
    //   setValue('search_registrant_email',parsedObject.search_registrant_email);
    // }
  }, []);
  const onSubmit = async (data: any) => {
    dispatch(setMemberReg("search_registrant", data));
  
    const isDataNotEmpty = Object.values(data).some(
      (value) => value !== null && value !== undefined && value !== ''
    );
  
    const dataObj = {
      param: data,
      isEmpty: isDataNotEmpty,
    };
  
    navigate('/editlenderlist', { state: { data: dataObj } });
  };
  
  
  const resetField = () => {
    reset();
  };
  const search_RegistrantData: any = useSelector(
    (state: any) => state.memberData.search_registrant
  );
  return (
    <Grid container xs={12} padding={1} spacing={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanLibrary />
      </Grid>
      <Grid item xs={9}>
        <LibraryHeader
          label1="B-2."
          label2="既存登録者の編集"
          label3="図書室管理
        "
        />
        <Grid className="hr"></Grid>
        <span className="black">
          ★まず項目を選択して、貸出者を検索して下さい。
        </span>

        <Grid className="hr"></Grid>
        <Grid className="library_flex_end black">B-2</Grid>
        <form name="booksearch" id="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container className="table_seven">
            <Grid item xs={12}>
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>

              <Grid className=" searchbook_content content-row">
                <Grid item xs={12} container>
                  <Grid item xs={2} className="black">
                    ● 登録No
                  </Grid>
                  <Grid item xs={8}>
                    <Controller   
                      name="search_registrant_registerNo"
                      control={control}
                      defaultValue={
                        search_RegistrantData?.search_registrant_registerNo
                      }
                      render={({field }) => ( 
                          <input
                            {...field}
                            type="text"
                            className="bdr_text3"
                            value={field.value}
                            // value={ search_RegistrantData?.search_registrant_registerNo}
                          />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid className=" searchbook_content content-row">
                <Grid item xs={2} className="black">
                  <span>● 貸出者氏名</span>
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    control={control}
                    name="search_registrant_lender_name"
                    defaultValue={
                      search_RegistrantData?.search_registrant_lender_name
                    }
                    render={({field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                        
                          className="bdr_text3"
                        ></input>
                      </>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid className="searchbook_content content-row">
                <Grid item xs={2} className="black">
                  ● ふりがな
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    control={control}
                    name="search_registrant_furigana"
                    defaultValue={
                      search_RegistrantData?.search_registrant_furigana
                    }
                    render={({ ...field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          {...register("search_registrant_furigana")}
                          className="bdr_text3"
                        ></input>
                      </>
                    )}
                  />
                </Grid>
              </Grid>

              <Grid className="searchbook_content content-row">
                <Grid item xs={2} className="black">
                  ● 電話番号
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    control={control}
                    name="search_registrant_phone"
                    defaultValue={
                      search_RegistrantData?.search_registrant_phone
                    }
                    render={({ ...field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          {...register("search_registrant_phone")}
                          className="bdr_text3"
                        ></input>
                      </>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid className="searchbook_content content-row">
                <Grid item xs={2} className="black">
                  ● Email
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    control={control}
                    name="search_registrant_furigana"
                    defaultValue={
                      search_RegistrantData?.search_registrant_email
                    }
                    render={({ ...field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          {...register("search_registrant_email")}
                          className="bdr_text3"
                        ></input>
                      </>
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            display={"flex"}
            justifyContent={"center"}
          >
            <Grid item xs={4}>
              <Button type="submit">
                <img className="padding_top" src={submitbtn} />
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button>
                <img
                  className="padding_top"
                  src={resetbtn}
                  onClick={() => resetField()}
                />
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Search_registrant;
