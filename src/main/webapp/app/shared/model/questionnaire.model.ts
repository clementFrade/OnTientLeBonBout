import { IInvite } from 'app/shared/model/invite.model';
import { IQuestion } from 'app/shared/model/question.model';
import { IClient } from 'app/shared/model/client.model';

export interface IQuestionnaire {
  id?: number;
  invites?: IInvite[];
  questions?: IQuestion[];
  client?: IClient;
}

export class Questionnaire implements IQuestionnaire {
  constructor(public id?: number, public invites?: IInvite[], public questions?: IQuestion[], public client?: IClient) {}
}
