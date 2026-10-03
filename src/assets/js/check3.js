/* パニック障害チェック */

function  event1(){
 d =0;
 
 for (  i =0; i<=25 ; i++)
  if (document.test.elements[i].checked) {
 d += eval(document.test.elements[i].value);
 }
 
  if ( d == 0 ) {
    document.write( "<center><h2>該当する項目は全部で"+d+"個で <br>パニック障害はあてはまりません。</h2></center>") ;
   }
  
   if ( d <= 3  && d !=0) {
    document.write( "<center><h2>該当する項目は全部で"+d+"個で <br>パニック障害はあてはまりません。</h2></center>") ;
   }
   
   if ( d >= 4) {
    document.write( "<center><h2>該当する項目は全部で"+d+"個（4個以上）で <br>パニック障害があてはまります。</h2></center>") ;
   }
  
 }