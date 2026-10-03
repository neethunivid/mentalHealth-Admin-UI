import { Box, Grid } from "@mui/material";
import React from "react";
import headerimage from "../../assets/images/headerlogo.gif";
// import '../../../assets/css/homepage.css'
import bbs from "../../assets/images/BBS.jpg";
import library from "../../assets/images/Library.jpg";
import checksheetmail from "../../assets/images/Check2.jpg";
import counseling from "../../assets/images/counseling.jpg";
import grantprograms from "../../assets/images/Grant.png";
import { Link } from "react-router-dom";
import "../Home/homestyle.scss";
import { useNavigate } from "react-router-dom";
import LibraryapiClient from "../../API/LibraryAPI-client";
import apiClient from "../../API/API-client";

const HomePage: React.FC = () => {
  
  const handleClick = () => {
    window.location.href = "/grantlistview";
  };

  const handleReservationClick=()=>{
    window.location.href = "/reservationreg_cancel";
  }

  const handleChecksheetClick=()=>{
    window.location.href = "/checksheet1";
  }

  const handleLibraryClick=async()=>{
    try {
      const apiData = await LibraryapiClient.get('login/getToken',{});
      if (apiData?.data?.data?.token) {
       
              LibraryapiClient.setToken(apiData.data.data.token);
              window.location.href = "/libraryhomepage";
        
      }
  } catch (error: any) {
      if (error.response && error.response.status === 403) {
          console.log("403 error occurred");
      } else {
          // Handle other errors
          console.log("Error occurred:", error);
      }
  }
  }

  return (
    <Grid id="wrapper">
      <Grid item xs={12} container>
        <img className="image" src={headerimage} alt="no Item" />
      </Grid>
      <Grid item xs={12} container className="logoutlink">
        <Link to={"/logout"}>ログアウト</Link>
      </Grid>
      <Grid item xs={12}>
        <h2 id="content4top">
          （公財）メンタルヘルス岡本記念財団　システム管理　Top Menu
        </h2>
      </Grid>
      <Grid item xs={12}  id="content4">
        <Link to={"/bbshome"}>
          <img className="gridcontent" id="bbsimg" src={bbs} alt="BBS" />
        </Link>
        
        <img className="gridcontent" id="libraryimg"
           src={library} 
           alt="library" 
           onClick={() => handleLibraryClick()}/>
        
        
          <img
          className="gridcontent" id="checksheetimg"
            src={checksheetmail}
            alt="checksheetmail"
            onClick={() => handleChecksheetClick()}
          />

        <img
          className="gridcontent" id="counselingimg"
          src={counseling}
          alt="reservationcounseling"
          onClick={() => handleReservationClick()}
        />
        
        <img
          className="gridcontent" id="grantimg"
          src={grantprograms}
          alt="grantprograms"
          onClick={() => handleClick()}
        />
      </Grid>
    </Grid>
  );
};
export default HomePage;
