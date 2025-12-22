import { faker } from '@faker-js/faker';

export class Helpers {

    static generateArticle() {
        return {
            title: faker.word.adjective(),
            description: faker.word.adjective(),
            text: faker.lorem.lines(3),
            tags: faker.word.adjective(),
        };
    }
}