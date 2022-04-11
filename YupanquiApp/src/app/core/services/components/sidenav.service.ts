
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidenavService {
    scrollY = new Subject<number>();
}