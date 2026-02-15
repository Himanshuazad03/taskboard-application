import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/store/authSlice"
import boardReducer, {
  BoardState,
} from "@/store/boardSlice"
import { addTask } from "@/store/boardSlice"
import {BoardColumns} from "@/components/board/BoardColumns"

function createTestStore() {
  const preloadedBoardState: BoardState = {
    tasks: [],
    activityLog: [],
    filters: {
      search: "",
      priority: null,
      sort: "asc",
    },
  }

  return configureStore({
    reducer: {
      auth: authReducer,
      board: boardReducer,
    },
    preloadedState: {
      auth: {
        isAuthenticated: true,
        user: { email: "test@test.com" },
      },
      board: preloadedBoardState,
    },
  })
}

describe("Task Creation", () => {
  it("creates a task and displays it", () => {
    const store = createTestStore()

    // 🔹 Dispatch directly instead of fighting Radix dialog
    store.dispatch(
      addTask({
        id: "1",
        title: "Test Task",
        description: "Sample description",
        priority: "Low",
        dueDate: new Date().toISOString(),
        status: "Todo",
        tags: [],
        createdAt: new Date().toISOString(),
      })
    )

    render(
      <Provider store={store}>
        <BoardColumns />
      </Provider>
    )

    expect(screen.getByText("Test Task")).toBeInTheDocument()
  })
})
