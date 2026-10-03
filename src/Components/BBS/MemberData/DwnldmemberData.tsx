import { Box, Button, Grid, Typography } from '@mui/material';
import '../../../assets/css/health.css';
import downloadbtn from '../../../assets/images/pg_11_btn_left.gif';
import resetbtn from '../../../assets/images/pg_11_btn_right.gif';
import { useForm } from 'react-hook-form';
import LeftPanBBS from '../../Common/LeftPanBBS';
import '../MemberData/member.scss';
import ApiClient from '../../../API/API-client';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { formatDateString, getCurrentDate } from '../../Common/Date_conversion';




const MemberdataDwnld = () => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);//disables the button after apical
    const {
        register,
        handleSubmit,watch,reset,
        formState: { errors },
      } = useForm();
      //watches the batch checkbox is checked or unchecked
      const batchuserCheckbox = watch('batchuser');
       //watches the enrollement checkbox is checked or unchecked
      const enrollmentdateCheckbox= watch('enrollmentdate')
      const navigate = useNavigate();
      //checks either of the checkbox is checked 
      const onSubmit = (data: any) => {
         if (!batchuserCheckbox && !enrollmentdateCheckbox) {
          alert("ダウンロード方法を選択し、ダウンロードボタンを押して下さい。");
          return;
        }
      
        if (batchuserCheckbox) {
          downloadDetails(batchuserCheckbox, data);
          return; 
        }
      
        if (enrollmentdateCheckbox) {
          if (!data.fromYear || !data.frommonth || !data.fromdate || !data.toYear || !data.tomonth || !data.todate) {
            alert("入会日指定ダウンロードを選択した場合、期間を入力して下さい。　例：2008年01月01日");
            return; 
          }
          downloadDetails(batchuserCheckbox, data);
          return;
        }
      };
  const handleReset = () => {
    reset(); 
  };
 // doawnload files according to the apicall request
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
  
  
//download api
  const downloadDetails = async (data1:any,data:any) => {
    setButtonDisabled(true);
         if (data1 == '' || data1 == undefined) {
            data1 = false;
        }
    const date1=data.fromYear??"";
    const date2=data.frommonth??"";
    const date3=data.fromdate??"";
    const formattedDate = `${date1}-${date2}-${date3}`;
    const dateto1=data.toYear??"";
    const dateto2=data.tomonth??"";
    const dateto3=data.todate??"";
    const formattedtoDate = `${dateto1}-${dateto2}-${dateto3}`;
      const dataRequest = {
        
           "batch":data1,
          ...(date1&&date2&&date3 && { "fromDate":formatDateString(formattedDate) }),
          ...(dateto1&&dateto2&&dateto3 && { "toDate": formatDateString(formattedtoDate) }),
      }
      try {
          const apiData = await ApiClient.post('api/members/member/downloadmemberdata', dataRequest);
          const formattedDate = getCurrentDate();
          if (apiData) {
              downloadFile(apiData.data, `member_data_${formattedDate}`, 'text/csv')
              setButtonDisabled(false);
          }

      } catch (error: any) {
          if (error.response && error.response.status === 403) {

              console.error("403 error occurred");
          } else {

              console.error("Error occurred:", error);
          }
      }


  }

  return(
<Grid container xs={12} padding={1} spacing={1}>
<Grid item xs={3} spacing={2}>
          <LeftPanBBS />
        </Grid>
<Grid item className='mg_lftrgt' xs={9}>
<form id="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
                    <Box className='p2red_bg_left'></Box>
                    <Box className='p2red_bg_midle'>
                        <Grid className='text_grid'>
                            <Typography className='txtverdana'>D.会員データのダウンロード</Typography>
                            <Typography className='txtverdana1'>会員 DB 管理</Typography>
                        </Grid>
                    </Box>
                    <Box className='p2red_bg_right'></Box>
            
            </Grid>
  <Grid className='mgtp_bt'><span className='blacktxt'>★ダウンロード方法を選択し、ダウンロードボタンを押して下さい。</span></Grid>

<Grid item className='table_bordr'>
    <Grid className='tpspc'></Grid>
    <Grid className='mglft'>
        <input type="checkbox" value="" {...register('batchuser')} />
        <label className='blacktxt checkpad'> 一括ダウンロード
      </label>
    </Grid>
    <Grid className='tpspc'></Grid>
    <Grid container>
        <Grid item xs={3} className='mglft'>
        <input type="checkbox" value="" {...register('enrollmentdate')} />
        <label className='blacktxt checkpad'> 入会日指定ダウンロード
      </label>
       </Grid>
        <Grid item xs={4}><Grid>
  <input type="text"  className='bdr_text_medium'  {...register('fromYear')} />
  <label className='blacktxt mg_lftrgt1'>年</label><input  type="text" className="bdr_text_medium"  {...register('frommonth')}/><label className='blacktxt mg_lftrgt1'>
月</label>
<input type="text" className="bdr_text_medium"  {...register('fromdate')}/></Grid></Grid>
        <Grid item xs={5}><Grid> <label className='blacktxt mgrgt'>~</label><input type="text"  className='bdr_text_medium' {...register('toYear')}  />
  <label className='blacktxt mg_lftrgt1'>年</label><input  type="text" className="bdr_text_medium"  {...register('tomonth')}/><label className='blacktxt mg_lftrgt1'>
月</label>
<input type="text" className="bdr_text_medium"  {...register('todate')} /></Grid></Grid>
    </Grid>
    <Grid className='tpspc'></Grid>
    <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}><span className='blacktxt'>（期間を入力して下さい。　例：2008　年　01月01日）</span></Grid>
    </Grid>
    <Grid className='tpspc'></Grid>
    <Grid className='tpspc'></Grid>
  
</Grid>
<Grid container className='mg_top' style={{justifyContent:'center',alignItems:'center'}}>
<Button type='submit' className='padding_top' disabled={isButtonDisabled}><img width={97} height={27} src={downloadbtn} /></Button>
<Grid className='emptygrid'></Grid>
<Button type='reset' className='padding_top' onClick={handleReset} ><img width={97} height={27} src={resetbtn} /></Button>
  
</Grid>
</form>
</Grid>

</Grid>
  );

}

export default MemberdataDwnld;