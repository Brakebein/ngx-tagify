import {Component, OnDestroy} from '@angular/core';
import {TagifyService, TagifySettings} from 'ngx-tagify';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  public settings: TagifySettings = { blacklist: ['fucking', 'shit']};

  constructor(private tagifyService: TagifyService) { }

  onAdd(tagify) {
    console.log('added a tag', tagify);
  }

  onRemove(tags) {
    console.log('removed a tag', tags);
  }
  clearTags() {
    this.tagifyService.get('test').removeAllTags();
  }
  addTags() {
    this.tagifyService.get('test').addTags(['this', 'is', 'cool']);
  }
  ngOnDestroy() {
    this.tagifyService.destroy('test');
  }
}
