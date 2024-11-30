import { Injectable } from '@angular/core';
import Tagify from '@yaireo/tagify';

@Injectable({
  providedIn: 'root',
})
export class TagifyService {
  private tagifyMap = new Map<string, Tagify>();

  /**
   * Adds a tagify instance, so it is available via service. Used internally.
   */
  add(name: string, tagify: Tagify): void {
    if (this.tagifyMap.get(name)) {
      console.warn(`There already exists a tagify instance with name ${name}!`);
      return;
    }
    this.tagifyMap.set(name, tagify);
  }

  /**
   * Get tagify instance for full access to tagify API.
   */
  get(name: string): Tagify {
    return this.tagifyMap.get(name);
  }

  /**
   * Removes a tagify instance from service. Used internally.
   */
  remove(name: string): void {
    this.tagifyMap.delete(name);
  }
}
