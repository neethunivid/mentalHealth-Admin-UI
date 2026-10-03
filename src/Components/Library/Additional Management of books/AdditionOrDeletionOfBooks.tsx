import { Grid, Button } from "@mui/material";
import LeftPanLibrary from "../Common/LeftPanLibrary";
import { useForm } from "react-hook-form";
import "../../../assets/css/health.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

import add from "../../../../src/assets/admin_library/images/lib_add.png";
import manually from "../../../../src/assets/admin_library/images/lib_addmanual.png";
import { useNavigate } from "react-router-dom";
import LibraryapiClient from "../../../API/LibraryAPI-client";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, setMemberReg } from "../../../Redux/actions";
import LibraryHeader from "../Common/LibraryHeader";
import { formatDateString } from "../../Common/Date_conversion";

const AddDel = () => {
  const dispatch = useDispatch();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const { handleSubmit, getValues, register } = useForm();
  const navigate = useNavigate();
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.addition_deletion;
  });
  const onSubmit = async (data: any) => {};

  const handleCheckboxAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (data == null) {
      return;
    } else {
      const isChecked = e.target.checked;

      if (isChecked) {
        //redux stored list of id save to the state
        const allIds = data?.data.map((row: any) => row.id);
        const allItem = data?.data.map((row: any) => row);
        dispatch(setMemberReg("allBookItems", allItem));
        setSelectedIds(allIds);
      } else {
        dispatch(setMemberReg("allBookItems", []));
        setSelectedIds([]);
      }
    }
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: any
  ) => {
    const isChecked = event.target.checked;
    setSelectedIds((prevIds) => {
      const updatedIds = isChecked
        ? [...prevIds, id] // Add the ID if it's checked
        : prevIds.filter((selectedId) => selectedId !== id); // Remove the ID if it's unchecked

      // Map the updated IDs back to the corresponding data items
      const updatedItems = data?.data.filter((item: any) =>
        updatedIds.includes(item.id)
      );

      // Dispatch the updated items to Redux
      dispatch(setMemberReg("allBookItems", updatedItems));

      return updatedIds;
    });
  };

  const getRowClassName = (params: any) => {
    // Apply alternating row styles for rows
    return params.indexRelativeToCurrentPage % 2 === 0
      ? "row_table_list_c1"
      : "row_table_list_c1";
  };
  const getRowId = (row: any) => {
    return row.id; // Assuming you have an 'id' property in your data
  };
  const columns: GridColDef[] = [
    {
      field: "select",
      headerName: "",
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells blacktxt",
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderHeader: () => (
        <>
          <div className="mgrgt"></div>
          <input
            type="checkbox"
            checked={selectedIds.length == data?.data?.length}
            onChange={(e) => handleCheckboxAllChange(e)}
          />
        </>
      ),
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(params.row.id)}
          value={params.row.id}
          onChange={(e) => {
            handleCheckboxChange(e, params.row.id);
            // Handle individual row selection here
          }}
        />
      ),
      width: 5,
    },
    {
      field: "ISBN",
      headerName: "ISBN",
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells blacktxt blacktxt",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => {
        const searchValue = getValues();
        if (params.row.ISBN == "") {
          return <div>{searchValue.search_bookNo}</div>;
        } else {
          return <div>{params.row.ISBN}</div>;
        }
      },
      width: 100,
      align: "center",
    },
    {
      field: "Title",
      headerName: "タイトル",
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells blacktxt blacktxt",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: any) => {
        return (
          <div
            style={{
              maxWidth: "200px", // Adjust the maximum width as needed
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
            }}
          >
            {params.row.Title}
          </div>
        );
      },
      width: 130,
      align: "center",
    },
    {
      field: "Author",
      headerName: "著作名",
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells blacktxt blacktxt",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: any) => {
        return (
          <div
            style={{
              maxWidth: "200px", // Adjust the maximum width as needed
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
            }}
          >
            {params.row.Author}
          </div>
        );
      },
      width: 100,
      align: "center",
    },
    {
      field: "editSupervision",
      headerName: "編集・監修",
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells blacktxt blacktxt",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: any) => {
        return <div>{/* {params.row.editSupervision} */}</div>;
      },
      width: 100,
      align: "center",
    },
    {
      field: "publisher",
      headerName: "発売元",
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells blacktxt blacktxt",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: any) => {
        return <div>{params.row.publisher}</div>;
      },
      width: 100,
      align: "center",
    },
    {
      field: "Price",
      headerName: "定価",
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells blacktxt blacktxt",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: any) => {
        return <div>{params.row.Price}</div>;
      },
      width: 70,
      align: "center",
    },
    {
      //release spelling incorrect in api replace when it is correct
      field: "Release_Date",
      headerName: "発売日",
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells blacktxt blacktxt",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: any) => {
        return (
          <div>
            {params.row.ReleaseDate && formatDateString(params.row.ReleaseDate)}
          </div>
        );
      },
      width: 70,
      align: "center",
    },
    {
      field: "image",
      headerName: "書籍画像",
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells blacktxt",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: any) => {
        return (
          <div
            style={{
              maxWidth: "200px", // Adjust the maximum width as needed
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
            }}
          >
            {params.row.image}
          </div>
        );
      },
      flex: 1,
      align: "left",
    },

    {
      field: "AmazonLink",
      headerName: "リンク",
      headerClassName: "td_ninteen_1 remarksconfirmHeader",
      cellClassName: "gridcolumn-cells blacktxt blacktxt",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: any) => {
        return (
          <div
            className="hoverable-content"
            style={{
              maxWidth: "200px", // Adjust the maximum width as needed
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal", // Use 'normal' to allow text to wrap
            }}
          >
            {params.row.AmazonLink}
          </div>
        );
      },

      width: 170,
      // flex:1,
      align: "left",
    },
  ];

  const searchAmazonBook = async () => {
    const searchValue = getValues();

    if (searchValue.search_bookNo === "") {
      alert("ISBNコードをいれてください");
    } else {
      try {
        const dataRequest = {
          isbnCode: searchValue.search_bookNo,
        };

        dispatch(
          fetchData("addition_deletion", "library/amazon/amazon", dataRequest)
        );
      } catch (error) {
        alert(error);
      }
    }
  };
  const navigateEditScreen = () => {
    const searchValue = getValues();
    if (selectedIds.length >= 1) {
      navigate("/addC1Abook", {
        state: { data: true, isbn: searchValue.search_bookNo },
      });
    }
  };

  const navigateManualScreen = () => {
    dispatch(setMemberReg("allBookItems", []));
    navigate("/addC1Abook", { state: { data: false } });
  };

  const placeholderRow = {
    id: "placeholder-row",
    message: "Data not found",
  };
  return (
    <Grid container xs={12} spacing={1} padding={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanLibrary />
      </Grid>
      <Grid item xs={9}>
        <LibraryHeader
          label1="C.1"
          label2="-A図書の追加・削除"
          label3="図書室管理"
        />
        <Grid className="hr"></Grid>
        <span className="black mglft">
          ★ISBNコードを入力して書籍を検索して下さい
        </span>
        <br />
        <span className="black lib-marg">C-2</span>
        <form
          name="Additiondeletion"
          id="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container className="table_seven">
            <Grid item xs={12}>
              <Grid className="hr"></Grid>
              <Grid className="hr"></Grid>
              <Grid className=" member_monitor_content content-row">
                <Grid item xs={12} container>
                  <Grid item xs={1} className="black">
                    ● ISBN
                  </Grid>
                  <Grid item xs={11}>
                    <input
                      type="text"
                      className="bdr_text15"
                      {...register("search_bookNo")}
                    ></input>
                    <input
                      value="Amazonより取得"
                      type="button"
                      className="lib"
                      onClick={() => {
                        searchAmazonBook();
                      }}
                    ></input>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className="member_monitor_content content-row">
                <Grid item xs={12} container>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={11}>
                    <span className="black">（バーコードリーダー入力）</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <br />
          <DataGrid
            getRowId={getRowId}
            columns={columns}
            rows={data?.data ?? []}
            getRowClassName={getRowClassName}
            components={{
              NoRowsOverlay: () => (
                <div className="row_table_list_c1 registration_lending_return_no_row">
                  結果はありません
                </div>
              ),
            }}
            getRowHeight={() => "auto"}
            autoHeight
            rowCount={data?.data?.length ?? 0}
            disableColumnMenu={true}
            hideFooter
            hideFooterSelectedRowCount
            checkboxSelection={false}
            rowHeight={30}
            columnHeaderHeight={30}
          />
          <Grid item xs={12}>
            <Grid container display={"flex"} justifyContent={"left"}>
              <Button type="button">
                <img src={add} onClick={() => navigateEditScreen()} />
              </Button>

              <Button type="button" onClick={() => navigateManualScreen()}>
                <img src={manually} />
              </Button>
              <div className="black content_margintop">
                ※チエックを入れて修正・削除。データが無い場合は手動で追加して下さい.
              </div>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddDel;
