import { Component, signal } from '@angular/core';
import { CharactersComponent } from './components/characters/characters.component';
import { SpellsComponent } from './components/spells/spells.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CharactersComponent, SpellsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  page = signal<'characters' | 'spells'>('characters');
}
