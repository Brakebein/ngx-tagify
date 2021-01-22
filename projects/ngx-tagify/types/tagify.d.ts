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

    DOM: {
      dropdown: HTMLDivElement,
      input: HTMLSpanElement,
      originalInput: HTMLInputElement,
      scope: HTMLElement
    };

    dropdown: {
      /**
       * Shows the suggestions select box.
       * @param value - Filter the whitelist by this value (optional)
       */
      show(value?: string): void;
      /**
       * Hide the suggestions select box.
       */
      hide(force?: boolean): void;
      /**
       * Add all whitelist items as tags and close the suggestion dropdown.
       */
      selectAll(): void;
    };

    constructor(inputElement: HTMLInputElement, settings: TagifySettings);

    /**
     * Reverts the input element back as it was before Tagify was applied.
     */
    destroy(): void;

    /**
     * Removes all tags and resets the original input tag's value property.
     */
    removeAllTags(): void;

    /**
     * Parse and add tags.
     * @param tags - Accepts a String (word, single or multiple with a delimiter), an Array of Objects or Strings
     * @param clearInput - If true, the input's value gets cleared after adding tags
     * @param skipInvalid - If true, do not add, mark & remove invalid tags (defaults to Tagify settings)
     */
    addTags(tags: string | string[] | TagData[], clearInput?: boolean, skipInvalid?: boolean): Node|Node[];

    /**
     * Bypasses the normalization process in `addTags`, forcefully adding tags at the last caret
     * location or at the end, if there's no last caret location saved (at `tagify.state.selection`).
     * @param tags - Accepts a String (word, single or multiple with a delimiter), an Array of Objects or Strings
     */
    addMixTags(tags: string | string[] | TagData[]): void;

    /**
     * Remove single/multiple tags. When nothing passed, removes last tag.
     * @param tagElms - DOM element(s) or a String value
     * @param silent - A flag, which when turned on, does not remove any value and does not update
     * the original input value but simply removes the tag from tagify
     * @param tranDuration - Delay for animation, after which the tag will be removed from the DOM
     */
    removeTags(tagElms?: Node[] | Node | string, silent?: boolean, tranDuration?: number): void;

    /**
     * Create an empty tag (optionally with predefined data) and enters "edit" mode directly.
     */
    addEmptyTag(initialData?: {[key: string]: any}): void;

    /**
     * Converts the input's value into tags. This method gets called automatically when instantiating Tagify.
     * Also works for mixed-tags.
     */
    loadOriginalValues(value: string | string[]): void;

    /**
     * Return an array of found matching items (case-insensitive).
     */
    getWhitelistItem(value: TagData): TagData[];

    /**
     * Returns how many tags already exists with specific value.
     */
    isTagDuplicate(value: string | TagData, caseSensitive?: boolean): number;

    /**
     * Converts a string argument (`[[foo]] and [[bar]] are...`) into HTML with mixed tags & texts.
     */
    parseMixTags(value: string): string;

    /**
     * Return a DOM nodes list of all the tags.
     * @param classes - Filter by set of class names
     */
    getTagElms(...classes: string[]): HTMLElement[];

    /**
     * Return a specific tag DOM node by value.
     */
    getTagElmByValue(value: string): HTMLElement;

    /**
     * Return the indices of tags by value.
     */
    getTagIndexByValue(value: string): number[];

    /**
     * Set/get tag data on a tag element
     */
    tagData(tagElm: HTMLElement, data?: TagData): TagData;

    /**
     * Enters a tag into "edit" mode.
     * @param tagElm - The tag element to edit. If nothing specified, use the last one.
     */
    editTag(tagElm?: HTMLElement): void;

    /**
     * Replaces an existing tag with a new one. Used for updating a tag's data.
     */
    replaceTag(tagElm: HTMLElement, tagData: TagData): void;

    /**
     * Toggle loading state on/off (e.g. for AJAX whitelist pulling)
     */
    loading(isLoading: boolean): this;

    /**
     * Toggle specific tag loading state on/off.
     */
    tagLoading(tagElm: Node, isLoading: boolean): this;

    /**
     * Return a tag element from the supplied tag data.
     */
    createTagElem(tagData: TagData): HTMLElement;

    /**
     * Injects text or HTML node at last caret position,
     * which is saved on the "state" when "blur" event gets triggered.
     * @param injectedNode - The node to inject at the caret position
     * @param range - Optional range object, must have `anchorNode` and  `anchorOffset`
     */
    injectAtCaret(injectedNode: string | HTMLElement, range?: Selection): void;

    /**
     * Places the caret after a given node.
     */
    placeCaretAfterNode(node: HTMLElement): void;

    insertAfterTag(tagElm: HTMLElement, newNode: string | HTMLElement): HTMLElement;

    /**
     * Toggles class on the man tagify container (`scope`).
     */
    toggleClass(className: string, on: boolean): void;

    /**
     * Update `value` (array of objects) by traversing all valid tags.
     */
    updateValueByDOMTags(): void;

    /**
     * Converts a template string into a DOM node.
     * @param template - Select a template from the `settings.templates` by name or supply a template function which returns a string
     * @param data - Arguments passed to the template function
     */
    parseTemplate(template: string | ((...args: any) => string), data: any[]): HTMLElement;

    /**
     * Toggles "readonly" mode on/off.
     */
    setReadonly(isReadonly: boolean): void;

    /**
     * Add event listener
     */
    on(event: 'add' | 'remove' | 'dblclick' | 'edit:beforeUpdate' | 'edit:updated', cb: (e: CustomEvent<{
      tagify: Tagify, tag: HTMLElement, index?: number, data?: TagData
    }>) => void): this;
    on(event: 'invalid', cb: (e: CustomEvent<{
      tagify: Tagify, tag: HTMLElement, index?: number, data: TagData, message: boolean
    }>) => void): this;
    on(event: 'input', cb: (e: CustomEvent<{
      tagify: Tagify, value: string, inputElm: any
    }>) => void): this;
    on(event: 'click', cb: (e: CustomEvent<{
      tagify: Tagify, tag: HTMLElement, index: number, data: TagData, originalEvent: MouseEvent
    }>) => void): this;
    on(event: 'keydown' | 'edit:keydown', cb: (e: CustomEvent<{ tagify: Tagify, originalEvent: KeyboardEvent }>) => void): this;
    on(event: 'focus' | 'blur', cb: (e: CustomEvent<{
      tagify: Tagify, relatedTarget: Element
    }>) => void): this;
    on(event: 'edit:start', cb: (e: CustomEvent<{
      tagify: Tagify, tag: HTMLElement, index: number, data: TagData, isValid: boolean
    }>) => void): this;
    on(event: 'edit:input', cb: (e: CustomEvent<{
      tagify: Tagify, tag: HTMLElement, index: number, data: TagData & { newValue: string }, originalEvent: Event
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
