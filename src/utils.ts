import readline from "readline";

export async function asyncQuestion(rl: readline.Interface, question?: string) {
	return await new Promise<string>((resolve) => rl.question(question ?? " > ", resolve));
}

export async function getFloatInput(rl: readline.Interface, inputMessage: string, retryMsg: string = inputMessage) {
	let input = parseFloat((await asyncQuestion(rl, inputMessage)).trim());
	if (!isNaN(input) && input > 0) return input;

	while (true) {
		input = parseFloat((await asyncQuestion(rl, retryMsg)).trim());
		if (!isNaN(input) && input > 0) return input;
	}
}

const timeTakenRegex = /^\s*(\d{1,2})[\s:]+(\d{1,2})(?:[\s:]+(\d{1,2}))?/;
function getHoursFromTimeString(timeString: string) {
	const match = timeTakenRegex.exec(timeString);
	if (!match || match.length < 2) return NaN;

	const h = parseInt(match[1]!),
		m = parseInt(match[2]!),
		s = match[3] ? parseInt(match[3]) : 0;

	if (isNaN(h) || isNaN(m) || isNaN(s)) return NaN;

	return h + m / 60 + s / 3600;
}

export async function getTimeTakenInput(rl: readline.Interface, inputMessage: string, retryMsg: string = inputMessage) {
	let input = getHoursFromTimeString((await asyncQuestion(rl, inputMessage)).trim());
	if (!isNaN(input)) return input;

	while (true) {
		input = getHoursFromTimeString((await asyncQuestion(rl, retryMsg)).trim());
		if (!isNaN(input)) return input;
	}
}

export function getTimeString(hours: number, minutes: number, seconds: number) {
	let resStr = "";

	if (hours) resStr = `${hours}h`;
	if (minutes) resStr += ` ${minutes}m`;
	if (seconds) resStr += ` ${seconds}s`;

	if (resStr.length < 1) resStr = "0s";

	return resStr;
}
