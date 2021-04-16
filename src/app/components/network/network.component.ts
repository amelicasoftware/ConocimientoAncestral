import { Component, OnInit } from '@angular/core';
import { get } from 'scriptjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  public urlProject: string = environment.urlProject;

  constructor() { }

  ngOnInit(): void {
    console.log(`${this.urlProject}assets/js/red.js`);
    get(`${this.urlProject}assets/js/red.js`, () => {
    });

    // cargarRed($);
    document.getElementById('txt-url').textContent = this.urlProject;
  }

  ngAfterContentInit(){
    get(`${this.urlProject}assets/js/red.js`, () => {
    });
  }

}
