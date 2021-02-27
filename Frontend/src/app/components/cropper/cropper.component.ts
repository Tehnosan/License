import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageCroppedEvent, ImageTransform} from 'ngx-image-cropper';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.css']
})
export class CropperComponent implements OnInit {
  @Input() imageChangedEvent: any = '';
  @Input() roundCropper = false;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  scale = 1;
  @Output() imageUrlChanged: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // when image is loaded show cropper
  imageLoaded(): void {
    this.showCropper = true;
    console.log('Image loaded');
  }

  // set image url when image is cropped
  imageCropped(event: ImageCroppedEvent): void {
    this.imageUrlChanged.emit(event.base64);
  }

  // toggle ratio aspect
  toggleContainWithinAspectRatio(): void {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  // on scroll event on picture
  onScroll(event: any): void {
    const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

    if (delta > 0) {
      console.log('scroll up');
      this.zoomIn();
    }
    else if (delta < 0) {
      console.log('scroll down');
      this.zoomOut();
    }

    // stop scrolling page
    // for IE
    event.returnValue = false;
    // for Chrome and Firefox
    if (event.preventDefault) {
      event.preventDefault();
    }
  }

  zoomOut(): void {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn(): void {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }
}
