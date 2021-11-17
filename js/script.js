const form = document.getElementById('form')
const login = document.getElementById('login')
const email = document.getElementById('email')
const password = document.getElementById('password')
const passwordRepeat = document.getElementById('passwordRepeat')

const showError = (input, message) => {
    const formField = input.parentElement
    formField.className = 'form__field error'
    const small = formField.querySelector('small')
    small.innerHTML = message
    small.style.visibility = 'visible'
}
const showSuccess = (input) => {
    const formField = input.parentElement
    formField.className = 'form__field success'
    formField.querySelector('small').style.visibility = 'hidden'
}

const checkEmail = (input) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(input.value).toLowerCase())) {
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

// Проверка мин длины
const checkInputLenght = (inputs, min) => {
    inputs.forEach((input) => {
        if (input.value.length < min && input.value.length > 0) showError(input, `Поле «${input.name}» должно содержать не менее ${min} символов`)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault() // Отменяем дефолтное поведение

    // Проверяем все инпуты на пустоту
    checkRequired([login, password, passwordRepeat])

    // Проверяем все инпуты на количество символов
    checkInputLenght([login, password, passwordRepeat], 5)
    
    // Проверка поля email
    checkEmail(email)
})