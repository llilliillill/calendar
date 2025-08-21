import type { ILanguage, IDay } from './types.ts';

const languages: Record<string, ILanguage> = {
  ru: {
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  },
  en: {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  es: {
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    weekdays: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  },
  fr: {
    months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    weekdays: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  }
}

const date = ref<Date>(new Date())
const year = computed<number>(() => date.value.getFullYear())
const month = computed<number>(() => date.value.getMonth())
const input = ref<string>(getCurrentDate())
const select = ref<string>('ru')

// Имя месяца
const title = computed<string | undefined>(() => {
  return languages[select.value]?.months[month.value]
})

// Дни недели
const daysWeek = computed<string[] | undefined>(() => {
  return languages[select.value]?.weekdays
})

// Дни месяца
const days = computed<IDay[]>(() => {
  const firstDayOfMonth: Date = new Date(year.value, month.value, 1)
  const lastDayOfMonth: Date = new Date(year.value, month.value + 1, 0)
  const prevMonthLastDay: number = new Date(year.value, month.value, 0).getDate()
  const firstDayOfWeek: number = (firstDayOfMonth.getDay() + 6) % 7
  const days: IDay[] = []

  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({ 
      day: prevMonthLastDay - i, 
      date: new Date(year.value, month.value - 1, prevMonthLastDay - i)
    })
  }

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    days.push({ day: i, date: new Date(year.value, month.value, i) })
  }

  for (let i = 1; i <= (42 - days.length); i++) {
    days.push({ day: i, date: new Date(year.value, month.value + 1, i) })
  }

  return days
})

// Месяц назад
const back = (): void => {
  date.value = new Date(year.value, month.value - 1, 1)
}

// Месяц вперед
const next = (): void => {
  date.value = new Date(year.value, month.value + 1, 1)
}

// Изменить день
const changeDay = (): void => {
  const selectDay = new Date(input.value)
  date.value = new Date(selectDay.getFullYear(), selectDay.getMonth(), 1)
}

// Выбрать день
const selectDay = (value: Date) => {
  input.value = `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`
}

// Проверяем какой день активен
const isActive = (value: Date) => {
  const date = new Date(input.value)
  return value.getFullYear() === date.getFullYear() &&
         value.getMonth() === date.getMonth() &&
         value.getDate() === date.getDate();
}

// Получить текущую дату (YYYY-MM-DD)
function getCurrentDate (): string {
  return new Date().toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

export { 
  date, year, title, days, back, next, input, select,
  selectDay, daysWeek, changeDay, isActive, getCurrentDate
}