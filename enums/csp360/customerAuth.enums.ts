export enum VerificationMethod {
  SSN = 'SSN',
  DOB = 'Date of Birth',
  SECURITY_QUESTION = 'Security Question',
}

export enum CustomerAuthStatus {
  VERIFIED = 'Verified',
  PENDING = 'Pending Verification',
  FAILED = 'Verification Failed',
}

export enum FraudType {
  CARD_FRAUD = 'Card Fraud',
  IDENTITY_THEFT = 'Identity Theft',
  WIRE_FRAUD = 'Wire Fraud',
  CHECK_FRAUD = 'Check Fraud',
  ACH_FRAUD = 'ACH Fraud',
}
