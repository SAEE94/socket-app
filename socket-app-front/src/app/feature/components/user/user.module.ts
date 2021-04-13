import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { SocketService } from '../../services/socket.service';
import { UserSocketService } from './services/user.socket.service';
import { UserFormService } from './services/user.form.service ';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule ,
    RouterModule.forChild([
      { path: '', component: UserComponent }
    ]),
    NgxPaginationModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [UserService, SocketService, UserSocketService, UserFormService],
})
export class UserModule { }
