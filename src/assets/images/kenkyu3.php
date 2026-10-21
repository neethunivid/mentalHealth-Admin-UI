<?php
require_once(dirname(__FILE__). "/state_data.php" );
$rows = getStageThreeData();
error_reporting(0);
session_start();

 if(!count($_SESSION['stage2']) || !count($_SESSION['stage1'])){
     header("location:kenkyu1.php"); exit;
 }

if(isset($_FILES['image'])){
      $errors= array();
      $file_name = $_FILES['image']['name'];
      $file_size =$_FILES['image']['size'];
      $file_tmp =$_FILES['image']['tmp_name'];
      $file_type=$_FILES['image']['type'];
      $file_ext=strtolower(end(explode('.',$_FILES['image']['name'])));
      
      $extensions= array("jpeg","jpg","png","gif","txt","docx","pdf");
      
      if(in_array($file_ext,$extensions)=== false){
         $errors[]="extension not allowed, please choose a JPEG or PNG file.";
      }
      
      if($file_size > 2097152){
         $errors[]='File size must be excately 2 MB';
      }
      
      if(empty($errors)==true){
      echo $file_tmp;exit;
         move_uploaded_file($file_tmp,"images/".$file_name);
         echo "Success";
      }else{
         print_r($errors);
      }
   }


 if(isset($_POST["btnSubmit2"]))
{

    $errors = array();
    $uploadedFiles = array();
    $allfiles = array();
    $extension = array("jpeg","jpg","png","gif","txt","docx","pdf");
    $bytes = 1024;
    $KB = 1024;
    $totalBytes = $bytes * $KB;
    $UploadFolder = "UploadFolder";
    $_SESSION['files2']="";
    $counter = 0;
    
    foreach($_FILES["image"]["tmp_name"] as $key=>$tmp_name){
        $temp = $_FILES["image"]["tmp_name"][$key];
        $orgname = $_FILES["image"]["name"][$key];
        array_push($allfiles, $orgname);
        $name= time().$orgname;
        if(empty($temp))
        {
	echo "here";exit;
           $counter++;
         break;
        }
        
        $UploadOk = true;
        
        if($_FILES["images"]["size"][$key] > $totalBytes)
        {
            $UploadOk = false;
            array_push($errors, $name." file size is larger than the 1 MB.");
        }
        
        $ext = pathinfo($name, PATHINFO_EXTENSION);
        if(in_array($ext, $extension) == false){
            $UploadOk = false;
            array_push($errors, $name." is invalid file type.");
        }                      
       
        if($UploadOk == true){
	echo "varsha";exit;
            move_uploaded_file($temp,$UploadFolder."/".$name);
            array_push($uploadedFiles, $name);
        }
    }
    
    if($counter>0){
        if(count($errors)>0)
        {
            echo "<b>Errors:</b>";
            echo "<br/><ul>";
            foreach($errors as $error)
            {
                echo "<li>".$error."</li>";
                
            }
            echo "</ul><br/>";
        }
        
        if(count($uploadedFiles)>0){         
            
            echo count($uploadedFiles)." file(s) are successfully uploaded.";
            foreach($allfiles as $fileName)
            {
                //echo "<li>".$fileName."</li>";
                $_SESSION['files2'].=$fileName.", ";
                
            }
            
        }								
    }
    else{
        echo "Please, Select file(seee) to upload.";
    }
}	

if(isset($_POST['submit3']))
{
$_SESSION['stage3']=$_REQUEST;


header("location:kenkyuPrev.php"); 
}
if(isset($_POST['back']))
{
$_SESSION['stage3']=$_REQUEST;
header("location:kenkyu2.php"); 
}

function getData($stage, $key){

    return $_SESSION[$stage][$key];
 
 }
 function upload(){

 }
?>

<!DOCTYPE html PUBLIC "-//W3C//Dth XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/Dth/xhtml1-transitional.dth">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=Shift_JIS" />
<meta http-equiv="content-style-type" content="text/css" />
<meta http-equiv="content-script-type" content="text/javascript" />

<!-- End Javascript -->

