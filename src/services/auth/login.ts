import type { TVerifyLogin } from "@/redux/reducers/loginReducer"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const loginThunk = createAsyncThunk(
	"login/userLogin",
	async (phoneNumber: string, { rejectWithValue }) => {
		try {
			const response = await fetch('/api/login', {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ phoneNumber }),
			})
			return {
				response: await response.json(),
				code: response.status,
			}
		} catch (error) {
			return rejectWithValue(500)
		}
	},
)

export const verifyThunk = createAsyncThunk(
	"login/verifyLogin",
	async (data: TVerifyLogin, { rejectWithValue }) => {
		try {
			const response = await fetch('api/verify', {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
			return {
				response: await response.json(),
				code: response.status,
			}
		} catch (error) {
			return rejectWithValue(500)
		}
	},
)
