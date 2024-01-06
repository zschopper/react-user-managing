export default interface UserInterface {
  id?: number;
  name: string;
  email: string;
  gender: string;
  dob: Date;
  country: string;
  city: string;
  address1: string;
  address2: string;
  postcode: string;
}

class UserData implements UserInterface {
  id?: number = undefined;
  name: string = '';
  email: string = '';
  gender: string = '';
  dob: Date = new Date();
  country: string = '';
  city: string = '';
  address1: string = '';
  address2: string = '';
  postcode: string = '';
}

export {UserData}