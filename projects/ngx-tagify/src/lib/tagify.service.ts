import {Injectable} from '@angular/core';
import Tagify from '@yaireo/tagify';
import {TagifySettings} from './tagify-settings';

@Injectable({
  providedIn: 'root'
})
export class TagifyService {

  private tagifyMap = new Map<string, Tagify>();

  constructor() { }

  init(inputRef: HTMLInputElement, settings: TagifySettings): Tagify {
    if (arguments.length === 0) {
      return;
    }

    if (this.tagifyMap.get(inputRef.name)) {
      return this.tagifyMap.get(inputRef.name);
    }

    const tagify = new Tagify(inputRef, settings);
    this.tagifyMap.set(inputRef.name, tagify);

    return tagify;
  }

  get(id: string): Tagify {
    return this.tagifyMap.get(id);
  }

  /**
   * @description Destroy dom and everything
   */
  public destroy(id: string) {
    this.tagifyMap.get(id).destroy();
    this.tagifyMap.delete(id);
  }

}
