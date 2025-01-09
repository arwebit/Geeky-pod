import { Component } from '@angular/core';
import { EpisodesService } from '../../shared/services/episodes.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-popular-podcasts',
  templateUrl: './popular-podcasts.component.html',
  styleUrl: './popular-podcasts.component.css',
})
export class PopularPodcastsComponent {
  episodes: any = [];
  responsiveOptions: any[] | undefined;
  imageURL: string = `${environment.imagesURL}`;

  constructor(private router: Router, private episodeSrv: EpisodesService) {
    this.getPodcastList();
  }

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '480px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getPodcastList() {
    const data = {
      filter: {
        condition: [
          ['is_popular', '=', 'yes'],
          ['is_active', '=', 'yes'],
        ],
      },
      start_row: 0,
      page_records: 15,
      sort_field: 'episode_date',
      sort: -1,
    };

    this.episodeSrv.getEpisodes(data).subscribe(
      (result: any) => {
        this.episodes = result.rows;
      },
      (err: HttpErrorResponse) => {
        alert('No genres found');
      }
    );
  }
}
