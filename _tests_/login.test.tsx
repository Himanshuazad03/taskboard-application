import { render, screen, fireEvent } from "@testing-library/react"
import LoginPage from "@/app/login/page"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/store/authSlice"
import boardReducer, { initialState as boardInitialState } from "@/store/boardSlice"

// 🔹 Create fresh store for each test
const createTestStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      board: boardReducer,
    },
    preloadedState: {
      auth: {
        isAuthenticated: false,
        user: null,
      },
      board: boardInitialState,
    },
  })

describe("Login Page", () => {
  it("shows error when credentials are invalid", () => {
    const store = createTestStore()

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    )

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "wrong@email.com" },
    })

    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "wrongpass" },
    })

    fireEvent.click(screen.getByTestId("submit-button"))

    expect(screen.getByTestId("error-message")).toBeInTheDocument()
  })
})
