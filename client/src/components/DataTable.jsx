import React from "react";
//import { DataGrid , GridToolbar} from '@mui/x-data-grid'
import { DataGrid , GridToolbar} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch"
import axios from "axios";

const DataTable = ({ slug, columns, data, handleDelete, components, customColums }) => {
  const actionColumn = [
    {
      field: "action",
      headerName: "Tương Tác",
      headerAlign: 'center',
      width: "200",
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center gap-5">
            <Link to={`/${slug}/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="py-2 px-4 rounded-lg bg-green-600 text-white cursor-pointer">View</div>
            </Link>
            <button
              className="py-2 px-4 rounded-lg bg-red-600 text-white cursor-pointer"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  return (
      <DataGrid 
        rows={data}
        columns={columns.concat(actionColumn)}
       initialState={{
        columns: customColums,
        pagination: { paginationModel: { pageSize: 5 } },
      }}
        components={components}
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10, 25]}
      />

  );
};

export default DataTable;
