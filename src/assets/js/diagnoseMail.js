
function sendMail(type, frm){
	
    var message = jQuery.trim($('#comment3').val());
    if(message == 'undefined' || message == ""){
	    message = jQuery.trim($('#comment2').val()); 
   }
	

    if($('#sonota').is(":checked") && message == ""){
	    alert("内容を入力してください。"); return;
     }else if(!$('#sonota').is(":checked") && message != ""){
	      alert("その他のチェックボックスをクリックしてください。"); return;
	}
     
     
       if(!$('#sonota').is(":checked") &&  !$('#syoujou').is(":checked") && !$('#houhou').is(":checked") && !$('#kikan').is(":checked")){
        alert("チェックボックスを記入してください。");
        return ;
     }
     
     
     
      if(!checkForm(frm)){return;}
      
      if(type == 4){
	 $('.s_font').html('');     
         $('.m-font').html(''); 	      
      }
    
    
     $('#diagnose_result').val( $('#result').html());
     $("input[type=button]").attr("disabled", true);
      $.ajax({
            url: 'index.php?section=diagnose&action=mail&type=' + type ,
            data:$(frm).serialize(),
            type: 'post',
            cache: false,
            dataType: 'html',
            success: function (data) {
		    location.href = 'diagnose_thank.html';
            }
        });
}
