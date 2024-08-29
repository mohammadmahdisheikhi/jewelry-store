import conf from "@/config"
import { serverURLS } from "@/config/urls"
import type { TUser } from "@/models/user"

export async function getUser(token: string): Promise<TUser | null> {
	const x = await fetch(`${conf.server}${serverURLS.getUser}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
	if (x.status !== 200) {
		return null
	}
	return await x.json()
}
