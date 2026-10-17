
function isURL(strValue)
{
  var objRE = /^http:\/\/.*?$/;

  return (strValue != '' && objRE.test(strValue));
}



window.onload = attachFormHandlers;

function attachFormHandlers()
{  
  if (document.getElementsByTagName)
  {
    var objForm = document.getElementsByTagName('form');
    for (var iCounter=0; iCounter<objForm.length; iCounter++)
	{ 
      objForm[iCounter].onsubmit = function(){return checkForm(this);}
	}
  }
  var func = document.body.getAttribute("onload");
  eval(func); 
}

function checkForm(objForm)
{
  var arClass, bValid;
   //var objField = objForm.getElementsByTagName('*');
   var objField = objForm.elements;// (objForm); 
 
  
var validation_rule;   
  for (var iFieldCounter=0; iFieldCounter<objField.length; iFieldCounter++)
  { 
       validation_rule =  objField[iFieldCounter].getAttribute("validate");
        arClass = new Array();
        if (isString(validation_rule)){
        arClass = validation_rule.split(' ');
        
        for (var iClassCounter=0; iClassCounter<arClass.length; iClassCounter++)
        {
          var ruleName = arClass[iClassCounter];
          
          var RangeFound = false;
          
          //this is not good
          
          var mnReg = /\d+/ig;
          if (isString(ruleName)){
          var MinMax = ruleName.match(mnReg);
          if (MinMax ){  
            var RangeFound = true;
          }
          }

            var mnReg = /\w+/ig; 
            var ruleNames = ruleName.match(mnReg);        
            ruleName = ruleNames[0];
            
            
          if (ruleName =="integer"){ruleName = "number";}        
          if (ruleName =="text"){ruleName = "string";}
           
            
          switch (ruleName)
          {
            case 'string':
               bValid = isString(objField[iFieldCounter].value.replace(/^\s*|\s*$/g, ''));                
              if (!bValid){
              //It can be a number too..
                bValid = isNumber(objField[iFieldCounter].value);              
              }
               if (bValid && RangeFound){
                if (isNumber(MinMax[0])){
                  bValid = (objField[iFieldCounter].value.length > MinMax[0])
         
                }           
               } 
               if (bValid && RangeFound){
                if (isNumber(MinMax[1])){
                  bValid = (objField[iFieldCounter].value.length < MinMax[1])
        
                }           
               }
               
               
               break;
            case 'password':
               bValid = isString(objField[iFieldCounter].value.replace(/^\s*|\s*$/g, ''));                
              if (!bValid){
              //It can be a number too..
                bValid = isNumber(objField[iFieldCounter].value);              
              }
               if (bValid && RangeFound){
                if (isNumber(MinMax[0])){
                  bValid = (objField[iFieldCounter].value.length > MinMax[0])
         
                }           
               } 
               if (bValid && RangeFound){
                if (isNumber(MinMax[1])){
                  bValid = (objField[iFieldCounter].value.length < MinMax[1])
        
                }           
               }
               if (bValid )
               {
                //check for space
                isspace=objField[iFieldCounter].value.indexOf(" ") > -1;
                if (isspace)bValid=false;
               }
               break;
            case 'alpha': //strict alpha [a-zA-Z] checker
               bValid = isString(objField[iFieldCounter].value.replace(/^\s*|\s*$/g, ''));
                
               if (bValid && RangeFound){
                if (isNumber(MinMax[0])){
                  bValid = (objField[iFieldCounter].value.length > MinMax[0])
         
                }           
               } 
               if (bValid && RangeFound){
                if (isNumber(MinMax[1])){
                  bValid = (objField[iFieldCounter].value.length < MinMax[1])
        
                }           
               }
               
               
               break;
            case 'number' :
               bValid = isNumber(objField[iFieldCounter].value);
               
               if(objField[iFieldCounter].value.indexOf(" ")>=0)bValid = false;
                if (bValid && RangeFound){
                if (isNumber(MinMax[0])){
                  bValid = (objField[iFieldCounter].value  > MinMax[0])
         
                }           
               } 
               if (bValid && RangeFound){
                if (isNumber(MinMax[1])){
                  bValid = (objField[iFieldCounter].value < MinMax[1])
        
                }           
               }
			   break; 
         case 'zenkaku' :
               bValid = isOnlyZankaku(objField[iFieldCounter].value);
               if (bValid && RangeFound){
                if (isNumber(MinMax[0])){
                  bValid = (objField[iFieldCounter].value.length   > MinMax[0])
         
                }           
               } 
               if (bValid && RangeFound){
                if (isNumber(MinMax[1])){
                  bValid = (objField[iFieldCounter].value.length  < MinMax[1])
        
                }           
               }
                
			   break;
         case 'hankaku' :
               bValid = isOnlyZankaku(objField[iFieldCounter].value);
               if (bValid && RangeFound){
                if (isNumber(MinMax[0])){
                  bValid = (objField[iFieldCounter].value.length   > MinMax[0])
         
                }           
               } 
               if (bValid && RangeFound){
                if (isNumber(MinMax[1])){
                  bValid = (objField[iFieldCounter].value.length  < MinMax[1])
        
                }           
               }
                
			   break;
			case "equal":
				var eqv = objField[iFieldCounter].getAttribute("equal");
                 
				 var eqf = document.getElementById(eqv);
				bValid=(eqf.value == objField[iFieldCounter].value);
				break;
                
            case 'email' :
               bValid = isEmail(objField[iFieldCounter].value);
                 break;
            case 'url' :
              bValid = isURL(objField[iFieldCounter].value);
                 break;
            case 'date' :
              bValid = isDate(objField[iFieldCounter].value);
                 break;
            
            case 'check' :
              bValid =  objField[iFieldCounter].checked ;
                 break;
            case 'match':
            
            
             break;
            default:
              //~ alert("No match!!!");
               bValid = true;
          }

          if (bValid == false)
          {
            // If this field is invalid, leave the testing early,
            // and alert the visitor to this error
            var err_msg = objField[iFieldCounter].getAttribute("error");
            if (isString(err_msg )){
              alert(err_msg);
            }
            else{
            alert('Please review the value you provided for ' + objField[iFieldCounter].name  );
            }
            try{
            objField[iFieldCounter].select();
            }catch(e){}
            objField[iFieldCounter].focus();
            return false;
          }
        }
      
    }
        //this is not a validation
        var confirm_text =  objField[iFieldCounter].getAttribute("confirm");
        if (isString(confirm_text)){
          if (confirm(confirm_text)){
            return true;
          }
          else
          {
            return false;
          }
        }
        
    
  }
  return true;
}

