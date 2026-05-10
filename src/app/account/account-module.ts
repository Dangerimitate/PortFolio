import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './autho.1/login/login';
import { Register } from './autho.1/register/register';



@NgModule({
  declarations: [Login, Register],
  imports: [
    CommonModule
  ]
})
export class AccountModule { }
