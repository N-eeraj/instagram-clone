import NavBar from "@components/NavBar"
import { Link } from "react-router"
import Button from "@components/ui/Button"

function GuestNavBar() {
  return (
    <NavBar>
      <div className="flex items-center gap-x-4">
        <Link to="/login">
          <Button className="w-fit font-semibold">
            Log in
          </Button>
        </Link>
        <Link
          to="/register"
          className="text-primary-button font-semibold">
          Sign up
        </Link>
      </div>
    </NavBar>
  )
}

export default GuestNavBar
