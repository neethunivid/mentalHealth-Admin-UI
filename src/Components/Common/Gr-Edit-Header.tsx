import { Grid, Box, Button } from "@mui/material";
import { useState } from "react";
import apiClient from "../../API/API-client";
import { useNavigate } from "react-router-dom";

interface EditGrantHeaderComponentProps {
    selectedId: number[]; // Define the selectedId prop with the appropriate type
  }
  
  const EditGrantHeaderComponent = (props: EditGrantHeaderComponentProps) => {
    const navigate = useNavigate();
    const { selectedId } = props;
    //when delete button pressed 
    const deleteButtonAction = async (formData: any) => {
        try {
            const confirmed = window.confirm('本当に削除しますか？');
            if (confirmed) {
                var req={
                    "ids":selectedId
                }
                //calling delete api
                const apiData = await apiClient.delete('/api/grant-requests/'+selectedId);
                if (apiData) {

                    if (apiData.data.error == null && apiData.data?.data.includes("deleted successfully")) {
                       // setSelectedIds([]);
                        navigate('/grantedit');
                        window.location.reload();

                    }
                }
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    return (
        <Grid xs={12}>
            <Grid xs={12} item >
                <Box className="p2red_bg_left"></Box>
                <Box className="p2red_bg_midle">
                    <span className="black">B.申請内容の編集（修正・追加・削除）</span>
                </Box>
                <Box className="p2red_bg_right"></Box>
            </Grid>
            <Grid container>
                <Grid item xs={10} ></Grid>
                <Grid item xs={2} >
                    <Button className="rmbtn" onClick={deleteButtonAction} name='remove'>
                        削除
                    </Button>
                </Grid>
            </Grid>
        </Grid >
    );
};

export default EditGrantHeaderComponent;
