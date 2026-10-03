import { Box, Button, Grid, Typography } from '@mui/material';
import '../../../assets/css/health.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import webbtn from '../../../assets/admin_library/images/lib_management2-3.png';
import arrowbtn from '../../../assets/admin_library/images/lib_arrow2.png'
import LeftPanLibrary from '../Common/LeftPanLibrary';

const BookPublish_Web = () => {
    const {
        register,
        handleSubmit,watch,reset,
        formState: { errors },
      } = useForm();
      const navigate = useNavigate();
     //fuction for onsubmiting the form
      const onSubmit = (data: any) => {
        navigate('/publishedbooklist', { state: {rangeValues:data} });
     
        }
  return(
<Grid container xs={12} padding={1} spacing={1}>
<Grid item xs={12} sm={3} spacing={2}>
          <LeftPanLibrary />
        </Grid>
<Grid item className='mg_lftrgt' xs={12} sm={9}>
<form id="formbookpublished" onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
                    <Box className='p2red_bg_left'></Box>
                    <Box className='p2red_bg_midle'>
                        <Grid className='text_grid'>
                            <Typography className='txtverdana'>D.WEB掲載の管理</Typography>
                            <Typography className='txtverdana1'>図書室管理</Typography>
                        </Grid>
                    </Box>
                    <Box className='p2red_bg_right'></Box>
            
            </Grid>
  <Grid className='mgtp_bt'><span className='blacktxt'>★いづれかの項目を選択して下さい。</span></Grid>

<Grid item className='table_bordr'>
    <Grid className='tpspc'></Grid>
    <Grid xs={6} container>
        <Grid item xs={12} sm={5}>
        
       </Grid>
        <Grid item xs={12} sm={5} className='content-row'>
          <Grid className='book-padtop'><Button type='submit'><img width={213} height={34} src={webbtn} /></Button></Grid>
        <Grid className='top-padding'><img width={35} height={9} src={arrowbtn} /></Grid><Grid><span className='blacktxt top-padding'>（見たい連番範囲を指定して下さい）</span><Grid className='content-row'>
            <input type="text"  className='bdr_txt9' {...register('range1')}  />
  <label className='blacktxt library-pad-left-right'>~</label><input  type="text" className="bdr_txt9"  {...register('range2')}/>
  </Grid><span className='blacktxt'>（例：3000～3499）</span></Grid></Grid>
       <Grid item xs={5}></Grid>
    </Grid>
  
    <Grid className='tpspc'></Grid>
    <Grid className='tpspc'></Grid>
  
</Grid>

</form>
</Grid>

</Grid>
  );

}

export default BookPublish_Web;