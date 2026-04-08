import { Component, computed, inject, signal } from '@angular/core';
import { HarryPotterService } from '../../services/harry-potter.service';
import { Spell } from '../../models/spell.model';

@Component({
  selector: 'app-spells',
  standalone: true,
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.css'
})
export class SpellsComponent {
  private hpService = inject(HarryPotterService);

  spells = signal<Spell[]>([]);
  searchTerm = signal('');
  loading = signal(true);

  constructor() {
    this.loadSpells();
  }

  loadSpells() {
    this.hpService.getSpell().subscribe({
      next: (data) => {
        this.spells.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  filteredSpells = computed(() => {
    return this.spells().filter((spell) =>
      spell.name.toLowerCase().includes(this.searchTerm().toLowerCase())
    );
  });
}
