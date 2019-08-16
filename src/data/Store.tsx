import RecordData from "../data/RecordData";
import { observable, computed } from "mobx";

export default class Store {
  @observable records: RecordData[] = [];

  @observable searchString: string = "";

  init(records: RecordData[]) {
    this.records = records;
  }

  @computed get filteredRecords(): RecordData[] {
    if (this.searchString === "") return this.records;

    return this.records.filter(
      (record: RecordData, index: number) =>
        record.accountId.indexOf(this.searchString) !== -1 ||
        record.caseUid.indexOf(this.searchString) !== -1 ||
        record.creationDate.indexOf(this.searchString) !== -1 ||
        record.publicId.indexOf(this.searchString) !== -1 ||
        record.reference.indexOf(this.searchString) !== -1 ||
        record.status.indexOf(this.searchString) !== -1
    );
  }
}
