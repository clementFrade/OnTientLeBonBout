import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IInvite } from 'app/shared/model/invite.model';

type EntityResponseType = HttpResponse<IInvite>;
type EntityArrayResponseType = HttpResponse<IInvite[]>;

@Injectable({ providedIn: 'root' })
export class InviteService {
  public resourceUrl = SERVER_API_URL + 'api/invites';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/invites';

  constructor(protected http: HttpClient) {}

  create(invite: IInvite): Observable<EntityResponseType> {
    return this.http.post<IInvite>(this.resourceUrl, invite, { observe: 'response' });
  }

  update(invite: IInvite): Observable<EntityResponseType> {
    return this.http.put<IInvite>(this.resourceUrl, invite, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInvite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInvite[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInvite[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
