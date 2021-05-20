import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage-service/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nickname: string;
  profileImage: string;

  constructor(private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.nickname = this.tokenStorageService.getUsername();
    this.profileImage = this.tokenStorageService.getProfileImage();
  }

  goToProfile(): void {
    if (window.location.pathname === '/profile') {
      window.location.reload();
    }
    else {
      this.router.navigateByUrl('profile');
    }
  }

  goHome(): void {
    if (window.location.pathname === '/home') {
      window.location.reload();
    }
    else {
      this.router.navigateByUrl('home');
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
