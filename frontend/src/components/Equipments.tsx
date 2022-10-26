import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { EquipmentInterface } from "../interfaces/Iequipment";
import { GetEquipment } from "../services/HttpClientService";
import moment from "moment";

function Equipments() {
  const [equipments, setEquipments] = useState<EquipmentInterface[]>([]);

  useEffect(() => {
    getEquipments();
  }, []);

  const getEquipments = async () => {
    let res = await GetEquipment();
    console.log(res);
    if (res) {
      setEquipments(res);
    } 
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Name",
      headerName: "ชื่ออุปกรณ์",
      width: 200,
      valueFormatter: (params) => params.value.Name,
    },
    {
      field: "Amount",
      headerName: "จำนวน",
      width: 100,
      valueFormatter: (params) => params.value.Amount,
    },
    {
      field: "Category",
      headerName: "ประเภท",
      width: 250,
      valueGetter: (params) => params.row.Category.Name,
    },
    {
      field: "Unit",
      headerName: "สรรพนาม",
      width: 150,
      valueGetter: (params) => params.row.Unit.Name,
    },
    {
      field: "Employee",
      headerName: "พนักงาน",
      width: 250,
      valueGetter: (params) => `${params.row.Employee.FirstName}  ${params.row.Employee.LastName}`,
    },
    { field: "Time", headerName: "วันที่และเวลา", width: 250,
      valueFormatter: (params) => moment(params.value.Time)},
  ];

  return (
    <div>
      <Container maxWidth="md">
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลการบันทึกอุปกรณ์
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/equipment/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={equipments}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </div>
  );
}

export default Equipments;