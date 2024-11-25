import type { Meta, StoryObj } from "@storybook/react"

import Button from "./index"

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  args: {
    children: "Hello World"
  }
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