function isString(strValue)
{
  return (typeof strValue == 'string' && strValue != '' && isNaN(strValue));
}

function isNumber(strValue)
{
  return (!isNaN(strValue) && strValue != '');
}

function isEmail(strValue)
{
  var objRE = /^[\w-\.\']{1,}\@([\da-zA-Z-]{1,}\.){1,}[\da-zA-Z-]{2,}$/;

  return (strValue != '' && objRE.test(strValue));
}
function  callBack_Signup()
{
  document.frm.action.value="new";
  document.frm.submit();
}

function isDate(strdate)
{
 var datePat = /^(\d{1,4})(\/|-)(\d{1,2})(\/|-)(\d{2})$/;
var matchArray = strdate.match(datePat); // is the format ok?

if (matchArray == null) { 
return false;
}
return true;
}
function isHenkaku(text)
{ 
	var len = text.length;
	var ret = true;
	var flg = true;
	var str = "";

	for ( i = 0 ; i < len ; i++ ) {
		str = text.substring(i, i+1);
		ret = isHankaku(str);
		if (ret){ 
			flg = false;
		}
	}
  return flg;
}
function isOnlyZankaku(text)
{ 
	var len = text.length;
	var ret = true;
	var flg = true;
	var str = "";

	for ( i = 0 ; i < len ; i++ ) {
		str = text.substring(i, i+1);
		ret = isHankakuChar(str);
		if (!ret){ 
			flg = false;
		}
	}
  return flg;
}

function isZankaku(text)
{ 
	var len = text.length;
	var ret = true;
	var flg = false;
	var str = "";

	for ( i = 0 ; i < len ; i++ ) {
		str = text.substring(i, i+1);
		ret = isHankakuChar(str);
		if (ret){ 
			flg = true;break;
		}
	}
  return flg;
}

function isHankakuChar(str)
{
	var esc_str = escape(str);
	var ms = navigator.appVersion.indexOf("MSIE");
	var nesc = navigator.appName.lastIndexOf("Netscape");  
	//~ alert(esqc_stqr);
 
		if ( (esc_str.indexOf('%A') == 0) ||
			(esc_str.indexOf('%B') == 0) ||
			(esc_str.indexOf('%C') == 0) ||
			(esc_str.indexOf('%D') == 0) ){
			return(true);
		}
	 
		if((esc_str.indexOf('%uFF6') == 0) ||
			(esc_str.indexOf('%uFF7') == 0) || 
			(esc_str.indexOf('%uFF8') == 0) ||
			(esc_str.indexOf('%uFF9') == 0) ) {
			return(false);
		}else if ((esc_str.indexOf('%u') == 0) ) {
			return(true);
    }

	return(false);
}
