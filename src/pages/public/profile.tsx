import ProfileHeader from "@components/profile/Header"
import ProfileViewContextProvider from "@contexts/Profile/View"

function Profile() {
  return (
    <ProfileViewContextProvider>
      <ProfileHeader />
    </ProfileViewContextProvider>
  )
}

export default Profile
