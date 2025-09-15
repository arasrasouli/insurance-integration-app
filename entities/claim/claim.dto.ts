export interface ClaimTypeDto {
  code: string;
  description: string;
}

export interface ClaimSubmissionDto {
  fall_id: number;
  insurance_number: string;
  claim_type: string;
}
