declare module '@yaireo/tagify' {

  interface TagifySettings {
    placeholder?: string;
    delimiters?: string | RegExp;
    pattern?: string;
    mode?: 'select' | 'mix' | null;
    mixTagsInterpolator?: string[];
    mixTagsAllowedAfter?: RegExp;
    duplicates?: boolean;
    enforceWhitelist?: boolean;
    autocomplete?: {
      enabled?: boolean;
      rightKey?: boolean;
    };
    whitelist?: string[];
    blacklist?: string[];
    addTagOnBlur?: boolean;
    callbacks?: { [key: string]: () => any };
    maxTags?: number;
    editTags?: 2 | 1 | false | null;
    templates?: {
      wrapper?: (input: any, settings: TagifySettings) => string;
      tag?: (value: string, tagData: any) => string;
      dropdown?: (settings: TagifySettings) => string;
      dropdownItem?: (item: any) => string;
    };
    transformTag?: (item: any) => any;
    keepInvalidTags?: boolean;
    skipInvalid?: boolean;
    backspace?: boolean | 'edit';
    originalInputValueFormat?: () => string;
    dropdown?: {
      enabled?: number | false;
      maxItems?: number;
      classname?: string;
      fuzzySearch?: boolean;
      accentedSearch?: boolean;
      position?: 'manual' | 'text' | 'input' | 'all' | null;
      highlightFirst?: boolean;
      closeOnSelect?: boolean;
      mapValueTo?: string | ((data: any) => string);
      searchKeys?: string[];
    };
  }

  /**
   * Default tag format
   */
  interface TagData {
    value: string;
    [key: string]: any;
  }

  /**
   * Tagify class from @yaireo/tagify
   */
  export default class Tagify {

    settings: TagifySettings;
    value: TagData[];

    constructor(inputElement: HTMLInputElement, settings: TagifySettings);

    /**
     * Reverts the input element back as it was before Tagify was applied
     */
    destroy(): void;

    /**
     * Removes all tags and resets the original input tag's value property
     */
    removeAllTags(): void;

    /**
     * Parse and add tags
     * @param tags - Accepts a String (word, single or multiple with a delimiter), an Array of Objects or Strings
     * @param clearInput - If true, the input's value gets cleared after adding tags
     * @param skipInvalid - If true, do not add, mark & remove invalid tags (defaults to Tagify settings)
     */
    addTags(tags: string | string[] | TagData[], clearInput?: boolean, skipInvalid?: boolean): Node[];

    /**
     * Remove single/multiple tags. When nothing passed, removes last tag.
     * @param tagElms - DOM element(s) or a String value
     * @param silent - A flag, which when turned on, does not remove any value and does not update
     * the original input value but simply removes the tag from tagify
     * @param tranDuration - Delay for animation, after which the tag will be removed from the DOM
     */
    removeTags(tagElms?: Node[] | Node | string, silent?: boolean, tranDuration?: number): void;

    /**
     * Converts the input's value into tags. This method gets called automatically when instantiating Tagify.
     * Also works for mixed-tags.
     */
    loadOriginalValues(value: string): void;

    /**
     * Converts a String argument (`[[foo]]⁠ and [[bar]]⁠ are..`) into HTML with mixed tags & texts
     */
    parseMixTags(value: string): string;

    /**
     * Return the index of a specific tag by value
     */
    getTagIndexByValue(value: string): number[];

    /**
     * Return a DOM nodes list of all the tags
     * @param classes - Filter by set of class names
     */
    getTagElms(classes?: string[]): NodeList;

    /**
     * Return a specific tag DOM node by value
     */
    getTagElmByValue(value: string): Node;

    /**
     * Set/get tag data on a tag element
     */
    tagData(tagElm: Node, data: TagData): TagData;

    /**
     * Goes to edit-mode in a specific tag
     */
    editTag(node: Node): void;

    /**
     * Replaces an exisitng tag with a new one. Used for updating a tag's data.
     */
    replaceTag(tagElm: Node, tagData: TagData): void;

    /**
     * Toogle loading state on/off (Ex. AJAX whitelist pulling)
     */
    loading(isLoading: boolean): this;

    /**
     * Return a tag element from the supplied tag data
     */
    createTagElem(tagData: TagData): Node;

    /**
     * Add event listener
     */
    on(event: 'add', cb: (e: CustomEvent) => void): this;
    on(event: 'remove' | 'dblclick', cb: (e: CustomEvent<{ tag: Node, index: number, data: TagData }>) => void): this;
    on(event: 'invalid', cb: (e: CustomEvent<{ tag: Node, data: TagData, message: boolean }>) => void): this;
    on(event: 'input', cb: (e: CustomEvent<{ value: string, inputElm: HTMLInputElement }>) => void): this;
    on(event: 'click', cb: (e: CustomEvent<{ tag: Node, index: number, data: TagData, originalEvent: MouseEvent }>) => void): this;
    on(event: 'keydown' | 'edit:keydown', cb: (e: CustomEvent<{ originalEvent: KeyboardEvent }>) => void): this;
    on(event: 'focus' | 'blur', cb: (e: CustomEvent<{ relatedTarget: Element }>) => void): this;
    on(event: 'edit:input', cb: (e: CustomEvent<{
      tag: Node, index: number, data: TagData & { newValue: string },
      originalEvent: Event
    }>) => void): this;

  }

}
