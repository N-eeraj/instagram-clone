import Button from "@components/ui/Button"
import { Link } from "react-router"

function UserProfileActions() {
  const triggerLogoutConfirmation = () => {
    console.log("logout")
  }

  return (
    <>
      <Link
        to="/edit-profile"
        className="w-full md:w-fit">
        <Button>
          Edit Profile
        </Button>
      </Link>
      <Button
        className="w-full md:w-fit"
        onClick={triggerLogoutConfirmation}>
        Logout
      </Button>
    </>
  )
}

export default UserProfileActions
