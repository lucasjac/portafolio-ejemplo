import { Component, OnInit } from '@angular/core';
import { Project } from "../../models/proyect";
import { ProjectService } from "../../services/proyect.service";
import { UploadService } from "../../services/upload.service";
import { Global } from "../../services/global";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  public title: string;
  public project: Project;
  public save_project;
  public status: string;
  public fileToUpload: Array<File>;
  public url: string;

  constructor(private _projectService: ProjectService, private _uploadService: UploadService, private _route: ActivatedRoute, private _router: Router)
  {
    this.title = "Editar proyecto";
    this.url = Global.url;
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

  onSubmit(){
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if(response.project){
          if(this.fileToUpload)
          {
              //Subir la imagen
              this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.project._id, [], this.fileToUpload, 'image')
              .then((result: any) => {
                this.save_project = result.project;
                this.status = 'success';
              });
          } else
          {
            this.save_project = response.project;
            this.status = 'success';
          }
        } else{
          this.status = 'failed';
        }
      }, error => {
        console.log("error");
      }
    );
  }

  fileChangeEvent(fileInput: any)
  {
    this.fileToUpload = <Array<File>>fileInput.target.files;
  }

}
