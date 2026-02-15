import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/store/authSlice"
import boardReducer, {
  BoardState,
  addTask,
  deleteTask,
} from "@/store/boardSlice"
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

describe("Task Deletion", () => {
  it("removes a task from the board", () => {
    const store = createTestStore()

    // 🔹 Add task first
    store.dispatch(
      addTask({
        id: "1",
        title: "Delete Me",
        description: "To be deleted",
        priority: "Low",
        dueDate: new Date().toISOString(),
        status: "Todo",
        tags: [],
        createdAt: new Date().toISOString(),
      })
    )

    // 🔹 Then delete it
    store.dispatch(deleteTask("1"))

    render(
      <Provider store={store}>
        <BoardColumns />
      </Provider>
    )

    expect(screen.queryByText("Delete Me")).not.toBeInTheDocument()
  })
})
