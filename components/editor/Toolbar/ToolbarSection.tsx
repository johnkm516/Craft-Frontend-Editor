
import { useNode } from '@craftjs/core';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid, styled } from '@mui/material';

import React from 'react';

const PANEL_PREFIX = 'MuiAccordion';
const SUMMARY_PREFIX = 'MuiAccordionDetails';
const panelClasses = {
  root: `${PANEL_PREFIX}-root`,
}

const summaryClasses = {
  root: `${SUMMARY_PREFIX}-root`,
  content: `${SUMMARY_PREFIX}-content`,
}

const PanelStyle = styled(Accordion)(({}) => ({
  [`&.${panelClasses.root}`]: {
    background: 'transparent',
    boxShadow: 'none',
    '&:before': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    '&.Mui-expanded': {
      margin: '0 0',
      minHeight: '40px',
      '&:before': {
        opacity: '1',
      },
      '& + .MuiExpansionPanel-root:before ': {
        display: 'block',
      },
    },
  },
}))

const SummaryStyle = styled(AccordionSummary)(({}) => ({
  [`&.${summaryClasses.root}`]: {
    'min-height': '36px',
    padding: 0,
  },
  [`&.${summaryClasses.content}`]: {
    margin: '0px',
  },
}))


export const ToolbarSection = ({ title, props, summary, children }: any) => {
  const { nodeProps } = useNode((node) => ({
    nodeProps:
      props &&
      props.reduce((res: any, key: any) => {
        res[key] = node.data.props[key] || null;
        return res;
      }, {}),
  }));
  return (
    <PanelStyle classes={panelClasses}>
      <SummaryStyle classes={summaryClasses}>
        <div className="px-6 w-full">
          <Grid container direction="row" alignItems="center" spacing={3}>
            <Grid item xs={4}>
              <h5 className="text-sm text-bold-gray-1 text-left font-medium text-dark-gray">
                {title}
              </h5>
            </Grid>
            {summary && props ? (
              <Grid item xs={8}>
                <h5 className="text-regular-gray-2 text-sm text-right text-dark-blue">
                  {summary(
                    props.reduce((acc: any, key: any) => {
                      acc[key] = nodeProps[key];
                      return acc;
                    }, {})
                  )}
                </h5>
              </Grid>
            ) : null}
          </Grid>
        </div>
      </SummaryStyle>
      <AccordionDetails style={{ padding: '0px 24px 20px' }}>
        <Divider />
        <Grid container spacing={3}>
          {children}
        </Grid>
      </AccordionDetails>
    </PanelStyle>
  );
};
