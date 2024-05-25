import { Routes } from '@angular/router';
import { AddSongComponent } from './add-song/add-song.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { FavoriteComponent } from './favorite/favorite.component';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    {
        path:'add-song',
        component:AddSongComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'favorites',
        component: FavoriteComponent
      }
];
