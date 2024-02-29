import dayjs, { Dayjs } from 'dayjs'
export class Member {
    constructor(
        public email: string,
        public password: string,
        public name: string,
        public dateOfBirth: Dayjs,
        public gender: "male" | "female",
        public address: string,
        public subscribeNewsletter: boolean
    ) {}

    public verifyPassword(challengePassword: string) {
        return this.password === challengePassword
    }

    public calculateAge() {
        const months = dayjs().diff(this.dateOfBirth, 'month')
        const residual = months % 12
        return (months >= 12 ? `${Math.trunc(months/12)} year(s)` : "") + " " +
        (residual ? `${residual} month(s)` : "")
    }
}
