import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.css']
})
export class CropperComponent implements OnInit {
  fileAttr = 'Choose File';
  imageURL: string;

  constructor() { }

  ngOnInit(): void {
  }

  uploadFileEvt(event): void {
    if (event.target.files && event.target.files[0]) {
      this.fileAttr = event.target.files[0].name;

      // HTML5 FileReader API
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.fileAttr = 'Choose File';
    }
  }
}
