const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async ()=> {
    await Campground.deleteMany({});
    for(let i=0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) +10;
        const camp = new Campground({
            author: '60ddd7d666da073af027981a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec lobortis velit, eget cursus libero. Etiam libero tortor, mattis ac metus nec, porttitor auctor libero. Proin et viverra sem. Phasellus.',
            price: price,
            images: [
                {
                  url: 'https://res.cloudinary.com/da79rohzc/image/upload/v1625833314/YelpCamp/rtlnaz9xbzp6ofmgaj8f.jpg',
                  filename: 'YelpCamp/rtlnaz9xbzp6ofmgaj8f'    },
                {
                  url: 'https://res.cloudinary.com/da79rohzc/image/upload/v1625833314/YelpCamp/gtfkcav5nikrf3tpuzgl.jpg',
                  filename: 'YelpCamp/gtfkcav5nikrf3tpuzgl'    }
              ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});