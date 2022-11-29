import { useNode } from '@craftjs/core';
import { Grid, Slider, RadioGroup, styled } from '@mui/material';
import React from 'react';

import { ToolbarDropdown } from './ToolbarDropdown';
import { ToolbarTextInput } from './ToolbarTextInput';


const SLIDER_PREFIX = 'MuiSlider';
const sliderClasses = {
  root: `${SLIDER_PREFIX}-root`,
  thumb: `${SLIDER_PREFIX}-thumb`,
  active: `${SLIDER_PREFIX}-active`,
  valueLabel: `${SLIDER_PREFIX}-valueLabel`,
  track: `${SLIDER_PREFIX}-track`,
  rail: `${SLIDER_PREFIX}-rail`,
  mark: `${SLIDER_PREFIX}-mark`,
  markActive: `${SLIDER_PREFIX}-markActive`
}

const SliderStyle = styled(Slider)(({}) => ({
    [`&.${sliderClasses.root}`]: {
      color: '#3880ff',
      height: 3,
      padding: '5px 0',
      width: '100%',

    },
    [`& .${sliderClasses.thumb}`]: {
      height: 14,
      width: 14,
      backgroundColor: '#fff',
      boxShadow: iOSBoxShadow,
      marginTop: 0,
      marginLeft: 0,
      '&:focus,&:hover,&$active': {
        boxShadow:
          '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          boxShadow: iOSBoxShadow,
        },
      },
    },
    [`&.${sliderClasses.active}`]: {
    },
    [`&.${sliderClasses.valueLabel}`]: {
      left: 'calc(-50% + 11px)',
      top: -22,
      '& *': {
        background: 'transparent',
        color: '#000',
      },
    },
    [`&.${sliderClasses.track}`]: {
      height: 2,
    },
    [`&.${sliderClasses.rail}`]: {
      height: 2,
      opacity: 0.5,
      backgroundColor: '#bfbfbf',
    },
    [`&.${sliderClasses.mark}`]: {
      backgroundColor: '#bfbfbf',
      height: 8,
      width: 1,
      marginTop: -3,
    },
    [`&.${sliderClasses.markActive}`]: {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
}))

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

export type ToolbarItemProps = {
  prefix?: string;
  label?: string;
  full?: boolean;
  propKey?: string;
  index?: number;
  children?: React.ReactNode;
  type: string;
  multiline?: boolean;
  onChange?: (value: any) => any;
};
export const ToolbarItem = ({
  full = false,
  propKey,
  type,
  onChange,
  index,
  multiline,
  ...props
}: ToolbarItemProps) => {
  const {
    actions: { setProp },
    propValue,
  } = useNode((node) => ({
    propValue: node.data.props[propKey!],
  }));
  const value = Array.isArray(propValue) ? propValue[index!] : propValue;

  return (
    <Grid item xs={full ? 12 : 6} sx={{ fontWeight: "light" }}> 
      <div className="mb-2">
        {['text', 'color', 'bg', 'number'].includes(type) ? (
          <ToolbarTextInput
            {...props}
            type={type}
            multiline={multiline}
            value={value}
            onChange={(value) => {
              setProp((props: any) => {
                if (Array.isArray(propValue)) {
                  props[propKey!][index!] = onChange ? onChange(value) : value;
                } else {
                  props[propKey!] = onChange ? onChange(value) : value;
                }
              }, 500);
            }}
          />
        ) : type === 'slider' ? (
          <>
            {props.label ? (
              <h4 style={{ marginTop: 10 }} className="text-sm text-light-gray-2">{props.label}</h4>
            ) : null}
            <SliderStyle
              value={parseInt(value) || 0}
              onChange={
                ((_: any, value: number) => {
                  setProp((props: any) => {
                    if (Array.isArray(propValue)) {
                      props[propKey!][index!] = onChange
                        ? onChange(value)
                        : value;
                    } else {
                      props[propKey!] = onChange ? onChange(value) : value;
                    }
                  }, 1000);
                }) as any
              }
            />
          </>
        ) : type === 'radio' ? (
          <>
            {props.label ? (
              <h4 style={{ marginTop: 10, fontWeight: 'light' }} className="text-sm text-light-gray-2">{props.label}</h4>
            ) : null}
            <RadioGroup
              value={value || 0}
              onChange={(e) => {
                const value = e.target.value;
                setProp((props: any) => {
                  props[propKey!] = onChange ? onChange(value) : value;
                });
              }}
            >
              {props.children}
            </RadioGroup>
          </>
        ) : type === 'select' ? (
          <ToolbarDropdown
            value={value || ''}
            onChange={(value: any) =>
              setProp(
                (props: any) =>
                  (props[propKey!] = onChange ? onChange(value) : value)
              )
            }
            {...props}
          />
        ) : null}
      </div>
    </Grid>
  );
};
