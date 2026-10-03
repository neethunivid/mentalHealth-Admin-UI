import { Button, Grid } from "@mui/material";
import LeftPanBBS from "../../Common/LeftPanBBS";
import { SearchMoDelHeader } from "./Member monitor Comp/SearchMoDelHeader";
import SearchModifyDeleteInput from "./Member monitor Comp/SearchModifyDeleteInput";
import "../../BBS/Member monitor management/Member monitor Comp/memberMointer.scss";
import { useForm } from "react-hook-form";
import SearchMoDelDate from "./Member monitor Comp/SearchMoDelDate";
import searchImage from "../../../assets/images/pg_15_btn_left.gif";
import resetImage from "../../../assets/images/pg_15_btn_right.gif";
import listButton1 from "../../../assets/images/pg_16_btn_small_left.gif";
import listButton2 from "../../../assets/images/pg_16_btn_small_right.gif";
import ApiClient from "../../../API/API-client";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { formatDateTime } from "../../Common/Date_conversion";
const SearchModifyDelete = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [myData, setMyData] = useState([]);
  const [dataCount, setMyDataCount] = useState<number>(0);
  const [resetDateFields, setResetDateFields] = useState(false);
  const navigate = useNavigate();
//searchfuction api call 
  const onsubmit = async (data: any) => {
    setMyData([]); // Clear existing data
     // Reset the count of 'myData' to 0
    setMyDataCount(0);
    await searchMemberremark(data);
   
  };
  //resets the datefield
  const handleReset = () => {
    setResetDateFields(true);
  };
  useEffect(() => {
    if (resetDateFields) {
      reset(); // Reset the form
      setResetDateFields(false); // Reset the state variable
    }
  }, [resetDateFields, reset]);
  //api for searching remarks for member
  const searchMemberremark = async (data: any) => {
    
    const date1 = data.SearchModifyDelete_datefrom; // Replace this with the actual value you want to use.

    const formattedDate = `${date1}T00:00:00`;
    const formattedToDate = data.SearchModifyDelete_dateto
  ? `${data.SearchModifyDelete_dateto}T23:59:59`
  : null;
     const dataRequest = {
        ...(data.SearchModifyDelete_speechnumber && { remarkid:data.SearchModifyDelete_speechnumber}),
        ...(data.SearchModifyDelete_id && { memberid:data.SearchModifyDelete_id }),
        ...( data.SearchModifyDelete_keywords&& { title: data.SearchModifyDelete_keywords }),
        ...( data.SearchModifyDelete_datefrom && { "fromDate":formattedDate}),
        ...(data.SearchModifyDelete_dateto && { "toDate": formattedToDate }),
      

    }
    try {
        const apiData = await ApiClient.post('api/searchRemarks', dataRequest, {});
        if (apiData) {
        let countData=apiData.data.count
        setMyDataCount(countData)
        setMyData(apiData.data.data);
       
        }
    } catch (error: any) {
        if (error.response && error.response.status === 403) {
            console.error("403 error occurred");
        } else {
            console.error("Error occurred:", error);
        }
    }


}
//apicall for deleting remarks
const remarkDelete = async (item:any) => {
  const confirmed = window.confirm('この発言内容を削除しますか？');
  if (confirmed) {
    try {
      const apiData = await ApiClient.delete('api/deleteRemark/' + item.id, {});
      if (apiData) {
      }
      window.location.reload();
    } 
   catch (error: any) {
      if (error.response && error.response.status === 403) {
          console.error("403 error occurred");
      } else {
          console.error("Error occurred:", error);
      }
  }
  }
  }
  //navigates to preview screen
