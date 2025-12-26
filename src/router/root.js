import { lazy, Suspense } from "react";

import Basiclayout from "../layouts/Basiclayout";
import aboutGreenRouter from "./aboutGreenRouter";
import academicSupportRouter from "./academicSupportRouter";
import admissionEducationRouter from "./admissionEducationRouter";
import campusLifeRouter from "./campusLifeRouter";
import informationRouter from "./informationRouter";
import accountRouter from "./accountRouter";
import adminRouter from "./adminRouter";

const { createBrowserRouter } = require("react-router-dom");
const Loading = <div>Loading......</div>;

const Main = lazy(() => import("../pages/MainPage"));

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={Loading}>
        <Basiclayout children={<Main />}></Basiclayout>
      </Suspense>
    ),
  },
  {
    path: "aboutgreen",
    // element: <Suspense fallback={Loading}><Basiclayout children={<Main />}></Basiclayout></Suspense>,
    // element: <Suspense fallback={Loading}><Main /></Suspense>,
    children: aboutGreenRouter(),
  },
  {
    path: "academicsupport",
    // element: <Suspense fallback={Loading}><Basiclayout children={<Main />}></Basiclayout></Suspense>,
    children: academicSupportRouter(),
  },
  {
    path: "admissioneducation",
    // element: <Suspense fallback={Loading}><Basiclayout children={<Main />}></Basiclayout></Suspense>,
    children: admissionEducationRouter(),
  },
  {
    path: "campuslife",
    // element: <Suspense fallback={Loading}><Basiclayout children={<Main />}></Basiclayout></Suspense>,
    children: campusLifeRouter(),
  },
  {
    path: "information",
    // element: <Suspense fallback={Loading}><Basiclayout children={<Main />}></Basiclayout></Suspense>,
    children: informationRouter(),
  },
  {
    path: "account",
    // element: <Suspense fallback={Loading}><Basiclayout children={<Main />}></Basiclayout></Suspense>,
    children: accountRouter(),
  },
    {
    path: "admin",
    // element: <Suspense fallback={Loading}><Basiclayout children={<Main />}></Basiclayout></Suspense>,
    children: adminRouter(),
  },
  
]);

export default root;
