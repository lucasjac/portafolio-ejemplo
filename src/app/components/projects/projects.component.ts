import { Component, OnInit } from '@angular/core';
import { Project } from "../../models/proyect";
import { ProjectService } from "../../services/proyect.service";
import { Global } from "../../services/global";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];
  public url: string;

  constructor(private _projectService: ProjectService)
  {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(){
    this._projectService.getProjects().subscribe(
      response => {
        if(response.projects)
        {
          this.projects = response.projects;
          console.log(this.projects);
        }
      }, error => {
        console.log(<any>error);
      }
    );
  }

}
