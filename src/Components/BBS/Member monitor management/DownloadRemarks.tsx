import { Button, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import LeftPanBBS from "../../Common/LeftPanBBS";
import { useForm, Controller } from 'react-hook-form';
import '../../../assets/css/health.css';
import calenderimage from '../../../assets/images/icon_calender.gif'
import btncsvdownload from '../../../assets/images/btn.gif'
import submit from '../../../assets/images/pg_15_btn_left.gif'
import refresh from '../../../assets/images/pg_15_btn_right.gif'
import ReactDatePicker from "react-datepicker";
import SearchMoDelDate from "./Member monitor Comp/SearchMoDelDate";
import DwnloadRemarkDate from "./Member monitor Comp/DwnloadRemarkDate";
import ApiClient from "../../../API/API-client";

const DownloadRemark = () => {
    let apiData: any;
    const { register, handleSubmit, watch, control, setValue, getValues, reset } = useForm();
    const batchDownload = watch('batchDownload');
    const downloadByType = watch('downloadByType');
    const checkboxes1To5 = watch(['normal', 'anxiety', 'blackmail', 'other', 'growingup']);
    const [remarkData, setRemarkData] = useState([]);
    const [resetDateFields, setResetDateFields] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [count, setCount] = useState<any>();

    //handling the batch download checkbox
    const handleCheckboxAChange = (value: any) => {
        setValue('batchDownload', value);
        if (value) {
            setValue('downloadByType', false);
            setValue('normal', false);
            setValue('anxiety', false);
            setValue('blackmail', false);
            setValue('other', false);
            setValue('growingup', false);
            setValue('addition1', false);
            setValue('addition2', false);
        }
    };

    //handling download by type checkbox
    const handleCheckboxBChange = (value: any) => {
        setValue('downloadByType', value);
        if (value) {
            setValue('batchDownload', false);
            setValue('normal', true);
        }
        if (!value) {
            setValue('normal', false);
            setValue('anxiety', false);
            setValue('blackmail', false);
            setValue('other', false);
            setValue('growingup', false);
            setValue('addition1', false);
            setValue('addition2', false);

        }
    };
    const handleDownloadByType = (name: any, value: any) => {
        if (downloadByType) {
            setValue(name, value);
        }
    };
    const onSubmit = (data: any) => {
        setRemarkData([]);
        setCount(0);
        DownloadSearchResult(data)

    };

    
    const remarkCsvDownload = () => {
        const formData = getValues();
        if(!batchDownload&&!downloadByType){
            alert("ダウンロード方法を選択し、ダウンロードボタンを押して下さい。");
            return
        }else{
            DownloadCsvRemark(formData)
        }      
    };
    const handleReset = () => {
        setResetDateFields(true);
    };
    useEffect(() => {
        if (resetDateFields) {
            reset(); // Reset the form
            setResetDateFields(false); // Reset the state variable
        }
    }, [resetDateFields, reset]);


    const DownloadSearchResult = async (data: any) => {
        setButtonDisabled(true);
        const formattedFromDate = data.toDate ? `${data.fromDate}T00:00:00` : "";
        const formattedToDate = data.toDate ? `${data.toDate}T23:59:59` : ""
        const dataRequest = {
            ...(data.speechnumber && { remarkid: data.speechnumber }),
            ...(data.id && { memberid: data.id }),
            ...(data.keyword && { title: data.keyword }),
            ...(data.fromDate && { "fromDate": formattedFromDate }),
            ...(data.toDate && { "toDate": formattedToDate }),
        }
        try {
            apiData = await ApiClient.post('api/searchRemarks', dataRequest, {});
            if (apiData) {
                setRemarkData(apiData.data.data)
                setCount(apiData.data.count)
                setButtonDisabled(false);
            }
        } catch (error: any) {
            if (error.response && error.response.status === 403) {
                console.log("403 error occurred");
            } else {
                console.log("Error occurred:", error);
            }
        }

    }

    //download the csv format of remarks 
    const DownloadCsvRemark = async (data: any) => {
        const formattedFromDate = data.toDate ? `${data.fromDate}T00:00:00` : "";
        const formattedToDate = data.toDate ? `${data.toDate}T23:59:59` : ""
        const dataRequest = {
            ...(data.speechnumber && { remarkid: (data.speechnumber) }),
            ...(data.id && { memberid: data.id }),
            ...(data.keyword && { title: data.keyword }),
            ...(data.fromDate && { "fromDate": formattedFromDate }),
            ...(data.toDate && { "toDate": formattedToDate }),
            // "remarkid":data.speechnumber,
            // "memberid":data.id,
            // "title":data.keyword,
            // "fromDate":formattedFromDate,
            // "toDate":formattedToDate,
            "chkall": data.batchDownload == true ? 1 : 0,
            "chkspecify": data.downloadByType == true ? 1 : 0,
            "normal": data.normal == true ? 1 : 0,
            "anxiety": data.anxiety == true ? 1 : 0,
            "blackmail": data.blackmail == true ? 1 : 0,
            "other": data.other == true ? 1 : 0,
            "growingup": data.growingup == true ? 1 : 0,
            "addition1": data.addition1 == true ? 1 : 0,
            "addition2": data.addition2 == true ? 1 : 0,
        }
        try {
            apiData = await ApiClient.post('api/export/remarksDownload', dataRequest, {});
            if (apiData) {
                downloadFile(apiData.data, `remarkDownload`, 'text/csv')
            }
        } catch (error: any) {
            if (error.response && error.response.status === 403) {
                console.log("403 error occurred");
            } else {
                console.log("Error occurred:", error);
            }
        }

    }
    function formatDate(date: any) {
        const year = date.getFullYear().toString().padStart(4, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}/${month}/${day} ${dayOfWeek} ${hours}:${minutes}`;
    }

    //converting the api response to csv format 
    const downloadFile = (data: any, fileName: any, fileType: any) => {
        const blob = new Blob(["\ufeff" + data], { type: "text/csv;charset=UTF-8" })
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }
    return (
        <Grid container xs={12} padding={1} spacing={1}>
            <Grid item xs={3} spacing={2}>
                <LeftPanBBS />
            </Grid>
            <Grid item xs={9}>
                <Grid container>
                    <Grid className='p2red_bg_left'></Grid>
                    <Grid className='p2red_bg_midle'>
                        <Grid justifyContent={'space-between'} display={"flex"}>
                            <span className='verdana_big'>


                                C.発言内容のダウンロード</span>
                            <span className='verdana_big'> 会員モニター管理</span>
                        </Grid>
                    </Grid>
                    <Grid className='p2red_bg_right'></Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid className="hr"></Grid>
                    <span className="black"  >★いずれかの項目を入力して、発言内容を検索してダウンロード下さい。
                    </span>
                    <Grid className="hr"></Grid>
                </Grid>
                <Grid item xs={12} className="history_page">
                    <form name="downloadremark" onSubmit={handleSubmit(onSubmit)}>
                        <Grid item xs={12} className="table_seven" padding={3}>
                            <Grid item xs={12} container className="black" padding={0.5}>

                                <Grid item xs={2}><span className="black">●発言No</span></Grid>
                                <Grid item xs={4}><input type="text" className="bdr_text"{...register("speechnumber")} /></Grid>
                                <Grid item xs={4}><span className="black">●発言期間</span></Grid>
                            </Grid>
                            <Grid item xs={12} container padding={0.5}>
                                <Grid item xs={2}><span className="black">●ID</span></Grid>
                                <Grid item xs={4}><input type="text" className="bdr_text"{...register("id")} /></Grid>
                                <Grid item xs={6} container>

                                    <DwnloadRemarkDate
                                        name="fromDate"
                                        control={control}
                                        setValue={setValue}
                                        reset={resetDateFields}
                                    />
                                    <span className="black">~</span>
                                    <DwnloadRemarkDate
                                        name="toDate"
                                        control={control}
                                        setValue={setValue}
                                        reset={resetDateFields}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} container padding={0.5}>
                                <Grid item xs={2}><span className="black">●キーワード</span></Grid>
                                <Grid item xs={4}><input type="text" className="bdr_text" {...register("keyword")} /></Grid>

                            </Grid>
                            <Grid item xs={12} container padding={0.5}>
                                <Controller
                                    name="batchDownload"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={(e) => handleCheckboxAChange(e.target.checked)}
                                        />
                                    )}
                                />
                                <span className="black"> 一括ダウンロード</span>
                            </Grid>
                            <Grid item xs={12} container padding={0.5} display={"flex"} flexDirection={"row"}>

                                <Grid item xs={2}>
                                    <Controller
                                        name="downloadByType"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={(e) => handleCheckboxBChange(e.target.checked)}
                                            />
                                        )}
                                    />
                                    <span className="black"> タイプ別ダウンロード</span>
                                </Grid>
                                <Grid paddingRight={2}><span className="black">(</span></Grid>

                                <Grid paddingRight={2}>
                                    <Controller
                                        name="normal"
                                        control={control}
                                        render={({ field }) => <input type="checkbox" {...field}
                                            checked={field.value}
                                            onChange={(e) => handleDownloadByType('normal', e.target.checked)} />}
                                    />
                                    <span className="black">普通</span>
                                </Grid>

                                <Grid paddingRight={2}>
                                    <Controller
                                        name="anxiety"
                                        control={control}
                                        render={({ field }) => <input type="checkbox" {...field}
                                            checked={field.value && !batchDownload}
                                            onChange={(e) => handleDownloadByType('anxiety', e.target.checked)} />}
                                    />
                                    <span className="black">不安 </span>
                                </Grid>
                                <Grid paddingRight={2}>
                                    <Controller
                                        name="blackmail"
                                        control={control}
                                        render={({ field }) => <input type="checkbox" {...field}
                                            checked={field.value && !batchDownload}
                                            onChange={(e) => handleDownloadByType('blackmail', e.target.checked)} />}
                                    />
                                    <span className="black">強迫  </span>
                                </Grid>
                                <Grid paddingRight={2}>
                                    <Controller
                                        name="other"
                                        control={control}
                                        render={({ field }) => <input type="checkbox" {...field}
                                            checked={field.value && !batchDownload}
                                            onChange={(e) => handleDownloadByType('other', e.target.checked)} />}
                                    />
                                    <span className="black">その他 </span>
                                </Grid>
                                <Grid paddingRight={2}>
                                    <Controller
                                        name="growingup"
                                        control={control}
                                        render={({ field }) => <input type="checkbox" {...field} checked={field.value && !batchDownload}
                                            onChange={(e) => handleDownloadByType('growingup', e.target.checked)} />}
                                    />
                                    <span className="black">成長 </span>
                                </Grid>
                                <Grid paddingRight={2}>
                                    <Controller
                                        name="addition1"
                                        control={control}
                                        render={({ field }) => <input type="checkbox" {...field} checked={field.value && !batchDownload}
                                            onChange={(e) => handleDownloadByType('addition1', e.target.checked)} />}
                                    />
                                    <span className="black">新規1 </span>
                                </Grid>
                                <Grid paddingRight={2}>
                                    <Controller
                                        name="addition2"
                                        control={control}
                                        render={({ field }) => <input type="checkbox" {...field} checked={field.value && !batchDownload}
                                            onChange={(e) => handleDownloadByType('addition2', e.target.checked)} />}
                                    />
                                    <span className="black">新規2</span>
                                </Grid>

                                <span className="black">)</span>

                            </Grid>

                            <Grid item xs={12} container className="black" padding={2}>

                                <Grid item xs={2}><span className="black"></span></Grid>
                                <Grid item xs={4}>
                                    <Button type="button" onClick={() => remarkCsvDownload()}>
                                        <img src={btncsvdownload} alt="library" />
                                    </Button></Grid>

                            </Grid>

                        </Grid>
                        <Grid item xs={12}>
                            <Grid container display={"flex"} justifyContent={"center"}>
                                <Button type="submit" disabled={isButtonDisabled}>
                                    <img src={submit} />
                                </Button>
                                <Button type="button" onClick={() => handleReset()}>
                                    <img src={refresh} />
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    {remarkData ?
                        <>
                            <Grid xs={12} className="member_moniter_content_list">
                                <Grid xs={4}>
                                    <Grid xs={12} className="content-row">
                                        <Grid xs={4} className="black">
                                            <span>★検索結果 ：</span>
                                        </Grid>
                                        <Grid xs={8}>
                                            <span className="member_mointer_content_red-text">
                                                {remarkData?.length ? remarkData.length : 0} 件　{count ? count : 0} 件中
                                            </span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} padding={2} className="bdr_blue_bottom"></Grid>
                        </>
                        : null}
                    <Grid className="hr"></Grid>
                    <Grid className="hr"></Grid>
                    <Grid className="hr"></Grid>

                    {remarkData?.map((item: any, index: any) => {
                        const itemDate = item.date
                            ? new Date(item.date[0], item.date[1] - 1, item.date[2], item.date[3], item.date[4])
                            : null;

                        const formattedDate = itemDate ? formatDate(itemDate) : null;
                        return (
                            <>
                                <Grid container key={index}>
                                    <Grid item xs={8}>
                                        <ul className="black_bold">
                                            <li className="list_style member_mointer_content_listData">
                                                <Grid container>
                                                    <Grid item xs={12} flexDirection='row'>
                                                        <Grid>●発言No: {item.remarkNo}</Grid>

                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        ●発言日： {formattedDate}
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        ●ID：{item.memberid}
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                         ●タイプ区分：{item.normal===1? "普通神経症の部屋":
                                                                    item.other===1?"その他の部屋":
                                                                    item.blackmail===1?"強迫神経症の部屋":
                                                                    item.anxiety===1?"不安神経症の部屋":
                                                                    item.growingup===1?"成長の部屋":
                                                                    item.addition?item.addition:item.additional}
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
                                    </Grid>
                                </Grid>
                                <Grid xs={12} className="bdr_blue_bottom"></Grid>
                            </>
                        );
                    })}
                </Grid>
            </Grid>

        </Grid>
    );
};

export default DownloadRemark;



