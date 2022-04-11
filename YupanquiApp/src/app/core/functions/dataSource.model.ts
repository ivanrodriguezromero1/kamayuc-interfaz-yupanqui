export class DataSourceSelect {


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


    arrayAnios(): any {
        let listaAnio: any = [];
        let anioActual = new Date().getFullYear();
        for (let anioInicial = 1980; anioInicial < anioActual; anioInicial++) {
            listaAnio.push(anioInicial);
        }
        return listaAnio;
    }


}