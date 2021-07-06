export type Child = {
  birthday: string;
  birthplace: string;
  checkedIn: boolean;
  checkinTime: unknown;
  checkins: unknown[];
  childId: string;
  createdTime: string;
  email: unknown;
  endDate: unknown;
  extraInfo: string;
  gender: number;
  groupId: string;
  hasVacation: boolean;
  homeAddress: string;
  image: {
    small: string;
    large: string;
    empty: boolean;
  };
  institutionId: string;
  isAbsent: boolean;
  isSick: boolean;
  isSleeping: boolean;
  language: string;
  leaves: unknown[];
  leavingReason: unknown;
  loginId: string;
  name: {
    fullName: string;
    firstName: string;
    middleName: string;
    lastName: string;
  };
  naps: unknown[];
  nationality: string;
  onBus: boolean;
  onTrip: boolean;
  pickupName: string;
  pickupRelationId: unknown;
  pickupTime: unknown;
  relations: unknown;
  startDate: string;
  statusRegistrations: unknown[];
  statuses: unknown[];
};
