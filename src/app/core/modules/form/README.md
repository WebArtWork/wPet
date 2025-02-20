# ngx-form

## Step 1: Installation

### In root/client you write:

```
waw add ngx-form
```

## Step 2: Import FormsService

### In page.module.ts you must imported:

```
import { FormService } from 'src/app/modules/forms/form.service';

	constructor(public fm: FormService) {}
}
```

## Step 3: Use button, and modal function

### In page.component.html you write this code outside of others:

```
<button (click)='fm.modal(form)'>+</button>
```
