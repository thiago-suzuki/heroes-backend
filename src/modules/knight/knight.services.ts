import { Knight } from '../../models/knight.model'
import { CreateKnightRequestDTO, KnightDTO, updateKnightRequestDTO } from './knight.dto'

export class KnightService {
    async getAllKnights() {
        return await Knight.find<KnightDTO[]>({})
    }

    async getKnightsHeroes() {
        return await Knight.find<KnightDTO[]>({ deletedAt: { $ne: null }});
    }

    async getKnightsNotHeroes() {
        return await Knight.find<KnightDTO[]>({ deletedAt: null });
    }

    async getKnightById(id: string) {
        return await Knight.findById<KnightDTO>(id)
    }

    async createKnight(knight: CreateKnightRequestDTO) {
        let expKnight = Math.floor((knight.age - 7) * Math.pow(22, 1.45))
        let attackKnight = this.calculateAttack(knight);

        return await Knight.create({
            ...knight,
            exp: expKnight,
            attack: attackKnight
        })
    }

    calculateAttack(knight: CreateKnightRequestDTO) {
        const baseAttack = 10;
    
        // Calcula o modificador do atributo-chave
        const keyAttributeValue = knight.attributes[knight.keyAttribute];
        const keyAttributeMod = Math.floor((keyAttributeValue - 10) / 2);
    
        // Soma os mods das armas equipadas
        const equippedWeaponsMod = knight.weapons
            .filter(weapon => weapon.equipped)
            .reduce((sum, weapon) => sum + weapon.mod, 0);
    
        return baseAttack + keyAttributeMod + equippedWeaponsMod;
    };

    async updateKnight(id: string, params: updateKnightRequestDTO) {
        return await Knight.findByIdAndUpdate<KnightDTO>(
            id, 
            { nickname: params.nickname }, 
            { new: true }
        );
    }

    async deleteKnight(id: string) {
        return await Knight.findByIdAndUpdate<KnightDTO>(
            id, 
            { deletedAt: new Date() }, 
            { new: true }
        );
    }
}