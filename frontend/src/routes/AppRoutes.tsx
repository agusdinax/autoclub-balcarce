import { Routes, Route } from "react-router-dom";

import { PublicLayout } from "../layouts/PublicLayout/PublicLayout";
import { Home } from "../pages/public/Home/Home";
import { Events } from "../pages/public/Events/Events";

export function AppRoutes() {
  return (
    <Routes>

      <Route element={<PublicLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

      </Route>

    </Routes>
  );
}