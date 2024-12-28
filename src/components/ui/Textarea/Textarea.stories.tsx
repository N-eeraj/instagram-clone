import type {
  Meta,
  StoryObj,
} from "@storybook/react"

import Textarea from "./index"

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  args: {
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Primary: Story = {
  args: {},
}

export const Error: Story = {
  args: {
    errors: {
      type: "",
      message: "Invalid Input",
    }
  },
}

export const Filled: Story = {
  args: {
    filled: true,
  },
}
