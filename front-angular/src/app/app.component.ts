import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserSearchComponent } from '@shared/components/user-search/user-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [UserSearchComponent]
})
export class AppComponent {
}
