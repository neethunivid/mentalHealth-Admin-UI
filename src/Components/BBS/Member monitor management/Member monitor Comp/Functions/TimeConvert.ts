//timestamp conversion to year/month/day/dayweek/hours/minutes format
export function convertTimestampToDateTime(timestamp: number): any {
    const date = new Date(timestamp);
  
    const year = date.getFullYear().toString().slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      date.getDay()
    ];
  
    return `${year}/${month}/${day}/${dayOfWeek}/${hours}:${minutes}`;
  }
  
  //convert timestamp into date
 export function  convertTimestampToDateTime1  (timestamp: any):any  {
    const date = new Date(timestamp);

    return date;
  };

  //convert timeStamp into hours
  export function  convertTimestampToDateTime2  (timestamp: any):any {
    const date = new Date(timestamp);
    const hours = `0${date.getHours()}`.slice(-2);

    return hours;
  };

//convert timestamp to minutes
 export function  convertTimestampToDateTime3  (timestamp: any):any {
    const date = new Date(timestamp);
    const minutes = `0${date.getMinutes()}`.slice(-2);

    return minutes;
  };