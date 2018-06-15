import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, count } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';

export interface IFeedStory {
  storyOriginal: string;
  storyType: string;
  storyId: string;
  upvotes: number;
  userPicture: string;
  displayName: string;
  tags: string[];
  uploadDate: number;
}
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  storiesData = new BehaviorSubject<any>(null);
  // storiesArr: IFeedStory[] = [];
  storiesArr = [];

  newLoad: boolean = false;
  isLoading: boolean;
  timeBeforeAnimation = 2000;

  constructor(
    private dbSrv: DatabaseService) { }

  ngOnInit() {
    // Init feed
    this.loadInit();

  }

  loadInit() {
    this.isLoading = true;
    const dbRef = this.dbSrv.curatedStoriesFromDB
      .pipe(catchError(err => of(err)))
      .subscribe(data => {
        this.storiesData.next(data);
        console.log(this.storiesData.getValue())
        this.isLoading = false;
      });
  }

}

  /**
   * https://app.asana.com/0/417326512565358/705488681661663
   * angular animations:
   *    - https://stackblitz.com/edit/angular-carousel-with-animations-final?file=app%2Fcomponents%2Fcarousel%2Fcarousel.component.ts
   * firebase realtime data from service
   */
