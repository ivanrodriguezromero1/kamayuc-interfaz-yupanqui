import { Injectable} from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad, Router, Route } from '@angular/router'

import { AuthService } from './auth.service'

import * as moment from 'moment';
import { AppCurrentFlowStore } from 'src/app/core';
//import { AppCurrentFlowStore } from 'app/core/store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad
{
    constructor(private authService: AuthService, private router: Router, private storeCurrent:AppCurrentFlowStore) { }

    canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean
    {
        return this.checkLoggedIn(state.url);
    }

    canLoad(route:Route):boolean
    {
        return this.checkLoggedIn(route.path);
    }

    checkLoggedIn(url: string): boolean {
        //console.log(url);
        // No pedir Login
        // if(url=="/ventas/reportes/ventasAdm") return true;

        // if (this.authService.isLoggedIn()){
        //     return true;
        // }

        //let user = JSON.parse(localStorage.getItem('currentUser'));
        const current = this.storeCurrent.currentFlowAction.get();
        const user = current;
        //console.log(user);
        if(user){

            // let now = moment({});
            // let today = moment(now.format('YYYY-MM-DDTHH:mm:ss'));

            // let exp = moment(user.expiration);
            // //let today = new Date();
            // let expiration = moment(exp.format('YYYY-MM-DDTHH:mm:ss'));


            let today = moment();
            let expiration = moment(user.usuario.expiracion);

            // console.log(today);
            // console.log(expiration);
            // expiration.valueOf()
            // console.log(today.isAfter(expiration));
            // console.log(today.diff(expiration));
            if(today.isAfter(expiration)){
                console.log("NO PUEDE ENTRAR");
                localStorage.clear();
                // redireccionar al login
                //this.router.navigateByUrl('/');
                //if(url=="/module-access") { location.reload(); return false}
                this.router.navigateByUrl('/login');
                return false;
            }
            else{
                console.log("PERMITIDO");
                return true;
            }
        }

        this.authService.redirectUrl = null;
        localStorage.clear();
        this.router.navigate(['/login']);
        return false;
    }

}
