export function replaceFarsiDigitsWithEnglish(phoneNumber: string) {
	// Define a mapping of Farsi digits to English digits
	const farsiToEnglishDigits: any = {
		"۰": "0",
		"۱": "1",
		"۲": "2",
		"۳": "3",
		"۴": "4",
		"۵": "5",
		"۶": "6",
		"۷": "7",
		"۸": "8",
		"۹": "9",
	}

	let englishPhoneNumber = ""

	// Iterate through the characters in the phoneNumber string
	for (let i = 0; i < phoneNumber.length; i++) {
		const character = phoneNumber[i]
		// Check if the character is a Farsi digit and replace it with the English digit
		englishPhoneNumber += farsiToEnglishDigits[character] || character
	}

	return englishPhoneNumber
}

export function replaceEnglishDigitsWithFarsi(phoneNumber: string): string {
	// Define a mapping of English digits to Farsi digits
	const englishToFarsiDigits: { [key: string]: string } = {
		"0": "۰",
		"1": "۱",
		"2": "۲",
		"3": "۳",
		"4": "۴",
		"5": "۵",
		"6": "۶",
		"7": "۷",
		"8": "۸",
		"9": "۹",
	}

	let farsiPhoneNumber = ""

	// Iterate through the characters in the phoneNumber string
	for (let i = 0; i < phoneNumber.length; i++) {
		const character = phoneNumber[i]
		// Check if the character is an English digit and replace it with the Farsi digit
		farsiPhoneNumber += englishToFarsiDigits[character] || character
	}

	return farsiPhoneNumber
}
