import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {Film} from "../../../../types/film-request-type";
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
  @ViewChild('glow') glow!: ElementRef;

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


  onMouseMove(event: MouseEvent) {
    const button = (event.target as HTMLElement);
    const rect = button.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const glowEl = this.glow.nativeElement as HTMLElement;
    glowEl.style.opacity = '1';
    glowEl.style.left = `${x}px`;
    glowEl.style.top = `${y}px`;
  }

  resetLight(event: MouseEvent) {
    const glowEl = this.glow.nativeElement as HTMLElement;
    glowEl.style.opacity = '0';
  }

}
