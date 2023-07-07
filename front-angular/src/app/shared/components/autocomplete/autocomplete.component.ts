
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';
import {ShortFormatPipe} from "../../pipes/short-format.pipe";
import {TSearchedUser} from "../../../core/types/search-user.type";
import {UserService} from "../../../core/services/user.service";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ShortFormatPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent {
  @Output() userSelected: EventEmitter<TSearchedUser> = new EventEmitter<TSearchedUser>();

  public searchTerm: FormControl<string> = new FormControl();
  public isShowResult = true;

  private readonly _userService: UserService = inject(UserService);
  private readonly _elementRef: ElementRef = inject(ElementRef);

  protected readonly users$: Observable<TSearchedUser[]> =
    this.searchTerm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) =>
        term ? this._userService.searchUsers(term) : of([]),
      ),
    );

  public userSelectedHandler(user: TSearchedUser): void {
    this.isShowResult = false;
    this.userSelected.emit(user);
  }


  public onInputBlur(): void {
    setTimeout(() => {
      if (!this._elementRef.nativeElement.contains(document.activeElement)) {
        this.isShowResult = false;
      }
    }, 200);
  }

  public onInputFocus(): void {
    this.isShowResult = true;
  }
}
