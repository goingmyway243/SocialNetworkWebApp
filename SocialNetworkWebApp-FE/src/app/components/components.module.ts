import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsComponent } from './posts/posts.component';
import { StoriesComponent } from './stories/stories.component';
import { MessagesComponent } from './messages/messages.component';
import { RequestsComponent } from './requests/requests.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { CommentComponent } from './comment/comment.component';
import { FriendCardComponent } from './friend-card/friend-card.component';



@NgModule({
  declarations: [
    SidebarComponent,
    CreatePostComponent,
    PostsComponent,
    StoriesComponent,
    MessagesComponent,
    RequestsComponent,
    ProfileCardComponent,
    CommentComponent,
    FriendCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SidebarComponent,
    CreatePostComponent,
    PostsComponent,
    MessagesComponent,
    RequestsComponent,
    StoriesComponent,
    ProfileCardComponent,
    FriendCardComponent,
    CommentComponent
  ]
})
export class ComponentsModule { }
