export interface UserDetails {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FullUserDetails {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

export interface userLogin {
  userName: string;
  password: string;
}
