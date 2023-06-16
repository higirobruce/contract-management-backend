export default class Filing {
  name: String;
  description: String;
  number: number;
  partyType: String;
  agreementType: String;
  statusOfExecution: String;
  contractCommencement: Date;
  contractExpiration: Date;
  contractValue: Number;
  criticalClauses: [];
  renewalTerms: String;
  comments: String;
  actionOnExpiry: String;
  docId: string;
  owner: String;
  collaborators: [];
  collaboratorComments:[];
  organization: String;

  constructor(
    name: String,
    description: String,
    number: number,
    partyType: String,
    agreementType: String,
    statusOfExecution: String,
    contractCommencement: Date,
    contractExpiration: Date,
    contractValue: Number,
    criticalClauses: [],
    renewalTerms: String,
    comments: String,
    actionOnExpiry: String,
    docId: string,
    owner: String,
    collaborators: [],
    collaboratorComments: [],
    organization: String
  ) {
    (this.name = name), (this.description = description);
    this.number = number;
    this.partyType = partyType;
    this.agreementType = agreementType;
    this.statusOfExecution = statusOfExecution;
    this.contractCommencement = contractCommencement;
    this.contractExpiration = contractExpiration;
    this.contractValue = contractValue;
    this.criticalClauses = criticalClauses;
    this.renewalTerms = renewalTerms;
    this.comments = comments;
    this.actionOnExpiry = actionOnExpiry;
    this.docId = docId;
    this.owner = owner;
    this.collaborators = collaborators
    this.collaboratorComments = collaboratorComments
    this.organization = organization
  }
}
