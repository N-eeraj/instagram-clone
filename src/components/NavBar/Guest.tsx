import NavBar from "@components/NavBar"
import { Link } from "react-router"
import Button from "@components/ui/Button"

function GuestNavBar() {
  return (
    <NavBar>
      <div className="flex gap-x-4">
        <Link to="/login">
          <Button>
            Log in
          </Button>
        </Link>
        <Link to="/login">
          <Button>
            Sign up
          </Button>
        </Link>
      </div>
    </NavBar>
  )
}

export default GuestNavBar
