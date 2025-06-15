import bcrypt from "bcrypt";
export class User {
    id;
    fullName;
    email;
    passwordHash;
    userType;
    createdAt;
    picture;
    constructor(props) {
        this.id = props.id;
        this.fullName = props.fullName;
        this.email = props.email;
        this.passwordHash = props.passwordHash;
        this.userType = props.userType;
        this.createdAt = props.createdAt;
        this.picture = props.picture ?? null;
    }
    updateFullName(newName) {
        this.fullName = newName;
    }
    updatePicture(newPicture) {
        this.picture = newPicture;
    }
    async isPasswordValid(plainPassword) {
        return bcrypt.compare(plainPassword, this.passwordHash);
    }
    getPublicProfile() {
        return {
            id: this.id,
            fullName: this.fullName,
            email: this.email,
            userType: this.userType,
            picture: this.picture,
            createdAt: this.createdAt,
        };
    }
}
