import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit, OnChanges {
  @Input() user: any;
  @Input() selectedUserFollowers: string = '';
  @Input() isVerified: boolean = false;

  userInfo: any;
  userFeeds: any = [];

  constructor( private http: HttpClient) {}

  ngOnInit() {
    this.updateUserInfoAndFeeds();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']?.currentValue) {
      this.updateUserInfoAndFeeds();
    }
  }

  private updateUserInfoAndFeeds() {
    this.userInfo = this.user?.user;
    this.userFeeds = this.user?.feeds?.items;
    console.log(this.userInfo);
  }


  public getImageWithCorsHeaders(imageUrl: any) {
    let imageUrlWithCorsHeaders;
    const headers = {
      'Access-Control-Allow-Origin': '*',
      // Додайте інші заголовки CORS, якщо потрібно
    };

    const options = {
      headers: headers,
      responseType: 'blob' // Вказуємо, що очікуємо відповідь у форматі Blob
    };

    // @ts-ignore
    this.http.get(imageUrl, options)
      .subscribe((response: any) => {
        const urlCreator = window.URL || window.webkitURL;
        imageUrlWithCorsHeaders = urlCreator.createObjectURL(response);

        // Використовуйте отриманий imageUrl у вашому темплейті або логіці компонента
      });

    return imageUrlWithCorsHeaders
  }

}
