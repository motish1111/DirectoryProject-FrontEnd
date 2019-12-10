import {
  Directive,
  Input,
  HostBinding,
  HostListener,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
    // elemref.nativeElement.class += ' open';
  }

  constructor(private elRef: ElementRef) {}
}