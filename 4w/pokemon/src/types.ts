export interface Pokemon {
    name: string;
    height: string;
    weight: string;
    types: string[];
    ['base-Experience']: string;
    abilities: string[];
    hp: string;
    attack: string;
    defense: string;
    ['special-attack']: string;
    ['special-defense']: string;
    speed: string;
}