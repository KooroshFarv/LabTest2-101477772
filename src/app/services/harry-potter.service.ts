import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { Spell } from '../models/spell.model';


@Injectable({
  providedIn: 'root'
})
export class HarryPotterService {
  private http = inject(HttpClient)
  private baseUrl = 'https://hp-api.onrender.com/api'
  getChar () {
      return this.http.get<Character[]>(`${this.baseUrl}/characters`)
  }
  getSpell () {
    return this.http.get<Spell[]>(`${this.baseUrl}/spells`)
  }
  getCharById(id : string) {
    return this.http.get<Character[]>(`${this.baseUrl}/character/${id}`)
  }

  constructor() { }
}
