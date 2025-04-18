
export interface LoginResponse {
    token: string
    userId: string
    role: string
  }

  export interface userSessionData {
    role : UserRole
    userId : string
  }

  export enum UserRole {
    ADMIN = "admin",
    EMPLOYEE = "employee",
    SUPER_ADMIN = "super admin",
  }
