// Объект для доступа к классам и id элементов.
// Данный вид объекта позволяет в случае изменения классов/id в HTML поменять значение ключа только в данном объекте.
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
// Данная реализация позволяет передавать функциям в качестве аргумента массив, не дублируя код с обращением к DOM элементу
// Spread оператор преобразует HTMLCollection в массив.
function newSearch() {
  let new_search_field = document.querySelectorAll(DOMstrings.new_search_field);
  let newSearch = [...new_search_field];
  return newSearch;
}

// Функция возвращает массив строк, состоящий из всех первых селектов. (Селект с выбором типа значений)
// Данная реализация позволяет передавать функциям в качестве аргумента массив, не дублируя код с обращением к DOM элементу
// Spread оператор преобразует HTMLCollection в массив.
function fieldInp() {
  let field_inp = document.querySelectorAll(DOMstrings.field_inp);
  let fieldInp = [...field_inp];
  return fieldInp;
}


// Функция возвращает массив строк, состоящий из всех <input> для пользовтаельского ввода.
// Данная реализация позволяет передавать функциям в качестве аргумента массив, не дублируя код с обращением к DOM элементу
// Spread оператор преобразует HTMLCollection в массив.
function userInp() {
  let user_inp = document.querySelectorAll(DOMstrings.user_inp);
  let userInp = [...user_inp];
  return userInp;
}

// Функция возвращает массив строк, состоящий из всех вторых селектов (Селект с выбором операции).
// Данная реализация позволяет передавать функциям в качестве аргумента массив, не дублируя код с обращением к DOM элементу
// Spread оператор преобразует HTMLCollection в массив.
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


// ФУНКЦИЯ добавления новой строки с фильтрами.
function addFilter(newSearch) {
  // Принимаем массив всех строк фильтра.
  // Если длина всех строк меньше 10, то позволить добавить новый элемент.
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
  // Получаем массив всех первых <select> и всех <input> пользовательского ввода.
  for (let i = 0; i < fieldInp.length; i++) {
    // Навешиваем событие "change" при каждом переключении значения первого <select>.
    // Назначаем в анонимной функции две переменных, содержащих привязку target ко второму <select> и пользовательскому <input>
    fieldInp[i].addEventListener('change', (ev) => {
      let optionEl = ev.target.nextElementSibling;
      let userEl = ev.target.nextElementSibling.nextElementSibling;

      // Обнуляем при "change" значения <option> и <input>
      optionEl.innerHTML = '';
      userEl.value = '';

      // Значение каждого первого <select>
      let ind = fieldInp[i].value;

      // Выставляем значение "type" тега <input> в зависимости от значения первого <select>
      if (ind === 'number_field') {
        userInp[i].type = 'number';
      } else {
        userInp[i].type = 'text';
      }

      // Добавляем новые <option> в <select> операций в зависимости от значения первого <select>
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

  // Кнопка создается изначально с каждым новым полем. По умолчанию она скрыта посредством CSS.
  // Если кнопок больше 1 - отобразить. Иначе скрыть.
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

  // Каждой кнопке навешивается событие 'click' с функцией, удаляющей родительский элемент (строку фильтра).
  // После удаления повторно вызываем функцию проверки видимости кнопок.
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

  /* ОПЦИОНАЛЬНО! Очистить форму вывода JSON и сам объект вывода. */
  clearState();
}

// ФУНКЦИЯ вывода данных фильтра в формате JSON.
function sendForm(fieldInp, userInp, operationInp) {
  /* ОПЦИОНАЛЬНО! При отправке данных посредством формы обернуть всю конструкцию в тег <form> и в атрибутах html тега <input> выставить required. Это не позволит отправить форму на сервер, если данное поле не заполнено. */

  // Проверка первого <select> на значение.
  // Добавляем в объект state массив с ключом "text" или "number"
  // Используем "toLowerCase()" для получения данных в одном формате (нижнем регистре) для исключения ошибок в дальнейшем при необходимости сравнения полученных данных.
  for (let i = 0; i < fieldInp.length; i++) {
    if (fieldInp[i].value === 'text_field') {
      state.text.push({ operation: operationInp[i].value.toLowerCase(), value: userInp[i].value.toLowerCase() });
    } else {
      state.number.push({ operation: operationInp[i].value.toLowerCase(), value: userInp[i].value.toLowerCase() });
    }
  }

  // Пользовательский вывод данный в формате JSON в консоль и HTML.
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
