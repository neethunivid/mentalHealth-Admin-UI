import { setMemberReg } from './../../../../Redux/actions';
import { checkDate } from "../../../Common/Date_conversion";

export function onSubmitForm(data:any,setError:Function,navigate:Function,dispatch:Function){
 
  const email1Pc = data.MemberReg_email_pc1;
  const email2Pc = data.MemberReg_email_pc2;
  const fullEmailPc = `${email1Pc}@${email2Pc}`;
  // data.MemberReg_email_mob1 || data.MemberReg_email_mob2
const email1Sp=data.MemberReg_email_mob1;
const email2Sp=data.MemberReg_email_mob2;
const fullEmailSp=`${email1Sp}@${email2Sp}`; 


  const validateEmail = (email: string) => {
    // Regular expression for validating an Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

    if (!data.MemberReg_statement_title) {
        alert("発言タイトルを入力してください。");
        setError("MemberReg_statement_title", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_statement_text) {
        alert("テキストを記入ください");
        setError("MemberReg_statement_text", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_join_date) {
        alert("Please review the value you provided for join_date");
        setError("MemberReg_join_date", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_name) {
        alert("  お名前(姓）を入力してください。  ");
        setError("MemberReg_name", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_name2) {
        alert("お名前(名）を入力してください。");
        setError("MemberReg_name2", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_namek) {
        alert("  ふりがな(姓）を入力してください。");
        setError("MemberReg_namek", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_namek2) {
        alert("お名前(名）を入力してください。");
        setError("MemberReg_namek2", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_memberid) {
        alert("希望IDを入力してください。");
        setError("MemberReg_memberid", {
          type: "required",
        });
        return;
      } else if (
       !data.MemberReg_password||data.MemberReg_password?.length < 6 ||
        data?.MemberReg_password?.length > 15
      ) {
        alert("パスワードは6字から15字以内の英数字にしてください。");
        setError("MemberReg_password", {
          type: "required",
        });
        return;
      } else if (data.MemberReg_password != data.MemberReg_password2) {
        alert("パスワードが間違っています");
        setError("MemberReg_password2", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_sex) {
        setError("MemberReg_sex", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_dob1) {
        alert("日付を入力してください。");
        setError("MemberReg_dob1", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_dob2) {
        alert("日付を入力してください。");
        setError("MemberReg_dob2", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_dob3) {
        alert("日付を入力してください。");
        setError("MemberReg_dob3", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_post1) {
        alert("郵便番号を入力してください。");
        setError("MemberReg_post1", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_post2) {
        alert("郵便番号を入力してください。");
        setError("MemberReg_post2", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_address1) {
        alert("市区郡町村を入力してください。");
        setError("MemberReg_address1", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_address2) {
        alert("Please review the value you provided for address2");
        setError("MemberReg_address2", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_address2) {
        alert("Please review the value you provided for address2");
        setError("MemberReg_address2", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_tel1) {
        alert("電話番号を入力してください。");
        setError("MemberReg_tel1", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_tel2) {
        alert("電話番号を入力してください。");
        setError("MemberReg_tel2", {
          type: "required",
        });
        return;
      } else if (!data.MemberReg_tel3) {
        alert("電話番号を入力してください。");
        setError("MemberReg_tel2", {
          type: "required",
        });
        return;
      } else if (
        !data.MemberReg_checkboxGroup &&
        !data.MemberReg_checkboxGroup1 &&
        !data.MemberReg_checkboxGroup2 &&
        !data.MemberReg_checkboxGroup3 &&
        !data.MemberReg_checkboxGroup4 &&
        !data.MemberReg_checkboxGroup5 &&
        !data.MemberReg_checkboxGroup6
      ) {
        alert("部屋を選んでください。");
        return;
      } else if (
        data.MemberReg_checkboxGroup5 &&
        !data.MemberReg_checkboxGroup5Title
      ) {
        alert("新規１の部屋に入ってください。");
        setError("MemberReg_checkboxGroup5Title", {
          type: "required",
        });
        return;
      } else if (
        data.MemberReg_checkboxGroup6 &&
        !data.MemberReg_checkboxGroup6Title
      ) {
        alert("新規2の部屋に入ってください。");
        setError("MemberReg_checkboxGroup6Title", {
          type: "required",
        });
        return;
      } else if (!/^\d+$/.test(data.MemberReg_post1)) {
        alert("郵便番号を入力してください。");
        setError("MemberReg_post1", {
          type: "required",
        });
        return;
      } else if (!/^\d+$/.test(data.MemberReg_post2)) {
        alert("郵便番号を入力してください。");
        setError("MemberReg_post2", {
          type: "required",
        });
        return;
      }
      // } else if (!data.MemberReg_email_pc1) {
      //   alert("メールアドレス 1 必須");
      //   setError("MemberReg_email_pc1", {
      //     type: "required",
      //   });
      //   return;
      // } else if (!data.MemberReg_email_pc2) {
      //   alert("メールアドレス 1 必須");
      //   setError("MemberReg_email_pc2", {
      //     type: "required",
      //   });
      //   return;
      // }
      else if(!checkDate(`${data.MemberReg_dob1}-${data.MemberReg_dob2}-${data.MemberReg_dob3}`)){
          alert(`YYYY-MM-DD の形式で日付を入力してください ==>${data.MemberReg_dob1}-${data.MemberReg_dob2}-${data.MemberReg_dob3}`);
          setError("MemberReg_dob1", {
            type: "required",
          });
          return;
  
      }
      else if (!checkDate(data.MemberReg_join_date)) {
   
          alert(`YYYY-MM-DD の形式で日付を入力してください ==>${data.MemberReg_join_date}`);
          setError("MemberReg_join_date", {
            type: "required",
          });
          return;   
      } 
        else if (data.MemberReg_change_date&&!checkDate(data.MemberReg_change_date)) {
          alert(`YYYY-MM-DD の形式で日付を入力してください ==>${data.MemberReg_change_date}`);
          setError("MemberReg_change_date", {
            type: "required",
          });
          return;
      }else if(!data.MemberReg_email_pc1 &&data.MemberReg_email_pc2){
        alert("メールアドレス1を正しく入力してください");
      setError("MemberReg_email_pc1", {
        type: "required",
      });
      return;
      }else if(data.MemberReg_email_pc1 &&!data.MemberReg_email_pc2){
        alert("メールアドレス1を正しく入力してください");
        setError("MemberReg_email_pc2", {
          type: "required",
        });
        return;
      

      }else if(!data.MemberReg_email_mob1&&data.MemberReg_email_mob2){
        alert("メールアドレス2を正しく入力してください");
        setError("MemberReg_email_mob1", {
          type: "required",
        });
        return;
      }else if(data.MemberReg_email_mob1&&!data.MemberReg_email_mob2){
alert('メールアドレス2を正しく入力してください');
setError("MemberReg_email_mob2", {
  type: "required",
});
return;
      }
      else if(data.MemberReg_email_pc1 && data.MemberReg_email_pc2){
        if(!validateEmail(fullEmailPc)){
          alert('メールアドレス1を正しく入力してください');
          return
        }else{
         if(data.MemberReg_email_mob1&&data.MemberReg_email_mob2){
            if( !validateEmail(fullEmailSp)){
             alert('メールアドレス2は空欄にできません')
             return
            }
        }
      }
      }
        else if(data.MemberReg_email_mob1&&data.MemberReg_email_mob2){
          if( !validateEmail(fullEmailSp)){
           alert('メールアドレス2は空欄にできません')
           return
          }
          }
      //form submitted fields are save to redux state
      dispatch(setMemberReg("memberReg", data));
      sessionStorage.setItem("memberReg", JSON.stringify(data));
  
      //confirmation dialog to navigate to next screen or not
      const userConfirmation = window.confirm("これで登録しますか? ");
      if (userConfirmation) {
        navigate("/memberpreview");
      } else {
        // User clicked Cancel, do nothing or perform any additional actions
      }
}