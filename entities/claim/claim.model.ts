export interface ClaimTypeModel {
  code: string;
  description: string;
}

export interface ClaimSubmissionModel {
  fallId: number;
  insuranceNumber: string;
  claimType: string;
}
