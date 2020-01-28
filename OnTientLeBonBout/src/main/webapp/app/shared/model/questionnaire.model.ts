import { IClient } from 'app/shared/model/client.model';
import { IInvite } from 'app/shared/model/invite.model';
import { IQuestion } from 'app/shared/model/question.model';

export interface IQuestionnaire {
  id?: number;
  client?: IClient;
  invites?: IInvite[];
  questions?: IQuestion[];
}

export class Questionnaire implements IQuestionnaire {
  constructor(public id?: number, public client?: IClient, public invites?: IInvite[], public questions?: IQuestion[]) {}
}
