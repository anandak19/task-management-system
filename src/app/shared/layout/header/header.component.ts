import { Component } from '@angular/core';
import { SignupPageComponent } from '../../../pages/signup-page/signup-page.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet ,SignupPageComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
