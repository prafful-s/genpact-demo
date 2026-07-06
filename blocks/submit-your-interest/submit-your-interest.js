const formFields = [
  {
    name: 'firstName',
    label: 'First name',
    type: 'text',
    autocomplete: 'given-name',
    required: true,
  },
  {
    name: 'lastName',
    label: 'Last name',
    type: 'text',
    autocomplete: 'family-name',
    required: true,
  },
  {
    name: 'businessEmail',
    label: 'Business email',
    type: 'email',
    autocomplete: 'email',
    required: true,
  },
  {
    name: 'businessPhone',
    label: 'Business phone',
    type: 'tel',
    autocomplete: 'tel',
    required: true,
  },
  {
    name: 'jobTitle',
    label: 'Job title or role',
    required: true,
    options: [
      'Executive',
      'Director',
      'Manager',
      'Individual contributor',
      'Consultant',
      'Other',
    ],
  },
  {
    name: 'department',
    label: 'Department',
    required: true,
    options: [
      'Marketing',
      'Sales',
      'IT',
      'Operations',
      'Customer experience',
      'Other',
    ],
  },
  {
    name: 'organizationName',
    label: 'Organization name',
    type: 'text',
    autocomplete: 'organization',
    required: true,
  },
  {
    name: 'country',
    label: 'Country',
    required: true,
    options: [
      'United States',
      'India',
      'United Kingdom',
      'Germany',
      'Singapore',
      'Australia',
      'Other',
    ],
  },
  {
    name: 'postalCode',
    label: 'ZIP/postal code',
    type: 'text',
    autocomplete: 'postal-code',
    required: true,
  },
  {
    name: 'primaryProduct',
    label: 'Primary product of interest',
    required: true,
    options: [
      'Adobe Experience Platform',
      'Adobe Analytics',
      'Adobe Real-Time CDP',
      'Adobe Journey Optimizer',
      'Adobe Target',
      'Other',
    ],
  },
];

function getAuthoredValue(block, name, fallback = '') {
  const field = block.querySelector(`[data-aue-prop="${name}"]`);
  return field?.textContent.trim() || fallback;
}

function createField(field) {
  const fieldId = `submit-your-interest-${field.name}`;
  const wrapper = document.createElement('div');
  wrapper.className = 'submit-your-interest-field';

  const label = document.createElement('label');
  label.htmlFor = fieldId;
  label.textContent = field.required ? `${field.label}*` : field.label;

  let control;

  if (field.options) {
    control = document.createElement('select');

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = field.required ? `${field.label}*` : field.label;
    placeholder.disabled = true;
    placeholder.selected = true;
    control.append(placeholder);

    field.options.forEach((optionLabel) => {
      const option = document.createElement('option');
      option.value = optionLabel;
      option.textContent = optionLabel;
      control.append(option);
    });
  } else {
    control = document.createElement('input');
    control.type = field.type || 'text';
    control.placeholder = field.required ? `${field.label}*` : field.label;

    if (field.autocomplete) {
      control.autocomplete = field.autocomplete;
    }
  }

  control.id = fieldId;
  control.name = field.name;
  control.required = field.required;
  control.setAttribute('aria-label', field.required ? `${field.label} required` : field.label);

  wrapper.append(label, control);
  return wrapper;
}

function showToast(block, message) {
  const currentToast = block.querySelector('.submit-your-interest-toast');

  if (currentToast) {
    currentToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'submit-your-interest-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = message;
  block.append(toast);

  window.setTimeout(() => toast.classList.add('visible'), 0);
  window.setTimeout(() => {
    toast.classList.remove('visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 3200);
}

export default function decorate(block) {
  const heading = getAuthoredValue(
    block,
    'heading',
    'Let us show you the full power of Adobe Experience Platform.',
  );
  const submitLabel = getAuthoredValue(block, 'submitLabel', 'Submit');
  const toastMessage = getAuthoredValue(
    block,
    'toastMessage',
    'Thank you. Your information has been submitted.',
  );

  const title = document.createElement('h2');
  title.className = 'submit-your-interest-title';
  title.textContent = heading;

  const formPanel = document.createElement('div');
  formPanel.className = 'submit-your-interest-panel';

  const form = document.createElement('form');
  form.noValidate = true;

  const grid = document.createElement('div');
  grid.className = 'submit-your-interest-grid';
  formFields.forEach((field) => grid.append(createField(field)));

  const actions = document.createElement('div');
  actions.className = 'submit-your-interest-actions';

  const submit = document.createElement('button');
  submit.className = 'button submit-your-interest-submit';
  submit.type = 'submit';
  submit.textContent = submitLabel;

  actions.append(submit);
  form.append(grid, actions);
  formPanel.append(form);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    showToast(block, toastMessage);
    form.reset();
  });

  block.replaceChildren(title, formPanel);
}