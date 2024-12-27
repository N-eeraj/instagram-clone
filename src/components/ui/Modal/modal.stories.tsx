import type {
  Meta,
  StoryObj,
} from "@storybook/react"

import Modal from "./index"

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  args: {
    title: "Title",
    show: true,
    children: (
      <div className="w-full h-full p-2 bg-zinc-900 text-primary-text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, at!
      </div>
    ),
  },
}

export default meta
type Story = StoryObj<typeof Modal>

export const Primary: Story = {
  args: {},
}
