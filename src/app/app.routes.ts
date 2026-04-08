import { Routes } from '@angular/router';
import { CharactersComponent } from './components/characters/characters.component';
import { CharacterdetailsComponent } from './components/characterdetails/characterdetails.component';

export const routes: Routes = [
  {path: '', redirectTo: 'characters', pathMatch:'full'},
  {path: 'characters', component: CharactersComponent},
  {path: 'characters/:id', component: CharacterdetailsComponent},
];
