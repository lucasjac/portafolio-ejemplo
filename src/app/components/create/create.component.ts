import { Component, OnInit } from '@angular/core';
import { Project } from "../../models/proyect";
import { ProjectService } from "../../services/proyect.service";
import { UploadService } from "../../services/upload.service";
import { Global } from "../../services/global";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
  public title: string;
  public project: Project;
  public save_project;
  public status: string;
  public fileToUpload: Array<File>;

  constructor(private _projectService: ProjectService, private _uploadService: UploadService)
  {
    this.title = "Crear proyecto";
    this.project = new Project('', '', '', '', 2020, '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(form)
  {
    //Guardar los datos
    this._projectService.saveProject(this.project).subscribe(response => {
      if(response.project){
        if(this.fileToUpload)
        {
          //Subir la imagen
          this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.project._id, [], this.fileToUpload, 'image')
          .then((result: any) => {
            this.save_project = result.project;
            this.status = 'success';
            form.reset();
          });
        } else
        {
            this.save_project = response.project;
            this.status = 'success';
            form.reset();
        }
      } else{
        this.status = 'failed';
      }
    }, error => {
      console.log(<any>error);
    });
  }

  fileChangeEvent(fileInput: any)
  {
    this.fileToUpload = <Array<File>>fileInput.target.files;
  }

}
