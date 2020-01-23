export interface IVideo {
  id?: number;
}

export class Video implements IVideo {
  constructor(public id?: number) {}
}
