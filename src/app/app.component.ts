import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignupPageComponent, HeaderComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-management-system';
}
