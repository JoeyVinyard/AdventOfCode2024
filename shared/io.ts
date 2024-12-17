import { readFileSync } from "fs";

export const readFile = (path: string) => {
    const b = readFileSync(path);
    return b.toString();
};

export const readFileLines = (path: string) => {
    const b = readFileSync(path);
    const str = b.toString();
    return str.split("\n").map((line) => line.trim());
};
