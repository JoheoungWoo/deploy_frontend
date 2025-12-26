import React, { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;

const AdminOne = lazy(() => import("../pages/admin/AdminOnePage"));

const adminRouter = () => [
  {
    path: "one",
    element: (
      <Suspense fallback={Loading}>
        <AdminOne />
      </Suspense>
    ),
  },
];

export default adminRouter;
