import { database } from "../database"
import { Member, MemberDTO } from "../models/member"

export const registerProfile = (dto: MemberDTO): void => {
    const newMember = Member.create(dto)
    database.set(newMember.email, newMember)
}
