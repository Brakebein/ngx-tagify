import {ElementRef, Injectable} from '@angular/core';
import * as Tagify from '@yaireo/tagify';
import {TagifySettings} from './tagify-settings';

@Injectable({
  providedIn: 'root'
})
export class TagifyService {

  private tagify: Tagify;

  constructor() { }

  init(inputRef: ElementRef, settings: TagifySettings): Tagify {
    if (arguments.length === 0) {
      return;
    }
    if (this.tagify) {
      return this.tagify;
    }
    this.tagify = new Tagify(inputRef, settings);
    return this.tagify;
  }

  /**
   * @description Removes all tags and resets the original input tag's value property
   */
  public removeAllTags() {
    return this.tagify.removeAllTags();
  }

  /**
   * @description Add multiple tags
   * @param tags - Accepts a String (word, single or multiple with a delimiter), an Array of Objects or Strings
   */
  public addTags(tags: string|string[]|object[]) {
    return this.tagify.addTags(tags);
  }

  /**
   * @description Returns a DOM nodes list of all the tags
   */
  getTagElms() {
    return this.tagify.getTagElms();
  }

  /**
   * @description Returns a specific tag DOM node by value
   */
  getTagElmByValue() {
    return this.tagify.getTagElmByValue();
  }

  /**
   * Toggle loading state on/off (e.g. AJAX whitelist pulling)
   */
  loading(isLoading: boolean) {
    return this.tagify.loading(isLoading);
  }

  /**
   * @description Destroy dom and everything
   */
  public destroy() {
    this.tagify.destroy();
    this.tagify = null;
  }

}
