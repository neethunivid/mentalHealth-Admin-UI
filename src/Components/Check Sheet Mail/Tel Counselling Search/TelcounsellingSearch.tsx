import { Select, MenuItem, FormControl, Button, Grid } from "@mui/material";
import "../../BBS/Member monitor management/Member monitor Comp/memberMointer.scss";
import { useForm, Controller } from "react-hook-form";
import btncsvdownload from "../../../assets/images/btn.gif";
import SearchMoDelDate from "../../BBS/Member monitor management/Member monitor Comp/SearchMoDelDate";
import searchImage from "../../../assets/images/pg_15_btn_left.gif";
import resetImage from "../../../assets/images/pg_15_btn_right.gif";
import ApiClient from "../../../API/API-client";
import { useState, useEffect } from "react";
import LeftPanChecksheet from "../LeftPanChecksheet";
import { downloadFile } from "../../Helper/TelCounselingHelper";
import apiClient from "../../../API/API-client";
import InputSelect from "../../Common/Inputs/InputSelect";
import getOptions from "../../../utils/utls";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const TelcounsellingSearch = () => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  let apiData: any;
  const [myData, setMyData] = useState([]);
  const [dataCount, setMyDataCount] = useState<number>(0);
  const [searchData, setsearchData] = useState([]);
  const [resetDateFields, setResetDateFields] = useState(false);
  const [count, setCount] = useState<any>();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [counselorOptions, setCounselorOptions] = useState<any[]>([]);

  const { age, gender, self, symptomsList, StyledMenuItem } =
    getOptions();

  const fetchData = async () => {
    try {
      const [counselorRes] = await Promise.all([
        apiClient.post("api/reservation/counselorlist", {}),
      ]);

      setCounselorOptions(
        counselorRes.data.data.map((item: any) => ({ name: item.name }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //searchfuction api call
  const onsubmit = async (data: any) => {
    setMyData([]);
    setMyDataCount(0);
    await DownloadSearchResult(data);
  };

  {
    /** resets the datefield */
  }
  const handleReset = () => {
    setResetDateFields(true);
  };
  useEffect(() => {
    if (resetDateFields) {
      reset();
      setResetDateFields(false);
    }
  }, [resetDateFields, reset]);

  //api for searching telcounsellingsearch for member
  const DownloadSearchResult = async (data: any) => {
    setButtonDisabled(true);
    const formattedFromDate = data.fromDate ? `${data.fromDate}T00:00:00` : "";
    const formattedToDate = data.toDate ? `${data.toDate}T23:59:59` : "";
    const dataRequest = {
      ...(data.counsellor && { counsellor: data.counsellor }),
      ...(data.ages && { ages: data.ages }),
      ...(data.gender && { gender: data.gender }),
      ...(data.mainIssues && { mainIssues: data.mainIssues }),
      ...(data.userType && { userType: data.userType }),
      ...(data.fromDate && { fromDate: formattedFromDate }),
      ...(data.toDate && { toDate: formattedToDate }),
    };
    try {
      apiData = await ApiClient.post(
        "api/telcounselling/search",
        dataRequest,
        {}
      );
      if (apiData) {
        setsearchData(apiData.data.data);
        setCount(apiData.data.count);
        setButtonDisabled(false);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        console.log("403 error occurred");
      } else {
        console.log("Error occurred:", error);
      }
    }
  };

  const telCounsellSearchCsvDownload = () => {
    const formData = getValues();
    {
      DownloadCsvTelcounsellingSearch(formData);
    }
  };

  //download the csv format of telcounsellingSearch
  const DownloadCsvTelcounsellingSearch = async (data: any) => {
    const formattedFromDate = data.fromDate ? `${data.fromDate}T00:00:00` : "";
    const formattedToDate = data.toDate ? `${data.toDate}T23:59:59` : "";
    const dataRequest = {
      ...(data.counsellor && { counsellor: data.counsellor }),
      ...(data.ages && { ages: data.ages }),
      ...(data.gender && { gender: data.gender }),
      ...(data.mainIssues && { mainIssues: data.mainIssues }),
      ...(data.userType && { userType: data.userType }),
      ...(data.fromDate && { fromDate: formattedFromDate }),
      ...(data.toDate && { toDate: formattedToDate }),
    };
    try {
      apiData = await ApiClient.post(
        "api/export/telCounsellDownload",
        dataRequest,
        {}
      );
      if (apiData) {
        downloadFile(apiData.data, `telCounsellingSearch`, "text/csv");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        console.log("403 error occurred");
      } else {
        console.log("Error occurred:", error);
      }
    }
  };

  function formatDate(date: any) {
    const year = date.getFullYear().toString().padStart(4, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  return (
    <Grid container xs={12} padding={1} spacing={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanChecksheet />
      </Grid>
      <Grid item xs={9}>
        <Grid container>
          <Grid className="p2red_bg_left"></Grid>
          <Grid className="p2red_bg_midle">
            <Grid justifyContent={"space-between"} display={"flex"}>
              <span className="verdana_big">C.検索・ダウンロード</span>
            </Grid>
          </Grid>
        </Grid>

        <Grid className="hr"></Grid>
        <form name="SearchModifyDelete_form" onSubmit={handleSubmit(onsubmit)}>
          <Grid container className="table_seven" padding={1}>
            <span className="black">
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
              ★ 相談日又は期間を入力して、絞り込み検索をして下さい。
            </span>
            <Grid item xs={12}>
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>

              <Grid padding={1}>
                <Grid container className="table_seven">
                  <Grid
                    className="member_monitor_content content-row"
                    padding={1}
                  >
                    <SearchMoDelDate
                      label="● 相談日（年月日／範囲）"
                      name="fromDate"
                      control={control}
                      setValue={setValue}
                      reset={resetDateFields}
                    />
                    <Grid className="member_monitor_content_date_seperation">
                      ~
                    </Grid>
                    <SearchMoDelDate
                      setValue={setValue}
                      name="toDate"
                      control={control}
                      reset={resetDateFields}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
              <Grid padding={1}>
                <Grid item xs={12} className="table_seven" padding={3}>
                  <Grid className=" member_monitor_content content-row">
                    <Grid item xs={4} className="black">
                      {" "}
                      <li> 相談員</li>
                    </Grid>
                    <Grid item xs={8}>
                      <InputSelect
                        sampleOption={"選択する"}
                        control={control}
                        options={counselorOptions}
                        name="counsellor"
                        className="bdr_text4"
                        error={errors.counsellor}
                      />
                    </Grid>
                  </Grid>
                  <Grid className=" member_monitor_content content-row">
                    <Grid item xs={4} className="black">
                      {" "}
                      <li> 相談者の年代</li>
                    </Grid>
                    <Grid item xs={8}>
                      <Controller
                        name="ages" 
                        control={control}
                        render={({ field }) => (
                          <Select
                            multiple
                            value={field.value || []} // Ensure it defaults to an empty array if no value
                            displayEmpty
                            placeholder="選択する"
                            onChange={(event) => {
                              const selectedValues = event.target
                                .value as string[];
                              field.onChange(selectedValues); // Update state
                            }}
                            renderValue={(selected: string[]) => {
                              if (selected.length === 0) {
                                return (
                                  <label className="left-aligned-text">
                                    選択する
                                  </label>
                                );
                              }
                              return (
                                <label className="left-aligned-text">
                                  {selected.join(", ")}
                                </label>
                              );
                            }}
                            className="bdr_text4"
                            inputProps={{
                              classes: { select: "text_input" },
                              sx: { paddingLeft: 0 },
                            }}
                            IconComponent={(props) => (
                              <KeyboardArrowDownIcon
                                {...props}
                                sx={{ fontSize: "18px" }}
                              />
                            )}
                          >
                            {age.map((option) => (
                              <StyledMenuItem key={option.id} value={option.id}>
                                {option.name}
                              </StyledMenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid className=" member_monitor_content content-row">
                    <Grid item xs={4} className="black">
                      <li> 相談者の性別</li>
                    </Grid>
                    <Grid item xs={8}>
                      <InputSelect
                        sampleOption={"選択する"}
                        control={control}
                        options={gender}
                        name="gender"
                        className="bdr_text4"
                        error={errors.gender}
                      />
                    </Grid>
                  </Grid>
                  <Grid className=" member_monitor_content content-row">
                    <Grid item xs={4} className="black">
                      {" "}
                      <li> 相談者の名前</li>
                    </Grid>
                    <Grid item xs={8}>
                      <InputSelect
                        sampleOption={"選択する"}
                        control={control}
                        options={self}
                        name="userType"
                        className="bdr_text4"
                        error={errors.userType}
                      />
                    </Grid>
                  </Grid>
                  <Grid className=" member_monitor_content content-row">
                    <Grid item xs={4} className="black">
                      {" "}
                      <li> 主訴</li>
                    </Grid>
                    <Grid item xs={8}>
                      <Controller
                        name="mainIssues"
                        control={control}
                        render={({ field }) => (
                          <Select
                            multiple
                            value={field.value || []}
                            displayEmpty
                            placeholder="選択する"
                            onChange={(event) => {
                              const selectedValues = event.target
                                .value as string[];
                              field.onChange(selectedValues);
                            }}
                            renderValue={(selected: string[]) => {
                              if (selected.length === 0) {
                                return (
                                  <label className="left-aligned-text">
                                    選択する
                                  </label>
                                );
                              }
                              return (
                                <label className="left-aligned-text">
                                  {selected.join(", ")}
                                </label>
                              );
                            }}
                            className="bdr_text4"
                            inputProps={{
                              classes: { select: "text_input" },
                              sx: { paddingLeft: 0 },
                            }}
                            IconComponent={(props) => (
                              <KeyboardArrowDownIcon
                                {...props}
                                sx={{ fontSize: "18px" }}
                              />
                            )}
                          >
                            {symptomsList.map((option) => (
                              <StyledMenuItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.value}
                              </StyledMenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
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
              justifyContent="center"
            >
              <Button type="submit">
                <img className="padding_top" src={searchImage} />
              </Button>
              <Button
                type="button"
                onClick={() => telCounsellSearchCsvDownload()}
              >
                <img
                  className="padding_top"
                  src={btncsvdownload}
                  alt="library"
                />
              </Button>
              <Button
                className="member_mointer_content_button_alignment"
                type="reset"
                onClick={() => handleReset()}
              >
                <img className="padding_top" src={resetImage} />
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid className="hr"></Grid>
        <Grid className="hr"></Grid>

        {searchData ? (
          <>
            <Grid xs={12} className="member_moniter_content_list">
              <Grid xs={4}>
                <Grid xs={12} className="content-row">
                  <Grid xs={4} className="black">
                    <span>★検索結果 ：</span>
                  </Grid>
                  <Grid xs={8}>
                    <span className="member_mointer_content_red-text">
                      {searchData?.length ? searchData.length : 0} 件　
                      {count ? count : 0} 件中
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} padding={2} className="bdr_blue_bottom"></Grid>
          </>
        ) : null}

        {searchData?.map((item: any, index: any) => {
          const itemDate = item.date
            ? new Date(item.date[0], item.date[1] - 1, item.date[2])
            : null;

          const formattedDate = itemDate ? formatDate(itemDate) : null;
          return (
            <>
              <Grid container key={index}>
                <Grid item xs={8}>
                  <ul className="black_bold">
                    <li className="list_style member_mointer_content_listData">
                      <Grid container>
                        <Grid item xs={12} flexDirection="row">
                          <Grid>● No: {item.id}</Grid>
                        </Grid>
                        <Grid item xs={12}>
                          ● 相談日： {formattedDate}
                        </Grid>
                        <Grid item xs={12}>
                          ● 相談員：{item.counsellor}
                        </Grid>
                        <Grid item xs={12}>
                          ● 性 別：{item.gender}
                        </Grid>
                        <Grid item xs={12}>
                          ● 年 代：{item.age}
                        </Grid>
                        <Grid item xs={12}>
                          ● 相談者：{item.userType}
                        </Grid>
                        <Grid item xs={12}>
                          ● 主 訴：{item.mainIssues}
                        </Grid>
                        <Grid item xs={12}>
                          ● 悩みの内容：{item.problemDetails}
                        </Grid>
                        <Grid item xs={12}>
                          ● 助言内容：{item.advice}
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
                ></Grid>
              </Grid>
              <Grid xs={12} className="bdr_blue_bottom"></Grid>
            </>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default TelcounsellingSearch;
