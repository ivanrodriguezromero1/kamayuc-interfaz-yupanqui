import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrCoreService {

  constructor(private toastr: ToastrService) { }

  // Notificaciones de Correcta - color verde
  success() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  // Notificaciones de informativo - color azul
  info(msj: string, titulo: string) {
    this.toastr.info(msj, titulo);
  }

  // Notificaciones de Aviso  - color amarillo
  warning(msj: string, titulo: string) {
    this.toastr.warning(msj, titulo);
  }

  // Notificaciones de Error - color rojo
  error(msj: string, titulo: string) {
    this.toastr.error(msj, titulo);
  }

  //Quitar todas o una sola notificación del sistema mediante id opcional
  clear(toastId?: number) {
    this.toastr.clear(toastId);
  }

  //Quitar y destruir una sola notificación del sistema por id
  remove(toastId: number) {
    this.toastr.remove(toastId);
  }

}
