import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'header',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        height: 48px;
        display: flex;
        flex-direction: column;
        gap: 8px;

        background: #9c27b0;
        width: 100%;
        color: white;
        font-size: 16px;
        text-align: center;
        padding: 16px;
      }
    `
  ]
})
export class HeaderComponent {}
