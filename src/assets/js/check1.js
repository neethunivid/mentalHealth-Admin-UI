/* 森田神経質度チェック */

function  event1(){
 a =0;
 b =0;
 c =0;
 d =0;
 
 for (  i =0; i<=13 ; i++)
  if (document.test.elements[i].checked) {
 a += eval(document.test.elements[i].value);
 }
 
 for (  i =14; i<= 23; i++)
  if (document.test.elements[i].checked) {
 b += eval(document.test.elements[i].value);
 }
 
 for (  i =24; i<= 49; i++)
  if (document.test.elements[i].checked) {
 c += eval(document.test.elements[i].value);
 }
 
 for (  i =0; i<=49 ; i++)
  if (document.test.elements[i].checked) {
 d += eval(document.test.elements[i].value);
 }
 
  if ( d <17 ) {
    document.write( "<center><h2>該当する項目は全部で"+d+"個（６割以下）で <br>必ずしも森田神経質とは限りません。一度医師にご相談下さい。</h2><br>【該当項目の内訳】<br>■「症状の特徴」があてはまるのは"+a+"個でした■<br>■「とらわれの症状」であてはまるのは"+b+"個でした■<br>■「神経質症状の特徴」であてはまるのは"+c+"個でした■</center>") ;
   }
    else{
     document.write( "<center><h2>該当する項目は全部で"+d+"個（６割以上）で <br>典型的な森田神経質です。</h2><br>【該当項目の内訳】<br>■「症状の特徴」があてはまるのは"+a+"個でした■<br>■「とらわれの機制」であてはまるのは"+b+"個でした■<br>■「神経質症状の特徴」であてはまるのは"+c+"個でした■</center>") ;
   }
 
 }