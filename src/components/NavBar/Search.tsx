import {
  useEffect,
  useRef,
  useState,
} from "react"

import Input from "@components/ui/Input"
import ProfileList from "@components/profile/List"

import { Icon } from "@iconify/react"
import clsx from "clsx"

function Search() {
  const [showSearchMenu, setShowSearchMenu] = useState(false)
  const searchInput = useRef<HTMLInputElement>(null)
  const [profileList, setProfileList] = useState([])

  const focusInput = () => {
    searchInput.current?.focus()
  }

  const clearProfileList = () => {
    setProfileList([])
  }

  const cancelAction = () => {
    setShowSearchMenu(false)
  }

  useEffect(() => {
    document.addEventListener("click", clearProfileList)
  
    return () => {
      document.removeEventListener("click", clearProfileList)
    }
  }, [])

  return (
    <>
      <button onClick={() => setShowSearchMenu(true)}>
        <Icon
          icon="material-symbols:search"
          className="md:hidden text-4xl md:text-3xl" />
      </button>

      <div
        className={clsx(
          "md:block w-full min-w-60",
          showSearchMenu ? "fixed top-0 left-0 flex flex-col gap-y-3 w-screen h-svh p-4 bg-secondary" : "hidden relative max-w-72",
        )}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-x-3">
          <Input
            type="search"
            placeholder="Search Profile"
            filled
            ref={searchInput}
            prepend={
              <Icon
                icon="material-symbols:search"
                fontSize={20}
                className="cursor-pointer"
                onClick={focusInput} />
            }
            className="flex-1" />
          <button 
            className="md:hidden text-sm"
            onClick={cancelAction}>
            Cancel
          </button>
        </div>

        <ProfileList
          profileList={profileList}
          className="md:absolute md:top-full flex-1 w-full md:max-h-64 md:px-2 bg-secondary md:shadow-md md:shadow-separator-dark overflow-auto" />
      </div>
    </>
  )
}

export default Search
