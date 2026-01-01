import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import BasicLayout from "../layouts/Basiclayout";

const Loading = <div>Loading......</div>;
const CampusGuide = lazy(() => import("../pages/aboutGreen/CampusGuidePage"));
const President = lazy(() => import("../pages/aboutGreen/PresidentPage"));
const UniversityOverview = lazy(() =>
  import("../pages/aboutGreen/UniversityOverviewPage")
);

const aboutGreenRouter = () => {
  return [
    {
      path: "",
      element: <Navigate replace to="campusguide" />,
    },
    {
      path: "campusguide",
      element: (
        <Suspense fallback={Loading}>
          <BasicLayout children={<CampusGuide />} />
        </Suspense>
      ),
    },
    {
      path: "president",
      element: (
        <Suspense fallback={Loading}>
          <BasicLayout children={<President />} />
        </Suspense>
      ),
    },

    {
      path: "universityoverview",
      element: (
        <Suspense fallback={Loading}>
          <BasicLayout children={<UniversityOverview />} />
        </Suspense>
      ),
    },
  ];
};

export default aboutGreenRouter;
