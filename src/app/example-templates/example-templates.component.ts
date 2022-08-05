import { Component, OnInit } from '@angular/core';
import { TagifySettings } from '@yaireo/tagify';

interface UserTag {
  value: string;
  name: string;
  avatar: string;
  email: string;
  team: string;
}

@Component({
  selector: 'app-example-templates',
  templateUrl: './example-templates.component.html',
  styleUrls: ['./example-templates.component.css']
})
export class ExampleTemplatesComponent implements OnInit {

  settings: TagifySettings<UserTag> = {
    tagTextProp: 'name',
    skipInvalid: true,
    dropdown: {
      closeOnSelect: false,
      enabled: 0,
      classname: 'users-list',
      searchKeys: ['name', 'email']
    },
    templates: {
      tag(tagData) {
        return `
          <tag title="${tagData.email}"
                contenteditable='false'
                spellcheck='false'
                tabIndex="-1"
                class="tagify__tag"
                ${this.getAttributes(tagData)}>
            <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
            <div>
                <div class='tagify__tag__avatar-wrap'>
                    <img src="${tagData.avatar}">
                </div>
                <span class='tagify__tag-text'>${tagData.name}</span>
            </div>
        </tag>
        `;
      },
      dropdownItem(tagData) {
        return `
          <div ${this.getAttributes(tagData)}
            class='tagify__dropdown__item'
            tabindex="0"
            tagifySuggestionIdx="${tagData.value}"
            role="option">
            ${ tagData.avatar ? `
                <div class='tagify__dropdown__item__avatar-wrap'>
                    <img src="${tagData.avatar}">
                </div>` : ''
        }
            <strong>${tagData.name}</strong>
            <span>${tagData.email}</span>
        </div>
        `;
      },
      dropdownHeader(suggestions) {
        return `
          <header data-selector='tagify-suggestions-header' class="${this.settings.classNames.dropdownItem} ${this.settings.classNames.dropdownItem}__addAll">
            <div>
                <strong>${this.value.length ? `Add Remaning` : 'Add All'}</strong>
                <a class='remove-all-tags'>Remove all</a>
            </div>
            <span>${suggestions.length} members</span>
        </header>
        `;
      }
    },
    transformTag: (tagData) => {
      const { name, email } = this.parseFullValue(tagData.name);
      tagData.name = name;
      tagData.email = email || tagData.email;
    },
    validate: ({ name, email }) => {
      if (!email && name) {
        const parsed = this.parseFullValue(name);
        name = parsed.name;
        email = parsed.email;
      }

      if (!name) { return 'Missing name'; }
      if (!this.validateEmail(email)) { return 'Invalid email'; }

      return true;
    },
    callbacks: {
      'dropdown:show': (event) => {
        console.log(event);
      },
      'dropdown:select': (event) => {
        const tagify = event.detail.tagify;
        if (
          event.detail.event instanceof MouseEvent &&
          (event.detail.event.target as HTMLElement).matches('.remove-all-tags')
        ) {
          tagify.removeAllTags();
        } else if (event.detail.elm.classList.contains(`${tagify.settings.classNames.dropdownItem}__addAll`)) {
          tagify.dropdown.selectAll();
        }
      },
      'edit:start': (event) => {
        event.detail.tagify.setTagTextNode(
          event.detail.tag,
          `${event.detail.data.name} ${event.detail.data.email}`
        );
      },
    },
    whitelist: [
      {
        value: '1',
        name: 'Justinian Hattersley',
        avatar: 'https://i.pravatar.cc/80?img=1',
        email: 'jhattersley0@ucsd.edu',
        team: 'A'
      },
      {
        value: '2',
        name: 'Antons Esson',
        avatar: 'https://i.pravatar.cc/80?img=2',
        email: 'aesson1@ning.com',
        team: 'B'
      },
      {
        value: '3',
        name: 'Ardeen Batisse',
        avatar: 'https://i.pravatar.cc/80?img=3',
        email: 'abatisse2@nih.gov',
        team: 'A'
      },
      {
        value: '4',
        name: 'Graeme Yellowley',
        avatar: 'https://i.pravatar.cc/80?img=4',
        email: 'gyellowley3@behance.net',
        team: 'C'
      },
      {
        value: '5',
        name: 'Dido Wilford',
        avatar: 'https://i.pravatar.cc/80?img=5',
        email: 'dwilford4@jugem.jp',
        team: 'A'
      },
      {
        value: '6',
        name: 'Celesta Orwin',
        avatar: 'https://i.pravatar.cc/80?img=6',
        email: 'corwin5@meetup.com',
        team: 'C'
      },
      {
        value: '7',
        name: 'Sally Main',
        avatar: 'https://i.pravatar.cc/80?img=7',
        email: 'smain6@techcrunch.com',
        team: 'A'
      },
      {
        value: '8',
        name: 'Grethel Haysman',
        avatar: 'https://i.pravatar.cc/80?img=8',
        email: 'ghaysman7@mashable.com',
        team: 'B'
      },
      {
        value: '9',
        name: 'Marvin Mandrake',
        avatar: 'https://i.pravatar.cc/80?img=9',
        email: 'mmandrake8@sourceforge.net',
        team: 'B'
      },
      {
        value: '10',
        name: 'Corrie Tidey',
        avatar: 'https://i.pravatar.cc/80?img=10',
        email: 'ctidey9@youtube.com',
        team: 'A'
      },
      {
        value: '11',
        name: 'foo',
        avatar: 'https://i.pravatar.cc/80?img=11',
        email: 'foo@bar.com',
        team: 'B'
      },
      {
        value: '12',
        name: 'foo',
        avatar: 'https://i.pravatar.cc/80?img=12',
        email: 'foo.aaa@foo.com',
        team: 'A'
      }
    ]
  };


  constructor() { }

  ngOnInit(): void {
  }

  private validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private parseFullValue(value: string) {
    const parts = value.split(/<(.*?)>/g);
    const name = parts[0].trim();
    const email = parts[1]?.replace(/<(.*?)>/g, '').trim();

    return { name, email };
  }

}
