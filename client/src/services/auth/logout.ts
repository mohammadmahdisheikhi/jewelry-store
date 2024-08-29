import conf from "@/config"
import { serverURLS } from "@/config/urls"
import type { TVerifyLogin } from "@/redux/reducers/loginReducer"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const logoutThunk = createAsyncThunk(
	"login/userLogout",
	async (token: string, { rejectWithValue }) => {
		try {
			const response = await fetch(`${conf.server}${serverURLS.logout}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
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
