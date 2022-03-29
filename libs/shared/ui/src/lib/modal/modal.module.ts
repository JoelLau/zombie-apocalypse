import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalBackdropModule } from './modal-backdrop/modal-backdrop.module';

@NgModule({
  imports: [CommonModule, ModalBackdropModule],
  declarations: [ModalComponent],
  exports: [ModalComponent, ModalBackdropModule],
})
export class ModalComponentModule {}
