import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Harrypotter } from '../../services/harrypotter';
import { Character } from '../../models/character';

@Component({
  selector: 'app-characterlist',
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './characterlist.html',
  styleUrl: './characterlist.less'
})
export class Characterlist implements OnInit {
  private hpService = inject(Harrypotter);

  characters: Character[] = [];
  loading = true;

  ngOnInit(): void {
    this.hpService.getAllCharacters().subscribe({
      next: (data) => {
        this.characters = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching characters', err);
        this.loading = false;
      }
    });
  }
}
