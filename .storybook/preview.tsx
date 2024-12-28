import React from "react"
import type { Preview } from "@storybook/react"
import "../src/index.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: (a, b) =>
        a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true }),
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'autocomplete-valid',
            selector: '*:not([autocomplete="nope"])',
          },
          {
            id: 'image-alt',
            enabled: false,
          },
        ],
      },
    },
  },
  decorators: [
    (story) => (
      <div style={{
        display: "flex",
        justifyContent: "center",
      }}>
        {story()}
      </div>
    ),
  ],
  tags: ["autodocs"],
}

export default preview
