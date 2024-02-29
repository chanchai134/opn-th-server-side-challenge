import { Address } from "./address"
import { Gender } from "./gender"

export interface MemberDTO {
    email: string
    password: string
    name: string
    dateOfBirth: string
    gender: Gender
    address: Address
    subscribeNewsletter: boolean
}
export class Member {
    constructor(
        public email: string,
        public password: string,
        public name: string,
        public dateOfBirth: string,
        public gender: Gender,
        public address: Address,
        public subscribeNewsletter: boolean
    ) {}

    static create(dto: MemberDTO): Member {
        return new Member(
            dto.email,
            dto.password,
            dto.name,
            dto.dateOfBirth,
            dto.gender,
            dto.address,
            dto.subscribeNewsletter
        )
    }
}
