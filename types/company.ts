export interface Company {
    id: number
    name: string
    status: CompanyStatus
    createdAt: string
    totalEmployee: number
  }


  // company status type
 export enum CompanyStatus {
    ACTIVE = "active",
    SUSPENDED = "suspended",
  }
