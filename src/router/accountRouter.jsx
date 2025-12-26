import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>;

const Login = lazy(() =>
  import("../pages/authentication_Account_Security/LoginPage")
);
const Logout = lazy(() =>
  import("../pages/authentication_Account_Security/LogoutPage")
);
const Manage = lazy(() =>
  import("../pages/authentication_Account_Security/AccountManagementPage")
);
const Member = lazy(() =>
  import("../pages/authentication_Account_Security/MemberInformationPage")
);
const Reset = lazy(() =>
  import("../pages/authentication_Account_Security/ResetPasswordPage")
);
const Sign = lazy(() =>
  import("../pages/authentication_Account_Security/SignUpPage")
);

const accountRouter = () => [
  {
    index: true,
    element: <Navigate replace to="login" />,
  },
  {
    path: "login",
    element: (
      <Suspense fallback={Loading}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "logout",
    element: (
      <Suspense fallback={Loading}>
        <Logout />
      </Suspense>
    ),
  },
  {
    path: "manage",
    element: (
      <Suspense fallback={Loading}>
        <Manage />
      </Suspense>
    ),
  },
  {
    path: "member",
    element: (
      <Suspense fallback={Loading}>
        <Member />
      </Suspense>
    ),
  },
  {
    path: "reset",
    element: (
      <Suspense fallback={Loading}>
        <Reset />
      </Suspense>
    ),
  },
  {
    path: "sign",
    element: (
      <Suspense fallback={Loading}>
        <Sign />
      </Suspense>
    ),
  },
];

export default accountRouter;
