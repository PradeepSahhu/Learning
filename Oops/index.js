class Animal {
  #matter;
  constructor() {
    this.age = 0;
    this.breed = "Unknown";
  }

  getBreed = () => {
    console.log(`The animal breed is : ${this.breed}`);
  };

  getBreed = () => {
    console.log(`The animal breed is : ${this.breed}`);
  };
}

class Cat extends Animal {
  getBreed = () => {
    console.log(`The Cat breed is : ${this.breed}`);
  };
}

var c = new Cat();

c.breed = "White";
c.getBreed();
