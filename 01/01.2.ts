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

const totalSimScore = listOne.reduce((total, item) => {
  const listTwoCount = listTwo.filter((v) => v === item).length;
  const simScore = item * listTwoCount;
  return total + simScore;
}, 0);

console.log(totalSimScore);
