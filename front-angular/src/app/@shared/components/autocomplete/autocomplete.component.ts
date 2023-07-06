import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Observable, of, switchMap, tap } from "rxjs";
import { FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import {Api} from "../../../@core/enums/api";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit{
  @Output() userSelected: EventEmitter<any> = new EventEmitter<any>();

  public users$!: Observable<any[]>;
  public searchTerm = new FormControl();
  public isShowResult = true;

  constructor(private elementRef: ElementRef, private httpClient: HttpClient) {}

  ngOnInit() {
    this.getSearchTerm()
  }

  public getSearchTerm() {
    this.users$ = this.searchTerm.valueChanges.pipe(
      tap((res) => console.log('searching', res)),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: any) => term ? this.getMatchedUsers(term) : of([]))
    );
  }

  public getMatchedUsers(term: string): Observable<any[]> {
    return this.httpClient.get<any[]>(Api.getUsers, {
      params: {
        q: term,
      }
    }).pipe(
      map((response: any) => response.data),
    )
  }

  userSelectedHandler(user: any) {
    this.isShowResult = false;
    this.userSelected.emit(user);
  }


  onInputBlur(): void {
    setTimeout(() => {
      if (!this.elementRef.nativeElement.contains(document.activeElement)) {
        this.isShowResult = false;
      }
    }, 200);
  }

  onInputFocus(): void {
    this.isShowResult = true;
  }
}
