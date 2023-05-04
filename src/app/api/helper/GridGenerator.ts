import {Spot} from "../dataclasses/Spot";
import grid6List from "../../../assets/gridtemplates/grid6.json";
import grid5List from "../../../assets/gridtemplates/grid5.json";
import gridRemaining from "../../../assets/gridtemplates/gridRemaining.json";
import {getSpotImage} from "../api.service";

export class GridGenerator {

    spots: Spot[] = [];

    grid: GridSpot[] = [];

    constructor(spots: Spot[]) {
        this.spots = spots;
        while (spots.length > 0) {
            if (spots.length > 6) {
                let randomNum = this.getRandomNumber(5, 6);
                this.generateGrid(randomNum);
            } else {
                if (spots.length == 6) {
                    this.generateGrid(6);
                } else if (spots.length == 5) {
                    this.generateGrid(5);
                } else {
                    this.generateGrid(spots.length)
                }
            }
        }
    }

    private generateGrid(blocks: number) {
        switch (blocks) {
            case 6: {
                this.pushToGrid(6, grid6List);
                break;
            }
            case 5: {
                this.pushToGrid(5, grid5List);
                break;
            }
            default: {
                this.pushRemainingToGrid(blocks)
            }
        }
    }

    private getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private pushToGrid(num: number, list: any) {
        for (let i = 0; i < num; i++) {
            let currentSpot = this.spots[i];
            if (currentSpot != undefined) {
                let randomGridTemplate = list[this.getRandomNumber(0, list.length - 1)]
                let gridSpot: GridSpot = {
                    spot: currentSpot,
                    imageUrl: getSpotImage(currentSpot.pictures[0]),
                    row: randomGridTemplate[i].row,
                    col: randomGridTemplate[i].col,
                };
                this.grid.push(gridSpot);
            }
        }
        this.spots.splice(0, num);
    }

    private pushRemainingToGrid(num: number) {
        for (let i = 0; i < num; i++) {
            let currentSpot = this.spots[i];
            if (currentSpot != undefined) {
                let randomGridTemplate = gridRemaining[num - 1]
                let gridSpot: GridSpot = {
                    spot: currentSpot,
                    imageUrl: getSpotImage(currentSpot.pictures[0]),
                    row: randomGridTemplate[i].row,
                    col: randomGridTemplate[i].col,
                };
                this.grid.push(gridSpot);
            }
        }
        this.spots.splice(0, num);
    }

    getGrid(): GridSpot[] {
        return this.grid;
    }
}

export interface GridSpot {
    spot: Spot,
    imageUrl: string,
    row: number,
    col: number
}
