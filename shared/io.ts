import { readFileSync } from "fs";

export const readFile = (path: string) => {
    const b = readFileSync(path);
    return b.toString();
}