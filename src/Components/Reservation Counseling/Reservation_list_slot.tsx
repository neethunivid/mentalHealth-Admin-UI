import {
  Box,
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import LeftPanReservation from "./common/LeftPanReservation";
import "./reservation.scss";
import ReservationHeader from "./common/ReservationHeader";
import { Reservation_list_slot_form } from "./Reservation list slot/Reservation_list_slot_form";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../Redux/actions";
import apiClient from "../../API/API-client";
import { formatDateArrayJapanWeek } from "../Common/Date_conversion";
import { LocalDiningOutlined } from "@mui/icons-material";
export interface ListData {
  id: any;
  date: any;
  timeStart: any;
  timeEnd: any;
  respPerson: any;
  respPersonName: any;
  status: any;
  createdOn: any;
  createdBy: any;
  modifiedOn: any;
  modifiedBy: any;
  reservationStatus: any;
  reservationId?: ReservationId;
  region: Region;
  type_of_counselling:any;
}

export interface ReservationId {
  reservationId: any;
  personName: any;
  surname: any;
  gender: any;
  job: any;
  postalcode: any;
  pref: any;
  town: any;
  address: any;
  telephone: any;
  email: any;
  createdOn: any;
  createdBy: any;
  modifiedOn: any;
  modifiedBy: any;
  mobile: any;
}

export interface Region {
  id: any;
  name: any;
}

export interface NewList {
  date: any;
  respPersonName: any;
  region: Region;
  type_of_counselling:any;
  calender: {
    id: any;
    timeStart: any;
    timeEnd: any;
    respPerson: any;
    status: any;
    createdOn: any;
    createdBy: any;
    modifiedOn: any;
    modifiedBy: any;
    reservationStatus: any;
    reservationId?: ReservationId;
    type_of_counselling:any; 
  }[];
  
}
export interface CalenderItem {
  id: any;
  timeStart: any;
  timeEnd: any;
  status: any;
  createdOn: any;
  createdBy: any;
  modifiedOn: any;
  modifiedBy: any;
  reservationStatus: any;
  reservationId?: ReservationId;
}

const Reservation_list_slot = () => {
  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm();

  const [datesData, setDatesData] = useState<NewList[]>([]);
  const [uniqueTimeRanges, setUniqueTimeRanges] = useState<string[]>([]);
  const [region, setRegion] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const myRef = useRef<null | HTMLDivElement>(null);

  const handleRefresh = () => {
    setClicked(false);
    loadReservationList();
    setRefresh((prevRefresh) => !prevRefresh);
  };

  useEffect(() => {
    getRegion();
  }, []);

  const getRegion = async () => {
    try {
      const apiData = await apiClient.get("api/reservation/getregion");

      if (apiData) {
        setRegion(apiData.data.data);
        loadReservationList(apiData.data.data[0].id);
      }
    } catch (error) {
      alert(error);
    }
  };

  //reservation slot list api 
  const loadReservationList = async (data?: any) => {
    //reset previous state both time and rearranged data state
    setUniqueTimeRanges([]);
    setDatesData([]);
    try {
      const dataRequest = {
        regionId: data ?? selectedRegion,
      };

      const apiData = await apiClient.post(
        "api/reservation/list-reservation-slot",
        dataRequest
      );
      if (apiData) {
        
        createTableCalender(apiData);
      }
    } catch (error) {
      alert(error);
    }
  };

  //function to rearrange slot list to NewList interface format
  const createTableCalender = (apiData: any) => {
    //newListDataMap for ungrouped data to store in NewList

    const newListDataMap = new Map<string, NewList>(); // NewList interface format mapping

    apiData.data.data[0].list.forEach((item: ListData) => {
      const dateString = JSON.stringify(item.date); // Convert the 'item.date' to a string (JSON format) to use as a key 
      // Checking if the map already has an entry with the current date
      
      if (!newListDataMap.has(dateString)) {
        // If not create a new entry with the date as the key and initial values
        newListDataMap.set(dateString, {
          date: item.date,
          respPersonName: item.respPersonName,
          region: item.region,
          type_of_counselling:item.type_of_counselling,
          calender: [],// new array to store same date slots
        });
      }
      // Get the entry corresponding to the current date from the map
      const listEntry = newListDataMap.get(dateString);
      // Push the current item's details into the 'calender' array of the entry
      listEntry?.calender.push({
        id: item.id,
        timeStart: item.timeStart,
        timeEnd: item.timeEnd,
        status: item.status,
        createdOn: item.createdOn,
        createdBy: item.createdBy,
        modifiedOn: item.modifiedOn,
        modifiedBy: item.modifiedBy,
        reservationStatus: item.reservationStatus,
        reservationId: item.reservationId,
        respPerson: item.respPerson,
        type_of_counselling:item.type_of_counselling,
      });
    });

    // Convert the map values to an array
    const newListData: NewList[] = Array.from(newListDataMap.values());
    setDatesData(newListData);

    //below the unique time array going to generate
    const uniqueTimes: string[] = [];

    apiData.data.data[0].list.forEach((item: ListData) => {
      const [year, month, day] = item.date;
      const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;

      const timeRange = `${item.timeStart}`;
      if (!uniqueTimes.includes(timeRange)) {
        uniqueTimes.push(timeRange);
        setUniqueTimeRanges(uniqueTimes);
      }
    });

    //sort time incremental order here
    uniqueTimes.sort((a, b) => {
      const startTimeA = a.split(" - ")[0];
      const startTimeB = b.split(" - ")[0];
      return parsedTime(startTimeA) - parsedTime(startTimeB);
    });
    
    setUniqueTimeRanges(uniqueTimes);
  };

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<NewList>({
    date: "",
    respPersonName: "",
    region: {
      id: "",
      name: "",
    },
    type_of_counselling:"",
    calender: [],
  });
  const [selectedMatchingItem, setSelectedMatchingItem] = useState({
    id: "",
    time_start: "",
    time_end: "",
    name: "",
    reservation_status: "",
    reservation_id: "",
    region_id: "",

    surname: "",
    gender: "",
    job: "",
    postalcode: "",

    town: "",
    address: "",
    telephone: "",
    email: "",
  });

  //this function to call when calender those have slotted
  const handleRowSelect = (
    time: string,
    id: any | undefined,
    item: any,
    matchingReservation: any
  ) => () => {
    setClicked(true);
    const isSelected =
      selectedTime === time &&
      id &&
      selectedItem.calender.some((reservation: any) => reservation.id === id);
    setSelectedTime(isSelected ? null : time);

    // Check if this is a new selection (different from the currently selected item)
    const isDifferentSelection = selectedItemId !== id;

    // Toggle the selected item ID based on whether it's a new selection
    setSelectedItemId(isDifferentSelection ? id : null);

    // Update the selected item only if it's a new selection
    setSelectedItem(isDifferentSelection ? item : {});

    setSelectedMatchingItem(isDifferentSelection ? matchingReservation : {});
  };

  //form submission here only region name getting 
  const onSubmit = (data: any) => {
    let place;

    //from region state map all region name and and matches with submitted region name
    if (data.Reservation_slot_list_place) {
      region.find((item: any) => {
        if (item.name == data.Reservation_slot_list_place) {
          //when both become same it's id store in the variable
          place = item.id;
        }
      });
    }
    setSelectedRegion(place ?? "");
    loadReservationList(place);
    setClicked(false);
  };
  const parsedTime = (time: string) => parseInt(time.split(":")[0], 10);
  return (
    <div>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={2}>
          <LeftPanReservation />
        </Grid>
        <Grid item xs={10}>
          <ReservationHeader label="B. 予約の状況と予約者情報" />
          <Grid className="hr"></Grid>
          <Grid className="content-row">
            <label className="black Reservation_red_font">●</label>
            <label className="black">印をクリックして予約／お一人45分間</label>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid className="content-row">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="black">地域 </label>
              <Controller
                name="Reservation_slot_list_place"
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    {region.map((item: any) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              <input type="submit" value="検索"></input>
            </form>
          </Grid>
          <Grid className="hr"></Grid>
          <TableContainer component={Paper} className="Reservation-Table-root">
            <Table aria-label="company table">
              <TableHead>
                <TableRow>
                  <TableCell
                    className="Reservation-Table-root-col1 cell-paddingreserv Reservation-Table-root-border-right Reservationheaderbold"
                    rowSpan={2}
                  >
                    予約日
                  </TableCell>
                  <TableCell
                    rowSpan={2}
                    colSpan={0}
                    className="Reservation-Table-root-col2 cell-paddingreserv Reservation-Table-root-border-right Reservationheaderbold"
                  >
                    地域
                  </TableCell>
                  <TableCell
                    rowSpan={2}
                    colSpan={0}
                    className="Reservation-Table-root-col2 cell-paddingreserv Reservation-Table-root-border-right Reservationheaderbold"
                  >
                    担当
                  </TableCell>
                  <TableCell
                    className="Reservation-Table-root-col3 cell-paddingreserv Reservation-Table-root-border-right Reservationheaderbold"
                    colSpan={uniqueTimeRanges.length}
                    align="center"
                  >
                    時間帯
                  </TableCell>
                </TableRow>
                <TableRow>
                  {uniqueTimeRanges.map((item) => (
                    <TableCell
                      className="Reservation-Table-root-col4 cell-paddingreserv Reservation-Table-border-right-bottom Reservationheaderbold  reservation_slot_time_slot"
                      key={item}
                    >
                      {item+' '+'~'}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody className="Reservation-Tablebody-background">
                {datesData.map((item, index) => (
                  <TableRow
                    key={index}
                    className="Reservation-Tablebody-background"
                  >
                    <TableCell className="Reservation-Table-root-col1 cell-paddingreserv Reservation-Table-root-border-right-bottom">
                      {formatDateArrayJapanWeek(item.date)}
                    </TableCell>
                    <TableCell className="Reservation-Table-root-col2 cell-paddingreserv Reservation-Table-root-border-right-bottom">
                      {item.region.name}
                    </TableCell>
                    <TableCell className="Reservation-Table-root-col3 cell-paddingreserv Reservation-Table-root-border-right-bottom">
                      {item.respPersonName}
                    </TableCell>
                    {uniqueTimeRanges.map((time) => {
                      const [startTime] = time.split(" - ");
                      const matchingReservation: any = item.calender.find(
                        (item1) =>
                          item1.timeStart === startTime
                      );
                      const isSelected: any =
                        selectedTime === startTime &&
                        matchingReservation?.id &&
                        selectedItem?.calender?.some(
                          (item1) => item1.id === matchingReservation.id
                        );
                      return (
                        <TableCell
                          key={`${item.date}_${time}`}
                          className={`Reservation-Table-root-col4 cell-paddingreserv Reservation-Table-root-border-right-bottom ${
                            isSelected && clicked
                              ? "Reservation-Table-root-selected "
                              : ""
                          }`}
                          onClick={handleRowSelect(
                            startTime,
                            matchingReservation?.id,
                            item,
                            matchingReservation
                          )}
                        >
                          <span
                            className={
                              matchingReservation?.reservationStatus ===
                                "RESERVED" ||
                              matchingReservation?.reservationStatus ===
                                "TEMPORARY"
                                ? "reservation_slot_text_red cursor_pointer"
                                : "reservation_slot_text_black cursor_pointer"
                            }
                          >
                            {matchingReservation
                              ? matchingReservation.reservationStatus ===
                                  "RESERVED" ||
                                matchingReservation.reservationStatus ===
                                  "TEMPORARY"
                                ? "予約済み"
                                : "空き"
                              : " "}
                          </span>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {selectedItemId && selectedMatchingItem && clicked && (
            <>
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
              <ReservationHeader label="予約の詳細" />
              <Reservation_list_slot_form
                refresh={refresh}
                selectedItemR={selectedItem}
                handleRefresh={handleRefresh}
                item={selectedMatchingItem}
                date={selectedItem.date}

              />
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Reservation_list_slot;
