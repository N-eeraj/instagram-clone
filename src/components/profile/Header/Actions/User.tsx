import {
  Link,
  useNavigate,
} from "react-router"
import Button from "@components/ui/Button"
import { handleSignOut } from "@firebaseApp/auth"

function UserProfileActions() {
  const navigate = useNavigate()

  const triggerLogoutConfirmation = async () => {
    await handleSignOut()
    navigate("/login", { replace: true })
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
