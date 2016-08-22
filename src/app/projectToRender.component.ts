import { Component, OnInit} from '@angular/core';
import {NgSwitch} from '@angular/common/index';

@Component({
  selector: 'projectToRender',
  templateUrl: './projectToRender.component.html',
  styles: [require('../../public/css/Home/projectToRender.css').toString()]
})
export class ProjectToRenderComponent implements OnInit {
  ngOnInit() {
    console.log('init projectToRender')
  }
}
