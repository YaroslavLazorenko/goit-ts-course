class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  private key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door = true;
  private tenants: Person[] = [];

  constructor(protected key: Key) {}

  public comeIn(person: Person): void {
    if (!this.door) {
      throw new Error("Door is closed");
    }

    this.tenants.push(person);
    console.log("Person inside");
  }

  abstract openDoor(key: Key): boolean;
}

class MyHouse extends House {
  constructor(public key: Key) {
    super(key);
  }

  openDoor(key: Key): boolean {
    if (this.key != key) {
      throw new Error("Key to another door");
    }

    return (this.door = true);
  }
}

const key = new Key();
const house = new MyHouse(key);
const person1 = new Person(key);

house.openDoor(person1.getKey());
house.comeIn(person1);
