import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { themeChange } from 'theme-change';
import { GlobalNotificationComponent } from './shared/components/global-notification.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FontAwesomeModule, HeaderComponent,GlobalNotificationComponent],
    template: `
        <app-header />
        <main class="h-full">
            <router-outlet />
            <app-global-notification />
        </main>
    `,
})
export class AppComponent implements OnInit {
    title = 'SuperStore';

    ngOnInit(): void {
        themeChange(false);
    }
}
