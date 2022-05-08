import { Component, OnInit, ViewChild } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public widthSlider: number;
  public anchuraToSlider: any;
  public captions: boolean;
  public autor: any;
  @ViewChild('textos') opcion2;

  constructor()
  {
    this.captions = false;
  }

  ngOnInit(): void {
    var opcion1 = document.querySelector('#texto').innerHTML;
    //console.log(opcion1);
  }

  cargarSlider()
  {
    this.anchuraToSlider = this.widthSlider;
  }

  resetearSlider()
  {
    this.anchuraToSlider = null;
  }

  getAutor(event)
  {
    this.autor = event;
  }

}
