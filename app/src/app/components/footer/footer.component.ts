import { Component, Input } from '@angular/core';

@Component({
  selector: 'insandwich-footer',
  templateUrl: 'app/templates/footer/footer.html'
})
export class FooterComponent {

  @Input() role: string;

}
