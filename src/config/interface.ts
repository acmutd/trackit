import * as firebase from "firebase";

export interface userFirebase
  extends firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> {
  readonly isAdmin?: boolean;
}

export interface workshopFirebase
  extends firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> {
  //uses the stricter QueryDocumentSnapshot that quarantees that the fields cannot be null, can optionally be downcasted to DocumentSnapshot, read here for more information https://stackoverflow.com/questions/49859954/firestore-difference-between-documentsnapshot-and-querydocumentsnapshot
  Date?: Date;
  Level_Descriptions?: string[];
  Level_Titles?: string[];
  Number_Of_Levels?: number;
  Workshop_ID?: string;
  Workshop_Name?: string;
}

interface progress {
  [key: string] : number;
}

export interface studentsAtWorkshopFirebase
  extends firebase.firestore.QueryDocumentSnapshot<
    firebase.firestore.DocumentData
  > {
  //uses the stricter QueryDocumentSnapshot that quarantees that the fields cannot be null, can optionally be downcasted to DocumentSnapshot
  readonly Enabled?: boolean;
  readonly Level_Enabled?: number;
  readonly Workshop_ID?: string;
  readonly testProgress?: progress
}


//super strict definition of data required for the front-end, no optional parameters
export interface studentsAtWorkshop {
  Students: string[];
  Progress: number[];
  Enabled: boolean;
  Workshop_ID: string;
  Level_Enabled: number;
}

// Type for Date object which combines Javascript Date object with Date object from databse
export interface DateType extends Date {
  seconds?: number
}

//super strict definition of data required for the front-end, no optional parameters
//this coincidentally happens to be the exact same as workshopFirebase but none of the fields are optional

export interface workshop {
  Date: DateType;
  Number_Of_Levels: number;
  Workshop_ID: string;
  Workshop_Name: string;
  Levels: workshopPart[];
}

export interface workshopPart {
  Level_Description: string;
  Level_Title: string;
  Files?: string[];
}

export interface CardData {
  title: string;
  subtitle: string;
  description: string;
  links: Function[];
  linkText: string[];
  disabled: boolean;
}

export interface FirebaseConfig {
  apiKey: string | undefined,
  authDomain: string | undefined,
  databaseURL: string | undefined,
  projectId: string | undefined,
  storageBucket: string | undefined,
  messagingSenderId: string | undefined,
  appId: string | undefined,
  measurementId: string | undefined,
}