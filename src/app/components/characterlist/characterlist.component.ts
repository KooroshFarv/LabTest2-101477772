import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HarryPotterService } from '../../services/harry-potter.service';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-characterlist',
  standalone: true,
  templateUrl: './characterlist.component.html',
  styleUrl: './characterlist.component.css'
})
export class CharacterlistComponent {
  private hpService = inject(HarryPotterService);
  private router = inject(Router);

  characters = signal<Character[]>([]);
  loading = signal(true);
  searchTerm = signal('');
  selectedHouse = signal('all');

  constructor() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.hpService.getChar().subscribe({
      next: (data) => {
        this.characters.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  openCharacterDetails(id: string) {
    this.router.navigate(['/characters', id]);
  }

  filteredCharacters = computed(() => {
    return this.characters().filter((character) => {
      const matchesName = character.name
        .toLowerCase()
        .includes(this.searchTerm().toLowerCase());

      const matchesHouse =
        this.selectedHouse() === 'all' ||
        character.house === this.selectedHouse();

      return matchesName && matchesHouse;
    });
  });
}
