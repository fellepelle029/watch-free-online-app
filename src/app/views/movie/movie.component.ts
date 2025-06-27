import {Component, OnInit} from '@angular/core';
import {HttpRequestsService} from "../../shared/services/http-requests.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
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
    const preferredSources = ['Collaps', 'Videocdn', 'Turbo', 'Alloha', 'Vibix'];
    for (const sourceName of preferredSources) {
      const source = response.find((s: any) => s.source === sourceName && s.iframeUrl);
      if (source) {
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(source.iframeUrl);
        return;
      }
    }
    console.log('Iframe не найден ни в одном источнике');
  }
}
