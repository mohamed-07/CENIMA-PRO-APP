import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <NavBar />

      <main className="md:mt-17 ">
          <div className="">
              <Outlet />
          </div>
      </main> 
    </div>
  )
}
