import PromptSync from "prompt-sync";
import { readFileLines } from "../../shared/io";
let p = PromptSync({ sigint: true });

const readMap = () => {
    return readFileLines("inputs/06/06.txt").map((line) => line.split(""));
};

const map = readMap();

type coord = { x: number; y: number };
const transforms = {
    up: (c: coord) => ({ x: c.x, y: c.y - 1 }),
    down: (c: coord) => ({ x: c.x, y: c.y + 1 }),
    left: (c: coord) => ({ x: c.x - 1, y: c.y }),
    right: (c: coord) => ({ x: c.x + 1, y: c.y }),
};

let startPosition: coord = { x: 0, y: 0 };
let directions = [transforms.up, transforms.right, transforms.down, transforms.left];

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        const c = map[i][j];
        if (c === "^") {
            startPosition = { x: j, y: i };
            directions = [transforms.up, transforms.right, transforms.down, transforms.left];
        }
    }
}

// const uniquePositions = new Set<string>([`${position.x}-${position.y}-up`]);

const inBounds = (p: coord) => {
    return p.x >= 0 && p.x < map[0].length && p.y >= 0 && p.y < map.length;
};

let path = [];

let position = startPosition;
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
        position = newPosition;
        path.push(newPosition);
        // uniquePositions.add(`${position.x}-${position.y}-${transform.name}`);
    }
}

console.log(path);

let runSimulation = (modifiedMap: string[][]) => {
    let directions = [transforms.up, transforms.right, transforms.down, transforms.left];
    const uniquePositions = new Set<string>([`${startPosition.x}-${startPosition.y}-up`]);
    let position = startPosition;
    while (true) {
        const transform = directions[0];
        const newPosition = transform(position);

        // console.log(`${newPosition.x}-${newPosition.y}-${transform.name}`);
        if (uniquePositions.has(`${newPosition.x}-${newPosition.y}-${transform.name}`)) {
            // console.log("worked");
            return true;
        }

        if (!inBounds(newPosition)) {
            return false;
        }

        const c = modifiedMap[newPosition.y][newPosition.x];
        if (c === "#") {
            //Hit barrier
            directions.push(directions.shift()!);
            uniquePositions.add(`${position.x}-${position.y}-${directions[0].name}`);
        } else {
            position = newPosition;
            path.push(newPosition);
            uniquePositions.add(`${position.x}-${position.y}-${transform.name}`);
        }
    }
};

const unique = new Set<string>();
const blocks = path
    .filter((position) => {
        const isStart = position.x === startPosition.x && position.y === startPosition.y;
        if (isStart) console.log("filtered start");
        return !isStart;
    })
    .filter((position) => {
        if (unique.has(`${position.x}-${position.y}`)) return false;
        unique.add(`${position.x}-${position.y}`);
        return true;
    })
    .map((positionToTryBlocking) => {
        // console.log("trying", positionToTryBlocking);
        let modifiedMap = readMap();
        modifiedMap[positionToTryBlocking.y][positionToTryBlocking.x] = "#";
        // console.log(modifiedMap.map((row) => row.join("")).join("\n"));
        return runSimulation(modifiedMap);
    })
    .filter((blocked) => blocked).length;

console.log(blocks);
