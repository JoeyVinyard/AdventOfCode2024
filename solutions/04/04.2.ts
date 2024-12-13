import { readFile } from "../../shared/io";

const input = readFile("inputs/04/04.txt");

const matrix = input.split("\n").map((row) => row.trim().split(""));

const check = (x: number, y: number) => {
    const upRoom = y > 0;
    const downRoom = y < matrix.length - 1;
    const leftRoom = x > 0;
    const rightRoom = x < matrix[0].length - 1;

    if (upRoom && downRoom && leftRoom && rightRoom && matrix[y][x] === "A") {
        let [masOneOne, masOneTwo] = [
            matrix[y - 1][x - 1],
            matrix[y + 1][x + 1],
        ].sort();
        let [masTwoOne, masTwoTwo] = [
            matrix[y - 1][x + 1],
            matrix[y + 1][x - 1],
        ].sort();

        if (
            masOneOne === "M" &&
            masTwoOne === "M" &&
            masOneTwo === "S" &&
            masTwoTwo === "S"
        ) {
            return 1;
        }
    }
    return 0;
};

let found = 0;
matrix.forEach((row, y) => {
    row.forEach((column, x) => {
        found += check(x, y);
    });
});

console.log(found);
