import { Component, OnInit} from '@angular/core';
import {NgSwitch} from '@angular/common/index';

@Component({
  selector: 'projectToRender',
  templateUrl: './projectToRender.component.html',
  styleUrls: ['../../public/css/Home/projectToRender.css'],
})
export class ProjectToRenderComponent implements OnInit {
  ngOnInit() {
      console.log('init projectToRender')
  }
}
