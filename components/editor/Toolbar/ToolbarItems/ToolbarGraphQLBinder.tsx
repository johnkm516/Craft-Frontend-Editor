import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Divider } from '@mui/material';
import {
  DataGrid,
  GridRenderCellParams,
  GridColDef,
} from '@mui/x-data-grid';
import { useGridApiContext } from '@mui/x-data-grid-pro';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { getGraphQLArgs } from 'utils/graphQLGetArgs';


function SelectEditInputCell(props: GridRenderCellParams) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event: SelectChangeEvent) => {
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{ height: 1 }}
      native
      autoFocus
    >
      <option>Raw</option>
      <option>Node ID</option>
    </Select>
  );
}

const renderSelectEditInputCell: GridColDef['renderCell'] = (params) => {
  return <SelectEditInputCell {...params} />;
};

export type ToolbarGraphQLBinderProps = {
    onChange?: (value: any) => void;
    variableMap?: Map<string, { type: string, value: string}>;
    value?: any,
  };


export const ToolbarGraphQLBinder = ({
    onChange,
    variableMap,
    value,
    ...props
  }: Partial<ToolbarGraphQLBinderProps>) => {

  const [internalValue, setInternalValue] = useState(value);

  return (
    <div style={{ height: 300, width: '100%' }}>
      <TextField
        label="GraphQL Query"
        multiline
        rows={4}
        style={{ marginBottom: 10, width: '100%', borderRadius: '0px' }}
        value={internalValue || ''}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onChange?.((e.target as any).value);
          }
        }}
        onChange={(e: { target: { value: any; }; }) => {
          setInternalValue(e.target.value);
        }}
        margin="dense"
        variant="filled"
      />

      <Divider />

      <DataGrid
        density='compact'
        rows={rows}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
      />
      <Button
        onClick={() => 
            console.log(getGraphQLArgs(internalValue))
        }
        color="primary"
        >
        Bind Data
      </Button>
    </div>
  );
}


const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 80
    },
    {
      field: 'type',
      headerName: 'Type',
      renderEditCell: renderSelectEditInputCell,
      editable: true,
      width: 80,
    },
    {
      field: 'value',
      headerName: 'Value',
      editable: true,
      width: 300,
    },
  ];
  
  const rows = [
    {
      id: 1,
      name: 'Olivier',
      type: 'Raw',
      value: 'a'
    },
    {
      id: 2,
      name: 'Danail',
      type: 'Raw',
      value: 'a'
    },
    {
      id: 3,
      name: 'Matheus',
      type: 'Raw',
      value: 'a'
    },
  ];
  