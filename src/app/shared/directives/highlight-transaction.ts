import { Directive, ElementRef, Renderer2, OnInit, inject, input } from '@angular/core';

type HighlightType = 'income' | 'expense' | null;

@Directive({
  selector: '[appHighlightTransaction]',
  standalone: true
})
export class HighlightTransactionDirective implements OnInit {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  readonly appHighlightTransaction = input<HighlightType>(null);

  ngOnInit(): void {
    const type = this.appHighlightTransaction();

    if (type === 'income') {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'var(--color-income-bg)');
      this.renderer.setStyle(this.el.nativeElement, 'borderLeftColor', 'var(--color-income)');
    } else if (type === 'expense') {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'var(--color-expense-bg)');
      this.renderer.setStyle(this.el.nativeElement, 'borderLeftColor', 'var(--color-expense)');
    }
  }
}
