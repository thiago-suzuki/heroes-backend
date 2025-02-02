export interface CreateKnightRequestDTO {
    name: string
    nickname: string
    age: number
    birthday: string
    weapons: WeaponDTO[]
    attributes: AttributeKnightDTO
    keyAttribute: keyof AttributeKnightDTO
}

export interface KnightDTO {
    id: string;
    name: string
    nickname: string
    age: number
    birthday: string
    attack: number
    exp: number
    weapons: WeaponDTO[]
    attributes: AttributeKnightDTO
    keyAttribute: string
}


export interface WeaponDTO {
    name: string
    mod: number
    attr: string
    equipped: boolean
}

export interface AttributeKnightDTO {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
}

export interface filterByParamsDTO {
    typeFilter: string;
}

export interface updateKnightRequestDTO {
    nickname: string;
}