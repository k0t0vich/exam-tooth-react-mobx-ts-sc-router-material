import { observable, computed } from 'mobx';
import { start } from 'repl';
export default  class TableData  {

  @observable page:number = 0;
  @observable rowsPerPage:number = 0;

  setPage(page:number) { this.page = page}
  setRowsPerPage(rowsPerPage:number){ this.rowsPerPage = rowsPerPage}
  
  @computed get start() {
    return this.page * this.rowsPerPage;
  }

  @computed get end() {
    return this.start +  this.rowsPerPage;
  }

}
