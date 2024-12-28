import type {
  Meta,
  StoryObj,
} from "@storybook/react"

import Error from "./index"

const meta: Meta<typeof Error> = {
  title: "UI/Error",
  component: Error,
  args: {
    errors: {
      message: "Error Text",
    }
  },
}

export default meta
type Story = StoryObj<typeof Error>

export const Primary: Story = {
  args: {},
}
