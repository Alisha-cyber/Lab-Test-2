import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { Harrypotter } from '../../services/harrypotter';
import { Character } from '../../models/character';

@Component({
  selector: 'app-characterfilter',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './characterfilter.html',
  styleUrl: './characterfilter.less'
})
export class Characterfilter {
  private hpService = inject(Harrypotter);

  houses: string[] = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
  selectedHouse = '';
  characters: Character[] = [];

  onHouseChange(): void {
    if (this.selectedHouse) {
      this.hpService.getCharactersByHouse(this.selectedHouse).subscribe({
        next: (data) => {
          this.characters = data;
        },
        error: (err) => {
          console.error('Error fetching characters by house', err);
        }
      });
    }
  }
}
