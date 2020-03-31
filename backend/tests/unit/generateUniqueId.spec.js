const generateUniqueId = require('../../src/utils/generateUniqueId')

describe('Generate Unique Id', () => {//o que o teste é

    it('should generate an unique ID', () => {//oque deve fazer

        const id = generateUniqueId()//passando a funçao de gerar id 

        expect(id).toHaveLength(8)//espera que retorne o id, esse id deve ter 8 carcters de tamanho
    })

})