export interface IMusique {
  id?: number;
  artiste?: string;
}

export class Musique implements IMusique {
  constructor(public id?: number, public artiste?: string) {}
}
