import { createBrowserRouter } from "react-router-dom";
import PublicHome from "./features/Home/public-home";
import TimeLine from "./features/TimeLine";
import TimeLines from "./features/TimeLines";
import PrivateLayout from "./layouts/private";
import PublicLayout from "./layouts/public";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicLayout>
        <PublicHome />
      </PublicLayout>
    ),
  },
  {
    path: "/timelines",
    element: (
      <PrivateLayout>
        <TimeLines />
      </PrivateLayout>
    ),
  },
  {
    path: "/timeline/:id",
    element: (
      <PrivateLayout>
        <TimeLine />
      </PrivateLayout>
    ),
  },
]);
