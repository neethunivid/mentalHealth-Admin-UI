import moment from "moment";
import "moment/locale/ja"; // Import the Japanese locale

//function to format a DateArray to YYYY-MM-DD this format
export function formatDateArray(dateArray: any) {
  const [year, month, day] = dateArray;
  const formattedDate = moment({ year, month: month - 1, day }).format(
    "YYYY-MM-DD"
  );
  return formattedDate;
}

export  function formatDateArray1(dateArray:any) {
  const [year, month, day] = dateArray;
  const formattedDate = moment({ year, month: month - 1, day }).format('YYYY.MM.DD');
  return formattedDate;
}

//function to formate a DateTime Array to this format YYYY-MM-DD HH:mm:ss/YYYY-MM-DD HH:mm
export function formatDateTimeArray(date: any) {
  //if seconds may get null avoid shows hows in this format YYYY-MM-DD HH:mm
  if (date[5] == null) {
    const [year, month, day, hour, minute] = date;
    const formattedDateTime = moment({
      year,
      month: month - 1,
      day,
      hour,
      minute,
    }).format("YYYY-MM-DD HH:mm");
    return formattedDateTime;
  } else {
    //if seconds are there shows in this format YYYY-MM-DD HH:mm:ss
    const [year, month, day, hour, minute, second] = date;
    const formattedDateTime = moment({
      year,
      month: month - 1,
      day,
      hour,
      minute,
      second,
    }).format("YYYY-MM-DD HH:mm:ss");
    return formattedDateTime;
  }
}

//function will show date plus japan day week
export function formatDateArrayJapanWeek(dateArray: any) {
  const [year, month, day] = dateArray;
  const formattedDate = moment({ year, month: month - 1, day }).format(
    "YYYY.MM.DD"
  );

  // Use moment's Japanese locale to get the day of the week in Japanese
  const dayOfWeekInJapanese = moment({ year, month: month - 1, day })
    .locale("ja")
    .format("dddd");

  return `${formattedDate} (${dayOfWeekInJapanese[0]})`;
}

//get current datetime with this format YYYY-MM-DDTHH:mm:ss
export function getCurrentDateTime() {
  return moment().format("YYYY-MM-DDTHH:mm:ss");
}

//get current Date YYY-MM-DD

export function getCurrentDate() {
  return moment().format("YYYY-MM-DD");
}



//format string date to 'YYYY-MM-DD' format
export function formatDateString(dateString: any) {
  if (!dateString) return "";
  const date = moment(dateString);
  return date.format("YYYY-MM-DD");
}
//format string date to 'YYYY-MM-DD days hh:mm' format
export function formatDateTime(date: any) {
  const formattedDate = moment(date).format("YYYY/MM/DD ddd HH:mm");
  return formattedDate;
}
// export function formatDateString(dateString:any)  {
//   if (!dateString) return "";

//   const date = moment(dateString);
//   const formattedDate = date.format('YYYY-MM-DD');
//   return formattedDate;
// };

export function checkDate(date: any) {
  const formats = ["YYYY/MM/DD", "YYYY-MM-DD", "YYYY.MM.DD"];
  
  // Parse the input date above formats
  const parsedDate = moment(date, formats, true);
  const currentYear = moment().year();
  // Check if the parsed date is valid and within the allowed range
  if (parsedDate.isValid()) {
    const year = parsedDate.year();
    return year <= currentYear;
  }
  
  return false;
}

export function convertReactFormatDate(date:any){
  const dateObject = new Date(date);
const formattedDate = moment(dateObject).format('YYYY-MM-DD');
return formattedDate;
}

//get current datetime with this format YYYYMMDDHHmmss
export function getCurrentDateTimevalue() {
  return moment().format("YYYYMMDDHHmmss");
}