<link rel="shortcut icon" href="images/favicon.ico" />

  <style>
      .tbl-form{
          width:100%;
          border:none;
          padding:0px;

      }

      .bg-orange{
          background:#fff5d7;
      }

      .tbl-form th{
          background-color:#c5e9ca;
          text-align:left;
      }
      .txt-box{
          width: 100%;
          height:25px;
          background:#f1f1ed;
          border: 1px solid black;

      }
      .txt-box-large{
          width: 100%;
          height:50px;
          background:#f1f1ed;
          border: 1px solid black;

      }
      .txt-box-holder{
          padding : 0px 15px 2px 10px;
          background:#f1f1ed;
      }
      .bg-right{
          background:#e9e3e3;
          padding-left:5px;
      }
      .bg-small-right{
          background:#e9e3e3;
          padding-left:5px;
          padding-right:5px;
          width:100%
      }
      .txtarea-box{
        background:#f1f1ed;
        border: 1px solid black;
        height:150px;
        width:100%  
      }
      .txtarea-box-large{
        background:#f1f1ed;
        border: 1px solid black;
        height:450px;
        width:100%  
      }
      .action-row{
          text-align:right;
          padding: 10px 20px 5px 0px;
          background-color:#e4e2db;
          font-color:red;
          
      }
      .hr{
        height: 8px;
        background-color: white;
        border: none;
    }
  </style>



</head>

<body>

    <?php

        $title = array('■様式3 （Form 3)', '記入項目 (Item Questions)', '記入欄 (Fill in Answers)', '記入例 (Example)','備考');
          
      $index=-1; 
    ?>
