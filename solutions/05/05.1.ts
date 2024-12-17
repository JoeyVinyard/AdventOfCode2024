import { readFileLines } from "../../shared/io";

const inputLines = readFileLines("inputs/05/05.txt");

const sepIndex = inputLines.findIndex((line) => line === "");

const rules = inputLines.slice(0, sepIndex);
const printOrders = inputLines
    .slice(sepIndex + 1)
    .map((printOrder) => printOrder.split(","));

const ruleMap = new Map<string, Set<string>>();

rules.forEach((rule) => {
    const [X, Y] = rule.split("|");
    if (ruleMap.has(Y)) {
        ruleMap.get(Y)?.add(X);
    } else {
        ruleMap.set(Y, new Set([X]));
    }
});

const total = printOrders
    .map((printOrder) => {
        for (const [i, page] of printOrder.entries()) {
            const leftToPrint = new Set(printOrder.slice(i + 1));
            const rule = ruleMap.get(page)!;

            if (rule && leftToPrint.intersection(rule).size > 0) {
                return 0;
            }
        }
        return Number(printOrder[Math.floor(printOrder.length / 2)]);
    })
    .reduce((a, b) => a + b);

console.log(total);
