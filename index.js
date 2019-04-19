'use strict';

// Объект для доступа к классам и id элементов.
const DOMstrings = {
  newSearch: '.new_search',
  searchBar: '.search_bar',
  fieldInp: '.field_inp',
  operationInp: '.operation_inp',
  userInp: '.user_inp',
  addBtn: 'add_btn',
  applyBtn: 'apply_btn',
  clearBtn: 'clear_btn',
  delBtn: '.del_btn',
  codeTag: 'result',
};

// HTML формы
const searchBar = document.querySelector(DOMstrings.searchBar);
const codeTag = document.getElementById(DOMstrings.codeTag);

// Кнопки
const addBtn = document.getElementById(DOMstrings.addBtn);
const clearBtn = document.getElementById(DOMstrings.clearBtn);
const applyBtn = document.getElementById(DOMstrings.applyBtn);

// Поля и строки ввода
const filter = () => document.querySelectorAll(DOMstrings.newSearch);
const deleteCount = () => document.querySelectorAll(DOMstrings.delBtn);
const fieldInp = () => document.querySelectorAll(DOMstrings.fieldInp);
const userInp = () => document.querySelectorAll(DOMstrings.userInp);
const operationInp = () => document.querySelectorAll(DOMstrings.operationInp);

// Объект, содержащий значение <option> для того или иного типа <select>
const optionValue = {
  text_field: ['Containing', 'Exactly matching', 'Begins with', 'Ends with'],
  number_field: ['Equal', 'Greater than', 'Less than'],
};

// Первоначальный объект для получения и вывода данных.
const optionData = {
  text: [],
  number: [],
};

// ФУНКЦИЯ добавления новой строки с фильтрами. Проверяет длину на не более 10 строк.
function addFilter() {
  const filterCount = filter();

  if (filterCount.length < 10) {
    searchBar.insertAdjacentHTML('beforeend', `
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
  deleteBtn();
  changeField(fieldInp(), userInp());
}

// ФУНКЦИЯ проверки колличества строк ввода, отобразить кнопки "удалить"
function deleteBtn() {
  const delCount = deleteCount();

  for (let i = 0; i < delCount.length; i++) {
    if (delCount.length > 1) {
      delCount[i].style.visibility = 'visible';
    } else {
      delCount[i].style.visibility = 'hidden';
    }

    delCount[i].addEventListener('click', (ev) => {
      ev.target.parentElement.remove();
      deleteBtn();
    });
  }
}


// ФУНКЦИЯ проверки значения (тип данных) первого <select>. Добавлением <option> в зависимости от его значения.
function changeField(fieldInp, userInp) {
  for (let i = 0; i < fieldInp.length; i++) {
    // Привязка target ко второму <select> и пользовательскому <input>
    fieldInp[i].addEventListener('change', (ev) => {
      const optionEl = ev.target.nextElementSibling;
      const userEl = ev.target.nextElementSibling.nextElementSibling;

      // Обнуляем при "change" значения <option> и <input>
      optionEl.innerHTML = '';
      userEl.value = '';

      const ind = fieldInp[i].value;

      userInp[i].type = (ind === 'number_field') ? 'number' : 'text';

      for (let x = 0; x < optionValue[ind].length; x++) {
        const opt = new Option(optionValue[ind][x], optionValue[ind][x], false, false);
        optionEl.add(opt);
      }
    });
  }
}


/* ФУНКЦИЯ очистки формы вывода JSON и сам объект вывода. */
function clearState() {
  optionData.text = [];
  optionData.number = [];
  codeTag.innerHTML = '';
}

// ФУНКЦИЯ полной очистки фильтра (удалить строки, обнулить optionData с выводом)
function clearFilter() {
  const filterRow = filter();
  filterRow.forEach((el) => {
    el.remove();
  });

  clearState();
  addFilter();
}

// ФУНКЦИЯ вывода данных фильтра в формате JSON.
function sendForm(fieldInp, userInp, operationInp) {
  for (let i = 0; i < fieldInp.length; i++) {
    const optionObject = {
      operation: operationInp[i].value.toLowerCase(),
      value: userInp[i].value.toLowerCase(),
    };

    if (fieldInp[i].value === 'text_field') {
      optionData.text.push(optionObject);
    } else {
      optionData.number.push(optionObject);
    }
  }

  const strJSON = JSON.stringify(optionData, '', 2);

  console.log(strJSON);
  clearState();
  codeTag.innerHTML = strJSON;
}


// Добавить новое поле, проверить первый селект на значение, проверит длину массива кнопок удаления, отобразить кнопки удаления.
addBtn.addEventListener('click', () => {
  addFilter();
});

// Очистить все строчки, обновить (добавить повторно) первую строку, запустить обработчик значения первого селекта.
clearBtn.addEventListener('click', () => {
  clearFilter();
});

// Отправить (отобразить) заполненную форму в HTML и в консоли в формате JSON
applyBtn.addEventListener('click', () => {
  sendForm(fieldInp(), userInp(), operationInp());
});

// При загрузке страницы браузера добавить первую строку и проверить ее значение.
window.onload = changeField(fieldInp(), userInp());
