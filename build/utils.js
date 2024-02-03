"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeString = exports.getTimeTakenInput = exports.getFloatInput = exports.asyncQuestion = void 0;
async function asyncQuestion(rl, question) {
    return await new Promise((resolve) => rl.question(question ?? " > ", resolve));
}
exports.asyncQuestion = asyncQuestion;
async function getFloatInput(rl, inputMessage, retryMsg = inputMessage) {
    let input = parseFloat((await asyncQuestion(rl, inputMessage)).trim());
    if (!isNaN(input) && input > 0)
        return input;
    while (true) {
        input = parseFloat((await asyncQuestion(rl, retryMsg)).trim());
        if (!isNaN(input) && input > 0)
            return input;
    }
}
exports.getFloatInput = getFloatInput;
const timeTakenRegex = /^\s*(\d{1,2})[\s:]+(\d{1,2})(?:[\s:]+(\d{1,2}))?/;
function getHoursFromTimeString(timeString) {
    const match = timeTakenRegex.exec(timeString);
    if (!match || match.length < 2)
        return NaN;
    const h = parseInt(match[1]), m = parseInt(match[2]), s = match[3] ? parseInt(match[3]) : 0;
    if (isNaN(h) || isNaN(m) || isNaN(s))
        return NaN;
    return h + m / 60 + s / 3600;
}
async function getTimeTakenInput(rl, inputMessage, retryMsg = inputMessage) {
    let input = getHoursFromTimeString((await asyncQuestion(rl, inputMessage)).trim());
    if (!isNaN(input))
        return input;
    while (true) {
        input = getHoursFromTimeString((await asyncQuestion(rl, retryMsg)).trim());
        if (!isNaN(input))
            return input;
    }
}
exports.getTimeTakenInput = getTimeTakenInput;
function getTimeString(hours, minutes, seconds) {
    let resStr = "";
    if (hours)
        resStr = `${hours}h`;
    if (minutes)
        resStr += ` ${minutes}m`;
    if (seconds)
        resStr += ` ${seconds}s`;
    if (resStr.length < 1)
        resStr = "0s";
    return resStr;
}
exports.getTimeString = getTimeString;
