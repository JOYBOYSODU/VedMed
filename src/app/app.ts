import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignIn } from "./sign-in/sign-in";

@Component({
  selector: 'app-root',
 
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [SignIn]
})
export class App {
  protected title = 'VedMed';
}
