import { readFile } from "../../shared/io";

const input = readFile("inputs/03/03.txt");
const mulRegex = /mul\((\d|\d\d|\d\d\d),(\d|\d\d|\d\d\d)\)/g;
const validMuls = input.match(mulRegex)!;
const total = validMuls
    .map((mul) => {
        const [numberOne, numberTwo] = mul
            .substring(4, mul.length - 1)
            .split(",");
        return Number(numberOne) * Number(numberTwo);
    })
    .reduce((a, b) => a + b);

console.log(total);
