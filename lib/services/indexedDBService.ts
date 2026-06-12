import { DocumentContentResponse } from "../types"

const DB_NAME = "juriscribe_drafts"
const DB_VERSION = 1
const STORE_NAME = "drafts"

// Returns a ready db instance (opens it if needed)
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => {
      reject(new Error(`IndexedDB open error: ${request.error?.message}`))
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    // Only runs on first open or version bump
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      //create store if not existing yet
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" })
      }
    }
  })
}

export const addDocumentChangesToDraft = async (
  object: DocumentContentResponse
): Promise<void> => {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.put({ ...object })

    request.onsuccess = () => {
      console.log("Document saved to draft:", request.result)
      resolve()
    }

    request.onerror = () => {
      reject(new Error(`Add error: ${request.error?.message}`))
    }
  })
}

export const getDocumentFromDraft = async (
  id: number
): Promise<DocumentContentResponse | undefined> => {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.get(id)
    // Return undefined if not found else return the document
    request.onsuccess = () => {
      console.log("Document retrieved from draft:", request.result)
      resolve(request.result as DocumentContentResponse | undefined)
    }

    request.onerror = () => {
      reject(new Error(`Get error: ${request.error?.message}`))
    }
  })
}

export const getAllUserDocumentsFromDraft = async (
  id: number
): Promise<DocumentContentResponse[]> => {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly")
    const store = transaction.objectStore(STORE_NAME)
    store.openCursor().onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
      const documents: DocumentContentResponse[] = []
      if (cursor) {
        const document = cursor.value
        if (document.userId === id) {
          documents.push(document)
        }
        resolve(documents)
        cursor.continue()
      }
    }
    store.openCursor().onerror = () => {
      console.log("Error fetching drafts")

      reject(new Error(`Get error: `))
    }
  })
}

export const removeDocumentFromDraft = async (id: number): Promise<void> => {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.delete(id)

    request.onsuccess = () => {
      console.log("Document removed from draft, id:", id)
      resolve()
    }

    request.onerror = () => {
      reject(new Error(`Delete error: ${request.error?.message}`))
    }
  })
}
