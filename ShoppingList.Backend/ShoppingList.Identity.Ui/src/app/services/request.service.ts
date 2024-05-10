import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public get<TResponse>(endpoint: string): Promise<TResponse> {
    return firstValueFrom(this.http.get<TResponse>(this.createUrl(endpoint)));
  }

  public post<TRequest, TResponse>(endpoint: string, payload: TRequest): Promise<TResponse> {
    return firstValueFrom(this.http.post<TResponse>(this.createUrl(endpoint), payload));
  }

  private createUrl(endpoint: string, id?: string) {
    return `${this.baseUrl}/${endpoint}${id ? `/${id}` : ''}`;
  }
}
