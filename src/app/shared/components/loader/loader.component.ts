import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'tnm-loader',
  imports: [
    NgTemplateOutlet,
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent implements OnInit {

  private readonly hostElRef = inject(ElementRef);

  fillColor = signal<string>('#000000');

  ngOnInit(): void {
    setTimeout(() => this.fillColor.set(getComputedStyle(this.hostElRef.nativeElement).color || '#000000'), 0);
  }
}
