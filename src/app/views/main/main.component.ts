import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from "../../shared/services/http-requests.service";
import { Film, FilmRequestType } from "../../../types/film-request-type";
import { FormsModule } from "@angular/forms";
import { NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { MovieCardComponent } from "../../shared/components/movie-card/movie-card.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    NgStyle,
    NgClass,
    MovieCardComponent
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  filmData: FilmRequestType | null = null;
  keyword: string = '';
  searchComplete = false;
  filmRequestError = false;
  isDataLoaded = false;
  isSearchExpanded = false;

  constructor(
    private httpRequestsService: HttpRequestsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initSearch();

  }

  private initSearch(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['q'];
      if (query) {
        this.keyword = query;
        this.performSearch(query);
      }
    });
  }

  keydownHandler(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

  handleSearch(): void {
    if (this.keyword.trim()) {
      this.updateQueryParams(this.keyword);
    }
  }

  private updateQueryParams(query: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: query },
      queryParamsHandling: 'merge'
    }).catch((error) => {
      throw new Error(`Error: ${error}`)
    });
  }

  private performSearch(query: string): void {
    this.isDataLoaded = false;
    this.httpRequestsService.searchFilmByKeyword(query).subscribe({
      next: (response) => this.handleSearchSuccess(response),
      error: (err) => this.handleSearchError(err),
      complete: () => this.handleSearchComplete()
    });
  }

  private handleSearchSuccess(response: FilmRequestType): void {
    this.filmData = response;
  }

  private handleSearchError(err: any): void {
    console.error('Ошибка при запросе:', err);
    this.filmRequestError = true;
  }

  private handleSearchComplete(): void {
    console.log('Запрос завершён');
    this.searchComplete = true;
    this.isSearchExpanded = false;
    this.checkImagesLoaded();
  }

  private checkImagesLoaded(): void {
    if (this.filmData?.films?.length) {
      const imageLoadPromises = this.filmData.films.map(this.loadImage);
      Promise.all(imageLoadPromises).then(() => {
        this.isDataLoaded = true;
      });
    } else {
      this.isDataLoaded = true;
    }
  }

  private loadImage(movie: Film): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = movie.posterUrlPreview;
      img.onload = () => resolve();
      img.onerror = () => reject();
    });
  }

  toggleSearchExpand(): void {
    this.isSearchExpanded = !this.isSearchExpanded;

    if (this.isSearchExpanded) {
      this.handleSearch();
    }
  }



}
