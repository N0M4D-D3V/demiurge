import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import {
  DemiToolbarMenuItemConfig,
  DemiToolbarConfig,
} from './interfaces/toolbar.interface';
import { Location } from '@angular/common';
import { Subscription, debounceTime, filter } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DemiToggleMenuComponent } from './components/toggle-menu/toggle-menu.component';
import { DemiToolbarService } from '../../services/toolbar/toolbar.service';
import { DemiUser } from '../../interfaces/user.interface';

@Component({
  selector: 'demi-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DemiToggleMenuComponent],
})
export class DemiToolbarComponent implements OnInit, OnDestroy {
  @Input() user?: DemiUser;
  @Input() config!: DemiToolbarConfig;

  @Output() onLogout: EventEmitter<void> = new EventEmitter<void>();

  private subForm!: Subscription;

  public showSearchInput: boolean = false;
  public currentConfig!: DemiToolbarMenuItemConfig | undefined;

  public searchForm: FormGroup = this.fb.group({
    searching: this.fb.control(''),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly location: Location,
    private readonly demiToolbarService: DemiToolbarService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((item: Event) => item instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentConfig = this.config.items.find(
          (item) => item.url === event.url
        );
      });

    this.subForm = this.searchForm
      .get('searching')!!
      .valueChanges.pipe(debounceTime(500))
      .subscribe((value: string) => this.demiToolbarService.searchIn(value));
  }

  public logout(): void {
    this.onLogout.emit();
  }

  public onBack(): void {
    this.location.back();
  }

  public search(): void {
    this.showSearchInput = !this.showSearchInput;
    this.searchForm.reset();
  }

  ngOnDestroy(): void {
    this.subForm.unsubscribe();
  }
}
