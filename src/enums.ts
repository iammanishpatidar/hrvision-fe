// Invitation status enum

export enum StatusEnum {
  INVITED = 'INVITED',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  EXPIRED = 'EXPIRED',
}

// Company Team Size Enum

export enum CompanyTeamSizeEnum {
  SMALL = '0-10',
  MEDIUM = '11-50',
  LARGE = '51-200',
  XLARGE = '201-500',
  XXLARGE = '501-1000',
  XXXLARGE = 'more than 1000',
}

export enum AssetConditionEnum {
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
  DAMAGED = 'DAMAGED',
}

export enum AssetStatusEnum {
  AVAILABLE = 'AVAILABLE',
  ASSIGNED = 'ASSIGNED',
  MAINTENANCE = 'MAINTENANCE',
  DISPOSED = 'DISPOSED',
}