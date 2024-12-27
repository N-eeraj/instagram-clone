import { use } from "react"
import Modal from "@components/ui/Modal"
import LoginForm from "@components/LoginForm"
import { ProfileEditContext } from "@contexts/Profile/Edit"
import { UserContext } from "@contexts/User"

import { handleReAuthenticate } from "@firebaseApp/auth"
import { toast } from "sonner"
import type { LoginFormData } from "@customTypes/auth"

function ReAuthenticate() {
  const {
    reAuthenticate,
    setReAuthenticate,
  } = use(ProfileEditContext)
  const { authUser } = use(UserContext)
  if (!authUser) return

  const onReAuthenticate = async (credentials: LoginFormData) => {
    await handleReAuthenticate(credentials)
    toast.success("Verified! You can proceed to update profile.")
    setReAuthenticate(false)
  }

  return (
    <Modal
      show={reAuthenticate}
      title="Login to confirm"
      dismissible
      onClose={() => setReAuthenticate(false)}>
      <LoginForm
        email={authUser.email}
        onSubmit={onReAuthenticate} />
    </Modal>
  )
}

export default ReAuthenticate
