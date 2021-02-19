import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../models/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  @Input() recipes: Recipe[];

  constructor() { }

  ngOnInit(): void {}

  onHeartClick(event): void {
    if (event.target.classList.contains('purple')) {
      event.target.classList.remove('purple');
    }
    else {
      event.target.classList.add('purple');
    }
  }
}
