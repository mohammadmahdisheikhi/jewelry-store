import type { TUser } from "@/models/user"
import type { RootState } from "@/redux/store"
import { loginThunk, verifyThunk } from "@/services/auth/login"
import { logoutThunk } from "@/services/auth/logout"
import { createSlice } from "@reduxjs/toolkit"
import { deleteCookie, setCookie } from "cookies-next"

type LoginState = {
	phoneNumber: string
	errorMessage?: string
	loading: boolean
	codeSent: boolean
	loggedIn: boolean
	error: boolean
	token: string
	user?: TUser | undefined
}

export type TVerifyLogin = {
	phoneNumber: string
	code: string
}

// Define the initial state using that type
const initialState: LoginState = {
	phoneNumber: "",
	errorMessage: "",
	loading: false,
	codeSent: false,
	loggedIn: false,
	error: false,
	token: "",
}

// create the login slice
const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		initialLogin: (state, action) => {
			state.loading = false
			state.token = action.payload.token
			state.user = action.payload.user
			state.codeSent = true
			state.loggedIn = true
		},
	},
	extraReducers: (builder) => {
		// login

		builder.addCase(loginThunk.pending, (state, action) => {
			state.loading = true
			state.error = false
		})

		builder.addCase(loginThunk.fulfilled, (state, action) => {
			state.errorMessage = action.payload.response.message
			state.loading = false
			state.error = false
			if (action.payload.code === 200) {
				state.codeSent = true
			}
			if (action.payload.code !== 200) {
				state.error = true
			}
		})

		builder.addCase(loginThunk.rejected, (state, action) => {
			state.loading = false
			state.error = true
			state.errorMessage = "errMSG.serverError"
		})

		// verify

		builder.addCase(verifyThunk.pending, (state, action) => {
			state.loading = true
			state.error = false
		})

		builder.addCase(verifyThunk.fulfilled, (state, action) => {
			state.errorMessage = action.payload.response.message
			state.loading = false
			state.error = false
			if (action.payload.code === 200) {
				state.token = action.payload.response.token
				state.user = action.payload.response.user
				state.loggedIn = true
				setCookie("token", action.payload.response.token)
				deleteCookie("phoneNumber")
			}
			if (action.payload.code !== 200) {
				state.error = true
			}
		})

		builder.addCase(verifyThunk.rejected, (state, action) => {
			state.loading = false
			state.phoneNumber = ""
			state.codeSent = false
			state.loggedIn = false
			state.errorMessage = "errMSG.serverError"
			state.error = true
		})

		// logout

		builder.addCase(logoutThunk.pending, (state, action) => {
			state.loading = true
		})

		builder.addCase(logoutThunk.fulfilled, (state, action) => {
			state.phoneNumber = ""
			state.errorMessage = undefined
			state.loading = false
			state.codeSent = false
			state.loggedIn = false
			state.error = false
			state.token = ""
			state.user = undefined
		})

		builder.addCase(logoutThunk.rejected, (state, action) => {
			state.phoneNumber = ""
			state.errorMessage = undefined
			state.loading = false
			state.codeSent = false
			state.loggedIn = false
			state.error = false
			state.token = ""
			state.user = undefined
		})
	},
})

export const { initialLogin } = loginSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectUserLoginState = (state: RootState): LoginState =>
	state.login
export default loginSlice.reducer
