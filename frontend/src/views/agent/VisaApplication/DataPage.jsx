import React, { useMemo, useState } from 'react';
import Select from "react-select";
import Table from "../../admin/BalanceReq/table"
import useVisa from '../Hooks/useVisa';
const StyleSelect = {
    control: (styles, state) => ({
        ...styles,
        margin: 0,
        padding: 2,
        backgroundColor: "rgb(248 249 250)",
        borderColor: state.isFocused
            ? "rgb(59 130 246 / 0.5)"
            : state.isDisabled
                ? "rgb(233 227 255)"
                : "rgb(192 184 254)",
        borderWidth: 1.5,
        opacity: state.isDisabled ? "0.5" : 1,
        "&:hover": {
            borderColor: "none",
        },
        boxShadow: state.isFocused
            ? "0 0 0 1px rgb(59 130 246 / 0.5)"
            : "none",
    }),
    placeholder: (styles) => ({
        ...styles,
        whiteSpace: "nowrap",
        fontSize: "0.875rem",
        overflow: "hidden",
        color: "#adb5bd",
        letterSpacing: "0.3px",
        userSelect: "none",
    }),
    valueContainer: (styles) => ({
        ...styles,
        userSelect: "none",
        color: "rgb(27 37 89)",
    }),
}
const DataPage = () => {
    const [SelectedCountry, SetSelectedCountry] = useState("");
    const [data, Loading, error, reload] = useVisa();
    const [TableData, SetTableData] = useState([]);
    // colunm 
    const colunm = useMemo(() => {
        let allData = {
            schengen: [
                {
                    Header: "ID",
                    accessor: "id", // accessor is the "key" in the data
                },
                {
                    Header: "Name",
                    accessor: "name",
                    Cell: (prop) => {
                        return prop.row.original.surname + " " + prop.row.original.first_name
                    }
                },
                {
                    Header: "Passport Number",
                    accessor: "passport_number",

                },
                {
                    Header: "Passport Type",
                    accessor: "type_of_travel_document",
                },

                {
                    Header: "Status",
                    accessor: "status",

                },
                {
                    Header: "Action",
                    accessor: "action",
                    Cell: (prop) => {
                        return (
                            <div className='flex gap-2 justify-end'>
                                {/* <button
                                    title='Reject Request'
                                    className='p-2 text-red-800 bg-red-200 text-md hover:scale-105 transition-all duration-500 hover:shadow-md rounded-full ring-1 ring-red-700'
                                >
                                    <TdesignFileBlocked />
                                </button>
                                <button
                                    onClick={() => {
                                        Approved(SelectedCountry, prop.row.original.id)
                                    }}
                                    title='Accept Request'
                                    className='p-2 text-green-800 bg-green-200 text-md hover:scale-105 transition-all duration-500 hover:shadow-md rounded-full ring-1 ring-green-700'>
                                    <TeenyiconsShieldTickOutline />
                                </button>
                                <button
                                    title='Details'
                                    className='p-2 text-blue-800 bg-blue-200 text-md hover:scale-105 transition-all duration-500 hover:shadow-md rounded-full ring-1 ring-blue-700'>
                                    <ClarityDetailsLine />
                                </button> */}
                            </div>
                        )
                    }
                },
            ],
            thailand: [
                {
                    Header: "ID",
                    accessor: "id", // accessor is the "key" in the data
                },
                {
                    Header: "Name",
                    accessor: "name",
                    Cell: (prop) => {
                        return prop.row.original.first_name + " " + prop.row.original.middle_name
                    }
                },
                {
                    Header: "Passport Number",
                    accessor: "passport_number",

                },
                {
                    Header: "Passport Type",
                    accessor: "type_of_passport",
                },

                {
                    Header: "Status",
                    accessor: "status",

                },
                {
                    Header: "Action",
                    accessor: "action",
                    Cell: (prop) => {
                        return (
                            <div className='flex gap-2 justify-end'>
                                {/* <button
                                    title='Reject Request'
                                    className='p-2 text-red-800 bg-red-200 text-md hover:scale-105 transition-all duration-500 hover:shadow-md rounded-full ring-1 ring-red-700'
                                >
                                    <TdesignFileBlocked />
                                </button>
                                <button
                                    onClick={() => {
                                        Approved(SelectedCountry, prop.row.original.id)
                                    }}
                                    title='Accept Request'
                                    className='p-2 text-green-800 bg-green-200 text-md hover:scale-105 transition-all duration-500 hover:shadow-md rounded-full ring-1 ring-green-700'>
                                    <TeenyiconsShieldTickOutline />
                                </button>
                                <button
                                    title='Details'
                                    className='p-2 text-blue-800 bg-blue-200 text-md hover:scale-105 transition-all duration-500 hover:shadow-md rounded-full ring-1 ring-blue-700'>
                                    <ClarityDetailsLine />
                                </button> */}
                            </div>
                        )
                    }
                },
            ],
            singapore: [
                {
                    Header: "ID",
                    accessor: "id", // accessor is the "key" in the data
                },
                {
                    Header: "Name",
                    accessor: "name",
                    Cell: (prop) => {
                        return prop.row.original.name + " " + prop.row.original.alias
                    }
                },
                {
                    Header: "Passport Number",
                    accessor: "passport_number",

                },
                {
                    Header: "Travel Date",
                    accessor: "expected_date_of_arrival",
                },

                {
                    Header: "Status",
                    accessor: "status",

                },
                {
                    Header: "Action",
                    accessor: "action",
                    Cell: (prop) => {
                        // return prop.row.original.id
                        return (
                            <div className='flex gap-2 justify-end'>
                                {/* <button
                                    title='Reject Request'
                                    className='p-2 text-red-800 bg-red-200 text-md hover:scale-105 transition-all duration-500 hover:shadow-md rounded-full ring-1 ring-red-700'
                                >
                                    <TdesignFileBlocked />
                                </button>
                                <button
                                    onClick={() => {
                                        Approved(SelectedCountry, prop.row.original.id)
                                    }}
                                    title='Accept Request'
                                    className='p-2 text-green-800 bg-green-200 text-md hover:scale-105 transition-all duration-500 hover:shadow-md rounded-full ring-1 ring-green-700'>
                                    <TeenyiconsShieldTickOutline />
                                </button>
                                <button
                                    title='Details'
                                    className='p-2 text-blue-800 bg-blue-200 text-md hover:scale-105 transition-all duration-500 hover:shadow-md rounded-full ring-1 ring-blue-700'>
                                    <ClarityDetailsLine />
                                </button> */}
                            </div>
                        )
                    }
                },
            ],
        };
        if (SelectedCountry === "singapore") {
            SetTableData(data.Singapore);
            return allData.singapore
        }
        if (SelectedCountry === "thailand") {
            SetTableData(data.Thailand);
            return allData.thailand
        }
        if (SelectedCountry === "schengen") {
            SetTableData(data.Schengen);
            return allData.schengen
        }
        return allData.singapore
    }, [SelectedCountry]);
    return (
        <div className='w-full relative '>
            <div className='w-full relative p-3 pb-6'>
                <div>
                    <span className='w-full relative text-xl'>Select A Country</span>
                    <Select
                        isSearchable={false}
                        styles={StyleSelect}
                        placeholder={'Please Select a Country'}
                        onChange={(e) => {
                            SetSelectedCountry(e.value)
                        }}
                        options={
                            ['singapore', "thailand", "schengen"].map((e) => {
                                return { label: e, value: e }
                            })
                        }
                    />
                </div>
            </div>
            <div>
                <Table colunm={colunm} datas={TableData} />
            </div>
        </div>
    )
}

export default DataPage