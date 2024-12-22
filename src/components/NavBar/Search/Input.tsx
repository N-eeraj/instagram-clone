import {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  type ChangeEvent,
  type RefObject,
} from "react"
import { useLocation } from "react-router"
import Input from "@components/ui/Input"
import { Icon } from "@iconify/react"
import { useDebounce } from "use-debounce"

export type SearchInputRef = Record<"clear" | "focus", Function> | null

interface SearchInputProps {
  ref: RefObject<SearchInputRef>
  onChange: (_arg: string) => void
}

function SearchInput({ ref, onChange }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const location = useLocation()
  const [debouncedInput] = useDebounce(searchValue, 800)

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  useEffect(() => {
    onChange(debouncedInput)
  }, [debouncedInput])

  useEffect(() => {
    setSearchValue("")
  }, [location])

  // to handle focus & clear of the input field outside the component using ref
  useImperativeHandle(ref, () => ({
    focus: focusInput,
    clear: () => setSearchValue("")
  }))

  return (
    <Input
      type="search"
      placeholder="Search Profile"
      filled
      value={searchValue}
      ref={inputRef}
      prepend={
        <Icon
          icon="material-symbols:search"
          fontSize={20}
          className="cursor-pointer"
          onClick={focusInput} />
      }
      className="flex-1"
      onChange={handleInputChange} />
  )
}

export default SearchInput
