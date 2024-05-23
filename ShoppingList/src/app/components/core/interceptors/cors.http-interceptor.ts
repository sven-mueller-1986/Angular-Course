import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

// Not needed here, is configured in Backend
export class CorsHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(true)
      return next.handle(req);

    let corsHeaders = req.headers;
    corsHeaders = corsHeaders.append("Access-Control-Allow-Origin", "*");
    corsHeaders = corsHeaders.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    corsHeaders = corsHeaders.append("Access-Control-Allow-Headers", "*");

    const corsRequest = req.clone({
      headers: corsHeaders
    });

    return next.handle(corsRequest);
  }
}
