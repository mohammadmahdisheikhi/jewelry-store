// ...
import loginReducer from "@/redux/reducers/loginReducer"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
	reducer: {
		login: loginReducer,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {users: UsersState ...}
export type AppDispatch = typeof store.dispatch
