import { readFile } from "../../shared/io";

const input = readFile("inputs/04/04.txt");

const matrix = input.split("\n").map((row) => row.trim().split(""));
const letters = ["M", "A", "S"];
// console.log(matrix);

const checkN = (x: number, y: number) => {
    let fail = false;
    letters.forEach((letter, i) => {
        if (matrix[y - (i + 1)][x] !== letter) fail = true;
    });
    return fail ? 0 : 1;
};

const checkNE = (x: number, y: number) => {
    let fail = false;
    letters.forEach((letter, i) => {
        if (matrix[y - (i + 1)][x + (i + 1)] !== letter) fail = true;
    });
    return fail ? 0 : 1;
};
const checkE = (x: number, y: number) => {
    let fail = false;
    letters.forEach((letter, i) => {
        if (matrix[y][x + (i + 1)] !== letter) fail = true;
    });
    return fail ? 0 : 1;
};
const checkSE = (x: number, y: number) => {
    let fail = false;
    letters.forEach((letter, i) => {
        if (matrix[y + (i + 1)][x + (i + 1)] !== letter) fail = true;
    });
    return fail ? 0 : 1;
};
const checkS = (x: number, y: number) => {
    let fail = false;
    letters.forEach((letter, i) => {
        if (matrix[y + (i + 1)][x] !== letter) fail = true;
    });
    return fail ? 0 : 1;
};
const checkSW = (x: number, y: number) => {
    let fail = false;
    letters.forEach((letter, i) => {
        if (matrix[y + (i + 1)][x - (i + 1)] !== letter) fail = true;
    });
    return fail ? 0 : 1;
};
const checkW = (x: number, y: number) => {
    let fail = false;
    letters.forEach((letter, i) => {
        if (matrix[y][x - (i + 1)] !== letter) fail = true;
    });
    return fail ? 0 : 1;
};
const checkNW = (x: number, y: number) => {
    let fail = false;
    letters.forEach((letter, i) => {
        if (matrix[y - (i + 1)][x - (i + 1)] !== letter) fail = true;
    });
    return fail ? 0 : 1;
};

const check = (x: number, y: number) => {
    let checks: number[] = [];
    const upRoom = y > 2;
    const downRoom = y < matrix.length - 3;
    const leftRoom = x > 2;
    const rightRoom = x < matrix[0].length - 3;

    if (upRoom) checks.push(checkN(x, y));
    if (upRoom && leftRoom) checks.push(checkNW(x, y));
    if (upRoom && rightRoom) checks.push(checkNE(x, y));
    if (downRoom) checks.push(checkS(x, y));
    if (downRoom && leftRoom) checks.push(checkSW(x, y));
    if (downRoom && rightRoom) checks.push(checkSE(x, y));
    if (leftRoom) checks.push(checkW(x, y));
    if (rightRoom) checks.push(checkE(x, y));

    return checks.reduce((a, b) => a + b, 0);
};

let found = 0;
matrix.forEach((row, y) => {
    row.forEach((column, x) => {
        if (column === "X") {
            found += check(x, y);
        }
    });
});

console.log(found);
