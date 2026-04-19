 export type RegisterValues = {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  password: string;
  gender: "male" | "female" | "";
  role: "trainee" | "instructor";

  location?: string;

  nationalId?: string;

  profileImage?: File;
  licenseImage?: File;

  licenseNumber?: string;

  details: {
    haveAcar: boolean;
    carType: ("automatic" | "manual")[];
  };
};