const handlePreviewClick = (item:any) => {
  
  navigate('/membermonitordetail', { state: { data: item} });
};


  return (
    <Grid container xs={12} padding={1} spacing={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanBBS />
      </Grid>
      <Grid item xs={9}>
        <SearchMoDelHeader />

        <Grid className="hr"></Grid>
        <span className="black">
          ★いずれかの項目を入力して、発言内容を検索して下さい。
        </span>
        <Grid className="hr"></Grid>
        <form name="SearchModifyDelete_form" onSubmit={handleSubmit(onsubmit)}>
          <Grid container className="table_seven">
            <Grid item xs={12}>
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>

              <Grid className=" member_monitor_content content-row">
                <SearchModifyDeleteInput
                  label="●キーワード:"
                  control={control}
                  name={"SearchModifyDelete_keywords"}
                />
                <SearchModifyDeleteInput
                  control={control}
                  label={"●発言No:"}
                  name={"SearchModifyDelete_speechnumber"}
                />
                <SearchModifyDeleteInput
                  control={control}
                  label={"●ID:"}
                  name={"SearchModifyDelete_id"}
                />
              </Grid>
              <Grid className="hr"></Grid>
              <Grid className="member_monitor_content content-row">
                <SearchMoDelDate
                  label="●発言期間  :"
                  name="SearchModifyDelete_datefrom"
                  control={control}
                  setValue={setValue}
                  reset={resetDateFields} 
                />
                <Grid className="member_monitor_content_date_seperation">
                  ~
                </Grid>
                <SearchMoDelDate
                  setValue={setValue}
                  name="SearchModifyDelete_dateto"
                  control={control}
                  reset={resetDateFields} 
                  
                />
              </Grid>
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
            </Grid>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <Grid xs={12} className="content-row">
            <Grid xs={3}></Grid>
            <Grid
              xs={6}
              container
              className="member_mointer_content_button_alignment"
            >
              <Button type="submit">
                <img
                  className="padding_top"
                  src={searchImage}
                  // onClick={createMember}
                />
              </Button>
              <Button className="member_mointer_content_button" type="reset" onClick={()=>handleReset()}>
                <img className="padding_top" src={resetImage}  />
              </Button>
            </Grid>
            <Grid xs={3}></Grid>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>

          <Grid xs={12} className="member_moniter_content_list">
            <Grid xs={4}>
              <Grid xs={12} className="content-row">
                <Grid xs={4} className="black">
                  <span>★検索結果 ：</span>
                </Grid>
                <Grid xs={8}>
                  <span className="member_mointer_content_red-text">
                  {myData?.length}件　  {dataCount}件中　
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <Grid xs={12} className="bdr_blue_bottom"></Grid>
          {myData?.map((item: any,index) => {
         const itemDate = item.date
         ? new Date(item.date[0], item.date[1] - 1, item.date[2], item.date[3], item.date[4])
         : null;

     const formattedDate = itemDate ? formatDateTime(itemDate) : null;
     //gets date in the format 'YYYY/MM/DD ddd HH:mm'
            return (
                <>
              <Grid container key={index}>
                <Grid item xs={8}>
                  <ul className="black_bold">
                    <li className="list_style member_mointer_content_listData">
                      <Grid container>
                        <Grid item xs={12}>
                         <Grid>●発言No: {item.remarkNo}</Grid>
                        
                        </Grid>
                        <Grid item xs={12}>
                          ●発言日： {formattedDate}
                        </Grid>
                        <Grid item xs={12}>
                          ●ID：{item.memberid}
                        </Grid>
                        <Grid item xs={12}>
                          ●タイプ区分：{item.normal===1? "普通神経症の部屋":item.other===1?"その他の部屋":item.blackmail===1?"強迫神経症の部屋":item.anxiety===1?"不安神経症の部屋":item.growingup===1?"成長の部屋":item.addition1!==""?"新規1":"新規２"}
                        </Grid>
                        <Grid item xs={12}>
                          ●Mail：{item.emailPc}
                        </Grid>
                        <Grid item xs={12}>
                          ●タイトル：{item.title}
                        </Grid>
                        <Grid item xs={12}>
                          ●発言内容：{item.text}
                        </Grid>
                      </Grid>
                    </li>
                  </ul>
                </Grid>
                <Grid
                  item
                  xs={4}
                  container
                  justifyContent="flex-end"
                  alignItems="baseline"
                >
                  <Grid style={{ paddingLeft: "260px", paddingTop: "80px" }}>
                    <Button type="button" onClick={() => handlePreviewClick(item)}>
                      <img
                        className="padding_top"
                        src={listButton1}
                        alt="Button Image"
                        
                      />
                    </Button>
                    <Grid className="hr"></Grid>
                    <Button type="button" onClick={()=>remarkDelete(item)}>
                      <img
                        className="padding_top"
                        src={listButton2}
                        alt="Button Image"
                        
                      />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
                <Grid xs={12} className="bdr_blue_bottom"></Grid>
                </>
            );
          })}

         
        </form>
      </Grid>
    </Grid>
  );
};

export default SearchModifyDelete;
