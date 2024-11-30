export declare class CreateUserDto {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    profilePicture: string;
    bio: string;
    skills: string[];
    projects: {
        title: string;
        description: string;
        link: string;
    }[];
    socialLinks: {
        github: string;
        linkedin: string;
        twitter: string;
    };
}
