
import { FormControlLabel, Radio, RadioProps } from '@mui/material';
import { styled, Theme } from '@mui/material/styles'
import { MUIStyledCommonProps } from '@mui/system';
import classnames from 'classnames';
import React from 'react';

const RADIO_PREFIX = 'StyledRadio';
const LABEL_PREFIX = 'StyledLabel';
const radioClasses = {
  icon: `${[RADIO_PREFIX]}-icon`,
  checkedIcon: `${[RADIO_PREFIX]}-checkedIcon`,
}

const labelClasses = {
  label: `${[LABEL_PREFIX]}-label`,
}

const RadioStyle = styled(Radio)(({}) => ({
    [`&.${radioClasses.icon}`]: {
      borderRadius: '100%',
      width: 15,
      height: 15,
      background: 'transparent',
      position: 'relative',
      padding: '3px',
      border: '2px solid rgb(142, 142, 142)',
      transition: '0.4s cubic-bezier(0.19, 1, 0.22, 1)',
    },
    [`& .${radioClasses.checkedIcon}`]: {
      background: 'rgb(19, 115, 230)',
      borderColor: 'transparent',
      '&:before': {
        content: '""',
        display: 'block',
        width: '100%',
        height: '100%',
        borderRadius: '100%',
        background: '#fff',
      },
    },
}))

// Inspired by blueprintjs
function StyledRadio(props: JSX.IntrinsicAttributes & RadioProps & MUIStyledCommonProps<Theme>) {
  return (
    <RadioStyle
      disableRipple
      color="default"
      checkedIcon={
        <span className={classnames(radioClasses.icon, radioClasses.checkedIcon)} />
      }
      icon={<span className={radioClasses.icon} />}
      {...props}
    />
  );
}

const LabelStyle = styled(FormControlLabel)(({ theme }) => ({
  [`&.${labelClasses.label}`]: {
    fontSize: '15px',
  },
}))

export const ToolbarRadio = ({ value, label }: any) => {
  return (
    <LabelStyle
      classes={labelClasses}
      value={value}
      control={<StyledRadio />}
      label={label}
    />
  );
};
