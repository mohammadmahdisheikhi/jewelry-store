import type { Readable } from "node:stream"
import minioClient from "./client"

export async function uploadFile(
	bucketName: string,
	fileName: string,
	fileBuffer: Buffer,
) {
	const x = await minioClient.listBuckets()
	await minioClient.putObject(bucketName, fileName, fileBuffer)
}

export async function getFile(
	bucketName: string,
	fileName: string,
): Promise<Buffer> {
	const dataStream: Readable = await minioClient.getObject(bucketName, fileName)
	const chunks: Uint8Array[] = []
	for await (const chunk of dataStream) {
		chunks.push(chunk)
	}
	return Buffer.concat(chunks)
}
