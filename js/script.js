// Init 
const form = document.getElementById('form')
const login = document.getElementById('login')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const password = document.getElementById('password')
const passwordRepeat = document.getElementById('passwordRepeat')
const checkbox = document.getElementById('checkbox')

// Счётчик ошибок в полях
let error = 0

// Ошибочное заполнение формы
const showError = (input, message) => {
    const formField = input.parentElement
    formField.classList.remove('success')
    formField.classList.add('error')
    const small = formField.querySelector('small')
    small.innerHTML = message
    small.style.visibility = 'visible'
    return error++
}

// Успешное заполнение формы
const showSuccess = (input) => {
    const formField = input.parentElement
    formField.classList.remove('error')
    formField.classList.add('success')
    formField.querySelector('small').style.visibility = 'hidden'
}

// Проверка введёной почты
const checkEmail = (input) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(input.value.trim()).toLowerCase())) {
        showSuccess(input)
    } else {
        showError(input, 'Введите корректный email')
    }
}

// Проверка на пустоту
const checkRequired = (inputs) => {
    inputs.forEach((input) => {
        if (input.value.trim() === '') showError(input, `${input.name} - обязательное поле`)
        else showSuccess(input)
    })
}

// Проверка минимальной длины поля
const checkInputLenght = (inputs, min) => {
    inputs.forEach((input) => {
        if (input.value.length < min && input.value.length != 0) showError(input, `Поле «${input.name}» должно содержать не менее ${min} символов`)
    })
}

// Сравнение паролей
const checkPasswordMatch = (password, passwordRepeat) => {
    if (password.value !== passwordRepeat.value) {
        showError(password, 'Пароли не совпадают')
        showError(passwordRepeat, 'Пароли не совпадают')
    }
}

// Нажат ли checkbox
const isChecked = (input) => {
    if (input.checked === true) showSuccess(input)
    else showError(input, 'Нужно согласиться на обработку персональных данных')
}

// Observer submit
form.addEventListener('submit', (e) => {
    // Отменяем дефолтное поведение
    e.preventDefault()

    // Обнуляем кол-во ошибок
    error = 0

    // Валидируем форму
    formValidate()

    // Если ошибок нет, отправляем форму
    if (error === 0) {
        alert('Ошибок нет, форму отправляем на сервер')
        // const formData = new FormData(form);
    }

})

//Form validation
const formValidate = () => {

    // Проверяем все инпуты на пустоту
    checkRequired([login, phone, password, passwordRepeat])

    // Проверяем все инпуты на количество символов
    checkInputLenght([login, phone, password, passwordRepeat], 5)

    // Сравнение паролей
    checkPasswordMatch(password, passwordRepeat)

    // Валидация поля email
    checkEmail(email)

    // Проверка нажатого checkbox
    isChecked(checkbox)

}

// Обработчик поля телефон. Запрет на ввод букв
phone.oninput = function (e) {
    this.value = this.value.replace(/[A-Za-zA-Яа-яЁё]/g, '');
}
