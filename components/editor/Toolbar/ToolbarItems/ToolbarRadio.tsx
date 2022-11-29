
import { FormControlLabel, Radio, RadioProps, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles'
import { MUIStyledCommonProps } from '@mui/system';
import React from 'react';

// Inspired by blueprintjs
function StyledRadio(props: JSX.IntrinsicAttributes & RadioProps & MUIStyledCommonProps<Theme>) {
  return (
    <Radio
      size="small"
      color="primary"
      {...props}
    />
  );
}

export const ToolbarRadio = ({ value, label }: any) => {
  return (
    <FormControlLabel
      value={value}
      control={<StyledRadio />}
      label={<Typography sx={{ fontWeight: 'light', fontSize: 12 }}>{label}</Typography>}
    />
  );
};
