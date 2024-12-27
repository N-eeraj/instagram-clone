import ProfileUpdateHeader from "@components/profile/update/Header"
import ProfileUpdateDP from "@components/profile/update/DisplayPicture"
import ProfileUpdateForm from "@components/profile/update/Form"
import ProfileEditContextProvider from "@contexts/Profile/Edit"

function UpdateProfile() {
  return (
    <section className="flex flex-col gap-y-4 max-w-lg md:mx-auto">
      <ProfileEditContextProvider>
        <ProfileUpdateHeader />
        <ProfileUpdateDP />
        <ProfileUpdateForm />
      </ProfileEditContextProvider>
    </section>
  )
}

export default UpdateProfile
