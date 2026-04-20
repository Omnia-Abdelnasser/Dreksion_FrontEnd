// auth.type.ts

export type LoginValues = {
  email: string;
  password?: string; // Optional if you use OTP for login later
};

export type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  gender: string;
  role: "trainee" | "instructor";
  location: string;
  nationalId: string;
  licenseNumber: string;
  licenseImage?: File;
  profileImage?: File;
  owns_car: boolean;
  can_drive_manual: boolean;
  can_drive_automatic: boolean;
  details: {
    haveAcar: boolean;
    carType: string[];
  };
};

export type ConfirmEmailValues = {
  otp: string;
  email: string;
};

// You can also add the API Response type here to be safe
export type AuthResponse = {
  token: string;
  user: any; // Or specific user type
  message: string;
};