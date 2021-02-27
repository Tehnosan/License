import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../services/token-storage-service/token-storage.service';
import {MatDialog} from '@angular/material/dialog';
import {UploadImageComponent} from '../upload-image/upload-image.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {
  @Input() nrOfPosts: number;
  profileImage = '';

  constructor(private tokenStorageService: TokenStorageService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.setProfileImage();
  }

  setProfileImage(): void {
    this.profileImage = this.tokenStorageService.getProfileImage();
  }

  onEditProfile(): void {
    const dialogRef = this.dialog.open(UploadImageComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/profile']);
      });
    });
  }
}
