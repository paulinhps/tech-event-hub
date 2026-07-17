import seed from './seed-db.json'


type TEvent = (typeof seed.events)[number]
type TCategory = (typeof seed.categories)[number]


export type MockDatabase = {
    events: TEvent[]
    categories: TCategory[]
}

export const MOCK_DATABASE_STORAGE_KEY = 'tech-event-hub:mock-database:v1'

function createDatabaseFromSeed(): MockDatabase {
    return structuredClone({
        events: seed.events,
        categories: seed.categories,
    }) as MockDatabase
}

function isMockDatabase(value: unknown): value is MockDatabase {
    if (!value || typeof value !== 'object') {
        return false
    }
    const database = value as Partial<MockDatabase>

    return [Array.isArray(database.events)].every(o => o)
}

export function loadDatabase(): MockDatabase {
    const storedDatabase = localStorage.getItem(MOCK_DATABASE_STORAGE_KEY)

    if (storedDatabase) {
        try {
            const database: unknown = JSON.parse(storedDatabase)

            if (isMockDatabase(database)) {
                return database
            }
        } catch {
            // A persistencia invalida sera substituida pelo seed abaixo.
        }
    }

    return resetDatabase()
}

export function saveDatabase(database: MockDatabase): void {
    localStorage.setItem(MOCK_DATABASE_STORAGE_KEY, JSON.stringify(database))
}

export function resetDatabase(): MockDatabase {
    const database = createDatabaseFromSeed()
    saveDatabase(database)

    return database
}
