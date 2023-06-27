import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootModule } from './modules/root/root.module';
import { SharedModule } from './modules/shared/shared.module';
import { ResidencyCrudModule } from './modules/residency-crud/residency-crud.module';
import { ResidencyModule } from './modules/residency/residency.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RootModule,
    SharedModule,
    ResidencyCrudModule,
    ResidencyModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
