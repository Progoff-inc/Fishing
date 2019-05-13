import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FishingsComponent } from './fishings/fishings.component';
import { BanksComponent } from './banks/banks.component';
import { CatchComponent } from './catch/catch.component';
import { SailorsComponent } from './sailors/sailors.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignComponent } from './sign/sign.component';

const signRouts: Routes = [
  { path: '', component: SignInComponent, pathMatch: 'full'},
  { path: 'up', component: SignUpComponent}
  
]

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'fishings', component: FishingsComponent},
  { path: 'banks', component: BanksComponent},
  { path: 'catch', component: CatchComponent},
  { path: 'sailors', component: SailorsComponent},
  { path: 'sign', component: SignComponent, children: signRouts }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
