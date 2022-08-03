import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input, OnChanges, OnDestroy,
  OnInit,
  Output,
  QueryList, SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Calculations} from '../../../classes/calculations/calculations.class';
import {BreakpointObserver} from '@angular/cdk/layout';
import {WIN_SIZES} from '../../../../app.config';
import {SubSink} from 'subsink';

@Component({
  selector: 'vmc-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss']
})
export class BurgerComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('burger') public burgerRef: ElementRef<HTMLElement> = {} as ElementRef;
  @ViewChildren('item') public itemsList: QueryList<ElementRef<HTMLElement>> = {} as QueryList<ElementRef>;
  @Input() public isOpen: boolean = false;
  @Input() public size: string = '60px';
  @Input() public weight: string = '10px';
  @Input() public color: string = '#000000';
  @Input() public background: string = 'transparent';
  @Output() public isOpenEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  private subs: SubSink = new SubSink();
  private clickLocker: boolean = false;
  private burger: HTMLElement = {} as HTMLElement;
  private items: HTMLElement[] = [];
  private itemHeight: number = 0;
  private burgerWidth: number = 0;
  private burgerHeight: number = 0;

  public constructor(private bpObserver: BreakpointObserver) {
    this.subs.add(
      bpObserver
        .observe([`(min-width: ${WIN_SIZES.MD}px)`])
        .subscribe(() => {
          if (this.items[0]) {
            this.init();
          }
        })
    );
  }

  public ngOnInit(): void {
    return;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'].currentValue !== null && this.items[0]) {
      this.runCloseMode();
      this.runOpenMode();
    }
  }

  public ngAfterViewInit(): void {
    this.burger = this.burgerRef.nativeElement;
    this.itemsList['_results'].forEach((elRef) => {
      this.items.push(elRef.nativeElement);
    });
    this.init();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onBurger(): void {
    if (!this.clickLocker) {
      this.isOpenEvent.emit(!this.isOpen);
      this.clickLocker = true;
      setTimeout(() => this.clickLocker = false, 500);
    }
  }

  private init(): void {
    this.burger.style.width = this.size;
    this.burger.style.height = this.size;
    this.burger.style.background = this.background;
    this.items.forEach((item) => {
      item.style.height = this.weight;
      item.style.background = this.color;
    });
    this.burgerHeight = this.burgerWidth = this.burger.clientWidth;
    this.itemHeight = this.items[0].clientHeight;
    this.runCloseMode();
  }

  private runCloseMode(): void {
    if (!this.isOpen) {
      this.items[0].style.top = '0';
      this.items[0].style.left = '0';
      this.items[1].style.top = '0';
      this.items[1].style.right = '0';
      this.items[2].style.top = `calc(50% - ${this.itemHeight / 2}px)`;
      this.items[3].style.top = `calc(50% - ${this.itemHeight / 2}px)`;
      this.items[4].style.bottom = '0';
      this.items[4].style.left = '0';
      this.items[5].style.bottom = '0';
      this.items[5].style.right = '0';
    }
  }

  private runOpenMode(): void {
    if (this.isOpen) {
      const deltaH = `${this.deltaHCalc()}px`;
      const deltaV = `${this.deltaVCalc()}px`;
      this.items[0].style.top = deltaV;
      this.items[0].style.left = deltaH;
      this.items[1].style.top = deltaV;
      this.items[1].style.right = deltaH;
      this.items[4].style.bottom = deltaV;
      this.items[4].style.left = deltaH;
      this.items[5].style.bottom = deltaV;
      this.items[5].style.right = deltaH;
    }
  }

  private deltaHCalc(): number {
    const length = this.burgerWidth / 4;
    return Math.cos(Calculations.degreeToRadian((180 - 45) / 2)) *
      2 * length * Math.cos(Calculations.degreeToRadian(45));
  }

  private deltaVCalc(): number {
    const length = this.burgerWidth / 4;
    return Math.sin(Calculations.degreeToRadian((180 - 45) / 2)) *
      2 * length * Math.cos(Calculations.degreeToRadian(45));
  }
}
