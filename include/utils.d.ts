/// <reference types="node" />
import readline from "readline";
export declare function asyncQuestion(rl: readline.Interface, question?: string): Promise<string>;
export declare function getFloatInput(rl: readline.Interface, inputMessage: string, retryMsg?: string): Promise<number>;
export declare function getTimeTakenInput(rl: readline.Interface, inputMessage: string, retryMsg?: string): Promise<number>;
export declare function getTimeString(hours: number, minutes: number, seconds: number): string;
