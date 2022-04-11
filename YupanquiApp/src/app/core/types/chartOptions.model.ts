import {
  ApexAnnotations, ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend,
  ApexMarkers, ApexPlotOptions, ApexTooltip, ApexXAxis, ApexYAxis
} from "ng-apexcharts";

/** configuraciones apex-chart */
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[];
  dataLabels: ApexDataLabels;
  stroke: any; // ApexStroke;
  markers: ApexMarkers;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  annotations: ApexAnnotations;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
  event: Event;

  //plotOptions: ApexPlotOptions;
};


// type ApexXAxis = {
//   type?: "category" | "datetime" | "numeric";
//   categories?: any;
//   labels?: {
//     style?: {
//       colors?: string | string[];
//       fontSize?: string;
//     };
//   };
// };

export interface Event {

  animationEnd: undefined;
  beforeMount: undefined;
  mounted: undefined;
  updated: undefined;
  mouseMove: undefined;
  mouseLeave: undefined;
  click: undefined;
  legendClick: undefined;
  markerClick: undefined;
  selection: undefined;
  dataPointSelection: undefined;
  dataPointMouseEnter: undefined;
  dataPointMouseLeave: undefined;
  beforeZoom: undefined;
  beforeResetZoom: undefined;
  zoomed: undefined;
}
