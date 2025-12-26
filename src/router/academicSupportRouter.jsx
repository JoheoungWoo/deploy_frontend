import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>;

const AcademicInformation = lazy(() =>
  import("../pages/academicSupport/AcademicInformationPage")
);
const CertificatesIssuance = lazy(() =>
  import("../pages/academicSupport/CertificatesIssuancePage")
);
const FormsApplications = lazy(() =>
  import("../pages/academicSupport/FormsApplicationsPage")
);
const Scholarships = lazy(() =>
  import("../pages/academicSupport/ScholarshipsPage")
);
const Tuition = lazy(() => import("../pages/academicSupport/TuitionPage"));
const UndergraduateCurriculum = lazy(() =>
  import("../pages/academicSupport/UndergraduateCurriculumPage")
);

const academicSupportRouter = () => [
  {
    index: true,
    element: <Navigate replace to="academicinformation" />,
  },
  {
    path: "academicinformation",
    element: (
      <Suspense fallback={Loading}>
        <AcademicInformation />
      </Suspense>
    ),
  },
  {
    path: "certificatesissuance",
    element: (
      <Suspense fallback={Loading}>
        <CertificatesIssuance />
      </Suspense>
    ),
  },
  {
    path: "formsapplications",
    element: (
      <Suspense fallback={Loading}>
        <FormsApplications />
      </Suspense>
    ),
  },
  {
    path: "scholarships",
    element: (
      <Suspense fallback={Loading}>
        <Scholarships />
      </Suspense>
    ),
  },
  {
    path: "tuition",
    element: (
      <Suspense fallback={Loading}>
        <Tuition />
      </Suspense>
    ),
  },
  {
    path: "undergraduatecurriculum",
    element: (
      <Suspense fallback={Loading}>
        <UndergraduateCurriculum />
      </Suspense>
    ),
  },
];

export default academicSupportRouter;
