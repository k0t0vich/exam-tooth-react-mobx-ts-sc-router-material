import RecordData from "../data/RecordData";
import { observable, computed, action } from "mobx";
import DataLoader from "../services/DataLoader";
import TableData from "./TableData";

export default class Store {
  @observable records: RecordData[] = [];
  @observable searchString: string = "";
  @observable tableData: TableData = new TableData();
  @observable dataLoaded = false;
  @observable user?:string;

  constructor(){
    this.readUser();
  }

  loadData() {
    DataLoader.load<RecordData[]>("/testData.json").then((data: RecordData[]) =>
      this.initRecords(data)
    );
  }

  @action initRecords(records: RecordData[]) {
    this.records = records;
    this.tableData.maxRaws = this.records.length;
    this.tableData.initRows();
    this.dataLoaded = true;
  }

  @action changeSearchString(searchString: string) {
    this.searchString = searchString;
  }

  @computed get isLogin() {
    return this.user !== undefined;
  }

  @observable readUser() {
    this.user = localStorage.getItem("user") || undefined;
  }

  @action saveUser(user: string) {
    localStorage.setItem("user", user);
    this.readUser();
  }

  @action clearUser() {
    localStorage.removeItem("user");
    this.readUser();
  }

  @computed get filteredRecords(): RecordData[] {
    if (this.searchString === "") return this.records;

    let result = this.records.filter(
      (record: RecordData, index: number) =>
        record.accountId.indexOf(this.searchString) !== -1 ||
        record.caseUid.indexOf(this.searchString) !== -1 ||
        record.creationDate.indexOf(this.searchString) !== -1 ||
        record.publicId.indexOf(this.searchString) !== -1 ||
        record.reference.indexOf(this.searchString) !== -1 ||
        record.status.indexOf(this.searchString) !== -1
    );
    this.tableData.maxRaws = result.length;
    return result;
  }

  @computed get visibleRecords(): RecordData[] {
    let result = this.filteredRecords.slice(
      this.tableData.start,
      this.tableData.end
    );
    return result;
  }

  getRecordsByCaseId(caseUid: string): RecordData | undefined {
    let result = this.records.find(
      (record: RecordData) => record.caseUid === caseUid
    );
    return result;
  }
}
