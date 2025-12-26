import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>;

const CampusGuide = lazy(() => import("../pages/aboutGreen/CampusGuidePage"));
const GreenVision = lazy(() => import("../pages/aboutGreen/GreenVisionPage"));
const HistoryOfGreen = lazy(() =>
  import("../pages/aboutGreen/HistoryOfGreenPage")
);
const President = lazy(() => import("../pages/aboutGreen/PresidentPage"));
const UniversityOverview = lazy(() =>
  import("../pages/aboutGreen/UniversityOverviewPage")
);
const UniversitySymbols = lazy(() =>
  import("../pages/aboutGreen/UniversitySymbolsPage")
);

const aboutGreenRouter = () => [
  {
    index: true,
    element: <Navigate replace to="campusguide" />,
  },
  {
    path: "campusguide",
    element: (
      <Suspense fallback={Loading}>
        <CampusGuide />
      </Suspense>
    ),
  },
  {
    path: "greenvision",
    element: (
      <Suspense fallback={Loading}>
        <GreenVision />
      </Suspense>
    ),
  },
  {
    path: "historyofgreen",
    element: (
      <Suspense fallback={Loading}>
        <HistoryOfGreen />
      </Suspense>
    ),
  },
  {
    path: "president",
    element: (
      <Suspense fallback={Loading}>
        <President />
      </Suspense>
    ),
  },
  {
    path: "universityoverview",
    element: (
      <Suspense fallback={Loading}>
        <UniversityOverview />
      </Suspense>
    ),
  },
  {
    path: "universitysymbols",
    element: (
      <Suspense fallback={Loading}>
        <UniversitySymbols />
      </Suspense>
    ),
  },
];

export default aboutGreenRouter;
