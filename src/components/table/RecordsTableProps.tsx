import { KeyboardEvent } from "react";
import RecordData from "../../data/RecordData";
import TableData from '../../data/TableData';

export default interface RecordsTableProps {
  store: RecordsTableStore;
}

export interface RecordsTableStore {
  changeSearchString: (searchString: string) => void;
  filteredRecords: RecordData[];
  searchString: string;
  tableData:TableData;
}
