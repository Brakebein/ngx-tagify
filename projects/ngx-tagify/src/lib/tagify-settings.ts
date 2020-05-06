export interface TagifySettings {
  placeholder?: string;
  delimiters?: string;
  pattern?: string;
  mode?: string;
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
  editTags?: number;
  templates?: {
    wrapper?: (input: any, settings: TagifySettings) => string;
    tag?: (value: string, tagData: any) => string;
    dropdown: (settings: TagifySettings) => string;
    dropdownItem: (item: any) => string;
  };
  transformTag?: (item: any) => any;
  keepInvalidTags?: boolean;
  skipInvalid?: boolean;
  backspace?: boolean;
  originalInputValueFormat?: () => string;
  dropdown?: {
    enabled?: number;
    maxItems?: number;
    classname?: string;
    fuzzySearch?: boolean;
    accentedSearch?: boolean;
    position?: string;
    highlightFirst?: boolean;
    closeOnSelect?: boolean;
    mapValueTo?: string | ((data: any) => string);
    searchKeys?: string[];
  };
}
