import { 
  Directive, 
  ElementRef, 
  input, 
  effect,
  Renderer2 
} from '@angular/core';

@Directive({
  selector: '[appHighlightChange]',
  standalone: true
})
export class HighlightChangeDirective {
  changePercent = input<number>(0, { alias: 'appHighlightChange' });
  
  private previousValue: number | undefined;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    // Usar effect para reaccionar a cambios en el signal
    effect(() => {
      const current = this.changePercent();
      
      // Solo aplicar animación si el valor cambió
      if (this.previousValue !== undefined && current !== this.previousValue) {
        this.applyFlashAnimation(current);
      }
      
      this.previousValue = current;
    });
  }

  private applyFlashAnimation(changePercent: number): void {
    const element = this.el.nativeElement;
    
    // Remover clases anteriores
    this.renderer.removeClass(element, 'flash-green');
    this.renderer.removeClass(element, 'flash-red');
    
    // Determinar el color del flash basado en el cambio
    const flashClass = changePercent > 0 ? 'flash-green' : 'flash-red';
    
    // Forzar reflow para reiniciar la animación
    void element.offsetWidth;
    
    // Aplicar la animación
    this.renderer.addClass(element, flashClass);
    
    // Remover la clase después de la animación (300ms)
    setTimeout(() => {
      this.renderer.removeClass(element, flashClass);
    }, 300);
  }
}
