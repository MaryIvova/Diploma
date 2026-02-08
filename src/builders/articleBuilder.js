import { faker } from '@faker-js/faker';

export class ArticleBuilder {
    addTitle() {
        this.title = faker.word.adjective();
        return this;
    }
    addDescription() {
        this.description = faker.word.adjective();
        return this;
    }
    addText() {
        this.text = faker.lorem.lines(3);
        return this;
    }
    addTags() {
        this.tags = faker.word.adjective();
        return this;
    }
    generate() {
        return { ...this };
    }
}