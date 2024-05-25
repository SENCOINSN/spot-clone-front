import { Component, effect, inject, input } from '@angular/core';
import { ReadSong } from '../../service/model/song.model';
import { AuthService } from '../../layout/service/auth.service';
import { SongService } from '../../service/song.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-favorite-song-btn',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './favorite-song-btn.component.html',
  styleUrl: './favorite-song-btn.component.scss'
})
export class FavoriteSongBtnComponent {
  song = input.required<ReadSong>();

  authService = inject(AuthService);
  songService = inject(SongService);

  constructor() {
    effect(() => {
      let favoriteSongState = this.songService.addOrRemoveFavoriteSongSig();
      if(favoriteSongState.status === "OK" && favoriteSongState.value
        && this.song().publicId === favoriteSongState.value.publicId) {
        this.song().favorite = favoriteSongState.value.favorite;
      }
    });
  }


  onFavorite(song: ReadSong) {
    this.songService.addOrRemoveAsFavorite(!song.favorite, song.publicId!);
  }

}
