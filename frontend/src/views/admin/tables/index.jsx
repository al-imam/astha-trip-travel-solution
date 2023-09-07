import CheckTable from "./components/CheckTable";

import ColumnsTable from "./components/ColumnsTable";
import ComplexTable from "./components/ComplexTable";
import DevelopmentTable from "./components/DevelopmentTable";
import {
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
  columnsDataDevelopment,
} from "./variables/columnsData";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataColumns from "./variables/tableDataColumns.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";

const Tables = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <DevelopmentTable columnsData={columnsDataDevelopment} tableData={tableDataDevelopment} />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <ColumnsTable columnsData={columnsDataColumns} tableData={tableDataColumns} />

        <ComplexTable columnsData={columnsDataComplex} tableData={tableDataComplex} />
      </div>
    </div>
  );
};

export default Tables;
