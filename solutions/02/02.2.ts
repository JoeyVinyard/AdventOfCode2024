import { readFile } from "../../shared/io";

const input = readFile("inputs/02/02.txt");
const reports: number[][][] = input.split("\n").map((report) => {
    const formattedReport = report
        .trim()
        .split(" ")
        .map((levelString) => Number(levelString));
    return Array.from(Array(formattedReport.length)).map(
        (_, indexTwoRemove) => {
            const reportCopy = formattedReport.slice();
            reportCopy.splice(indexTwoRemove, 1);
            return reportCopy;
        }
    );
});

const deltas = reports.map((dampenedReports) =>
    dampenedReports.map((dampenedReport) => {
        const delta: number[] = [];
        for (let i = 0; i < dampenedReport.length - 1; i++) {
            delta.push(dampenedReport[i] - dampenedReport[i + 1]);
        }
        return delta;
    })
);

const safes = deltas.map((deltaPossibilities) => {
    return deltaPossibilities
        .map((delta) => {
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
        })
        .reduce((pv, cv) => pv || cv, false);
});

console.log(safes.filter((safe) => safe).length);
