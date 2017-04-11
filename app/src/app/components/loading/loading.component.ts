import { Component } from '@angular/core';

@Component({
  selector: 'insandwich-loading',
  templateUrl: 'app/templates/loading/loading.html'
})
export class LoadingComponent {
  isActive: boolean = true; //false;

  toggleLoading() {
    this.isActive = !this.isActive;
  }

}
