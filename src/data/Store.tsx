import RecordData from "../data/RecordData";
import { observable, computed, action } from "mobx";
import DataLoader from "../services/DataLoader";
import TableData from './TableData';

export default class Store {
  @observable records: RecordData[] = [];
  @observable searchString: string = "";
  @observable tableData:TableData = new TableData();

  loadData(){
      DataLoader.load<RecordData[]>("/testData.json").then((data: RecordData[]) =>
        this.initRecords(data)
      );
  }

  @action initRecords(records: RecordData[]) {
    this.records = records;
  }

  @action changeSearchString(searchString:string){
    this.searchString = searchString;
  }

  @computed get logged(){
      return this.user !== null;
  }

  @computed get user(){
    return localStorage.getItem("user");
  }

  @action saveUser(user:string){
    localStorage.setItem("user", user);
  }

  @action clearUser(){
    localStorage.removeItem("user");
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
