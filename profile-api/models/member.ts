import dayjs, { Dayjs } from 'dayjs'
import { ProfileError } from '../profile-error'

export class Member {
    private _version = 1
    constructor(
        public email: string,
        private password: string,
        public name: string,
        public dateOfBirth: Dayjs,
        public gender: "male" | "female",
        public address: string,
        public subscribeNewsletter: boolean
    ) {}

    get version() {
        return this._version
    }

    public verifyVersion(challengeVersion: number) {
        return this._version === challengeVersion
    }


    public verifyPassword(challengePassword: string) {
        return this.password === challengePassword
    }

    public calculateAge() {
        const months = dayjs().diff(this.dateOfBirth, 'month')
        const residual = months % 12
        return (months >= 12 ? `${Math.trunc(months/12)} year(s)` : "") + " " +
        (residual ? `${residual} month(s)` : "")
    }

    public changePassword(currentPassword: string, newPassword: string) {
        if(!this.verifyPassword(currentPassword)) {
            throw new ProfileError("current password is wrong. please, try again.")
        }
        this.password = newPassword
        this._version++
    }
}
