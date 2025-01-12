import {Component, OnInit} from '@angular/core';
import {HttpRequestsService} from "../../shared/services/http-requests.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent implements OnInit{
  movieId: string = '';
  iframeUrl: any = '';
  showLoader: boolean = true;

  constructor(private httpRequestsServer: HttpRequestsService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer ) {
  }

  ngOnInit() {
    this.initializePlayer();
  }


  initializePlayer(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('movieId') || '';
      if (this.movieId) {
        this.httpRequestsServer.loadMovieById(this.movieId).subscribe(response => {
          this.findIframeUrl(response);

        })
      }
    });
    setTimeout(() => {
      this.showLoader = false;
    }, 3000);
  }

  findIframeUrl(response: any): void {
    const movieSource = response.find((source: any) => source.source === 'Collaps');

    if (movieSource && movieSource.iframeUrl) {
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(movieSource.iframeUrl);
    } else {
      const backupSource = response.find((source: any) => source.source === 'Videocdn');
      if (backupSource && backupSource.iframeUrl) {
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(backupSource.iframeUrl);
      } else {
        console.log('Iframe не найден для источников Collaps и Videocdn');
      }
    }
  }
}
