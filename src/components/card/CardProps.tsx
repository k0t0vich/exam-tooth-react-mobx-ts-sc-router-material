import RecordData from "../../data/RecordData";
import { RouteComponentProps } from 'react-router-dom';

export interface CardStore {
  getRecordsByCaseId(caseUid?:string):RecordData;
}

export interface CardPropsMatchParams {
  caseUid?: string;
}

export interface CardProps extends RouteComponentProps<CardPropsMatchParams>{
  store?: CardStore;
}
