import { Injectable } from '@angular/core';
import Tagify, { BaseTagData, TagData } from '@yaireo/tagify';

@Injectable({
  providedIn: 'root',
})
export class TagifyService {
  private tagifyMap = new Map<string, Tagify<any>>();

  /**
   * Adds a tagify instance, so it is available via service. Used internally.
   */
  add(name: string, tagify: Tagify<any>): void {
    if (this.tagifyMap.get(name)) {
      console.warn(`There already exists a tagify instance with name ${name}!`);
      return;
    }
    this.tagifyMap.set(name, tagify);
  }

  /**
   * Get tagify instance for full access to tagify API.
   */
  get<T extends BaseTagData = TagData>(name: string): Tagify<T> | undefined {
    return this.tagifyMap.get(name) as Tagify<T>;
  }

  /**
   * Removes a tagify instance from service. Used internally.
   */
  remove(name: string): void {
    this.tagifyMap.delete(name);
  }
}
