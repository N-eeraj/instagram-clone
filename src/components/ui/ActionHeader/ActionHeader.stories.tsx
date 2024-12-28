import type {
  Meta,
  StoryObj,
} from "@storybook/react"
import { fn } from "@storybook/test"

import ActionHeader from "./index"

const meta: Meta<typeof ActionHeader> = {
  title: "UI/ActionHeader",
  component: ActionHeader,
  args: {
    action: {
      onClick: fn(),
    },
    canceled: {
      onClick: fn(),
    },
  },
}

export default meta
type Story = StoryObj<typeof ActionHeader>

export const Primary: Story = {
  args: {},
}

export const Title: Story = {
  args: {
    title: "Action Header Title",
  },
}

export const ButtonTexts: Story = {
  args: {
    action: {
      text: "Action Button",
      onClick: fn(),
    },
    canceled: {
      text: "Canceled Button",
      onClick: fn(),
    },
  },
}

export const Disabled: Story = {
  args: {
    action: {
      disabled: true,
      onClick: fn(),
    },
    canceled: {
      disabled: true,
      onClick: fn(),
    },
  },
}

export const Loading: Story = {
  args: {
    action: {
      loading: true,
      onClick: fn(),
    },
  },
}
