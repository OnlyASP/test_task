// Объект для доступа к классам и id элементов.
const DOMstrings = {
  new_search_field: '.new_search',
  search_bar: '.search_bar',
  field_inp: '.field_inp',
  operation_inp: '.operation_inp',
  user_inp: '.user_inp',
  add_btn: 'add_btn',
  apply_btn: 'apply_btn',
  clear_btn: 'clear_btn',
  del_btn: '.del_btn',
  code_tag: 'result',
};

// HTML обертки
const search_bar = document.querySelector(DOMstrings.search_bar);
const code_tag = document.getElementById(DOMstrings.code_tag);

// Кнопки
const add_btn = document.getElementById(DOMstrings.add_btn);
const clear_btn = document.getElementById(DOMstrings.clear_btn);
const apply_btn = document.getElementById(DOMstrings.apply_btn);

// Функция возвращает массив строк, состоящий из всех полей ввода.
function newSearch() {
  let new_search_field = document.querySelectorAll(DOMstrings.new_search_field);
  let newSearch = [...new_search_field];
  return newSearch;
}

// Функция возвращает массив строк, состоящий из всех первых селектов. (Селект с выбором типа значений)
function fieldInp() {
  let field_inp = document.querySelectorAll(DOMstrings.field_inp);
  let fieldInp = [...field_inp];
  return fieldInp;
}

// Функция возвращает массив строк, состоящий из всех <input> для пользовтаельского ввода.
function userInp() {
  let user_inp = document.querySelectorAll(DOMstrings.user_inp);
  let userInp = [...user_inp];
  return userInp;
}

// Функция возвращает массив строк, состоящий из всех вторых селектов (Селект с выбором операции).
function operationInp() {
  let operation_inp = document.querySelectorAll(DOMstrings.operation_inp);
  let operationInp = [...operation_inp];
  return operationInp;
}

// Объект, содержащий значение <option> для того или иного типа <select>
const optionValue = {
  text_field: ['Containing', 'Exactly matching', 'Begins with', 'Ends with'],
  number_field: ['Equal', 'Greater than', 'Less than'],
};

// Первоначальный объект для получения и вывода данных.
let state = {
  text: [],
  number: [],
};


// ФУНКЦИЯ добавления новой строки с фильтрами. Проверяет длину на не более 10 строк.
function addFilter(newSearch) {
  if (newSearch.length < 10) {
    search_bar.insertAdjacentHTML('beforeend', `
      <div class="new_search">
        <select class="field_inp">
            <option value="text_field" selected>Text field</option>
            <option value="number_field">Number field</option>
        </select>
    
        <select class="operation_inp">
            <option value="Containing" selected>Containing</option>
            <option value="Exactly matching">Exactly matching</option>
            <option value="Begins with">Begins with</option>
            <option value="Ends with">Ends with</option>
        </select>
    
        <input type="text" name="user" class="user_inp" required>

        <button class="del_btn">&times;</button>
      </div>
    `);
  }
}

// ФУНКЦИЯ проверки значения (тип данных) первого <select>. Добавлением <option> в зависимости от его значения.
function changeField(fieldInp, userInp) {
  for (let i = 0; i < fieldInp.length; i++) {
    // Привязка target ко второму <select> и пользовательскому <input>
    fieldInp[i].addEventListener('change', (ev) => {
      let optionEl = ev.target.nextElementSibling;
      let userEl = ev.target.nextElementSibling.nextElementSibling;

      // Обнуляем при "change" значения <option> и <input>
      optionEl.innerHTML = '';
      userEl.value = '';

      let ind = fieldInp[i].value;

      if (ind === 'number_field') {
        userInp[i].type = 'number';
      } else {
        userInp[i].type = 'text';
      }

      for (let x = 0; x < optionValue[ind].length; x++) {
        let opt = new Option(optionValue[ind][x], optionValue[ind][x], false, false);
        optionEl.add(opt);
      }
    });
  }
}


// ФУНКЦИЯ определения видимости кнопки УДАЛИТЬ.
function visibleBtn() {
  let del_btn = document.querySelectorAll(DOMstrings.del_btn);
  let delBtn = [...del_btn];

  for (let i = 0; i < delBtn.length; i++) {
    if (delBtn.length > 1) {
      delBtn[i].style.visibility = 'visible';
    }
    if (delBtn.length === 1) {
      delBtn[i].style.visibility = 'hidden';
    }
  }
}


// ФУНКЦИЯ удаления единичной строки.
function deleteBtn() {
  let del_btn = document.querySelectorAll(DOMstrings.del_btn);
  let delBtn = [...del_btn];

  for (let i = 0; i < delBtn.length; i++) {
    delBtn[i].addEventListener('click', (ev) => {
      ev.target.parentElement.remove();
      visibleBtn();
    });
  }
}

/* ОПЦИОНАЛЬНО! ФУНКЦИЯ. Очистить форму вывода JSON и сам объект вывода. */
function clearState() {
  state = { text: [], number: [] };
  code_tag.innerHTML = '';
}

// ФУНКЦИЯ полной очистки фильтра (удалить строки, обнулить state с выводом)
function clearFilter(newSearch) {
  newSearch.forEach((el) => {
    el.remove();
  });

  /* ОПЦИОНАЛЬНО! */
  clearState();
}

// ФУНКЦИЯ вывода данных фильтра в формате JSON.
function sendForm(fieldInp, userInp, operationInp) {
  for (let i = 0; i < fieldInp.length; i++) {
    if (fieldInp[i].value === 'text_field') {
      state.text.push({ operation: operationInp[i].value.toLowerCase(), value: userInp[i].value.toLowerCase() });
    } else {
      state.number.push({ operation: operationInp[i].value.toLowerCase(), value: userInp[i].value.toLowerCase() });
    }
  }

  const strJSON = JSON.stringify(state, '', 2);

  console.log(strJSON);
  code_tag.innerHTML = strJSON;
}


// Вызов при нажатии. Добавить новое поле, проверить первый селект на значение, проверит длину массива кнопок удаления, отобразить кнопки удаления.
add_btn.addEventListener('click', () => {
  addFilter(newSearch());
  changeField(fieldInp(), userInp());
  visibleBtn();
  deleteBtn();
});

// Вызов при нажатии. Очистить все строчки, обновить (добавить повторно) первую строку, запустить обработчик значения первого селекта.
clear_btn.addEventListener('click', () => {
  clearFilter(newSearch());
  addFilter(newSearch());
  changeField(fieldInp(), userInp());
});

// Вызов при нажатии. Отправить (отобразить) заполненную форму в HTML и в консоли в формате JSON
apply_btn.addEventListener('click', () => {
  sendForm(fieldInp(), userInp(), operationInp());
});

// Загрузка страницы. При загрузке страницы браузера добавить первую строку и проверить ее значение.
window.onload = addFilter(newSearch());
changeField(fieldInp(), userInp());
