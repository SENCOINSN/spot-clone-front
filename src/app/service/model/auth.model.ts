import { FormControl } from "@angular/forms";

export type AuthRequest = {
    usernameOrEmail: FormControl<string>;
    password?: FormControl<string>;
  }


export type userRequest={
  lastName:FormControl<string>;
  firstName:FormControl<string>;
  email:FormControl<string>;
  password:FormControl<string>;
  imageUrl:string;
  username:FormControl<string>;
}  

export interface userReq{
  lastName?:string;
  firstName?:string;
  email?:string;
  password?:string;
  username?:string;
  imageUrl?:string;
}


  export interface Auth {
    usernameOrEmail?:string;
    password?: string;
  }