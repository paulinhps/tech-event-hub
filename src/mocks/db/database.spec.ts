import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { loadDatabase, MOCK_DATABASE_STORAGE_KEY, saveDatabase } from "./database";

beforeEach(() => {
    localStorage.clear()
})

afterEach(() => {
    localStorage.clear()
})
describe("Mock Database simulado do backend", () => {

    it("inicializa a persistencia da base quando ela não existe", () => {
        const database = loadDatabase()

        expect(database).not.toBeNull()
        expect(localStorage.getItem(MOCK_DATABASE_STORAGE_KEY)).not.toBeNull()
    });

    it("atualiza a base de dados alterada", () => {
        const database = loadDatabase();

        const categoryCount = database.categories.length;

        const expectedCategory = {
            id: 'category-test',
            name: "Categoria de Teste",
        };
        database.categories.push(expectedCategory)

        saveDatabase(database)

        const updatedDatabase = loadDatabase()
        expect(updatedDatabase.categories.length).toBe(categoryCount + 1)
        expect(updatedDatabase.categories.find(c => c.id === expectedCategory.id)).not.toBeUndefined();

    });

    it.each([
        ['null'],
        ['false'],
        ['123'],
        ['{}'],
        ['corrupted data'],
    ])('refaz base de dados caso ela seja corrompida com localStorage contendo %s', (storedValue) => {
        localStorage.setItem(MOCK_DATABASE_STORAGE_KEY, storedValue)

        const database = loadDatabase()

        expect(database).not.toBeNull()
    })
})

