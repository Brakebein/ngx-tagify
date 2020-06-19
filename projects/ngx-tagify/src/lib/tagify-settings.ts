export interface TagifySettings {
  placeholder?: string;
  delimiters?: string|RegExp;
  pattern?: string;
  mode?: 'select'|'mix'|null;
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
  editTags?: 2|1|false|null;
  templates?: {
    wrapper?: (input: any, settings: TagifySettings) => string;
    tag?: (value: string, tagData: any) => string;
    dropdown?: (settings: TagifySettings) => string;
    dropdownItem?: (item: any) => string;
  };
  transformTag?: (item: any) => any;
  keepInvalidTags?: boolean;
  skipInvalid?: boolean;
  backspace?: boolean|'edit';
  originalInputValueFormat?: () => string;
  dropdown?: {
    enabled?: number|false;
    maxItems?: number;
    classname?: string;
    fuzzySearch?: boolean;
    accentedSearch?: boolean;
    position?: 'manual'|'text'|'input'|'all'|null;
    highlightFirst?: boolean;
    closeOnSelect?: boolean;
    mapValueTo?: string | ((data: any) => string);
    searchKeys?: string[];
  };
}
