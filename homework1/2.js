"use strict";

/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.

Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк
*/

console.log("");
console.log("----------------------------------------");
console.log("Задание 2");
// Посетитель ресторана.
class Client {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

// Вам необходимо реализовать класс, который управляет заказами и поварами.
class Manager {
  constructor(chefs, dishes) {
    this.chefs = chefs;
    this.dishes = dishes;
    this.orderList = new Map();
  }
  createNewOrderObj(order) {
    const infoAboutOrder = {};
    infoAboutOrder.type = order.type;
    infoAboutOrder.name = order.name;
    infoAboutOrder.quantity = order.quantity;
    infoAboutOrder.chef = this.chefs.get(order.type);
    return infoAboutOrder;
  }
  setOrderList(client, orders) {
    const infoAboutOrders = [];
    for (const order of orders) {
      this.hasDish(order);
      infoAboutOrders.push(this.createNewOrderObj(order));
    }
    this.orderList.set(client, infoAboutOrders);
  }
  hasDish(order) {
    if (this.dishes.get(order.type).has(order.name)) {
      return true;
    } else {
      throw new Error("Такого блюда нет!");
    }
  }
  addNewOrderToExistClient(currentOrderArray, newOrderArray) {
    const newPositionsArray = newOrderArray.filter(
      (el) =>
        currentOrderArray.findIndex(
          (i) => i.name === el.name && i.type === el.type
        ) === -1
    );
    const repeatPositionsArray = newOrderArray.filter(
      (el) =>
        currentOrderArray.findIndex(
          (i) => i.name === el.name && i.type === el.type
        ) !== -1
    );

    if (repeatPositionsArray.length) {
      for (const repeatOrder of repeatPositionsArray) {
        if (this.hasDish(repeatOrder)) {
          for (const currentOrder of currentOrderArray) {
            if (
              currentOrder.type === repeatOrder.type &&
              currentOrder.name === repeatOrder.name
            ) {
              currentOrder.quantity += repeatOrder.quantity;
            }
          }
        }
      }
    }

    if (newPositionsArray.length) {
      for (const newPositon of newPositionsArray) {
        if (this.hasDish(newPositon)) {
          currentOrderArray.push(this.createNewOrderObj(newPositon));
        }
      }
    }
  }
  showClientOrder(client) {
    const orders = this.orderList.get(client);
    let ordersString = "";
    for (const order of orders) {
      const orderString = `${order.type} "${order.name}" - ${order.quantity}; готовит повар ${order.chef};
`
      ordersString += orderString;
    }
    return ordersString;
  }
  newOrder(client, ...orders) {
    if (this.orderList.has(client)) {
      this.addNewOrderToExistClient(this.orderList.get(client), orders);
    } else {
      this.setOrderList(client, orders);
    }
    console.log(`Клиент ${client.firstname} заказал:
${this.showClientOrder(client)}
    `);
  }
}

const chefSpecialization = new Map();
chefSpecialization
  .set("Пицца", "Олег")
  .set("Суши", "Андрей")
  .set("Десерт", "Анна");

const dishes = new Map();
dishes
  .set("Пицца", new Set().add("Маргарита").add("Пепперони").add("Три сыра"))
  .set(
    "Суши",
    new Set()
      .add("Филадельфия")
      .add("Калифорния")
      .add("Чизмаки")
      .add("Сеякемаки")
  )
  .set("Десерт", new Set().add("Тирамису").add("Чизкейк"));

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager(chefSpecialization, dishes);

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.
manager.newOrder(
  new Client("Иван", "Иванов"),
  { name: "Маргарита", quantity: 1, type: "Пицца" },
  { name: "Пепперони", quantity: 2, type: "Пицца" },
  { name: "Чизкейк", quantity: 1, type: "Десерт" },
);
// Вывод:
// Клиент Иван заказал:
// Пицца "Маргарита" - 1; готовит повар Олег
// Пицца "Пепперони" - 2; готовит повар Олег
// Десерт "Чизкейк" - 1; готовит повар Анна

// ---

const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
  clientPavel,
  { name: "Филадельфия", quantity: 5, type: "Суши" },
  { name: "Калифорния", quantity: 3, type: "Суши" },
);
// Вывод:
// Клиент Павел заказал:
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

manager.newOrder(
  clientPavel,
  { name: "Калифорния", quantity: 1, type: "Суши" },
  { name: "Тирамису", quantity: 2, type: "Десерт" },
);
// Вывод:
// Клиент Павел заказал:
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна

// manager.newOrder(
//   clientPavel,
//   { name: "Калифорния", quantity: 1, type: "Суши" },
//   { name: "Тирамису", quantity: 2, type: "Десерт" },
// );

// manager.newOrder(
//   clientPavel,
//   { name: "Калифорния", quantity: 1, type: "Суши" },
//   { name: "Тирамису", quantity: 2, type: "Десерт" },
// );

// manager.newOrder(
//   clientPavel,
//   { name: "Калифорния", quantity: 1, type: "Суши" },
//   { name: "Тирамису", quantity: 2, type: "Десерт" },
// );

manager.newOrder(
  clientPavel,
  { name: "Филадельфия", quantity: 1, type: "Суши" },
  { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" },
);
// Ничего не должно быть добавлено, должна быть выброшена ошибка:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.

// manager.newOrder(
//   clientPavel,
//   { name: "Маргарита", quantity: 1, type: "Пицца" },
//   { name: "Пепперони", quantity: 2, type: "Пицца" },
//   { name: "Чизкейк", quantity: 1, type: "Десерт" },
// );