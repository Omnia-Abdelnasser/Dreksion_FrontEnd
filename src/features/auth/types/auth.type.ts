// auth.type.ts
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