import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { EngineService } from './rover-map.service';

@Component({
  selector: 'app-rover-map',
  templateUrl: './rover-map.component.html',
  styleUrls: ['./rover-map.component.css']
})
export class RoverMapComponent implements OnInit {
  UVShowing=false;
  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  public constructor(private engServ: EngineService) {
  }

  public ngOnInit(): void {
    
    this.engServ.createScene(this.rendererCanvas);
  }
  OcultarUV() {
    console.log(this.UVShowing)
    this.UVShowing=!this.UVShowing;
    // var x = document.getElementById("UV");
    // if (x.style.display === "none") {
    //   x.style.display = "block";
    // } else {
    //   x.style.display = "none";
    // }
  }
}