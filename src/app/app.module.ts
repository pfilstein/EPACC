import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';
import { LoginComponent } from './login.component';
import { SearchComponent } from './search.component';
import { LoginService} from './login.service';
import { RepoService} from './repo.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing ],
  declarations: [ AppComponent, AlertComponent, SearchComponent, LoginComponent, ],
  bootstrap:    [ AppComponent ],
  providers:    [ AlertService, LoginService, RepoService ]
})
export class AppModule { }
