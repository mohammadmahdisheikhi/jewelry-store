import { replaceEnglishDigitsWithFarsi } from "@/utils/strUtils"
import { KavenegarApi } from "kavenegar"

type Response = {
	messageid: number
	message: string
	status: number
	statustext: string
	sender: string
	receptor: string
	date: number
	cost: number
}[]

export function sendVerificationCode(
	phone: string,
	code: string,
): Response | null {
	let res = null
	const key = process.env.KAVENEGARKEY
	if (key !== undefined) {
		const api = KavenegarApi({
			apikey: key,
		})
		api.VerifyLookup(
			{
				receptor: phone,
				token: replaceEnglishDigitsWithFarsi(code),
				template: "logincode",
			},

			(response, status) => {
				// console.log(response)
				// console.log(status)
				res = response
			},
		)
	}

	return res
}
