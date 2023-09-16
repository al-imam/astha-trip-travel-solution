import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdFirstPage, MdOutlineLastPage } from "react-icons/md";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import style from "./Style.module.css";

// const Person = [
//   {
//     invoice: "1201",
//     ammount: "300",
//     categiry: "income",
//     Date: "22-02-2023",
//     admin: "Nahid",
//   },
//   {
//     invoice: "1001",
//     ammount: "300",
//     categiry: "income",
//     Date: "22-02-2023",
//     admin: "Nahid",
//   },
//   {
//     invoice: "1001",
//     ammount: "300",
//     categiry: "income",
//     Date: "22-02-2023",
//     admin: "sabbir",
//   },
//   {
//     invoice: "1001",
//     ammount: "300",
//     categiry: "income",
//     Date: "22-01-2023",
//     admin: "sabbir",
//   },
// ];
// () => [
//   {
//     Header: "ID",
//     accessor: "id", // accessor is the "key" in the data
//   },
//   {
//     Header: "Amount",
//     accessor: "ammount",
//     Cell:(prop)=>{
//       return prop.row.original.id
//     }
//   },
//   {
//     Header: "Category",
//     accessor: "categiry",
//   },
//   {
//     Header: "Date",
//     accessor: "Date",
//   },
//   {
//     Header: "Admin",
//     accessor: "admin",
//   },
// ],
const Table = ({ datas, colunm, nav = true }) => {
  const data = React.useMemo(() => datas, [datas]);
  const columns = colunm;

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    nextPage,
    previousPage,
    canNextPage,
    pageOptions,
    canPreviousPage,
    setGlobalFilter,
    gotoPage,
    pageCount,
    setPageSize,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <div className={style.con}>
      {nav ? (
        <div className="mb-4 w-full px-3">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              value={globalFilter || ""}
              onChange={(e) => {
                setGlobalFilter(e.target.value);
              }}
              id="search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              className="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="relative w-full overflow-auto">
        <table {...getTableProps()}>
          <thead className="text-brand-700 dark:text-brand-100">
            {
              // Loop over the header rows
              headerGroups.map((headerGroup, i) => (
                // Apply the header row props
                <tr key={i + 1 / 3} {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column, i) => (
                      // Apply the header cell props
                      <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()} className="dark:text-gray-50">
            {
              // Loop over the table rows
              page.map((row, i) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr key={i + 2 / 3} {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell, lo) => {
                        // Apply the cell props
                        return (
                          <td key={lo + 3 / 2} {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      {nav ? (
        <div className="relative mt-2 flex w-full items-center justify-between  py-4 px-2 shadow-sm">
          <button
            className="flex items-center rounded-md bg-brandLinear p-2 text-white disabled:cursor-not-allowed"
            disabled={!canPreviousPage}
            onClick={() => gotoPage(0)}
          >
            {" "}
            <span>
              <MdFirstPage />
            </span>
            first{" "}
          </button>
          <button
            className="flex items-center rounded-md bg-brandLinear/50 p-2 text-white disabled:cursor-not-allowed"
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          >
            <span>
              <IoIosArrowBack />
            </span>{" "}
            prev
          </button>
          <span className="capitalize dark:text-brand-50 text-gray-900">
            page : {pageIndex + 1} of {pageOptions.length} <span> </span>
            <select
              value={pageSize}
              className="relative text-brand-600  ml-4 border-[1px] border-brand-200"
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              <option value="10">Show 10</option>
              <option value="20">Show 20</option>
              <option value="30">Show 30</option>
              <option value="40">Show 40</option>
              <option value="50">Show 50</option>
              <option value="60">Show 60</option>
              <option value="70">Show 70</option>
              <option value="80">Show 80</option>
              <option value="90">Show 90</option>
              <option value="100">Show 100</option>
              <option value="150">Show 150</option>
              <option value="200">Show 200</option>
            </select>
          </span>
          <button
            className="flex flex-row-reverse items-center rounded-md bg-brandLinear/50 p-2 text-white disabled:cursor-not-allowed"
            disabled={!canNextPage}
            onClick={() => nextPage()}
          >
            <span>
              <IoIosArrowForward />
            </span>{" "}
            next
          </button>
          <button
            className="flex flex-row-reverse items-center rounded-md bg-brandLinear p-2 text-white disabled:cursor-not-allowed"
            disabled={!canNextPage}
            onClick={() => gotoPage(pageCount - 1)}
          >
            <span>
              <MdOutlineLastPage />
            </span>{" "}
            last
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Table;
