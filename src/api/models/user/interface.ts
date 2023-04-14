export default interface User {
  name: string;
  phone: number;
  address: string;
  email: string;
  password: string;
  creatAt: Date;
  role: string;
  active: boolean;
  passwordResetToken: any;
  passwordResetExpires: any;
  populate: any;
  find: any;
  googleID: string;
}
