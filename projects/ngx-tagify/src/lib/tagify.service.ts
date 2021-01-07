import { Injectable } from '@angular/core';
import Tagify from '@yaireo/tagify';
import { TagifySettings } from './tagify-settings';

@Injectable({
  providedIn: 'root'
})
export class TagifyService {

  private tagifyMap = new Map<string, Tagify>();

  constructor() { }

  /**
   * Initialize input element with tagify. Used internally.
   */
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

  /**
   * Get tagify instance for full access to tagify API.
   */
  get(name: string): Tagify {
    return this.tagifyMap.get(name);
  }

  /**
   * Destroy dom and everything. Used internally.
   */
  public destroy(name: string): void {
    this.tagifyMap.get(name).destroy();
    this.tagifyMap.delete(name);
  }

}
