import { KeyboardEvent } from 'react';
import RecordData from '../../data/RecordData';
export default interface RecordsTableProps {
  records: RecordData[];
  searchString: string;
  changeSearchString: (event: KeyboardEvent<HTMLInputElement>) => void;
}
