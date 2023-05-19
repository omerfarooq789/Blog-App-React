import Axios from "axios-observable";
import { UserType } from "../features";
import { LoginProps, SignupProps } from "../types";
import { BehaviorSubject, catchError, map, throwError, concatMap } from "rxjs";

const axios = Axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

class AuthService {
  private currentUserSubject = new BehaviorSubject<UserType | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();

  get isAuthenticated(): boolean {
    let session = localStorage.getItem("user");
    if (session) {
      this.currentUserSubject.next(JSON.parse(session));
    }
    return session ? true : false;
  }

  signup({ values }: SignupProps) {
    const q = `?email=${values.email}`;
    const newData = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    return axios.get(`/users${q}`).pipe(
      concatMap((res) => {
        if (res.data && res.data.length === 0) {
          return axios.post("/users", newData).pipe(
            map(({ data }: { data: UserType }) => {
              localStorage.setItem("user", JSON.stringify(data));
              this.currentUserSubject.next(data);
            })
          );
        } else {
          throw new Error("Email Already Exists");
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  login({ values }: LoginProps) {
    const q = `?email=${values.email}`;
    return axios.get(`/users${q}`).pipe(
      map(({ data }: { data: UserType[] }) => {
        if (data.length !== 0) {
          return data;
        } else {
          return null;
        }
      }),
      map((data) => {
        if (data) {
          const userData: UserType = data[0];
          if (values.password === userData.password) {
            localStorage.setItem("user", JSON.stringify(data[0]));
            this.currentUserSubject.next(data[0]);
            return data;
          } else {
            throw new Error("Email or Password is Invalid");
          }
        } else {
          throw new Error("Email or Password is Invalid");
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }
  logout() {
    localStorage.removeItem("user");
    this.currentUserSubject.next(null);
  }
}

export const authService = new AuthService();
