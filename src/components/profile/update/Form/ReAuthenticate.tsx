import { use } from "react"
import Modal from "@components/ui/Modal"
import LoginForm from "@components/LoginForm"
import { ProfileEditContext } from "@contexts/Profile/Edit"

import { handleReAuthenticate } from "@firebaseApp/auth"
import type { LoginFormData } from "@customTypes/auth"

function ReAuthenticate() {
  const {
    reAuthenticate,
    setReAuthenticate,
  } = use(ProfileEditContext)

  const onReAuthenticate = async (credentials: LoginFormData) => {
    await handleReAuthenticate(credentials)
    setReAuthenticate(false)
  }

  return (
    <Modal
      show={reAuthenticate}
      title="Login to confirm"
      dismissible
      onClose={() => setReAuthenticate(false)}>
      <LoginForm onSubmit={onReAuthenticate} />
    </Modal>
  )
}

export default ReAuthenticate
