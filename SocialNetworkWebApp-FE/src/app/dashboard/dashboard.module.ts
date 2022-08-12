import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore/explore.component';
import { WallComponent } from './wall/wall.component';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';



@NgModule({
  declarations: [
    ExploreComponent,
    WallComponent,
    DashboardComponent,
    NewsfeedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class DashboardModule { }
