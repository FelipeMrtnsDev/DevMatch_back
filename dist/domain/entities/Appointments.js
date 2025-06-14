export class Appointment {
    props;
    constructor(props) {
        this.props = props;
    }
    get id() {
        return this.props.id;
    }
    get doctorId() {
        return this.props.doctorId;
    }
    get service() {
        return this.props.service;
    }
    get date() {
        return this.props.date;
    }
    get hour() {
        return this.props.hour;
    }
}
