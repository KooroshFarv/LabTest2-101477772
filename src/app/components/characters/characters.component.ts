import { Component, computed, inject, signal } from '@angular/core';
import { HarryPotterService } from '../../services/harry-potter.service';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-characters',
  standalone: true,
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent {
  private hpService = inject(HarryPotterService);

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
