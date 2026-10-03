import React, { useState, useEffect } from "react";
import LeftPanBBS from "../../Common/LeftPanBBS";
import "../../../assets/css/health.css";
import "../../../Components/BBS/Member monitor management/Member monitor Comp/memberMointer.scss";
import { Box, Grid, Typography } from "@mui/material";
import "../Member monitor management/Member monitor Comp/memberMointer.scss";
import { useForm, Controller } from "react-hook-form";
import apiClient from "../../../API/API-client";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../Redux/actions";
const AutomaticApproval = () => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const autoApproval = useSelector((state: any) => {
    return state?.reducer1.data?.automaticApproval;
  });

  const {
    handleSubmit,
    control,
    register,

    formState: { errors },
  } = useForm();
  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    fetchAutoApprovalApi();
  }, []);

  const fetchAutoApprovalApi = async () => {
    try {
      const dataRequest = {
        key: "AUTO_APPROVAL",
      };
      dispatch(fetchData("automaticApproval", "api/listConfig", dataRequest));
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: any) => {
    automaticApproval(data);
  };

  const automaticApproval = async (data: any) => {
    try {
      const dataRequest = {
        key: "AUTO_APPROVAL",
        value: data.Automaticapproval_status,
        notes: "",
        id: autoApproval?.data[0]?.id,
      };
    
      const apiData = await apiClient.put("api/updateConfig", dataRequest, {});
      if (apiData) {
      }
    } catch (error) {
      console.log("Error in automatic approval", error);
    }
  };

  return (
    <Grid container>
      {autoApproval ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={3}>
                <LeftPanBBS />
              </Grid>
              <Grid item xs={9}>
                <Grid container>
                  <Box className="p2red_bg_left"></Box>
                  <Box className="p2red_bg_midle">
                    <Grid xs={12} className="text_grid">
                      <Grid xs={4}>
                        <Typography className="txtverdana mg_lftrgt">
                          F. 自動承認
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Typography style={{ fontSize: "14px" }}>
                  ★ 自動承認の管理
                </Typography>
                <div className="toggle-switch-box">
                  <Grid xs={12} className="content-row">
                    <Grid xs={6}>
                      <label>自動承認</label>
                    </Grid>
                    <Grid xs={6}>
                      <input
                        type="radio"
                        value="1"
                        {...register("Automaticapproval_status")}
                        defaultChecked={
                          autoApproval?.data &&
                          autoApproval.data[0]?.value === "1"
                        }
                      />
                      <label className="automatic_pl">ON</label>

                      <input
                        type="radio"
                        value="0"
                        {...register("Automaticapproval_status")}
                        defaultChecked={
                          autoApproval?.data &&
                          autoApproval.data[0]?.value === "0"
                        }
                      />
                      <label className="automatic_pl">OFF</label>
                    </Grid>
                  </Grid>

                  <Grid container justifyContent="center">
                    <Grid item>
                      <input
                        className="toggle-switch-buttons cursor_pointer"
                        type="submit"
                        name="btn_1"
                        value="保存する"
                      />
                      <input
                      
                        className="toggle-switch-buttons cursor_pointer"
                        type="reset"
                        name="btn_2"
                        value="リセットする"
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Box>
        </form>
      ) : (
        <div></div>
      )}
    </Grid>
  );
};

export default AutomaticApproval;
