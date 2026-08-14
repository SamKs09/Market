export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: { userId: string; isEmailMode: boolean; scheme?: string };
  Dashboard: undefined;
  RoleSelection: undefined;
  PropertyIntent: { userRole: "Proprietaire" | "Buyer" };
  Preferences: { 
    userRole: "Proprietaire" | "Buyer";
    propertyIntent?: "rent" | "purchase";
  };
  SetupCompletion: undefined;
  MainApp: undefined;
  VerifyPhone: { userId: string; phoneNumber: string };
};

export type TabParamList = {
  "Find Homes": undefined;
  "Feed": undefined;
  "Favorites": undefined;
  "My Home": undefined;
  "My Profile": undefined;
};

export type PropertySearchFilters = {
  priceRange: [number, number];
  bedrooms: number;
  bathrooms: number;
  propertyType: string[];
  amenities: string[];
  location: string;
  radius: number;
};

export type PropertyListing = {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // in square meters
  propertyType: string;
  isForRent: boolean;
  isForSale: boolean;
  images: string[];
  description: string;
  amenities: string[];
  datePosted: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};