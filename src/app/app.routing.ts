import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';
import { LoginComponent } from './login.component';

const appRoutes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
