import readline from "readline";
import { getFloatInput, getTimeString, getTimeTakenInput, asyncQuestion } from "./utils";

const rl = readline.createInterface(process.stdin, process.stdout);
const enum Choices {
	PROFITABILITY = 0,
	IDEAL_TRIP_TIME = 1,
	QUIT = -1,
}

async function getChoice(): Promise<Choices> {
	console.log("\nMenu principal. Choisissez une option :");
	console.log("\t(r) Calculer la rentabilité d'une mission");
	console.log("\t(t) Calculer le temps pris (sous conditions idéales) pour faire un certain nombre de kilomètres");
	console.log("\t(q) Quitter");

	let x = "";

	while (true) {
		x = (await asyncQuestion(rl, "r/t/q > ")).trim();

		switch (x) {
			case "r":
			case "R":
				return Choices.PROFITABILITY;

			case "t":
			case "T":
				return Choices.IDEAL_TRIP_TIME;

			case "q":
			case "Q":
				return Choices.QUIT;
		}

		console.log(`Option (${x}) inconnue. Veuillez réessayer.`);
	}
}

async function calculateProfitability() {
	const km = await getFloatInput(rl, "Mission de (km) > ", "Le nombre de kilomètres doit être un nombre positif. Mission de (km) > ");
	const timeTaken = await getTimeTakenInput(rl, "La mission a pris : (h:mm[:ss]) ou (h mm[ ss]) > ", "Mauvais format ! La mission a pris : (h:mm[:ss]) ou (h mm[ ss]) > ");

	const efficiency = km / (timeTaken * 19); /* 1900 km/h, multiply by 100 for percentage */

	console.log(`> L'efficacité de la mission saisie est de ${efficiency.toFixed(2)} %.`);
}

async function calculateIdealTripTime() {
	const km = await getFloatInput(rl, "Nombre de km > ", "Le nombre de kilomètres doit être un nombre positif. Nombre de km > ");

	const estimatedJobHours = km / 1900;

	const hours = Math.floor(estimatedJobHours);
	let remainder = (estimatedJobHours - hours) * 60;
	const minutes = Math.floor(remainder);
	remainder = (remainder - minutes) * 60;
	const seconds = Math.floor(remainder);

	const estimatedJobSeconds = estimatedJobHours * 3600;
	const dateJobEnd = new Date();
	dateJobEnd.setSeconds(dateJobEnd.getSeconds() + estimatedJobSeconds);

	console.log(
		`> Sous conditions idéales, ce trajet prendra ${getTimeString(hours, minutes, seconds)} et se terminera le ${dateJobEnd.toLocaleDateString("fr-fr", { dateStyle: "long" })} à ${dateJobEnd.toLocaleTimeString("fr-fr", { timeStyle: "medium" })}.`
	);
}

async function main() {
	console.log("#### CALCULATEUR MISSION ETS2 ####");

	let choice: Choices;
	while (true) {
		choice = await getChoice();
		console.log("");

		switch (choice) {
			case Choices.QUIT:
				rl.close();
				return 0;

			case Choices.PROFITABILITY:
				await calculateProfitability();
				break;

			case Choices.IDEAL_TRIP_TIME:
				await calculateIdealTripTime();
				break;

			default:
				rl.close();
				return -1;
		}
	}
}

main();
