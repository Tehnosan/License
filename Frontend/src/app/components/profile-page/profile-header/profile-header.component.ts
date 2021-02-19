import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {
  @Input() nrOfPosts: number;

  constructor() { }

  ngOnInit(): void {
  }

}
