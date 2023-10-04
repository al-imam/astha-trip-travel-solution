// import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";

import { useMemo } from "react";

const ComplexTable = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
    state,
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
  initialState.pageSize = 100;
  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="flex items-center text-xl font-bold text-navy-700 dark:text-white">
          <span className="r-2 text-2xl text-brand-500">
            <MaterialSymbolsAccountBoxOutlineSharp />
          </span>
          List of Guest
        </div>
        {/* <CardMenu /> */}
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full table-auto [&_*]:whitespace-nowrap">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 px-3 pb-[10px] text-start first:px-0 last:px-8 dark:!border-navy-700 md:last:px-0"
                  >
                    <p className="text-xs tracking-wide text-gray-600">{column.render("Header")}</p>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";

                    if (cell.column.Header === "NAME") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );

                    } else if (cell.column.Header === "STATUS") {
                      data = (
                        <div className="flex items-center gap-2">
                          <div className={`rounded-full text-xl`}>
                            {cell.value === "Approved" ? (
                              <MdCheckCircle className="text-green-500" />
                            ) : cell.value === "Disable" ? (
                              <MdCancel className="text-red-500" />
                            ) : cell.value === "Error" ? (
                              <MdOutlineError className="text-orange-500" />
                            ) : null}
                          </div>
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "DATE") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "PROGRESS") {
                      data = <Progress width="w-[108px]" value={cell.value} />;
                    }
                    else{
                      data = (<p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell}
                        </p>)
                    }
                    return (
                      <td
                        className="pt-[14px] pb-[18px] sm:text-[14px]"
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody> */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              page.map((row, i) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr
                    key={i + 2 / 3}
                    {...row.getRowProps()}
                    className="relative py-2 odd:bg-brand-400/5 hover:bg-brand-600/5"
                  >
                    {
                      // Loop over the rows cells
                      row.cells.map((cell, lo) => {
                        // Apply the cell props
                        return (
                          <td
                            className="w-max px-3 pb-[18px] pt-[14px] text-navy-700 first:px-0 last:px-8 dark:text-white sm:text-[14px] md:last:px-0  "
                            key={lo + 3 / 2}
                            {...cell.getCellProps()}
                          >
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
        <div className="relative mt-2 flex w-full items-center justify-between">
          <button
            className="flex items-center rounded-md bg-brandLinear p-2 text-white disabled:cursor-not-allowed"
            disabled={!canPreviousPage}
            onClick={() => gotoPage(0)}
          >
            {" "}
            <span>{<IcBaselineKeyboardDoubleArrowLeft />}</span>
            first{" "}
          </button>
          <button
            className="flex items-center rounded-md bg-brandLinear/50 p-2 text-white disabled:cursor-not-allowed"
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          >
            <span>{<IcOutlineKeyboardArrowLeft />}</span> prev
          </button>
          <span className="capitalize text-gray-900">
            page : {pageIndex + 1} of {pageOptions.length} <span> </span>
            <select
              className="relative ml-4 border-[1px] border-brand-200"
              value={pageSize}
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
            <span>{<IcRoundKeyboardArrowRight />}</span> next
          </button>
          <button
            className="flex flex-row-reverse items-center rounded-md bg-brandLinear p-2 text-white disabled:cursor-not-allowed"
            disabled={!canNextPage}
            onClick={() => gotoPage(pageCount - 1)}
          >
            <span>{<IcRoundKeyboardDoubleArrowRight />}</span> last
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ComplexTable;

export function IcRoundKeyboardDoubleArrowRight(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M5.7 6.71a.996.996 0 0 0 0 1.41L9.58 12L5.7 15.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L7.12 6.71c-.39-.39-1.03-.39-1.42 0z"
      ></path>
      <path
        fill="currentColor"
        d="M12.29 6.71a.996.996 0 0 0 0 1.41L16.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L13.7 6.7c-.38-.38-1.02-.38-1.41.01z"
      ></path>
    </svg>
  );
}

export function IcRoundKeyboardArrowRight(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
      ></path>
    </svg>
  );
}

export function IcOutlineKeyboardArrowLeft(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.41z"></path>
    </svg>
  );
}

export function IcBaselineKeyboardDoubleArrowLeft(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M17.59 18L19 16.59L14.42 12L19 7.41L17.59 6l-6 6z"></path>
      <path fill="currentColor" d="m11 18l1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z"></path>
    </svg>
  );
}

export function MaterialSymbolsAccountBoxOutlineSharp(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M5 17.85q1.35-1.325 3.138-2.087T12 15q2.075 0 3.863.763T19 17.85V5H5v12.85ZM12 13q1.45 0 2.475-1.025T15.5 9.5q0-1.45-1.025-2.475T12 6q-1.45 0-2.475 1.025T8.5 9.5q0 1.45 1.025 2.475T12 13Zm-9 8V3h18v18H3Zm4-2h10v-.25q-1.05-.875-2.325-1.313T12 17q-1.4 0-2.675.438T7 18.75V19Zm5-8q-.625 0-1.063-.438T10.5 9.5q0-.625.438-1.063T12 8q.625 0 1.063.438T13.5 9.5q0 .625-.438 1.063T12 11Zm0-1.5Z"
      ></path>
    </svg>
  );
}
