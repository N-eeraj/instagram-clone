import type {
  Meta,
  StoryObj,
} from "@storybook/react"
import { fn } from "@storybook/test"

import Button from "./index"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  args: {
    children: "Primary Button",
    onClick: fn(),
  },
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
