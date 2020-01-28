export interface IMediaDynamique {
  id?: number;
  dureeSeconde?: number;
}

export class MediaDynamique implements IMediaDynamique {
  constructor(public id?: number, public dureeSeconde?: number) {}
}
