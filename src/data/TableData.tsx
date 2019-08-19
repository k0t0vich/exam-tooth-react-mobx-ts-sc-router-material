import { observable, computed, action } from "mobx";

const PAGINATION_VALUES_DEFAULT = [5, 10, 25, 50, 100, 200, 500];

export default class TableData {
  @observable page: number = 0;
  @observable rowsPerPage: number = 0;
  maxRaws = 0;

  @action setPage(page: number) {
    this.page = page;
  }
  @action setRowsPerPage(rowsPerPage: number) {
    this.rowsPerPage = rowsPerPage;
  }

  @computed get start() {
    return this.page * this.rowsPerPage;
  }

  @computed get end() {
    return this.start + this.rowsPerPage;
  }

  @action initRows() {
    this.setPage(0);
    this.setRowsPerPage(this.paginationValues[0]);
  }

  @computed get paginationValues(): number[] {
    let result = PAGINATION_VALUES_DEFAULT.filter(
      value => value < this.maxRaws
    );
    result.push(this.maxRaws);
    return result;
  }
}
