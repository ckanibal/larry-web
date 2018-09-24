import faker from 'faker';

let database = {
    uploads: {
        uploads: [],
    }
};

for (let i = 1; i <= 100; i++) {
    database.uploads.uploads.push({
        id: i,
        title: faker.random.words(),
        description: faker.random.words(50),
        pic: faker.image.imageUrl(400, 300),
        tags: Array.apply(0, Array(10)).map(faker.random.word),
        author: {
            username: faker.internet.userName(),

        },
        updatedAt: faker.date.past(1),
        createdAt: faker.date.past(2),
    });
}


console.log(JSON.stringify(database));

