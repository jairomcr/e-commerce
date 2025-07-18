import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { themeChange } from 'theme-change';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FontAwesomeModule, HeaderComponent],
    template: `
        <app-header />
        <main class="h-full">
            <router-outlet />
        </main>
    `,
})
export class AppComponent implements OnInit {
    title = 'SuperStore';

    ngOnInit(): void {
        themeChange(false);
    }
}
