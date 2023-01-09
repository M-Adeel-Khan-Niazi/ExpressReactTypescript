import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Spinner from "../components/spinner";
const routesArray = [
  { id: "1", path: "/", component: lazy(() => import("../views/home")) },
  {
    id: "2",
    path: "/sign-up",
    component: lazy(() => import("../views/signUp")),
  },
  { id: "3", path: "/log-in", component: lazy(() => import("../views/login")) },
  {
    id: "4",
    path: "/create-post",
    component: lazy(() => import("../views/createPost")),
  },
];
const AppRoutes = () => {
  return (
    <Routes>
      {routesArray?.map((item) => (
        <Route
          key={item?.id}
          path={item?.path}
          element={
            <Suspense fallback={<Spinner />}>{<item.component />}</Suspense>
          }
        ></Route>
      ))}
    </Routes>
  );
};

export default AppRoutes;
