export interface User {
    firstName?: string;
    lastName?: string;
    email?: string;
    username?:string;
    subscription?: Subscription;
    imageUrl?: string;
  }
  
  export enum Subscription {
    PREMIUM, FREE
  }