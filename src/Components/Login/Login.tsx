import React from 'react';
import { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material';
import '../../assets/css/login.css'
import RestService from '../../API/API-helper';
import config from '../../config.json';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../../API/API-client';
import { useForm } from "react-hook-form";
import apiClient from '../../API/API-client';


const Login: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        // Check if token exists
        const token = sessionStorage.getItem('token');
        if (token) {
            // Redirect to home
            navigate('/home');
        }
    }, []);
    const onSubmit = (data: any) => {
        userAuthenticate(data)
    }
    const userAuthenticate = async (data: any) => {
        const dataRequest = {
            "username": data.username,
            "password": data.password
        }
        try {
            const apiData = await ApiClient.post('login/authenticate', dataRequest, {});
            if (apiData) {
                if (apiData.data.data === 'Invalid credentials') {
                    setMessage("管理者ログイン: ログイン情報が正しくありません");
                } else {
                    sessionStorage.setItem('memberId',apiData.data.data.user.memberId);
                    ApiClient.setToken(apiData.data.data.token);
                    navigate('/home');
                }
            }
        } catch (error: any) {
            if (error.response && error.response.status === 403) {
                // navigate('/home');
                // Handle 403 error
                console.log("403 error occurred");
            } else {
                // Handle other errors
                console.log("Error occurred:", error);
            }
        }


    }

    return (
        <Grid container className='grid-container'>
            <Grid item xs={12} sm={6} md={4}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {!message ?
                        <Box className="label-item">
                            <h1 id="label-item" >管理者ログイン</h1>
                        </Box> : null}
                    {message ? (<Box>
                        <h1 id="message" >{message}</h1>
                    </Box>) : null}
                    <Grid container spacing={2}>
                        <Grid item xs={12} className="grid-item">
                            <Grid item xs={3}>
                                <Typography >ユーザーID</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <input type="text" size={25}
                                    {...register("username")} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className="grid-item">
                        <Grid item xs={3}>
                            <Typography >パスワード：</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <input type="password" size={25}  {...register("password")} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className="grid-item">
                        <Grid item xs={3}>
                        </Grid>
                        <Grid item xs={9}>
                            <input type="submit" name="Sub2" value="ログイン" />
                        </Grid>
                    </Grid>

                </form>
            </Grid>
        </Grid>
    )
}

export default Login;