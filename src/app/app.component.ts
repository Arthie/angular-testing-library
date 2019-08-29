import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
import { GreetService } from './greet.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '200px',
          opacity: 1,
          backgroundColor: 'yellow',
        }),
      ),
      state(
        'closed',
        style({
          height: '100px',
          opacity: 0.5,
          backgroundColor: 'green',
        }),
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
})
export class AppComponent {
  isOpen = true;
  title = 'app';
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    age: ['', [Validators.min(18), Validators.max(28)]],
  });

  constructor(private store: Store<any>, private greetService: GreetService, private fb: FormBuilder) {}

  greet() {
    this.greetService.greet();
  }

  onSubmit() {
    console.log('Form submitted: ', this.form.value);
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
