import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import editButtonEdit from "../../../../assets/images/lib_edit_s.png";
import editButtonNoEdit from "../../../../assets/images/lib_rst_s.png";
import LibraryapiClient from "../../../../API/LibraryAPI-client";
import buttonSave from "../../../../assets/images/lib_save.gif";
import { useNavigate, useLocation } from "react-router-dom";
import BookList from "../../SearchModifyDeleteManagement/BookList";
import { getCurrentDate } from "../../../Common/Date_conversion";

//redux stored data model
interface LoanData {
  id: any;
  lendingNo: any;
  lendingDay: any;
  dateReturn: any;
  returnDate: any;
  bookNo: any;
  isbnCode: any;
  title: any;
  author: any;
  editSupervision: any;
  publisher: any;
  memberNo: any;
  LendingNo: any;
  status: any;
}

const EditModifying_Book_Table = ({ data1, data2, data3 }: any) => {
  const navigate = useNavigate();
  //useState to edit existing data from redux and save to the state
  const [data, setData] = useState<LoanData[]>(data2);
  const [clickedData, setClickedData] = useState<number[]>([]);

  const [isSaveButton, setIsSaveButton] = useState(true);
  useEffect(() => {
    setData(bookist);
    if (!data3) {
      toggleEditMode(data1);
    }
  }, [data2, data1]);
  //get redux stored state value using useSelector
  const bookist: any = useSelector(
    (state: any) => state.memberData.member_loan_book_list
  );

  //checking each rows edit is done or not when press edit button
  const [editMode, setEditMode] = useState<boolean[]>(
    new Array(data.length).fill(false)
  );

  //pointed to where edit data field got error
  const redInputRef = useRef<HTMLInputElement | null>(null);

  const redInputRef2 = useRef<HTMLInputElement | null>(null);

  //set theme of input border red color
  const [redTheme, setRedTheme] = useState<{ [fieldName: string]: boolean }[]>(
    new Array(data.length).fill({})
  );

  const [alertsTriggered, setAlertsTriggered] = useState<boolean[]>(
    new Array(data.length).fill(false)
  );

  const handleAlert = (index: any, fieldName: string) => {
    // Set the alert flag for the specific index
    const updatedAlerts = [...alertsTriggered];
    updatedAlerts[index] = true;
    setAlertsTriggered(updatedAlerts);

    // Apply styling to the specific cell based on the field name
    const updatedRedTheme = [...redTheme];
    updatedRedTheme[index] = { ...updatedRedTheme[index], [fieldName]: true };

    setRedTheme(updatedRedTheme);
    if (fieldName === "dateReturn" && redInputRef2.current) {
      redInputRef2.current.focus();
    } else if (fieldName === "returnDate" && redInputRef.current) {
      redInputRef.current.focus();
    }
  };
  //edit mode
  // Function to toggle edit mode for a row
  const toggleEditMode = (index: number) => {
    let updatedClickedData = [];
    if (!clickedData.includes(index)) {
      updatedClickedData = [...clickedData, index];
    } else {
      updatedClickedData = clickedData.filter((item) => item !== index);
    }

    setClickedData(updatedClickedData);

    setIsSaveButton(updatedClickedData.length > 0);
    const updatedEditMode = [...editMode];

    updatedEditMode[index] = !updatedEditMode[index];
    setEditMode(updatedEditMode);
  };

  //input field value when changes
  const handleInputChange = (
    index: number,
    field: keyof LoanData,
    value: string
  ) => {
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value,
    };

    setData(updatedData);
  };

  //when press save button call this function
  const handleSaveChanges = () => {
    //re arrange existing data to new format for api request

    // const dataRequest = data.map((item: any,index) => {
    //   return {
    //     member: item.memberNo,
    //     lendingId: item.id,
    //     dateReturn: item.dateReturn,
    //     returnDate: item.returnDate,
    //     bookId: item.bookNo,
    //     status:item.returnDate==''? item.status:1,
    //     lendingday: item.lendingDay,
    //   };
    // }

    // );

    const filteredClickedData = clickedData.filter((id) =>
      data.some((item) => item.id === id)
    );

    const dataRequest = filteredClickedData.map((id, index) => {
      const item = data.find((item: any) => item.id === id);

      return {
        member: item?.memberNo!,
        lendingId: item?.id!,
        dateReturn: item?.dateReturn,
        returnDate: item?.returnDate,
        bookId: item?.bookNo,
        status: item?.returnDate === "" ? item?.status : 1,
        lendingday: item?.lendingDay,
      };
    });

    // const dataRequest = clickedData.map((index) => {
    //   const item = data[index];
    //   return {
    //     member: item.memberNo,
    //     lendingId: item.LendingNo,
    //     dateReturn: item.dateReturn,
    //     returnDate: item.returnDate,
    //     bookId: item.bookNo,
    //     status: item.returnDate === '' ? item.status : 1,
    //     lendingday: item.lendingDay,
    //   };
    // });

    //   const dataRequest = data
    // .filter((item) => item.status !== '') // Filter out items with empty returnDate
    // .map((item) => {
    //   return {

    //     member: item.memberNo,
    //     lendingId: item.id,
    //     dateReturn: item.dateReturn,
    //     returnDate: item.returnDate,
    //     bookId: item.bookNo,
    //     // status: item.status,
    //     status:1,
    //     lendingday: item.lendingDay,
    //   };
    // });

    let callUpdate = false;
    //checking existing date in correct format
    const dateCheck = dataRequest.map((item, index) => {
      // Parse the date strings to Date objects for comparison
      const lendingDay = new Date(item.lendingday);
      const dateReturn = new Date(item.dateReturn);
      const returnDate = new Date(item.returnDate);

      // Check if dateReturn and returnDate are greater than lendingDay
      if (dateReturn <= lendingDay) {
        // Show an alert if the condition is not met
        alert(
          `返却日は、貸出 ID の貸出日よりも大きい必要があります: ${item.lendingId} ${index}`
        );
        handleAlert(item.bookId, "dateReturn");
        // Set the flag to true to indicate that the alert condition was met
        callUpdate = true;
      } else if (returnDate <= lendingDay) {
        handleAlert(item.bookId, "returnDate");
        alert(
          `返却日は貸出 ID の貸出日より後である必要があります:${item.lendingId}`
        );
        callUpdate = true;
      } else if (item.returnDate == "" && item.status == 1) {
        handleAlert(item.bookId, "returnDate");
        alert('返却日を入れてください');
        callUpdate = true;
      }

      return item;
    });

    // Check if the flag is false before calling editLoanDetails
    if (!callUpdate) {
      //if data entered is correct then call the api
      editLoanDetails(dataRequest);
    }
  };

  const editLoanDetails = async (dataRequest: any) => {
    try {
      const apiData = await LibraryapiClient.post(
        "library/books/editloancontents",
        dataRequest
      );
      if (apiData) {
        window.location.href = "/loanlistbooks";
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Grid>
      <Grid>
        <TableContainer component={Paper} className="edit-table-root">
          <Table aria-aria-label="company table">
            <TableHead>
              <TableRow>
                <TableCell className="edit-table-root-col7 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
                  貸出No
                </TableCell>
                <TableCell className="edit-table-root-col8 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
                  貸出日
                </TableCell>
                <TableCell className="edit-table-root-col9 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
                  返却予定
                </TableCell>
                <TableCell className="edit-table-root-col10 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
                  返却日
                </TableCell>
                <TableCell className="edit-table-root-col11 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
                  連番
                </TableCell>
                <TableCell className="edit-table-root-col12 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
                  ISBN
                </TableCell>
                <TableCell className="edit-table-root-col13 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
                  タイトル
                </TableCell>
                <TableCell className="edit-table-root-col14 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
                  著作名
                </TableCell>
                <TableCell className="edit-table-root-col15 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
                  編集・監修
                </TableCell>
                <TableCell className="edit-table-root-col16 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
                  発売元
                </TableCell>
                <TableCell className="edit-table-root-col17 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
                  編集
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="editModifying_cell_background">
              {bookist &&
                data.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="edit-table-root-col7 cell-paddingreserv edit-table-root-border-right-bottom">
                      <label className="black">{item.LendingNo}</label>
                    </TableCell>
                    <TableCell className="edit-table-root-col8 cell-paddingreserv edit-table-root-border-right-bottom">
                      {editMode[item.id] ? (
                        <input
                          className="edit_modifying_border"
                          // style={{ width: "75px" }}
                          value={item.lendingDay}
                          // ref={redInputRef}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "lendingDay",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        item.lendingDay
                      )}
                    </TableCell>
                    <TableCell className="edit-table-root-col9 cell-paddingreserv edit-table-root-border-right-bottom">
                      {editMode[item.id] ? (
                        <input
                          className={
                            redTheme[item.bookId]?.dateReturn
                              ? "edit_modifying_error_border"
                              : "edit_modifying_border"
                          }
                          // style={{ width: "75px" }}
                          value={item?.dateReturn}
                          ref={redInputRef2}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "dateReturn",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        item.dateReturn
                      )}
                    </TableCell>
                    <TableCell className="edit-table-root-col10 cell-paddingreserv edit-table-root-border-right-bottom">
                      {editMode[item.id] ? (
                        <input
                          className={
                            redTheme[item.bookId]?.returnDate
                              ? "edit_modifying_error_border"
                              : "edit_modifying_border"
                          }
                          value={item?.returnDate}
                          ref={redInputRef}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "returnDate",
                              e.target.value
                            )
                          }
                        />
                      ) : item.status == 1 ? (
                        item?.returnDate
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell className="edit-table-root-col11 cell-paddingreserv edit-table-root-border-right-bottom">
                      {item.bookNo}
                    </TableCell>
                    <TableCell className="edit-table-root-col12 cell-paddingreserv edit-table-root-border-right-bottom">
                      <label className="black">{item.isbnCode}</label>
                    </TableCell>
                    <TableCell className="edit-table-root-col13 cell-paddingreserv edit-table-root-border-right-bottom">
                      <label className="black">{item.title}</label>
                    </TableCell>
                    <TableCell className="edit-table-root-col14 cell-paddingreserv edit-table-root-border-right-bottom">
                      <label className="black">{item.author}</label>
                    </TableCell>
                    <TableCell className="edit-table-root-col15 cell-paddingreserv edit-table-root-border-right-bottom">
                      <label className="black">{item.editSupervision}</label>
                    </TableCell>
                    <TableCell className="edit-table-root-col16 cell-paddingreserv edit-table-root-border-right-bottom">
                      <label className="black">{item.publisher}</label>
                    </TableCell>
                    <TableCell className="edit-table-root-col17 cell-paddingreserv edit-table-root-border-right-bottom">
                      <Button onClick={() => toggleEditMode(item.id)}>
                        {editMode[item.id] ? (
                          <img src={editButtonNoEdit} />
                        ) : (
                          <img src={editButtonEdit} />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid className="hr"></Grid>
      </Grid>
      <Grid className="hr"></Grid>
      <Grid className="hr"></Grid>
      <Grid className="hr"></Grid>
      <Grid className="content-row">
        <Grid className="library-width-32"></Grid>
        <Grid className="library-width-20">
          {isSaveButton && clickedData ? (
            <Button onClick={() => handleSaveChanges()}>
              <img src={buttonSave} />
            </Button>
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditModifying_Book_Table;
