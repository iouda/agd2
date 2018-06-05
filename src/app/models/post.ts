export class Post {
    id: number;
    title: string;
    content: string;
    slug: string;
    featuredMedia: number;
    modified: Date;
    postImages: Array<any>;

    constructor(
        id: number,
        title: string,
        content: string,
        slug: string,
        featuredMedia?: number,
        modified?: Date,
        postImages?: Array<any>
    ) {
        this.id            = id;
        this.title         = title;
        this.content       = content;
        this.slug          = slug;
        this.featuredMedia = (featuredMedia ? featuredMedia : undefined);
        this.modified      = (modified ? modified : undefined);
        this.postImages    = (postImages ? postImages : undefined);
    }
}
