import { IQuestion } from 'app/shared/model/question.model';
import { IMedia } from 'app/shared/model/media.model';
import { IInvite } from 'app/shared/model/invite.model';

export interface IReponse {
  id?: number;
  intitule?: string;
  valide?: boolean;
  question?: IQuestion;
  media?: IMedia;
  invite?: IInvite;
}

export class Reponse implements IReponse {
  constructor(
    public id?: number,
    public intitule?: string,
    public valide?: boolean,
    public question?: IQuestion,
    public media?: IMedia,
    public invite?: IInvite
  ) {
    this.valide = this.valide || false;
  }
}
