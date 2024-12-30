import ProfileHeader from "@components/profile/Header"
import ProfilePostsGrid from "@components/profile/PostsGrid"
import ProfileViewContextProvider from "@contexts/Profile/View"

function Profile() {
  return (
    <ProfileViewContextProvider>
      <ProfileHeader />
      <ProfilePostsGrid />
    </ProfileViewContextProvider>
  )
}

export default Profile
