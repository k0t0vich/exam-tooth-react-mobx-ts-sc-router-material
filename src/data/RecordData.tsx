export default class RecordData {
  accountId: string = "";
  caseUid: string = "";
  creationDate: string = "";
  publicId: string = "";
  status: string = "";
  reference: string = "";

  getSearchString():String {
    return this.accountId + this.caseUid + this.creationDate + this.publicId + this.status + this.reference;
  }
}
