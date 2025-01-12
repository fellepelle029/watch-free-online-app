import { Component } from '@angular/core';
import {HttpRequestsService} from "../../shared/services/http-requests.service";
import {Film, FilmRequestType} from "../../../types/film-request-type";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    NgStyle,
    NgClass
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  filmData: FilmRequestType | null = null;
  keyword: string = '';
  searchComplete: boolean = false;
  filmRequestError: boolean = false;
  isDataLoaded: boolean = false;
  isSearchExpanded: boolean = false;


  constructor(private httpRequestsService: HttpRequestsService, private router: Router) {
  }



  keydownHandler(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.handleSearch();
    }
  }

  handleSearch(): void {
    if (this.keyword !== '') {
      this.isDataLoaded = false;
      this.httpRequestsService.searchFilmByKeyword(this.keyword).subscribe({
        next: (response: FilmRequestType) => {
          this.filmData = response;
          console.log(this.filmData);
        },
        error: (err) => {
          console.error('Ошибка при запросе:', err);
          this.filmRequestError = true;
        },
        complete: () => {
          console.log('Запрос завершён');
          this.keyword = '';
          this.searchComplete = true;
          this.isSearchExpanded = false;
          this.checkImageLoaded();
        }
      });
    } else {
      return;
    }
  }

  checkImageLoaded(): void {
    if (this.filmData?.films) {
      const images = this.filmData.films.map((movie: Film) => {
        const img = new Image();
        img.src = movie.posterUrlPreview;
        return new Promise((resolve,reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(images).then(() => {
        this.isDataLoaded = true;
      });
    } else {
      this.isDataLoaded = true;
    }
  }


  truncateDescription(description: string, limit: number): string {
    if (!description) return '';
    return description.length > limit ? description.slice(0, limit) + '...' : description;
  }

  watchMovie(movieId: number): void {
    this.router.navigate([`film/${movieId}`]); // Переход на страницу с ID фильма
  }

  toggleSearchExpand() {
    this.isSearchExpanded = !this.isSearchExpanded;
  }
}
