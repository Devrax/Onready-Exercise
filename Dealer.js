const SCHEMESTRING = `
{
    model: "string",
    brand: "string",
    price: "number",
    doors: "number", // Optional, but require if no Cilinders
    cilinders: "string"
}
`;

const cars = [
    {
        model: '206',
        brand: 'Peugeot',
        price: 200_000,
        doors: 4
    },
    {
        model: 'Titan',
        brand: 'Honda',
        price: 60_000,
        cilinders: '125cc'
    },
    {
        model: '208',
        brand: 'Peugeot',
        price: 250_000,
        doors: 5
    },
    {
        model: 'YBR',
        brand: 'Yamaha',
        price: 80_500.50,
        cilinders: '160cc'
    }
]

function Dealer() {
    this.cars = [];
}

Dealer.prototype.addCar = function (car) {
    if(car != null && typeof car === 'object') {
        const keys = Object.keys(car);
        const scheme = ['model', 'brand', 'price'];
        const optionalScheme = ['doors', 'cilinders'];
        const isSchemeCorrect = (key) => keys.includes(key);
        if(scheme.every(isSchemeCorrect) && optionalScheme.some(isSchemeCorrect)) {
            this.cars.push(car);
        } else {
            throw new Error(`
            This object doesn't fit with the scheme:
            ${SCHEMESTRING};

            Instead we got:

            ${JSON.stringify(car)}
            `)
        }
    } else {
        throw new Error(`
            Argument passed has to be "object" type, but instead got: ${typeof car} and it's value is ${car}.

            The argument should fit with the following scheme:
            ${SCHEMESTRING}
        `)
    }
}

Dealer.prototype.printCars = function () {
    const sortLowerToGreater = [...this.cars].sort((a, b) => a.price - b.price);
    const sortGreaterToLower = [...sortLowerToGreater];
    sortGreaterToLower.reverse();

    return `${this.cars.map(this.stringifyCarObjet.bind(this)).join('\n')}
=============================
Vehículo más caro: ${this.concatBrandModel(sortLowerToGreater[this.cars.length - 1])}
Vehículo más barato: ${this.concatBrandModel(sortLowerToGreater[0])}
Vehículo que contiene en el modelo la letra ‘Y’: ${this.findCharacters('y')}
=============================
Vehículos ordenados por precio de mayor a menor:
${sortGreaterToLower.map(this.concatBrandModel.bind(this)).join('\n')}`;
}

Dealer.prototype.concatBrandModel = function (car) {
    return `${car.brand} ${car.model}`;
}

Dealer.prototype.findCharacters = function (char) {
    const incidence = this.cars.find((car) => car.model.toLocaleLowerCase().includes(char));
    return incidence ? `${incidence.brand} ${incidence.model} ${this.moneyFormat(incidence.price)}` : `Ninguno de los autos contiene incidencias con ${char}`;
}

Dealer.prototype.stringifyCarObjet = function (car) {
    let complementaryData = '';   
    if('doors' in car) complementaryData += ` Puertas: ${car.doors} //`;
    if('cilinders' in car) complementaryData += ` Cilindrada: ${car.cilinders} //`;

    return `Marca: ${car.brand} // Modelo: ${car.model} //${complementaryData} Precio: ${this.moneyFormat(car.price)}`
}

Dealer.prototype.moneyFormat = function (money) {
    const CURRENTOPTIONS = { 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 2, 
        style: 'currency', 
        currency: 'USD'
    };

    return money.toLocaleString('en-US', CURRENTOPTIONS);
}

const dealerGonzalez = new Dealer();
cars.forEach((car) => dealerGonzalez.addCar(car));
console.log(dealerGonzalez.printCars());
