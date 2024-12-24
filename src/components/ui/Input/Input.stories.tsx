import type { Meta, StoryObj } from "@storybook/react"

import Input from "./index"

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
  args: {}
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: "Placeholder Text",
  },
}

export const Filled: Story = {
  args: {
    filled: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const PlaceholderLabel: Story = {
  args: {
    placeholderLabel: true,
    placeholder: "Placeholder/Label Text",
  },
}

export const Errors: Story = {
  args: {
    errors: {
      type: "",
      message: "Error Message",
    },
  },
}

export const ValidationIconSuccess: Story = {
  args: {
    showValidityIcon: true,
  },
}

export const ValidationIconError: Story = {
  args: {
    showValidityIcon: true,
    errors: {
      type: "",
      message: "Error Message",
    },
  },
}

export const PrependText: Story = {
  args: {
    prepend: "ABC",
  },
}

export const PrependElement: Story = {
  args: {
    prepend: (
      <span className="pr-2 text-zinc-500 font-black border-r-2 border-r-zinc-500">
        123
      </span>
    ),
  },
}
