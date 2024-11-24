import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddComponent } from './jobs/add/add.component';
import { EditComponent } from './jobs/edit/edit.component';
import { ListComponent } from './jobs/list/list.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'jobs', component: ListComponent },
    { path: 'jobs/add', component: AddComponent },
    { path: 'jobs/edit/:id', component: EditComponent },
    { path: '', redirectTo: '/jobs', pathMatch: 'full' } // Default route
];
