import {Component, Input} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {Film, FilmRequestType} from "../../../../types/film-request-type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgStyle
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input() movie: Film | null = null;

  constructor(private router: Router) {
  }


  truncateDescription(description: string, limit: number): string {
    if (!description) return '';
    return description.length > limit ? description.slice(0, limit) + '...' : description;
  }

  watchMovie(movieId: number): void {
    this.router.navigate([`film/${movieId}`]);
  }

  getBackgroundImage(film: Film): string {
    return film.posterUrl;
  }

  convertToMinutes(filmLength: string): number | null {
    if (!filmLength) {
      return null;
    }
    const [hours, minutes] = filmLength.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
      return null;
    }
    return hours * 60 + minutes;
  }
}
