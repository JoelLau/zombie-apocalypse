import { Component, Input } from '@angular/core';

@Component({
  selector: 'zombie-apocalypse-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  // add tailwind sizes where required
  @Input() size: 'xl' | '2xl' = '2xl';
}
