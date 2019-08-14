import RecordData from "../data/RecordData";
import {observable, computed} from "mobx";

export default class Store {
  @observable records:RecordData[] = [];
  
  @observable searchString:string = "";

  init(records:RecordData[]){
    this.records = records;
  }

  @computed get filteredRecords():RecordData[] {
      if (this.searchString === "")
        return this.records;

      return this.records.filter(
        (record:RecordData, index:number) => 
          (
            record.accountId
            +record.caseUid
            +record.creationDate
            +record.publicId
            +record.reference
            +record.status
          ).indexOf(this.searchString) !== -1
      )
  } 
}