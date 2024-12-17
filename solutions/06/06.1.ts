import PromptSync from "prompt-sync";
import { readFileLines } from "../../shared/io";
let p = PromptSync({sigint: true});

const map = readFileLines("inputs/06/06.txt").map((line) => line.split(""));

type coord = { x: number; y: number };
const transforms = {
    up: (c: coord) => ({ x: c.x, y: c.y - 1 }),
    down: (c: coord) => ({ x: c.x, y: c.y + 1 }),
    left: (c: coord) => ({ x: c.x - 1, y: c.y }),
    right: (c: coord) => ({ x: c.x + 1, y: c.y }),
};

let position: coord = { x: 0, y: 0 };
let directions = [
    transforms.up,
    transforms.right,
    transforms.down,
    transforms.left,
];

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        const c = map[i][j];
        if (c === "^") {
            position = { x: j, y: i };
            directions = [
                transforms.up,
                transforms.right,
                transforms.down,
                transforms.left,
            ];
        }
    }
}

const uniquePositions = new Set<string>([`${position.x}-${position.y}`]);

const inBounds = (p: coord) => {
    return p.x >= 0 && p.x < map[0].length && p.y >= 0 && p.y < map.length;
};

while (true) {
    const transform = directions[0];
    const newPosition = transform(position);

    if (!inBounds(newPosition)) {
        break;
    }

    const c = map[newPosition.y][newPosition.x];
    if (c === "#") {
        //Hit barrier
        directions.push(directions.shift()!);
    } else {
        map[position.y][position.x] = "X"
        position = newPosition;
        map[position.y][position.x] = "O"
        uniquePositions.add(`${position.x}-${position.y}`);
        // console.log(map.map((m) => m.join("")).join("\n") + "\n" + uniquePositions.size);
        // p("");
    }
}

console.log(uniquePositions.size);
