import { ApexAnnotations, ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexMarkers, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from "ng-apexcharts";

  export type ChartOptionsMedicion = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  annotations: ApexAnnotations;
  colors: any;
  toolbar: any;
  grid: any
}

