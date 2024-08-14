import { Client } from "minio"

const endpoint = process.env.MINIO_ENDPOINT
const accessKey = process.env.MINIO_ACCESS_KEY
const secretKey = process.env.MINIO_SECRET_KEY

if (!accessKey || !secretKey || !endpoint) {
	throw new Error("Invalid env variables provided for minio")
}

const minioClient = new Client({
	endPoint: endpoint,
	accessKey: accessKey,
	secretKey: secretKey,
	region: "default",
})

export default minioClient
