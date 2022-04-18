import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { EngineService } from './rover-map.service';

@Component({
  selector: 'app-rover-map',
  templateUrl: './rover-map.component.html',
  styleUrls: ['./rover-map.component.css']
})
export class RoverMapComponent implements OnInit {

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  public constructor(private engServ: EngineService) {
  }

  public ngOnInit(): void {
    
    this.engServ.createScene(this.rendererCanvas);
    this.engServ.animate();
  }

}