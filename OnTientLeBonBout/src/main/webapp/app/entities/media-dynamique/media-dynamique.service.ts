import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMediaDynamique } from 'app/shared/model/media-dynamique.model';

type EntityResponseType = HttpResponse<IMediaDynamique>;
type EntityArrayResponseType = HttpResponse<IMediaDynamique[]>;

@Injectable({ providedIn: 'root' })
export class MediaDynamiqueService {
  public resourceUrl = SERVER_API_URL + 'api/media-dynamiques';

  constructor(protected http: HttpClient) {}

  create(mediaDynamique: IMediaDynamique): Observable<EntityResponseType> {
    return this.http.post<IMediaDynamique>(this.resourceUrl, mediaDynamique, { observe: 'response' });
  }

  update(mediaDynamique: IMediaDynamique): Observable<EntityResponseType> {
    return this.http.put<IMediaDynamique>(this.resourceUrl, mediaDynamique, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMediaDynamique>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMediaDynamique[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
