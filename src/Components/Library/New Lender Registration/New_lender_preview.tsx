import { Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import NewLenderInput1 from "./Components/NewLenderInput1";
import LibraryHeader from "../Common/LibraryHeader";
import LeftPanBBS from "../../Common/LeftPanBBS";
import { useSelector, useDispatch } from "react-redux";
import NewLenderInput2 from "./Components/NewLenderInput2";
import saveButton from "../../../assets/images/lib_save.gif";
import correctButton from "../../../assets/images/btn_back_new.gif";
import { useNavigate,useLocation } from "react-router-dom";
import pref from "../Common/pref";
import { setMemberReg } from "../../../Redux/actions";
import LibraryapiClient from "../../../API/LibraryAPI-client";
import LeftPanLibrary from "../Common/LeftPanLibrary";
const New_lender_preview = () => {
  const location=useLocation();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

//get redux stored field values using useSelector
  const LenderData: any = useSelector(
    (state: any) => state.memberData.lender_reg
  );
 

  //form submit
  const handleSubmit=()=>{
    setIsButtonDisabled(true);
if(!isButtonDisabled){
 
  createLenderApi();
}
    setTimeout(() => {
 
      setIsButtonDisabled(false);
    }, 100000);
  
  }

  //create new lender 
  const createLenderApi=async()=>{
    let state;
    //getting state id from using mapping pref name which matches with redux stored state  
    pref.forEach((item)=>{
      if(item.name==LenderData.library_state){
        state=item.id;
      }
    })
    try{

      const dataRequest={
        "nameFirst":LenderData.library_name_first ,
        "nameLast": LenderData.library_name_last,
        "name":`${LenderData.library_name_last}${' '}${LenderData.library_name_first}`,
        "name2":`${LenderData.library_name_first}${' '}${LenderData.library_name_last}`  ,
        "phonetic1": LenderData.library_name_phonetic1,
        "phonetic2": LenderData.library_name_phonetic2,
        "phoneticCom1":`${LenderData.library_name_phonetic2}${' '}${LenderData.library_name_phonetic1} `,
        "zip": LenderData.library_zip,
        "state": state??1,
        "address1": LenderData.library_address,
        "address2": "",
        "phone": LenderData.library_text_phone,
        "email": LenderData.library_email,
        "status": "1",
        "regNo":location.state,
        "age": LenderData.library_age,
        "sex": LenderData.library_gender,
        'dateRegistered':LenderData.library_date_registerd
    }

const apiData=await LibraryapiClient.post('library/books/lenderregistration',dataRequest);
if(apiData){
  //api got success goes to new lender create screen
  if(apiData.status==200&&apiData.data.error=='Success'){
    sessionStorage.removeItem('lender_reg');
    dispatch(setMemberReg("lender_reg", ''));
    alert("登録に成功しました!");
    navigate('/newlenderregister');
    // window.location.href='/newlenderregister';
    //when api status got 200 and response get error to show that error
  }else if(apiData.status==200 && apiData.data.error=='Registration No Already exists'||apiData.data.error=='Email Already exists'){

    alert(apiData.data.error);
  }

  // 

}
    }catch(error){
      alert(error);
    }
  }
  return (
    
    <div>
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanLibrary/>
        </Grid>
        <Grid item xs={9}>
          <LibraryHeader
            label1="B-1."
            label2="新規貸出者の登録"
            label3="図書室管理"
          />
          <Grid className="hr"></Grid>
          <label className="black">★新しい貸出者を登録して下さい。</label>
          <Grid className="hr"></Grid>
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <Grid className="middle_table">
            <Grid className="hr"> </Grid>
            <Grid className="hr"></Grid>

            <Grid className="content-row">
              <Grid className="library-width-3"></Grid>
              <Grid className="content-row library-width-15">
                <label className="black">● 登録No.</label>
              </Grid>
              <Grid className="content-row library-width-82 library-text-bold black">
                {location.state}
              </Grid>
            </Grid>
            <Grid className="hr"></Grid>

            <NewLenderInput1
              isPreview={true}
              label1="● 貸出者氏名"
              label2="姓 "
              label3="姓"
              name1={"library_name_last"}
              name2={"library_name_first"}
              defaultValue1={LenderData?.library_name_last}
              defaultValue2={LenderData?.library_name_first}
            />
            <Grid className="hr"></Grid>
            <NewLenderInput1
              isPreview={true}
              label1="● ふりがな"
              label2="姓 "
              label3="姓"
              name1={"library_name_phonetic2"}
              name2={"library_name_phonetic1"}
              defaultValue1={LenderData?.library_name_phonetic2}
              defaultValue2={LenderData?.library_name_phonetic1}
            />
            <Grid className="hr"></Grid>
            <NewLenderInput2
            isPreview={true}
              label1="● 年齢"

              defaultValue1={LenderData?.library_age}
            />
            <Grid className="hr"></Grid>
            <NewLenderInput2
            isPreview={true}
              label1="● 年齢"
              defaultValue1={LenderData?.library_age=="1"? "男性":"女性"}
            />
            <Grid className="hr"></Grid>
            <NewLenderInput2
            isPreview={true}
              label1="● 郵便番号"
              defaultValue1={LenderData?.library_zip}
              label3="（例 541-0067）"
            />
            <Grid className="hr"></Grid>
            <NewLenderInput2
            isPreview={true}
              label1="● 都道扶県"
              defaultValue1={LenderData?.library_state}
            />
            <Grid className="hr"></Grid>
            <NewLenderInput2
            isPreview={true}
              label1="	● 市区群町"
              defaultValue1={LenderData?.library_address}
              name1={"library_address"}
              inputClassName="library-text-input2"
            />
            <Grid className="hr"></Grid>
            <NewLenderInput2
            isPreview={true}
              label1="● 登録日（日付）"
              defaultValue1={LenderData?.library_date_registerd}
              inputClassName="library-text-input2"
            />

            <Grid className="hr"></Grid>
            <NewLenderInput2
            isPreview={true}
              label1="	● 電話番号"
              label3="（例 06-6809-1211）"
              defaultValue1={LenderData?.library_text_phone}
              inputClassName="library-text-input2"
            />
            <Grid className="hr"></Grid>
            <NewLenderInput2
            isPreview={true}
              label1="●  E-mail"
              defaultValue1={LenderData?.library_email}
              inputClassName={"library-text-input2"}
            />
            <Grid className="hr"></Grid>
            <Grid className="hr"></Grid>
            <Grid className="hr"></Grid>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>

          <Grid className="content-row">
            <Grid className="library-button-32"></Grid>
            <Grid className="library-button-20">
              <Button type="submit" onClick={()=>handleSubmit()}>
              <img src={saveButton}  />
            </Button>
            </Grid>
            <Grid className="library-button-48">
              <Button type="reset">
              <img src={correctButton} onClick={()=>navigate("/newlenderregister")} />
            </Button>
            </Grid>
          </Grid>
          {/* </form> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default New_lender_preview;
