import { readFile } from "../../shared/io";

const input = readFile("inputs/02/02.txt");
const reports: number[][] = input.split("\n").map((report) =>
    report
        .trim()
        .split(" ")
        .map((levelString) => Number(levelString))
);

const deltas = reports.map((report) => {
    const delta: number[] = [];
    for (let i = 0; i < report.length - 1; i++) {
        delta.push(report[i] - report[i + 1]);
    }
    return delta;
});

// console.log(deltas);

const safes = deltas.map((delta) => {
    const zeroDelta = delta.findIndex((i) => i === 0);
    if (zeroDelta !== -1) return false;

    const unsafeDelta = delta.find((i) => Math.abs(i) > 3);
    if (unsafeDelta) return false;

    const decreasingStart = delta[0] > 0;
    if (decreasingStart) {
        return !delta.find((i) => i < 0);
    } else {
        return !delta.find((i) => i > 0);
    }
});

// console.log(safes);

console.log(safes.filter((safe) => safe).length);
