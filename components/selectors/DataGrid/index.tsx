
import React from 'react';

import { DataGridSettings } from './DataGridSettings';
import { Resizer } from '../Resizer';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import styled from 'styled-components';
import Box from '@mui/material/Box/Box';
import { gql, useApolloClient, useQuery } from "@apollo/client";

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: '#262626',
  },
  '& .ant-empty-img-2': {
    fill: '#595959',
  },
  '& .ant-empty-img-3': {
    fill: '#434343',
  },
  '& .ant-empty-img-4': {
    fill: '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: '0.08',
    fill: '#fff',
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}

export type DataGridProps = {
  background: Record<'r' | 'g' | 'b' | 'a', number>;
  flexDirection: string;
  alignItems: string;
  justifyContent: string;
  fillSpace: string;
  width: string;
  height: string;
  minWidth: string;
  minHeight: string;
  padding: string[];
  margin: string[];
  marginTop: number;
  marginLeft: number;
  marginBottom: number;
  marginRight: number;
  graphQLQuery: string;
};


const defaultProps = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  fillSpace: 'yes',
  padding: ['10', '10', '10', '10'],
  margin: ['0', '10', '10', '0'],
  background: { r: 255, g: 255, b: 255, a: 1 },
  width: '100%',
  height: 'auto',
};


export const DataGridComponent = (props: Partial<DataGridProps>) => {
  props = {
    ...defaultProps,
    ...props,
  };
  const {
    flexDirection,
    alignItems,
    justifyContent,
    fillSpace,
    background,
    padding,
    margin,
    graphQLQuery,
  } = props;
  const client = useApolloClient();


  const { loading, error, data } = graphQLQuery ? useQuery(
  gql`
    ${graphQLQuery}`
  , {client: client }) : { loading: undefined , error: undefined , data: undefined};

  return (
    <Resizer
      propKey={{ width: 'width', height: 'height' }}
      style={{
        justifyContent,
        flexDirection,
        alignItems,
        background: `rgba(${Object.values(background!)})`,
        padding: `${padding![0]}px ${padding![1]}px ${padding![2]}px ${padding![3]}px`,
        margin: `${margin![0]}px ${margin![1]}px ${margin![2]}px ${margin![3]}px`,
        flex: fillSpace === 'yes' ? 1 : 'unset',
      }}
    >
      {loading || !data ? (<DataGrid
        loading={loading}
        components={{
          Toolbar: GridToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }} 
        columns={[]}
        rows={[]} 
      />) : 
      (<DataGrid
        components={{
          Toolbar: GridToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}

        /*
        My query that I input in the editor during runtime : 
        query Query {
          Auth_findManyUser {
            id
            lastName
            firstName
          }
        }

        The result of that query : 
        {
          "data": {
            "Auth_findManyUser": [
              {
                "id": 1,
                "lastName": "Kim",
                "firstName": "John"
              },
              {
                "id": 3,
                "lastName": "Lee",
                "firstName": "Bob"
              }
            ]
          }
        }
        */
        //I hard-coded the data access here, but you can add another component customizer in the sidebar to access data during runtime, or parse the input GraphQL query. 
        //It all depends on your resolver and what your query result looks like.
        columns={data.Auth_findManyUser.map((element: any) => (
          Object.keys(element).map(key => {
            return { field: key, width: 150 }
          })
        ))[0]}  
        rows={[]} 
      />)}
    </Resizer>
  )
  
};

DataGridComponent.craft = {
  displayName: 'Data Grid',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: DataGridSettings,
  },
};
