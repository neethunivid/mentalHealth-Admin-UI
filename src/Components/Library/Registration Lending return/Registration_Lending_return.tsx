import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import LeftPanBBS from "../../Common/LeftPanBBS";
import LibraryHeader from "../Common/LibraryHeader";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import searchButton from "../../../assets/images/lib_search.gif";
import resetButtons from "../../../assets/images/lib_reset.gif";
import registerButton from "../../../assets/images/lib_register.png";
import LeftPanLibrary from "../Common/LeftPanLibrary";

const Registration_Lending_return = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  useEffect(() => {}, []);
  const [searchClicked,setSearchClicked]=useState(false);
  const columns: GridColDef[] = [
    {
      field: "Lender_name",
      headerName: "貸出者氏名",
      sortable: false,
      width: 180,
      headerClassName: "reserveheadergridcell_blue1",
      cellClassName: "gridcolumn-cells black_text",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Furigana",
      headerName: "ふりがな",
      sortable: false,
      width: 180,
      headerClassName: "reserveheadergridcell_blue1",
      cellClassName: "gridcolumn-cells black_text",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "pref",
      headerName: "都道府県",
      sortable: false,
      width: 150,
      headerClassName: "reserveheadergridcell_blue1",
      cellClassName: "gridcolumn-cells black_text",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "muncipality",
      headerName: "市町村",
      sortable: false,
      width: 180,
      headerClassName: "reserveheadergridcell_blue1",
      cellClassName: "gridcolumn-cells black_text",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Email",
      headerName: "Email",
      sortable: false,
      width: 245,
      headerClassName: "reserveheadergridcell_blue1",
      cellClassName: "gridcolumn-cells black_text",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "telePhone",
      headerName: "電話番号",
      sortable: false,
      width: 180,
      headerClassName: "reserveheadergridcell_blue1",
      cellClassName: "gridcolumn-cells black_text",
      align: "center",
      headerAlign: "center",
    },
  ];
  //used to handle state of the checkbox id
  const [selectedIds, setSelectedIds] = useState<any[]>([]);

  //to select all the checkbox and unselect all the checkbox
  const handleCheckboxAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      //redux stored list of id save to the state
      const allIds = apiData?.map((row: any) => row.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  //handling checkbox of each in the list select and unselect
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: any
  ) => {
    const isChecked = event.target.checked;

    setSelectedIds((prevIds) => {
      // if is checked select box which will store the state that id
      if (isChecked) {
        return [...prevIds, id];
      } else {
        //when unselected already selected checkbox unselect using filter
        return prevIds.filter((selectedId) => selectedId !== id);
      }
    });
  };

  const columns1: GridColDef[] = [
    {
      field: "select",
      headerName: "Select",
      headerClassName: "reserveheadergridcell_blue1",
      headerAlign: "center",
      align: "center",
      sortable: false,
      cellClassName: "gridcolumn-cells black_text",
      width: 10,
      renderHeader: () => (
        <input
          type="checkbox"
          checked={selectedIds.length > 1}
          onChange={handleCheckboxAllChange}
        />
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
    },
    {
      field: "Serial_number	",
      headerName: "連番",
      sortable: false,
      width: 60,
      headerClassName: "reserveheadergridcell_blue1",
      cellClassName: "gridcolumn-cells black_text",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ISBN",
      headerName: "ISBN",
      sortable: false,
      width: 180,
      headerClassName: "reserveheadergridcell_blue1",
      cellClassName: "gridcolumn-cells black_text",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "title",
      headerName: "タイトル",
      sortable: false,
      width: 220,
      headerClassName: "reserveheadergridcell_blue1",
      cellClassName: "gridcolumn-cells black_text",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "title_of_work",
      headerName: "著作名",
      sortable: false,
      width: 178,
      headerClassName: "reserveheadergridcell_blue1",
      cellClassName: "gridcolumn-cells black_text",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "editing",
      headerName: "編集・監修",
      sortable: false,
      width: 180,
      headerClassName: "reserveheadergridcell_blue1",
      cellClassName: "gridcolumn-cells black_text",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "selling_agency",
      headerName: "発売元",
      sortable: false,
      width: 180,
      headerClassName: "reserveheadergridcell_blue1",
      cellClassName: "gridcolumn-cells black_text",
      align: "center",
      headerAlign: "center",
    },
  ];

  const apiData: any[] = [];
  const placeholderRow = {
    id: "placeholder-row",
    message: "Data not found",
  };
  const onSubmit = (data: any) => {
    // Handle form submission data here
    setSearchClicked(true);
    console.log(data);
  };

  const handleReset = () => {
    console.log("hhhhhhhhhhhhhhhhh");
    setValue("Sequential_number", "");
    setValue("ISBN", "");
  };
  const customLocaleText = {
    noRowsLabel: <span className="custom-no-rows-message"></span>,
  };
  const getRowClassName = (params: any) => {
    // Check if there are no rows (empty rows array)
    if (!params.api.getRows()) {
      return "row_table_list_c1"; // Apply a specific style for no rows
    }

    // Apply alternating row styles for rows
    return params.indexRelativeToCurrentPage % 2 === 0
      ? "row_table_list_c1"
      : "row_table_list_c2";
  };

  return (
    <Grid container xs={12} padding={1} spacing={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanLibrary />
      </Grid>
      <Grid item xs={9}>
        <LibraryHeader
          label1="B-4."
          label2="貸出・返却の登録"
          label3="図書室管理"
        />
        <Grid className="hr"></Grid>
        <label className="black">【貸出者の照会】</label>
        <label className="registration_lending_return_textEnd black">B-8</label>
        <DataGrid
          columns={columns}
          rows={apiData.length === 0 ? [placeholderRow] : apiData}
          disableColumnMenu={true}
          autoHeight
          // rowHeight={50}
          columnHeaderHeight={30}
          hideFooter
          hideFooterSelectedRowCount

          //   className="custom-data-grid"
        />
        <Grid className="hr"></Grid>
        <Grid className="middle_table registration_lending_return_table_padd">
          <label className="black">
            ★連番またはISBNコードを入力して、貸出書籍を検索して下さい。複数册ある場合は、改行コードを入力して検索して下さい。
          </label>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid className="content-row">
              <Grid className="registration_lending_return_paddTop content-row">
                <Grid className="library-width-15 black">● 連番</Grid>
                <Grid className="library-width-1"></Grid>
                <Controller
                  name="Sequential_number"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="registration_lending_return_input"
                    />
                  )}
                />
                <Grid className="library-width-1"></Grid>
                <Grid className="library-width-15 black">● ISBN </Grid>
                <Grid className="library-width-1"></Grid>
                <Controller
                  name="ISBN"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="registration_lending_return_input"
                    />
                  )}
                />
              </Grid>

              <Grid className="library-width-1"></Grid>
              <Button type="submit">
                <img src={searchButton} />
              </Button>
              <Grid className="library-width-1"></Grid>
              <Button type="button" onClick={() => handleReset()}>
                <img src={resetButtons} />
              </Button>
            </Grid>
          </form>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <DataGrid
            localeText={{ noRowsLabel: " 結果はありません" }}
            columns={columns1}
            rows={apiData}
            disableColumnMenu={true}
            autoHeight
            components={{
              NoRowsOverlay: () => (
                <div className="row_table_list_c1 registration_lending_return_no_row">
                  結果はありません
                </div>
              ),
            }}
            rowHeight={15}
            columnHeaderHeight={30}
            hideFooter
            hideFooterSelectedRowCount
            getRowClassName={getRowClassName}
          />
        </Grid>
        <Grid className="hr"></Grid>
        <Grid className="hr"></Grid>
        {searchClicked&&     <Grid className="content-row">
            <Grid className="library-width-32"></Grid>
          <Button className="library-width-20">
            <img src={registerButton}/>
          </Button>
          <Button className="library-width-20">
            <img
            src={resetButtons}
            />
          </Button>
        </Grid>}
   
      </Grid>
    </Grid>
  );
};

export default Registration_Lending_return;
