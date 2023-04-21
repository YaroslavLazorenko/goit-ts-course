let age: number;
age = 50;

let name1: string;
name1 = "Max";

let toggle: boolean;
toggle = true;

let empty: null;
empty = null;

let notInitialize: undefined;
notInitialize = undefined;

let callback: (a: number) => number;
callback = (a) => {
  return 100 + a;
};

//

let anything: any;
anything = -20;
anything = "Text";
anything = {};

//

let some: unknown;
some = "Text";

let str: string;

if (typeof some === "string") {
  str = some;
}

//

let person: [string, number];
person = ["Max", 2];

//
enum Status {
  LOADING,
  READY,
}

let status1;

if (status1 === Status.LOADING) {
  console.log("The App is loading...");
}
if (status1 === Status.READY) {
  console.log("Done!");
}

//

let strnum: string | number;

strnum = 9;
strnum = "Aa!";

//

let literalStr: "enable" | "disable";

literalStr = "disable";
literalStr = "enable";

//
function showMessage(message: string): void {
  console.log(message);
}
showMessage("1");

function calc(num1: number, num2: number): number {
  return num1 + num2;
}
calc(1, 1);

function customError(): never {
  throw new Error("Error");
}

//
type Page = {
  title: string;
  likes: number;
  accounts: string[];
  status: "open" | "close";
  details?: {
    createAt: string;
    updateAt: string;
  };
};

const page1: Page = {
  title: "The awesome page",
  likes: 100,
  accounts: ["Max", "Anton", "Nikita"],
  status: "open",
  details: {
    createAt: "2021-01-01",
    updateAt: "2021-05-01",
  },
};

const page2 = {
  title: "Python or Js",
  likes: 5,
  accounts: ["Alex"],
  status: "close",
};
