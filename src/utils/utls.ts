import { styled } from '@mui/material/styles';
import {  MenuItem } from '@mui/material';
const getOptions = () => {
    const age = [
        { id: "10", name: "10代" },
        { id: "20", name: "20代" },
        { id:"30", name: "30代" },
        { id: "40", name: "40代" },
        { id:  "50", name: "50代" },
        { id: "60", name: "60代" },
        {id:"70", name:"70代以上"},
        {id:"0", name:"不詳"},
      ];
{/* options for reservationslot list as per customer */}
      const ReservationSlotages = [
        { id: "10", name: "10代" },
        { id: "20", name: "20代" },
        { id:"30", name: "30代" },
        { id: "40", name: "40代" },
        { id:  "50", name: "50代" },
        { id: "60", name: "60代以上" },
        
      ];
      const sessions = [
        { id: "1", name: "1回" },
        { id: "2", name: "2回" },
        { id: "3", name: "3回" },
        { id: "4", name: "4回以上" },
      ];
      const gender = [
        { id: "女性", name: "女性" },
        { id: "男性", name: "男性" },
      ];
      
      const self = [
        { id: "匿名", name: "匿名" },
        { id: "自由記入", name: "自由記入" },
        { id: "彼自身", name: "彼自身" },
        { id: "家族", name: "家族" },
      
      ];

      const symptomsList = [
        { value: '普通神経症', label: '普通神経症（不眠、病気不安症、耳鳴り、雑音他）' },
        { value: '不安神経症', label: '不安神経症' },
        { value: 'パニック症', label: 'パニック症（発作含）' },
        { value: '強迫観念・強迫症', label: '強迫観念・強迫症' },
        { value: '対人・社交不安症', label: '対人・社交不安症' },
        { value: '気分障害', label: '気分障害（うつ病、躁鬱病、抑うつ・気分変調症）' },
        { value: 'その他神経症', label: 'その他神経症（離人症、神経症）' },
        { value: 'その他', label: 'その他（発達障害、トラウマ、虐待、他）' }
      ];
     // Styling the selected item and hover
      const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
        '&.Mui-selected': {
        backgroundColor: '#1967d2', // Dark blue background for selected items
        '&:hover': {
        backgroundColor: '#87A2FF', // Darker blue when hovered
        },
      },
    }));

      
      return{ age, sessions,gender,self,symptomsList,StyledMenuItem,ReservationSlotages};
};
export default getOptions;

