export const RECORD_DATA_KEYS = [
  "reference",
  "caseUid",
  "accountId",
  "creationDate",
  "publicId",
  "status",
];

export default class RecordData {
  accountId: string = "";
  caseUid: string = "";
  creationDate: string = "";
  publicId: string = "";
  status: string = "";
  reference: string = "";
  
}

//HACK
export function getRecordProperty(record:RecordData, key:string){
  var t:any = record;
  console.log(t[key]);
  return String(t[key]);
}
