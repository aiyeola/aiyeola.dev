import React from "react";
import { NextPage } from "next";

type GetLayoutFunc = (page: React.ReactElement) => React.ReactElement;

export type NextPageWithLayout = NextPage & {
  getLayout?: GetLayoutFunc;
  requireAuth?: boolean;
};
