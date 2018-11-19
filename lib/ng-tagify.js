import { Injectable, Component, EventEmitter, Input, Output, ViewChild, NgModule } from '@angular/core';
import * as Tagify from '@yaireo/tagify';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TagifyService {
    constructor() { }
    /**
     * \@description Singleton used by TagifyComponent to a ref to tagify
     * @param {?} tagifyInputRef
     * @param {?} settings
     * @return {?} tagify instance
     */
    getTagifyRef(tagifyInputRef, settings) {
        if (arguments.length === 0)
            return;
        if (this.tagify)
            return this.tagify;
        this.tagify = new Tagify(tagifyInputRef, settings);
        return this.tagify;
    }
    /**
     * \@description removes all tags
     * @return {?}
     */
    removeAll() {
        this.tagify.removeAllTags();
    }
    /**
     * \@description add multiple tags
     * @param {?} tags
     * @return {?}
     */
    addTags(tags) {
        this.tagify.addTags(tags);
    }
    /**
     * \@description destroy dom and everything
     * @return {?}
     */
    destroy() {
        this.tagify.destroy();
    }
}
TagifyService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
TagifyService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

class TagifyComponent {
    /**
     * @param {?} tagifyService
     */
    constructor(tagifyService) {
        this.tagifyService = tagifyService;
        this.add = new EventEmitter(); // returns the added tag + updated tags list
        this.remove = new EventEmitter(); // returns the updated tags list
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.settings.callbacks = {
            add: () => this.add.emit({
                tags: this.tagify.value,
                added: this.tagify.value[this.tagify.value.length - 1]
            }),
            remove: () => this.remove.emit(this.tagify.value)
        };
        this.tagify = this.tagifyService.getTagifyRef(this.tagifyInputRef.nativeElement, this.settings);
    }
}
TagifyComponent.decorators = [
    { type: Component, args: [{
                selector: 'tagify',
                template: `<input #tagifyInputRef/>`,
                styles: [``]
            },] },
];
/** @nocollapse */
TagifyComponent.ctorParameters = () => [
    { type: TagifyService, },
];
TagifyComponent.propDecorators = {
    "add": [{ type: Output },],
    "remove": [{ type: Output },],
    "settings": [{ type: Input },],
    "tagifyInputRef": [{ type: ViewChild, args: ['tagifyInputRef',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TagifyModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: TagifyModule,
            providers: [TagifyService]
        };
    }
}
TagifyModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TagifyComponent],
                exports: [TagifyComponent],
                imports: [CommonModule],
                providers: [TagifyService],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { TagifyModule, TagifyComponent as ɵa, TagifyService as ɵb };
//# sourceMappingURL=ng-tagify.js.map
