export default class Contract {
  number: number;
  sections: [];
  status: String;
  commencement: Date;
  expiry: Date;
  signatories: [];
  docId: String;

  constructor(
    number: number,
    sections: [],
    status: String,
    commencement: Date,
    expiry: Date,
    signatories: [],
    docId: String
  ) {
    this.number = number;
    this.sections = sections;
    this.status = status;
    this.commencement = commencement;
    this.expiry = expiry;
    this.signatories = signatories;
    this.docId = docId;
  }
}
