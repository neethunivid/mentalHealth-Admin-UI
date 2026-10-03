/* 対人恐怖度チェック */

function  event1(){
 d =0;
 
 for (  i =0; i<=69 ; i++)
  if (document.test.elements[i].checked) {
 d += eval(document.test.elements[i].value);
 }
 
  if ( d == 0 ) {
    document.write( "<center><h2>該当する項目は全部で"+d+"個で <br>対人恐怖症はあてはまりません。</h2></center>") ;
   }
  
   if ( d <= 20  && d !=0) {
    document.write( "<center><h2>該当する項目は全部で"+d+"個で <br>やや対人恐怖症の症状があります。</h2></center>") ;
   }
   
   if ( d >= 21) {
    document.write( "<center><h2>該当する項目は全部で"+d+"個（６割以上）で <br>かなり高い対人恐怖症の症状があります。</h2></center>") ;
   }
  
 }