<form name="form3" method="POST" action="" enctype="multipart/form-data">
      <table class="tbl-form" cellpadding=0 cellspacing=0>
      <tr>
        <th style="text-align:center; background-color:lightblue;padding-top:15;" colspan="10"; > 研究活動助成の申請フォーム
        </th>
        </tr> 
        <tr class="hr"></tr>
          <tr>
            <th><?php echo $title[0] ?></th>
            <th><?php echo $title[1] ?></th>
            <th><?php echo $title[2] ?></th>
            <th><?php echo $title[3] ?></th>
            
          </tr>

          <tr class="hr"></tr>
          <?php ?>
           <tr>  <?php $index++ ;?>
               <td class="bg-orange" > <?php echo $rows[$index]['4'] ?></td>
               <td class="txt-box-holder" colspan="2">
           <textarea id="<?php echo $rows[$index]['0'];?>" name="<?php echo $rows[$index]['0'];?>" class="txtarea-box"  cols="20" rows="10"><?php echo getData('stage3',$rows[$index]['0']) ?></textarea>
           </td>               
               <td class="bg-right"><?php echo $rows[$index]['2']; ?> </td>
               
           </tr>
          <?php ?> 
          <tr class="hr"></tr>
            <?php ?>
           <tr>  <?php $index++ ;?>
               <td class="bg-orange" colspan="3"><?php echo $rows[$index]['4'] ?></td>    
               <td class="bg-right"></td>
                          
           </tr>
           
           <?php ?>
          <?php  ?> 
          <tr>  
               <td class="bg-orange" > </td>
               <td class="txt-box-holder" colspan="2">
           <textarea id="<?php echo $rows[$index]['0'];?>" name="<?php echo $rows[$index]['0'];?>"  class="txtarea-box"  cols="20" rows="10"><?php echo getData('stage3',$rows[$index]['0']) ?></textarea>
           </td>               
               <td class="bg-right"><?php echo $rows[$index]['2']; ?> </td>
               
           </tr>
          <?php ?> 
          <tr class="hr"></tr>
          <?php for($i=1; $i<=3; $i++){?>
           <tr>  <?php $index++ ;?>
               <td class="bg-orange" > <?php echo $rows[$index]['4'] ?></td>
               <td class="bg-orange" ><?php echo $rows[$index]['1']; ?></td>
               <td class="txt-box-holder" ><input type="text" id="<?php echo $rows[$index]['0'];?>" name="<?php echo $rows[$index]['0'];?>" value="<?php echo getData('stage3',$rows[$index]['0']) ?>" class="txt-box">
               </td>
               <td class="bg-right"><?php echo $rows[$index]['2']; ?> </td>
               
           </tr>
          <?php } ?> 
          <tr class="hr"></tr>
          <?php for($i=1; $i<=3; $i++){?>
           <tr>  <?php $index++ ;?>
               <td class="bg-orange" > <?php echo $rows[$index]['4'] ?></td>
               <td class="bg-orange" ><?php echo $rows[$index]['1']; ?></td>
               <td class="txt-box-holder" ><input type="text" id="<?php echo $rows[$index]['0'];?>" name="<?php echo $rows[$index]['0'];?>" value="<?php echo getData('stage3',$rows[$index]['0']) ?>" class="txt-box">
               </td>
               <td class="bg-right"><?php echo $rows[$index]['2']; ?> </td>
               
           </tr>
          <?php } ?> 
          <tr class="hr"></tr>
          <?php for($i=1; $i<=3; $i++){?>
           <tr>  <?php $index++ ;?>
               <td class="bg-orange" > <?php echo $rows[$index]['4'] ?></td>
               <td class="bg-orange" ><?php echo $rows[$index]['1']; ?></td>
               <td class="txt-box-holder" ><input type="text" id="<?php echo $rows[$index]['0'];?>" name="<?php echo $rows[$index]['0'];?>" value="<?php echo getData('stage3',$rows[$index]['0']) ?>" class="txt-box">
               </td>
               <td class="bg-right"><?php echo $rows[$index]['2']; ?> </td>
               
           </tr>
          <?php } ?> 
          <tr class="hr"></tr>
          <?php for($i=1; $i<=3; $i++){?>
           <tr>  <?php $index++ ;?>
               <td class="bg-orange" > <?php echo $rows[$index]['4'] ?></td>
               <td class="bg-orange" ><?php echo $rows[$index]['1']; ?></td>
               <td class="txt-box-holder" ><input type="text" id="<?php echo $rows[$index]['0'];?>" name="<?php echo $rows[$index]['0'];?>" value="<?php echo getData('stage3',$rows[$index]['0']) ?>" class="txt-box">
               </td>
               <td class="bg-right"><?php echo $rows[$index]['2']; ?> </td>
               
           </tr>
          <?php } ?>
          <tr class="hr"></tr>
          <?php for($i=1; $i<=3; $i++){?>
           <tr>  <?php $index++ ;?>
               <td class="bg-orange" > <?php echo $rows[$index]['4'] ?></td>
               <td class="bg-orange" ><?php echo $rows[$index]['1']; ?></td>
               <td class="txt-box-holder" ><input type="text" id="<?php echo $rows[$index]['0'];?>" name="<?php echo $rows[$index]['0'];?>" value="<?php echo getData('stage3',$rows[$index]['0']) ?>" class="txt-box">
               </td>
               <td class="bg-right"><?php echo $rows[$index]['2']; ?> </td>
               
           </tr>
          <?php } ?>
          <tr class="hr"></tr>
          <?php for($i=1; $i<=3; $i++){?>
           <tr>  <?php $index++ ;?>
               <td class="bg-orange" > <?php echo $rows[$index]['4'] ?></td>
               <td class="bg-orange" ><?php echo $rows[$index]['1']; ?></td>
               <td class="txt-box-holder" ><input type="text" id="<?php echo $rows[$index]['0'];?>" name="<?php echo $rows[$index]['0'];?>" value="<?php echo getData('stage3',$rows[$index]['0']) ?>" class="txt-box">
               </td>
               <td class="bg-right"><?php echo $rows[$index]['2']; ?> </td>
               
           </tr>
          <?php } ?>
          <tr>
          <tr class="hr"></tr>
          <td class="bg-orange" colspan="3">14. 過年度助成の研究内容と実績の要約を箇条書きで記述してください
          </td>
          <td class="bg-right"></td>
           <td class="bg-right"></td>
          </tr>
          <?php  ?> 
          <tr> <?php $index++ ;?> 
               <td class="bg-orange"><?php echo $rows[$index]['4'] ?> </td>
               <td class="txt-box-holder" colspan="2">
           <textarea id="<?php echo $rows[$index]['0'];?>" name="<?php echo $rows[$index]['0'];?>"  class="txtarea-box"  cols="20" rows="10"><?php echo getData('stage3',$rows[$index]['0'])?></textarea>
           </td>               
               <td class="bg-right"><?php echo $rows[$index]['2']; ?> </td>
              
           </tr>
           
          <?php ?> 
          <tr class="hr"></tr>
          <tr style="background-color:green">
           <td class="action-row"> <button type="submit" name="back" >⏪　戻る</button></td>
               <td colspan="5" class="action-row"> <button type="submit" name="submit3" >送信確認　⏩</button></td>
           </tr>
           <tr>
           <td colspan="3" class="action-row">※添付資料がある場合には、内容確認後に資料を添付して同時に送信申請して下さい。</td>
           <td class="action-row">
            <button type="button" style="display:block; background-color:blue;height:30px; width:100px;" onclick="document.getElementById('file2').style.display = 'block';document.getElementById('upload2').style.display = 'block'; this.style.display = 'none';">添付　2 </button> <?php echo $_SESSION['files2'];?>
            <input type="file" id="file2" name="image" multiple  class="form-control" style="display:none;"></br>
            <input type="submit" value="Upload File" name="btnSubmit2" id="upload2" style="display:none;"/>
	    
	     <input type="file" name="image" />
         <input type="submit"/>
           
            </td>
            
           </tr>
           

      </table>
      </form>
 
</body>
</html>