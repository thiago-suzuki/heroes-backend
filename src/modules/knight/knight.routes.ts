import { Router } from 'express';
import bodyParser from 'body-parser';
import { KnightService } from './knight.services';
import { CreateKnightRequestDTO, filterByParamsDTO, updateKnightRequestDTO } from './knight.dto';

const knightApp = Router();
knightApp.use(bodyParser.json());

const knightService = new KnightService();

knightApp.get('/api/knights', async (req, res) => {
    try {
        const params: filterByParamsDTO = {
            typeFilter: req.query.typeFilter ? req.query.typeFilter.toString() : 'all'
        }

        let knights;

        switch(params.typeFilter) {
            case 'heroes':
                knights = await knightService.getKnightsHeroes() 
                break;
            case 'not-heroes':
                knights = await knightService.getKnightsNotHeroes() 
                break;
            default:
                knights = await knightService.getAllKnights() 
                break;
        }

        res.status(200).send(knights);
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: e });
    }
})

knightApp.get('/api/knights/:knightId', async (req, res) => {
    try {
        const knight = await knightService.getKnightById(req.params.knightId)
        res.status(200).send(knight);
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: e });
    }
})

knightApp.post('/api/knights', async (req, res) => {
    try {
        const knight: CreateKnightRequestDTO = {
            name: req.body.name,
            nickname: req.body.nickname,
            age: Number(req.body.age.toString()),
            birthday: req.body.birthday,
            weapons: req.body.weapons.map((weapon: any) => ({
                name: weapon.name,
                mod: weapon.mod,
                attr: weapon.attr,
                equipped: weapon.equipped
            })),
            keyAttribute: req.body.keyAttribute,
            attributes: {
                charisma: Number(req.body.attributes.charisma.toString()),
                constitution: Number(req.body.attributes.constitution.toString()),
                dexterity: Number(req.body.attributes.dexterity.toString()),
                intelligence: Number(req.body.attributes.intelligence.toString()),
                strength: Number(req.body.attributes.strength.toString()),
                wisdom: Number(req.body.attributes.wisdom.toString())
            }
        }

        const knightCreated = await knightService.createKnight(knight)
        res.status(200).send(knightCreated);
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: e });
    }
    
})

knightApp.put('/api/knights/:knightId', async (req, res) => {
    try {
        const params: updateKnightRequestDTO = {
            nickname: req.body.nickname ? req.body.nickname.toString() : ''
        }

        if(params.nickname == '') {
            res.status(400).send('Invalid Parameters!');
        }

        const knight = await knightService.updateKnight(req.params.knightId, params)
        res.status(200).send(knight);
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: e });
    }
})

knightApp.delete('/api/knights/:knightId', async (req, res) => {
    try {
        const knight = await knightService.deleteKnight(req.params.knightId)
        res.status(200).send(knight);
    } catch (e) {
        console.log(e)
        res.status(400).send({ error: e });
    }
})

export { knightApp }