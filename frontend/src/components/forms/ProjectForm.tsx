import React, {useState, Fragment} from "react";
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker';
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Button } from "@mui/material";
export default function ProjectForm(){
    const [value, setValue] = useState<DateRange<Dayjs>>([null, null]);
    return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField
          required
          id="outlined-number"
          label="Project Id"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Input title of the project"
          defaultValue=""
        />
        <TextField
          required
          id="outlined-required"
          label="description about the project"
          defaultValue=""
        />
      </div>
      <Stack spacing={3} sx={{textAlign: "center"}}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{ start: 'Start date', end: 'End date' }}
      >
        <DesktopDateRangePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </Fragment>
          )}
                />
            </LocalizationProvider>
        </Stack>
        <Button variant="contained">Create Project</Button>
    </Box>
  );
}