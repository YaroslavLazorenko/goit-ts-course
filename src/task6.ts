function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

@Logger
class Controller {
  public id = 1;
}

//////////////////////////////

function Logger2(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@Logger2("LOGGING - CONTROLLER")
class Controller2 {
  public id = 1;
}

////////////////////////

function Logger3(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function AddProperty() {
  return function (constructor: Function) {
    console.log("Modify");
    constructor.prototype.modify = true;
  };
}

@Logger3("LOGGING - CONTROLLER")
@AddProperty()
class Controller3 {
  public id = 1;
  public modify?: boolean;
}

const controller = new Controller3();

console.log("Modified classes", controller.modify);

//////////////////////////////////////////

interface IDecoration {
  parent: string;
  template: string;
}

function ControllerDecoration(config: IDecoration) {
  return function (constructor: any) {
    const current = new constructor();
    const getParent = document.getElementById(config.parent)!;
    const createElement = document.createElement(config.template);

    createElement.innerHTML = current.content;

    constructor.prototype.element = createElement;
    constructor.prototype.parent = getParent;

    getParent.appendChild(createElement);
  };
}

@ControllerDecoration({
  parent: "app",
  template: "H1",
})
class Controller4 {
  public content = "My custom controller";
}

//////////////////////////////////////////////////

interface IDecoration {
  parent: string;
  template: string;
}

function ControllerDecoration2(config: IDecoration) {
  return function <T extends { new (...args: any[]): { content: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      private element: HTMLElement;
      private parent: HTMLElement;
      constructor(...arg: any[]) {
        super(...arg);
        this.parent = document.getElementById(config.parent)!;
        this.element = document.createElement(config.template);

        this.element.innerHTML = this.content;

        this.parent.appendChild(this.element);
      }
    };
  };
}

@ControllerDecoration2({
  parent: "app",
  template: "H1",
})
class Controller5 {
  public content = "My custom controller";
}

const controller2 = new Controller5();
const controller3 = new Controller5();
const controller4 = new Controller5();
const controller5 = new Controller5();

//////////////////////////////////////////////////////////

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;

  return {
    configurable: true,
    enumerable: false,
    get() {
      return method.bind(this);
    },
  };
}

class Notifier {
  @AutoBind
  showMessage() {
    console.log("Show message");
  }
}

const notifier = new Notifier();

const showMessage2 = notifier.showMessage;

showMessage2();

function AddTax(taxPercent: number) {
  return (_: any, _2: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value as Function;

    return {
      configurable: true,
      enumerable: false,
      get() {
        return (...args: any[]) => {
          const result = method.apply(this, args);

          return result + (result / 100) * taxPercent;
        };
      },
    };
  };
}

class Payment {
  @AddTax(20)
  pay(money: number): number {
    return money;
  }
}

const payment = new Payment();

console.log("Amount with tax: ", payment.pay(100));

/////////////////////////////////////

function CheckEmail(target: any, name: string, position: number) {
  if (!target[name].validation) {
    target[name].validation = {};
  }
  Object.assign(target[name].validation, {
    [position]: (value: string) => {
      if (value.includes("@")) {
        return value;
      }
      throw new Error("No valid field");
    },
  });
}

function Validation(_: any, _2: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;

  return {
    configurable: true,
    enumerable: false,
    get() {
      return (...args: any[]) => {
        if (method.validation) {
          args.forEach((item, index) => {
            if (method.validation[index]) {
              args[index] = method.validation[index](item);
            }
          });
        }
        return method.apply(this, args);
      };
    },
  };
}

class Person2 {
  @Validation
  setEmail(@CheckEmail email: string) {
    console.log(email);
  }
}

const person2 = new Person2();

//person.setEmail("testgmail.com");

////////////////////////////////////////

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Person3 {
  @Required
  name: string;
  @PositiveNumber
  age: number;

  constructor(n: string, a: number) {
    this.name = n;
    this.age = a;
  }
}

const person3 = new Person3("Alex", 30);
const person4 = new Person3("", -1);

if (!validate(person)) {
  console.log("Validation error!");
} else {
  console.log("Validation ok!");
}
