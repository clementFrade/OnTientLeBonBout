export interface IMediaStatique {
  id?: number;
}

export class MediaStatique implements IMediaStatique {
  constructor(public id?: number) {}
}
