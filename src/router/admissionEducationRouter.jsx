import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>;

const AdmissionGuide = lazy(() =>
  import("../pages/admissionEducation/AdmissionGuidePage")
);
const Colleges = lazy(() => import("../pages/admissionEducation/CollegesPage"));
const GraduateSchool = lazy(() =>
  import("../pages/admissionEducation/GraduateSchoolPage")
);
const NonDegreePrograms = lazy(() =>
  import("../pages/admissionEducation/NonDegreeProgramsPage")
);

const admissionEducationRouter = () => [
  {
    index: true,
    element: <Navigate replace to="admissionguide" />,
  },
  {
    path: "admissionguide",
    element: (
      <Suspense fallback={Loading}>
        <AdmissionGuide />
      </Suspense>
    ),
  },
  {
    path: "colleges",
    element: (
      <Suspense fallback={Loading}>
        <Colleges />
      </Suspense>
    ),
  },
  {
    path: "graduateschool",
    element: (
      <Suspense fallback={Loading}>
        <GraduateSchool />
      </Suspense>
    ),
  },
  {
    path: "nondegreeprograms",
    element: (
      <Suspense fallback={Loading}>
        <NonDegreePrograms />
      </Suspense>
    ),
  },
];

export default admissionEducationRouter;
