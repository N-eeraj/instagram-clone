import ProfileHeader from "@components/profile/Header"
import ProfileViewContextProvider from "@contexts/ProfileView"

function Profile() {
  return (
    <ProfileViewContextProvider>
      <ProfileHeader />
    </ProfileViewContextProvider>
  )
}

export default Profile
