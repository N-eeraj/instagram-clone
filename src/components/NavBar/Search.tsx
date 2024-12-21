import { useState } from "react"
import Input from "@components/ui/Input"
import { Icon } from "@iconify/react"
import clsx from "clsx"

function Search() {
  const [showSearchMenu, setShowSearchMenu] = useState(false)

  return (
    <>
      <button onClick={() => setShowSearchMenu(true)}>
        <Icon
          icon="material-symbols:search"
          className="md:hidden text-4xl md:text-3xl" />
      </button>

      <div className={clsx(
        "md:block w-full min-w-60",
        showSearchMenu ? "fixed top-0 left-0 w-screen h-svh p-4 bg-secondary" : "hidden max-w-72",
      )}>
        <div className="flex items-center gap-x-3">
          <Input
            placeholder="Search Profile"
            className="flex-1" />
          <button 
            className="text-sm"
            onClick={() => setShowSearchMenu(false)}>
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}

export default Search
