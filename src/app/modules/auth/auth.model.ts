import { Task } from '../services/service.model';

export interface ServiceProvider {
  user_id: string;
  user_type: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  nic: string;
  email: string;
  contact_no: string;
  service_category: string;
  address_line1: string;
  address_line2: string;
  district: string;
  gender: string;
  date_of_birth: string;
  reg_date: string;
  tasks: Task[];
  isavailable: boolean;
  location: Location;
  firm: Firm;
}

export interface ServiceProviderTemp {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  contact_no: string;
  reg_date: string;
}

export interface Customer {
  user_id: string;
  user_type: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  email: string;
  contact_no: string;
  gender: string;
  address_line1: string;
  address_line2: string;
  reg_date: string;
  location: Location;
}

export interface User {
  user_id: string;
  user_type: string;
  email: string;
  password: string;
  state: boolean;
}

export interface LogIn {
  email: string;
  password: string;
}

export interface Location {
  latitude: number;
  longtitude: number;
  town: string;
}

export interface Firm {
  hasfirm: boolean;
  firmOwner_id: string;
  firm: string;
}