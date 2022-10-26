import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem"
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { CategoriesInterface } from "../interfaces/Icategory";
import { EmployeesInterface } from "../interfaces/Iemployees";
import { UnitsInterface } from "../interfaces/Iunit";
import { EquipmentInterface } from "../interfaces/Iequipment";

import {
  GetCategory,
  GetUnit,
  GetEmployeeByUID,
  CreateEquipment,
} from "../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EquipmentCreate() {
  const [catagories, setCategories] = useState<CategoriesInterface[]>([]);
  const [units, setUnits] = useState<UnitsInterface[]>([]);
  const [employee, setEmployee] = useState<EmployeesInterface>();
  const [equipment, setEquipment] = useState<Partial<EquipmentInterface>>({
    Time: new Date(),
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof equipment;
    setEquipment({
      ...equipment,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof equipment;
    const { value } = event.target;
    setEquipment({ ...equipment, [id]: value });
  };

  const getCategory = async () => {
    let res = await GetCategory();
    if (res) {
      setCategories(res);
    }
  };

  const getUnit = async () => {
    let res = await GetUnit();
    if (res) {
      setUnits(res);
    }
  };

  const getEmployee = async () => {
    let res = await GetEmployeeByUID();
    equipment.EmployeeID = res.ID;
    if (res) {
      setEmployee(res);
    }
  };

  useEffect(() => {
    getCategory();
    getUnit();
    getEmployee();
  }, []);

  // console.log(equipment);
  
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      CategoryID: equipment.CategoryID,
      UnitID: equipment.UnitID,
      Name: equipment.Name,
      Amount: convertType(equipment.Amount),
      EmployeeID: equipment.EmployeeID,
      Time: equipment.Time,
    };

    let res = await CreateEquipment(data as EquipmentInterface);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกข้อมูลอุปกรณ์
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่ออุปกรณ์</p>
              <TextField 
                id="Name"
                value={equipment.Name ?? ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>จำนวน</p>
              <TextField 
                id="Amount"
                type="number"
                value={equipment.Amount ?? 0}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ประเภทอุปกรณ์</p>
              <Select
                value={equipment.CategoryID ?? 0}
                onChange={handleChange}
                inputProps={{
                  name: "CategoryID",
                }}
              >
                <MenuItem aria-label="None" value={0}>
                  กรุณาเลือกประเภทอุปกรณ์
                </MenuItem>
                {catagories.map((item: CategoriesInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>สรรพนาม</p>
              <Select
                value={equipment.UnitID ?? 0}
                onChange={handleChange}
                inputProps={{
                  name: "UnitID",
                }}
              >
                <MenuItem aria-label="None" value={0}>
                  กรุณาเลือกอุปกรณ์
                </MenuItem>
                {units.map((item: UnitsInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={equipment.Time}
                  onChange={(newValue) => {
                    setEquipment({
                      ...equipment,
                      Time: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/equipment"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default EquipmentCreate;