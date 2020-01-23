import { IMedia } from 'app/shared/model/media.model';
import { IInvite } from 'app/shared/model/invite.model';
import { IQuestion } from 'app/shared/model/question.model';

export interface IReponse {
  id?: number;
  intitule?: string;
  valide?: boolean;
  media?: IMedia;
  invite?: IInvite;
  question?: IQuestion;
}

export class Reponse implements IReponse {
  constructor(
    public id?: number,
    public intitule?: string,
    public valide?: boolean,
    public media?: IMedia,
    public invite?: IInvite,
    public question?: IQuestion
  ) {
    this.valide = this.valide || false;
  }
}
