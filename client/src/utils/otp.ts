export function randomNumberGen(): string {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `${randomNumber}`
}

