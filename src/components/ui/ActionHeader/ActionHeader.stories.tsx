import type {
  Meta,
  StoryObj,
} from "@storybook/react"
import { fn } from "@storybook/test"

import ActionHeader from "./index"
import { Icon } from "@iconify/react"

const meta: Meta<typeof ActionHeader> = {
  title: "ActionHeader",
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

export const IconText: Story = {
  args: {
    action: {
      text: (
        <Icon
          icon="material-symbols:check"
          fontSize={24} />
      ),
      onClick: fn(),
    },
    canceled: {
      text: (
        <Icon
          icon="material-symbols:arrow-left-alt-rounded"
          fontSize={24}
          className="text-white" />
      ),
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
