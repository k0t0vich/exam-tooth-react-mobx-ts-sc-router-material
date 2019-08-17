import { KeyboardEvent } from "react";
import RecordData from "../../data/RecordData";

export default interface RecordsTableProps {
  changeSearchString: (event: KeyboardEvent<HTMLInputElement>) => void;
  store?: RecordsTableStore;
}

export interface RecordsTableStore {
  records: RecordData[];
  searchString: string;
}
