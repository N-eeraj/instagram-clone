import type { Meta, StoryObj } from "@storybook/react"

import Button from "./index"

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  args: {
    children: "Primary Button"
  }
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {},
}

export const Disabled: Story = {
  args: {
    title: "Disabled/Default",
    children: "Disabled Button",
    disabled: true,
  },
}

export const DisabledGray: Story = {
  args: {
    title: "Disabled/Gray",
    children: "Disabled Gray Button",
    grayOnDisable: true,
    disabled: true,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}
