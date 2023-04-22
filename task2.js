var age;
age = 50;
var name1;
name1 = "Max";
var toggle;
toggle = true;
var empty;
empty = null;
var notInitialize;
notInitialize = undefined;
var callback;
callback = function (a) {
    return 100 + a;
};
//
var anything;
anything = -20;
anything = "Text";
anything = {};
//
var some;
some = "Text";
var str;
if (typeof some === "string") {
    str = some;
}
//
var person;
person = ["Max", 2];
//
var Status;
(function (Status) {
    Status[Status["LOADING"] = 0] = "LOADING";
    Status[Status["READY"] = 1] = "READY";
})(Status || (Status = {}));
var status1;
if (status1 === Status.LOADING) {
    console.log("The App is loading...");
}
if (status1 === Status.READY) {
    console.log("Done!");
}
//
var strnum;
strnum = 9;
strnum = "Aa!";
//
var literalStr;
literalStr = "disable";
literalStr = "enable";
//
function showMessage(message) {
    console.log(message);
}
showMessage("1");
function calc(num1, num2) {
    return num1 + num2;
}
calc(1, 1);
function customError() {
    throw new Error("Error");
}
var page1 = {
    title: "The awesome page",
    likes: 100,
    accounts: ["Max", "Anton", "Nikita"],
    status: "open",
    details: {
        createAt: "2021-01-01",
        updateAt: "2021-05-01",
    },
};
var page2 = {
    title: "Python or Js",
    likes: 5,
    accounts: ["Alex"],
    status: "close",
};
