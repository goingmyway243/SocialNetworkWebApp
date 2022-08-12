import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExploreComponent } from './dashboard/explore/explore.component';
import { NewsfeedComponent } from './dashboard/newsfeed/newsfeed.component';
import { WallComponent } from './dashboard/wall/wall.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  {
    path: 'auth', component: LoginComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login', component: SignInComponent,
        loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
      },
      { path: 'signup', component: SignUpComponent },
    ]
  },
  {
    path: 'home', component: DashboardComponent,
    children: [
      {
        path: '', component: NewsfeedComponent,
        loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule)
      },
      { path: 'wall', component: WallComponent },
      { path: 'search/:keyword', component: ExploreComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
