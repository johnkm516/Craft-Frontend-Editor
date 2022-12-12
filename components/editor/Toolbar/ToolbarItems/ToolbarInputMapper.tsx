import * as React from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3)
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}));

export type ToolbarInputMapperProps = {
    onChange?: (value: any) => void;
    variableMap?: Map<string, { type: string, value: string}>;
  };

export const ToolbarInputMapper = ({
    onChange,
    variableMap,
    ...props
  }: Partial<ToolbarInputMapperProps>) => {
  const [option, setOption] = React.useState("");
  const handleChange = (event: { target: { value: string } }) => {
    setOption(event.target.value);
  };
  return (
    <Grid container spacing={0}>
        <Grid item xs={6}>
            <FormControl sx={{ m: 0 }} variant="standard">
                <InputLabel htmlFor="demo-customized-select-native">Input Option</InputLabel>
                <NativeSelect
                id="demo-customized-select-native"
                value={option}
                onChange={handleChange}
                input={<BootstrapInput />}
                >
                <option value={"Raw"}>Raw</option>
                <option value={"Node"}>Node</option>
                </NativeSelect>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <FormControl sx={{ m: 0 }} variant="standard">
                <InputLabel htmlFor="demo-customized-textbox">Value</InputLabel>
                <BootstrapInput id="demo-customized-textbox" />
            </FormControl>
        </Grid>
    </Grid>
  );
}