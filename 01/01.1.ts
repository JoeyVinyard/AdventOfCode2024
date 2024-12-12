import { readFile } from "../shared/io";

const input = readFile("inputs/01/01.1.txt");

const listOne: number[] = [];
const listTwo: number[] = [];

input
  .split("\n")
  .filter((line) => !!line)
  .map((line) => line.trim())
  .forEach((line) => {
    const [itemOne, itemTwo] = line.replace(/\s+/, "-").split("-");
    listOne.push(Number(itemOne));
    listTwo.push(Number(itemTwo));
  });

listOne.sort();
listTwo.sort();

const distances = listOne.map((itemOne, i) => {
  const itemTwo = listTwo[i];
  return Math.abs(itemOne - itemTwo);
});

console.log(distances.reduce((a, b) => a + b, 0));
