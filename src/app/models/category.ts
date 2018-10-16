export class Category {
    id: number;
    name: string;
    description: string;
    slug: string;
    postsCount: number;

    constructor(
        id: number,
        name: string,
        description: string,
        slug: string,
        postsCount: number
    ) {
        this.id          = id;
        this.name        = name;
        this.description = description;
        this.slug        = slug;
        this.postsCount  = postsCount;
    }
}
