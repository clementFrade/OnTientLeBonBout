export interface ITheme {
  id?: number;
  intitule?: string;
}

export class Theme implements ITheme {
  constructor(public id?: number, public intitule?: string) {}
}
