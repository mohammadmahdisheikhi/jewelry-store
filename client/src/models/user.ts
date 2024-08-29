import * as Yup from "yup"
import { object, string } from "zod"

export type TUser = {
	_id: string
	FirstName: string
	LastName: string
	PhoneNumber: string
	IDCode: string
	IDScan: string
	IsAdmin: boolean
	CreatedAt: Date
	UpdatedAt: Date
}

export type TOTP = {
	UserID: string
	ConfirmCode: string
	Timestamp: string
}

export type TUserLogin = {
	PhoneNumber: string
	Code: string
}

export type TUserRegister = {
	FirstName: string
	LastName: string
	PhoneNumber: string
	IDCode: string 
	IDScan: string
}

export const loginSchemaZod = object({
	PhoneNumber: string({ required_error: "Phone number is required" }).regex(
		/^(\+98|09)\d{9}$/,
		"Invalid phone number.",
	),
	Code: string({ required_error: "Code is required" }).length(
		6,
		"Code must be exactly 6 digits",
	),
})

export const loginSchemaYup = Yup.object({
	PhoneNumber: Yup.string()
		.required("شماره موبایل الزامی است.")
		.matches(/^(\+98|09)\d{9}$/, "شماره موبایل معتبر نیست."),
})

export const loginCodeSchemaYup = Yup.object({
	PhoneNumber: Yup.string()
		.required("شماره موبایل الزامی است.")
		.matches(/^(\+98|09)\d{9}$/, "شماره موبایل معتبر نیست."),
	Code: Yup.string()
		.required("کد ورود الزامی است.")
		.matches(/^\d{6}$/, "کد ورود نامعتبر است."),
})
