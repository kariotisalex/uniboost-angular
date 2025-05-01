import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  activeButton: string = 'home';

  constructor() { }
}
