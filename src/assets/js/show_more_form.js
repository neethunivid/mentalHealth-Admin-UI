/* 折りたたみフォーム */

	function moreForm1(){
		radio = document.getElementsByName('sankaninzu') 
		if(radio[0].checked) {
			//フォーム
			document.getElementById('backyellow2').style.display = "none";
			document.getElementById('backyellow3').style.display = "none";
			document.getElementById('sankaninzu-field').style.display = "none";
		}else if(radio[1].checked) {
			//フォーム
			document.getElementById('backyellow2').style.display = "";
			document.getElementById('backyellow3').style.display = "";
			document.getElementById('sankaninzu-field').style.display = "";
		}
	}
	
	//オンロードさせ、リロード時に選択を保持
	window.onload = moreForm1;