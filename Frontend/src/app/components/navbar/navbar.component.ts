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

  constructor(private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.nickname = this.tokenStorageService.getUsername();
  }

  goToProfile(): void {
    this.router.navigateByUrl('profile');
  }

  goHome(): void {
    this.router.navigateByUrl('home');
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
