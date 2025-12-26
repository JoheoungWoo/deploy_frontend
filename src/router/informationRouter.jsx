import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
const Loading = <div>Loading...</div>;

const Careers = lazy(() => import("../pages/information/CareersPage"));
const FAQ = lazy(() => import("../pages/information/FAQPage"));
const LegalNotice = lazy(() => import("../pages/information/LegalNoticePage"));
const PrivacyPolicy = lazy(() =>
  import("../pages/information/PrivacyPolicyPage")
);
const Sitemap = lazy(() => import("../pages/information/SitemapPage"));

const informationRouter = () => [
  {
    index: true,
    element: <Navigate replace to="careers" />,
  },
  {
    path: "careers",
    element: (
      <Suspense fallback={Loading}>
        <Careers />
      </Suspense>
    ),
  },
  {
    path: "faq",
    element: (
      <Suspense fallback={Loading}>
        <FAQ />
      </Suspense>
    ),
  },
  {
    path: "legalnotice",
    element: (
      <Suspense fallback={Loading}>
        <LegalNotice />
      </Suspense>
    ),
  },
  {
    path: "privacypolicy",
    element: (
      <Suspense fallback={Loading}>
        <PrivacyPolicy />
      </Suspense>
    ),
  },
  {
    path: "sitemap",
    element: (
      <Suspense fallback={Loading}>
        <Sitemap />
      </Suspense>
    ),
  },
];

export default informationRouter;
