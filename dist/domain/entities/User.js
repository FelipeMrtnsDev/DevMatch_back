import bcrypt from "bcrypt";
export class User {
    props;
    constructor(props) {
        this.props = props;
    }
    get id() {
        return this.props.id;
    }
    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
    }
    get password() {
        return this.props.password;
    }
    async isPasswordValid(plainPassword) {
        return bcrypt.compare(plainPassword, this.props.password);
    }
}
