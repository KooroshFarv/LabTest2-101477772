import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HarryPotterService } from '../../services/harry-potter.service';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-characterdetails',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './characterdetails.component.html',
  styleUrl: './characterdetails.component.css'
})
export class CharacterdetailsComponent {
  private route = inject(ActivatedRoute);
  private hpService = inject(HarryPotterService);

  character = signal<Character | null>(null);
  loading = signal(true);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.hpService.getCharById(id).subscribe({
        next: (data) => {
          this.character.set(data[0] || null);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        }
      });
    } else {
      this.loading.set(false);
    }
  }
}
