import chunk from "lodash.chunk";
import { Child } from "./models/child";

const PAGE_SIZE = 10;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const API_ROOT = process.env.REACT_APP_API_ROOT;

type FetchChildrenArgs = {
  groupId: string;
  institutionId: string;
  page: number;
};

export type GetChildrenResponse = {
  page: number;
  totalPages: number;
  total: number;
  hasMore: boolean;
  children: Child[];
};

function fetchApi<T>(path: string, init?: RequestInit | undefined): Promise<T> {
  return fetch(API_ROOT + path, init).then(async (res) => {
    const json = await res.json();

    if (res.status >= 400)
      throw new Error(json.error || "Something went wrong.");

    return json;
  });
}

export const getChildren = async ({
  groupId,
  institutionId,
  page = 0,
}: FetchChildrenArgs): Promise<GetChildrenResponse> => {
  const params = new URLSearchParams({
    accessToken: ACCESS_TOKEN,
    groupId,
    institutionId,
  });

  const { children } = await fetchApi(`/daycare/tablet/group?${params}`);
  const paginatedChildren = chunk(children, PAGE_SIZE) as Child[][];
  const totalPages = paginatedChildren.length;

  return {
    page,
    totalPages,
    total: children.length,
    hasMore: page < totalPages - 1,
    children: paginatedChildren[page],
  };
};

export type CheckInChildArgs = {
  childId: string;
  pickupTime: string;
};

export type CheckInChildResponse = {
  childCheckinId: string;
  childId: string;
  institutionId: string;
  groupId: string;
  checkinTime: string;
  pickupTime: string;
  pickupRelationId: string;
  goHomeWithChildId: string;
  checkoutTime: string;
  checkinLoginId: string;
  checkoutLoginId: string;
  autoCheckedOut: boolean;
  deletedAt: string;
  hours: unknown;
  checkinStatements: unknown;
};

export const checkInChild = ({
  childId,
  pickupTime,
}: CheckInChildArgs): Promise<CheckInChildResponse> => {
  const params = new URLSearchParams({
    accessToken: ACCESS_TOKEN,
    pickupTime,
  });

  return fetchApi(`/v2/children/${childId}/checkins?${params}`, {
    method: "POST",
  });
};

type CheckOutChildArgs = {
  childId: string;
};

export type CheckOutChildResponse = {
  childCheckinId: string;
  childId: string;
  institutionId: string;
  groupId: string;
  checkinTime: string;
  pickupTime: string;
  pickupRelationId: string;
  goHomeWithChildId: string;
  checkoutTime: string;
  checkinLoginId: string;
  checkoutLoginId: string;
  autoCheckedOut: boolean;
  deletedAt: string;
  hours: number; // 0.35
  checkinStatements: unknown;
}[];

export const checkOutChild = ({
  childId,
}: CheckOutChildArgs): Promise<CheckOutChildResponse> => {
  const params = new URLSearchParams({
    accessToken: ACCESS_TOKEN,
  });

  return fetchApi(`/v2/children/${childId}/checkout?${params}`, {
    method: "POST",
  });
};
