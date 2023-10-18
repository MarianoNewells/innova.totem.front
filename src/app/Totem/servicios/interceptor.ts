import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { SpinnerService } from "./sppiner.service";


@Injectable()

export class SpinnerInterceptor implements HttpInterceptor{
   count = 0;
    constructor(private spinnerSrv: SpinnerService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //console.log("Interceptor del spinnerSrv");
        this.count++;
        this.spinnerSrv.mostrarSpinner();
        return next.handle(req).pipe(
            finalize(() => {
              this.count--;
              if (this.count === 0) {
                this.spinnerSrv.ocultarSpinner()
              }
            })
        );
    }

 

}

 