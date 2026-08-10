(() => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    const emptyHint = document.getElementById('empty-hint');

    if (!form || !input || !list) return;

    const updateEmptyHint = () => {
        if (!emptyHint) return;
        emptyHint.hidden = list.children.length > 0;
    };

    const createTodoItem = (text) => {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const label = document.createElement('label');
        label.className = 'todo-label';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const span = document.createElement('span');
        span.textContent = text;

        checkbox.addEventListener('change', () => {
            span.classList.toggle('done', checkbox.checked);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-btn';
        deleteBtn.setAttribute('aria-label', 'Delete todo');
        deleteBtn.innerHTML = '&times;';

        label.append(checkbox, span);
        li.append(label, deleteBtn);
        return li;
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        list.append(createTodoItem(text));
        input.value = '';
        input.focus();
        updateEmptyHint();
    });

    updateEmptyHint();
})();
