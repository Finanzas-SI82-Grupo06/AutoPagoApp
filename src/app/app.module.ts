import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from "@angular/material/card";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { HomeComponent } from './views/home/home.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { NewCreditComponent } from './views/new-credit/new-credit.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import {MatSelectModule} from "@angular/material/select";
import { CreditsComponent } from './views/credits/credits.component';
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import { CreditsContentComponent } from './views/credits-content/credits-content.component';
import { CreditCardContentComponent } from './views/credit-card-content/credit-card-content.component';
import { VanTirDialogComponent } from './views/van-tir-dialog/van-tir-dialog.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDividerModule} from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    HomeComponent,
    NewCreditComponent,
    ToolbarComponent,
    CreditsComponent,
    CreditsContentComponent,
    CreditCardContentComponent,
    VanTirDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    MatSelectModule,
    MatTableModule,
    HttpClientModule,
    MatGridListModule,
    MatPaginatorModule,
    MatDividerModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
