import React, { useState } from 'react';
import './App.css';
import { DataGrid } from '@material-ui/data-grid';
import XLSX from 'xlsx'
import { Button } from '@material-ui/core';
import Dropdown from './Dropdown';

const EXTENSIONS = ['xlsx', 'xls', 'csv']

function App() {
  const [data, setData] = useState([])

  const handleSubmitData = () => {
    console.log("Submit to api:", data);
  }

  const handleUpdateCell = (field, id, value) => {
    const newData = [...data];
    const item = newData.find(row => row.id === id);
    const rowIndex = newData.findIndex(row => row.id === id);
    item[field] = value;
    newData.splice(rowIndex, 1, item);
    setData(newData);
  };

  const COLUMS = [
    { type: "number", field: "number1", headerName: "number 1", width: 150, editable: true },
    { type: "number", field: "number2", headerName: "number 2", width: 150, editable: true },
    { field: "text1", headerName: "text 1", width: 180, editable: true },
    { field: "text2", headerName: "text 2", width: 180, editable: true },
    { field: "largeText2", headerName: "largeText 2", flex: 1, editable: true },
    {
      field: "textDropdown", headerName: "textDropdown", flex: 0.8, editable: true,
      renderCell: (params) => <Dropdown params={params} handleUpdate={handleUpdateCell} />,
    },
  ]

  const getExention = (file) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension) // return boolean
  }

  const convertToJson = (data) => {
    const rows = []
    data.forEach((row, index) => {
      let rowData = { id: "data-record-" + index }
      COLUMS.forEach((column, colIndex) => rowData[column.field] = row[colIndex]);
      rows.push(rowData)

    });
    return rows
  }

  const importExcel = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = (event) => {
      //parse data

      const bstr = event.target.result
      const workBook = XLSX.read(bstr, { type: "binary" })

      //get first sheet
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })

      //removing header
      fileData.splice(0, 1)

      const recordData = convertToJson(fileData);

      setData(recordData);
    }

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
      }
      else {
        alert("Invalid file input, Select Excel, CSV file")
      }
    } else {
      setData([])
    }
  }

  return (
    <div className="App">
      <h1 align="center">Reactjs application</h1>
      <h4 align='center'>Import Data from Excel, CSV in Material Table</h4>
      <input type="file" onChange={importExcel} />
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid title="Olympic Data" rows={data} columns={COLUMS} onEditCellChangeCommitted={(params) => handleUpdateCell(params.field, params.id, params.props.value)} />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={handleSubmitData}>Submit</Button>
      </div>
    </div>
  );
}

export default App;
