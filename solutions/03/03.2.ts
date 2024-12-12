import { readFile } from "../../shared/io";

const input = readFile("inputs/03/03.txt");
const mulRegex =
    /(mul\((\d|\d\d|\d\d\d),(\d|\d\d|\d\d\d)\))|(do\(\))|(don't\(\))/g;
const validMuls = input.match(mulRegex)!;

let active = true;
const enabledMuls = validMuls.filter((mul) => {
    if (mul === "do()") {
        active = true;
        return false;
    }
    if (mul === "don't()") {
        active = false;
        return false;
    }
    if (active) {
        return true;
    }
    return false;
});

const total = enabledMuls
    .map((mul) => {
        const [numberOne, numberTwo] = mul
            .substring(4, mul.length - 1)
            .split(",");
        return Number(numberOne) * Number(numberTwo);
    })
    .reduce((a, b) => a + b);

console.log(total);
