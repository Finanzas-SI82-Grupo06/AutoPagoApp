import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { NotFoundComponent} from "./shared/not-found/not-found.component";
import {HomeComponent} from "./views/home/home.component";
import {NewCreditComponent} from "./views/new-credit/new-credit.component";
import {CreditsComponent} from "./views/credits/credits.component";
import {CreditsContentComponent} from "./views/credits-content/credits-content.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-credit', component: NewCreditComponent },
  { path: 'credits', component: CreditsContentComponent},
  { path: 'credits/:id', component: CreditsComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
