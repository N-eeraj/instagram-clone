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
      // The `a` and `b` arguments in this function have a type of `import('@storybook/types').IndexEntry`. Remember that the function is executed in a JavaScript environment, so use JSDoc for IntelliSense to introspect it.
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
        display: "grid",
        placeContent: "center",
      }}>
        {story()}
      </div>
    ),
  ],
  tags: ["autodocs"],
}

export default preview
