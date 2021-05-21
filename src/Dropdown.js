import { FormHelperText, MenuItem, Select } from '@material-ui/core';
import React from 'react'

const PREDEFINED_DROPDOWN_LIST = [
  {
    id: "dropdown1", 
    label: "Dropdown 1"
  },
  {
    id: "dropdown2",
    label: "Dropdown 2"
  },
  {
    id: "dropdown3",
    label: "Dropdown 3"
  },
]

const PREDIFINED_DROPDOWN_IDS = PREDEFINED_DROPDOWN_LIST.map(item => item.id);

function Dropdown({ params, handleUpdate }) {

  return <>
    <Select
      labelId={`${params.row.id}-dropdown-edit`}
      id={`${params.row.id}-dropdown-edit`}
      value={params.value}
      onChange={e => {
        handleUpdate(params.field, params.row.id, e.target.value);
      }}
    >
      {PREDEFINED_DROPDOWN_LIST.map(item => <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>)}
    </Select>
    {!PREDIFINED_DROPDOWN_IDS.includes(params.value) && <FormHelperText>Value is not correct</FormHelperText>}
  </>
}

export default Dropdown
