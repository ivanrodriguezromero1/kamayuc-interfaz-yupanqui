import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  Menu= [
    {name: 'Inicio',
    link:'/Rover',
  ico:'gps_not_fixed'},
    {name: 'Developers',
    link:'/Rover',
    ico:'developer_mode'}
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  goToPage(Url:string){
    if(this.router.url==Url){
      this.sidenav.close();
    }
    else{
      this.router.navigateByUrl(Url)
    }
  }
}
