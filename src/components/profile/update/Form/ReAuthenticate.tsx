import { use } from "react"
import Modal from "@components/ui/Modal"
import { ProfileEditContext } from "@contexts/Profile/Edit"

function ReAuthenticate() {
  const {
    reAuthenticate,
    setReAuthenticate,
  } = use(ProfileEditContext)

  return (
    <Modal
      show={reAuthenticate}
      title="Login to confirm"
      dismissible
      onClose={() => setReAuthenticate(false)}>
    </Modal>
  )
}

export default ReAuthenticate
