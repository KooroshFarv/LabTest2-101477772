export interface Wand {
  wood: string;
  core: string;
  length: number;
}

export interface Character {
  id: string;
  name: string;
  house: string;
  image: string;
  actor: string;
  species: string;
  gender: string;
  wizard: boolean;
  alive: boolean;
  ancestry: string;
  wand: Wand;
}
