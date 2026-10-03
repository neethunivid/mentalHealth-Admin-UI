import { useState,useEffect } from 'react';
import LeftPanBBS from '../../Common/LeftPanBBS';
import '../../../assets/css/health.css';
import { Box, Grid,Button } from '@mui/material';
import leftbtn from '../../../assets/images/btn_chnge.gif';
import rightbtn from '../../../assets/images/7nth_page_btn_1.gif';
import { useForm,Controller } from "react-hook-form";
import ApiClient from '../../../API/API-client';
import { useNavigate} from "react-router-dom";

const AdminSettings = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [userName, setUsername] = useState<any>("");
  const [userPassword, setUserPassword] = useState<any>("");
  const [adminGender, setadminGender] = useState<any>("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,watch,
    formState: { errors },
  } = useForm();
  const watchField = watch("username");
  const navigate = useNavigate();
  
  //on submit button click calls th efunction adminloginupdate
  const onSubmit=async(data:any)=>{
    if (watchField?.length < 4 || watchField?.length > 15) {
      alert("4～15字の英数大小文字のニックネームにしてください。");
      return;
    } else {
      const dataRequest: any = {
        memberid: watchField,
        withdrawList: false,
      };
      try {
        const apiData = await ApiClient.post(
          "api/members/memberlistsearch",
          dataRequest,
          {}
        );
        if (apiData?.data?.count === 0) {
          adminLoginupdate(data)
   setTimeout(() => {
    sessionStorage.clear();
     navigate('/');
  }, 2000);
        } else {
          //memberId exist
          alert("会員IDはすでに存在しています。このIDは使用できません。");
        }
      } catch (e) {
        alert(e);
      }
    }
   
  }
  
  useEffect(() => {
   adminLogindetail();
   adminUserdetail();
   adminGenderdetail();
    
   }, []);
 
  //adminupdate api
  const adminLoginupdate = async (data: any) => {
    const dataRequest = {
        username: data.username,
        password: data.password,
        sex:data.gender
    }
    try {
        const apiData = await ApiClient.post('login/updateadminconfig', dataRequest);
        if (apiData) {
          //  navigate('/');
          navigate('/adminfinish');
            
        }
    } catch (error: any) {
        if (error.response && error.response.status === 403) {
            // Handle 403 error
            console.log("403 error occurred");
        } else {
            // Handle other errors
            console.log("Error occurred:", error);
        }
    }

  


}
const handleReset=()=>{
  reset();
  setValue('username',"");
  setValue("password","");
  setValue("gender","");
}

const adminLogindetail = async () => {
  const dataRequest = {
    "key":"ADMIN_PASSWORD"  
  }
  try {
      const apiData = await ApiClient.post('api/listConfig', dataRequest);
      if (apiData) {
        setUserPassword(apiData.data.data[0].value);
          
      }
  } catch (error: any) {
      if (error.response && error.response.status === 403) {
          // Handle 403 error
          console.log("403 error occurred");
      } else {
          // Handle other errors
          console.log("Error occurred:", error);
      }
  }
}
const adminUserdetail = async () => {
  const dataRequest = {
    "key":"ADMIN_USERNAME"  
  }
  try {
      const apiData = await ApiClient.post('api/listConfig', dataRequest);
      if (apiData) {
       setUsername(apiData.data.data[0].value);
      }
  } catch (error: any) {
      if (error.response && error.response.status === 403) {
          // Handle 403 error
          console.log("403 error occurred");
      } else {
          // Handle other errors
          console.log("Error occurred:", error);
      }
  }
}
const adminGenderdetail = async () => {
  const dataRequest = {
    "key":"SEX"  
  }
  try {
      const apiData = await ApiClient.post('api/listConfig', dataRequest);
      if (apiData) {
       
       setadminGender(apiData.data.data[0].value);
      
      }
  } catch (error: any) {
      if (error.response && error.response.status === 403) {
          // Handle 403 error
          console.log("403 error occurred");
      } else {
          // Handle other errors
          console.log("Error occurred:", error);
      }
  }
}


  return (
    <Grid container>
      <Box>
        <Grid container xs={12} spacing={2}>
          <Grid item xs={3}>
            <LeftPanBBS/>
          </Grid>
          <Grid item xs={9}>
          <Grid className="content-row">
            <Grid className="p2red_bg_left size"></Grid>
            <Grid className="p2red_bg_midle">
              <Grid className="top-header">
                <span className="verdana_big">管理者設定</span>
        
 
              </Grid>
            </Grid>
            <Grid className="p2red_bg_right size"></Grid>
          </Grid>
          <form name="adminsettings" onSubmit={handleSubmit(onSubmit)}>
              <Grid className="toggle-switch-box">
            
                <Grid container xs={12}>
                <Grid item xs={5}>
                  <span className="black">管理者ログイン名</span>
                </Grid>
              {userName &&  <Grid item xs={7}>
                 {/* <input type="text" className="bdr_text"  {...register("username")}/> */}
                 <Controller
                      name="username"
                      control={control}
                      defaultValue={userName} 
                      render={({ field }) => <input  className='bdr_text' type='text' {...field} />}
                    />
                </Grid>}</Grid>
                <Grid className='hr'></Grid>
                <Grid container xs={12}>
                <Grid item xs={5}>
                  <span className="black">管理者パスワード</span>
                </Grid>
               {userPassword && <Grid item>
                <Controller
                      name="password"
                      control={control}
                      defaultValue={userPassword} 
                      render={({ field }) => <input  className='bdr_text' type='password' {...field} />}
                    />
                    {/* <input type="password" className="bdr_text"  {...register("password")}/> */}
                </Grid>}</Grid>
                <Grid className='hr'></Grid>
                  <Grid container xs={12}>
                    <Grid item xs={5}>
                      <span className="black">性別</span>
                    </Grid>
                    <Grid xs={7} className='text_grid'>
                    
                     {adminGender &&
                        <input type="radio" className="mg_lftrgt"  value={1}
                        {...register("gender")} defaultChecked={adminGender=='1'}/>}
                        <label className="blacktxt mg_lftrgt">男性</label>
                
                    
                      {adminGender &&
                        <input className='mg_lftrgt' type="radio" value={2}
                        {...register("gender")} defaultChecked={adminGender=='2'}/>}
                        <label className="blacktxt mg_lftrgt">女性</label>
                    
                    </Grid>
                  </Grid>
            
              </Grid>
              
              <Grid className='hr'></Grid>
              <Grid className='hr'></Grid>
              <Grid container justifyContent="center">
                <Grid item>
                  <Grid container spacing={2}>
                    <Button type='submit'>
                    <img src={leftbtn} className="btn"  alt="Left Button" />
                    </Button>
                    <Button type='button'>
                    <img src={rightbtn} className="btn"  alt="Right Button" onClick={()=>handleReset()} />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              </form>
            </Grid>
          </Grid>
        
      </Box>
    </Grid>
  );
}

export default AdminSettings;