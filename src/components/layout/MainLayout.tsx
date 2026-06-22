import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <NavBar />
      
      <main className="mt-18">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
              <Outlet />
          </div>
        </main>
    </div>
  )
}
