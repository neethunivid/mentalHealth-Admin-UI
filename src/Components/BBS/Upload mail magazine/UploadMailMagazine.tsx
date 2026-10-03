import { Button, Grid } from "@mui/material";
import React from "react";
import LeftPanBBS from "../../Common/LeftPanBBS";
import MailMagazineMemberlistHeader from "../Mail Magazine Management/Mail Magazine Components/MailMagazineMemberlistHeader";
import { useNavigate } from "react-router-dom";
const UploadMailMagazine = () => {
  //navigtaes to diffrent given screens with specific value
  const handleClick1 = () => {
    const specificValue = "PCのメールアドレス・アップロード";

    navigate(`/mail_magazine_uploadexcel/${specificValue}`);
  };
  const handleClick2 = () => {
    const specificValue = "PCのメールアドレス・アップロード";

    navigate(`/mail_magazine_uploadcsv/${specificValue}`);
  };
  const handleClick3 = () => {
    const specificValue = "SPのメールアドレス・アップロード";

    navigate(`/mail_magazine_uploadexcel/${specificValue}`);
  };
  const handleClick4 = () => {
    const specificValue = "SPのメールアドレス・アップロード";

    navigate(`/mail_magazine_uploadcsv/${specificValue}`);
  };
  const navigate = useNavigate();
  return (
    <div>
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanBBS />
        </Grid>
        <Grid item xs={9}>
          <MailMagazineMemberlistHeader
            title1="I. テーマ別のメルマガ登録のアップロード"
            title2="メルマガ管理"
          />
          <Grid className="hr"></Grid>
          <span className="black">PCのメールアドレス・アップロード</span>
          <Grid className="hr"></Grid>
          <Grid className="middle_table">
            <Grid className="upload_mail_magazine_button_align">
              <Grid className="hr"></Grid>
              <Button
                variant="contained"
                className="upload_mail_magazine_button"
                onClick={handleClick1}
              >
                Upload Excel
              </Button>
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
              <Button
                variant="contained"
                className="upload_mail_magazine_button"
                onClick={handleClick2}
              >
                Upload CSV
              </Button>
              <Grid className="hr"></Grid>
            </Grid>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <span className="black">SPのメールアドレス・アップロード</span>
          <Grid className="hr"></Grid>
          <Grid className="middle_table">
            <Grid className="upload_mail_magazine_button_align">
              <Grid className="hr"></Grid>
              <Button
                variant="contained"
                className="upload_mail_magazine_button"
                onClick={handleClick3}
              >
                Upload Excel
              </Button>
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
              <Button
                variant="contained"
                className="upload_mail_magazine_button"
                onClick={handleClick4}
              >
                Upload CSV
              </Button>
              <Grid className="hr"></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default UploadMailMagazine;
