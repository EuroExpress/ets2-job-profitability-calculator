"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const utils_1 = require("./utils");
const rl = readline_1.default.createInterface(process.stdin, process.stdout);
async function getChoice() {
    console.log("\nMenu principal. Choisissez une option :");
    console.log("\t(r) Calculer la rentabilité d'une mission");
    console.log("\t(t) Calculer le temps pris (sous conditions idéales) pour faire un certain nombre de kilomètres");
    console.log("\t(q) Quitter");
    let x = "";
    while (true) {
        x = (await (0, utils_1.asyncQuestion)(rl, "r/t/q > ")).trim();
        switch (x) {
            case "r":
            case "R":
                return 0;
            case "t":
            case "T":
                return 1;
            case "q":
            case "Q":
                return -1;
        }
        console.log(`Option (${x}) inconnue. Veuillez réessayer.`);
    }
}
async function calculateProfitability() {
    const km = await (0, utils_1.getFloatInput)(rl, "Mission de (km) > ", "Le nombre de kilomètres doit être un nombre positif. Mission de (km) > ");
    const timeTaken = await (0, utils_1.getTimeTakenInput)(rl, "La mission a pris : (h:mm[:ss]) ou (h mm[ ss]) > ", "Mauvais format ! La mission a pris : (h:mm[:ss]) ou (h mm[ ss]) > ");
    const efficiency = km / (timeTaken * 19);
    console.log(`> L'efficacité de la mission saisie est de ${efficiency.toFixed(2)} %.`);
}
async function calculateIdealTripTime() {
    const km = await (0, utils_1.getFloatInput)(rl, "Nombre de km > ", "Le nombre de kilomètres doit être un nombre positif. Nombre de km > ");
    const estimatedJobHours = km / 1900;
    const hours = Math.floor(estimatedJobHours);
    let remainder = (estimatedJobHours - hours) * 60;
    const minutes = Math.floor(remainder);
    remainder = (remainder - minutes) * 60;
    const seconds = Math.floor(remainder);
    const estimatedJobSeconds = estimatedJobHours * 3600;
    const dateJobEnd = new Date();
    dateJobEnd.setSeconds(dateJobEnd.getSeconds() + estimatedJobSeconds);
    console.log(`> Sous conditions idéales, ce trajet prendra ${(0, utils_1.getTimeString)(hours, minutes, seconds)} et se terminera le ${dateJobEnd.toLocaleDateString("fr-fr", { dateStyle: "long" })} à ${dateJobEnd.toLocaleTimeString("fr-fr", { timeStyle: "medium" })}.`);
}
async function main() {
    console.log("#### CALCULATEUR MISSION ETS2 ####");
    let choice;
    while (true) {
        choice = await getChoice();
        console.log("");
        switch (choice) {
            case -1:
                rl.close();
                return 0;
            case 0:
                await calculateProfitability();
                break;
            case 1:
                await calculateIdealTripTime();
                break;
            default:
                rl.close();
                return -1;
        }
    }
}
main();
