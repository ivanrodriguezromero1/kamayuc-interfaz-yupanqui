import { ApexChart, ApexNonAxisChartSeries, ApexPlotOptions } from "ng-apexcharts";

export type chartOptionsRadial = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    plotOptions: ApexPlotOptions;
  };