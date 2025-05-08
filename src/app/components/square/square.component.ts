import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Player } from '../../models/game.model';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Melhora a performance
  standalone: true
})
export class SquareComponent {
  @Input() value: Player = null;
  @Output() squareClick = new EventEmitter<void>();

  onClick(): void {
    this.squareClick.emit();
  }
}