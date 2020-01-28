export interface IImage {
  id?: number;
}

export class Image implements IImage {
  constructor(public id?: number) {}
}
