import type { PillsI } from "../types/pills";

export const mySupplements: PillsI[] = [
  {
    id: "vitamin_d3_k2",
    name: "Витамин D3 + K2",
    dosage: "D3 (5000 IU) + K2",
    timeOfDay: "morning",
    timeDescription: "Утро (после завтрака)",
    withFood: true,
    foodDetails: "D3 лучше усваивается с пищей, содержащей жиры",
    importantNotes:
      "K2 направляет кальций в кости, а не в сосуды. Принимать их вместе — обязательно.",
    comboWith: [],
    order: 1,
  },
  {
    id: "omega_3",
    name: "Омега-3",
    dosage: "по инструкции",
    timeOfDay: "morning",
    timeDescription: "Утро (после завтрака)",
    withFood: true,
    foodDetails:
      "с жирной пищей для лучшего усвоения и чтобы избежать рыбной отрыжки",
    order: 2,
  },
  {
    id: "zinc",
    name: "Цинк",
    dosage: "по инструкции",
    timeOfDay: "lunch",
    timeDescription: "Обед (после еды)",
    withFood: true,
    importantNotes:
      "НИКОГДА на пустой желудок — вызовет тошноту. Лучше с белковой пищей.",
    order: 3,
  },
  {
    id: "creatine",
    name: "Креатин",
    dosage: "5 г",
    timeOfDay: "before_workout",
    timeDescription: "За 30-60 мин. до тренировки",
    withFood: false,
    foodDetails: "Можно смешать с соком (простые углеводы улучшают усвоение)",
    importantNotes: "Заряжает мышцы энергией",
    order: 4,
  },
  {
    id: "protein",
    name: "Протеин",
    dosage: "1 порция",
    timeOfDay: "after_workout",
    timeDescription: "Сразу после тренировки",
    withFood: false,
    importantNotes:
      "Закрывает «белково-углеводное окно», запускает восстановление мышц",
    order: 5,
  },
  {
    id: "vitamin_e",
    name: "Витамин Е",
    dosage: "по инструкции",
    timeOfDay: "evening",
    timeDescription: "Вечер (с ужином)",
    withFood: true,
    foodDetails: "Жирорастворимый витамин, поэтому тоже пьём с едой",
    order: 6,
  },
];
