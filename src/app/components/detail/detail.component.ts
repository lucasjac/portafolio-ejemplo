import { Component, OnInit } from '@angular/core';
import { Project } from "../../models/proyect";
import { ProjectService } from "../../services/proyect.service";
import { Global } from "../../services/global";
import { Router, ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url: String;
  public project: Project;
  public confirm: boolean;

  constructor(private _projectService: ProjectService, private _router: Router, private _route: ActivatedRoute)
  {
    this.url = Global.url;
    this.confirm = false;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProject(id);
    })
  }

  getProject(id)
  {
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
      }, error => {
        console.log("error");
      }
    );
  }

  setConfirm(confirm)
  {
    this.confirm = confirm;
  }

  deleteProject(id)
  {
    this._projectService.deleteProject(id).subscribe(
      response => {
        if(response.project){
          this._router.navigate(['proyectos/']);
        }
      }, error => {
        console.log(<any>error);
      }
    );
  }
}
