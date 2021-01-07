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
    whitelist?: string[]|TagData[];
    blacklist?: string[];
    addTagOnBlur?: boolean;
    callbacks?: { [key: string]: (...args: any[]) => void };
    maxTags?: number;
    editTags?: 2 | 1 | false | null;
    templates?: {
      wrapper?: (input: HTMLInputElement, settings: TagifySettings) => string;
      tag?: (tagData: TagData) => string;
      dropdown?: (settings: TagifySettings) => string;
      dropdownItem?: (item: TagData) => string;
    };
    transformTag?: (tagData: TagData) => void;
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
    addTags(tags: string | string[] | TagData[], clearInput?: boolean, skipInvalid?: boolean): Node|Node[];

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
    on(event: 'add' | 'remove' | 'dblclick' | 'edit:beforeUpdate' | 'edit:updated', cb: (e: CustomEvent<{
      tagify: Tagify, tag: Node, index?: number, data?: TagData
    }>) => void): this;
    on(event: 'invalid', cb: (e: CustomEvent<{
      tagify: Tagify, tag: Node, index?: number, data: TagData, message: boolean
    }>) => void): this;
    on(event: 'input', cb: (e: CustomEvent<{
      tagify: Tagify, value: string, inputElm: any
    }>) => void): this;
    on(event: 'click', cb: (e: CustomEvent<{
      tagify: Tagify, tag: Node, index: number, data: TagData, originalEvent: MouseEvent
    }>) => void): this;
    on(event: 'keydown' | 'edit:keydown', cb: (e: CustomEvent<{ tagify: Tagify, originalEvent: KeyboardEvent }>) => void): this;
    on(event: 'focus' | 'blur', cb: (e: CustomEvent<{
      tagify: Tagify, relatedTarget: Element
    }>) => void): this;
    on(event: 'edit:start', cb: (e: CustomEvent<{
      tagify: Tagify, tag: Node, index: number, data: TagData, isValid: boolean
    }>) => void): this;
    on(event: 'edit:input', cb: (e: CustomEvent<{
      tagify: Tagify, tag: Node, index: number, data: TagData & { newValue: string }, originalEvent: Event
    }>) => void): this;
    on(event: 'dropdown:show' | 'dropdown:hide' | 'dropdown:updated', cb: (e: CustomEvent<{
      tagify: Tagify, dropdown: Element
    }>) => void): this;
    on(event: 'dropdown:scroll', cb: (e: CustomEvent<{
      tagify: Tagify, percentage: number
    }>) => void): this;
    on(event: 'dropdown:select', cb: (e: CustomEvent<{
      tagify: Tagify, value: string;
    }>) => void): this;

  }

}
