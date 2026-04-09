import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { Harrypotter } from '../../services/harrypotter';
import { Character } from '../../models/character';

@Component({
  selector: 'app-characterdetails',
  imports: [CommonModule, MatCardModule],
  templateUrl: './characterdetails.html',
  styleUrl: './characterdetails.less'
})
export class Characterdetails implements OnInit {
  private route = inject(ActivatedRoute);
  private hpService = inject(Harrypotter);

  character!: Character;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.hpService.getCharacterById(id).subscribe({
        next: (data) => {
          this.character = data[0];
        },
        error: (err) => {
          console.error('Error fetching character details', err);
        }
      });
    }
  }
}
