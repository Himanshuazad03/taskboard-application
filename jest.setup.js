import "@testing-library/jest-dom"
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

jest.mock("uuid", () => ({
  v4: () => "mocked-uuid",
}))

jest.mock("radix-ui", () => {
  const actual = jest.requireActual("radix-ui")
  return {
    ...actual,
    Dialog: {
      ...actual.Dialog,
      Portal: ({ children }) => children,
    },
  }
})

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver