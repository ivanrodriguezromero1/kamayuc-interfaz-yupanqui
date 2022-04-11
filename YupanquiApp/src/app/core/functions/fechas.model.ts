import { __decorate } from "tslib";

export class FunctionFechas {

    arrayMes: any = [
        { cod: '01', desc: 'Enero' },
        { cod: '02', desc: 'Febrero' },
        { cod: '03', desc: 'Marzo' },
        { cod: '04', desc: 'Abril' },
        { cod: '05', desc: 'Mayo' },
        { cod: '06', desc: 'Junio' },
        { cod: '07', desc: 'Julio' },
        { cod: '08', desc: 'Agosto' },
        { cod: '09', desc: 'Septiembre' },
        { cod: '10', desc: 'Octubre' },
        { cod: '11', desc: 'Noviembre' },
        { cod: '12', desc: 'Diciembre' }
    ]
    arrayMesAll: any = [
        { cod: '00', desc: 'Todos' },
        { cod: '01', desc: 'Enero' },
        { cod: '02', desc: 'Febrero' },
        { cod: '03', desc: 'Marzo' },
        { cod: '04', desc: 'Abril' },
        { cod: '05', desc: 'Mayo' },
        { cod: '06', desc: 'Junio' },
        { cod: '07', desc: 'Julio' },
        { cod: '08', desc: 'Agosto' },
        { cod: '09', desc: 'Septiembre' },
        { cod: '10', desc: 'Octubre' },
        { cod: '11', desc: 'Noviembre' },
        { cod: '12', desc: 'Diciembre' }
    ]
    arrayAnios(): any {
        let listaAnio: any = [];
        let anioActual = new Date().getFullYear();
        for (let anioInicial = anioActual; anioInicial > 2000; anioInicial--) {
            listaAnio.push(anioInicial);
        }
        return listaAnio;
    }

    meses = [
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre",
        "Noviembre", "Diciembre"
    ]

    strfecha_formateada(_fecha: Date) {
        let info = _fecha.getDay() + ' De ' + this.meses[_fecha.getMonth()] + ', ' + _fecha.getFullYear();
        return info
    }

    fecha_formateada(_fecha: Date) {
        return _fecha.getDay() + '/' + _fecha.getMonth() + '/' + _fecha.getFullYear() + ' ' + _fecha.getHours() + ':' + _fecha.getMinutes();
    }

    strFecha(_fecha: Date) {
        return _fecha.getDay() + '/' + _fecha.getMonth() + '/' + _fecha.getFullYear();
    }

}