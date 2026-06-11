import { DocumentContentResponse } from "../types"

const db_name = "juriscribe_drafts"

let db: IDBDatabase
let readonly_transaction: IDBTransaction
let readwrite_transaction: IDBTransaction
const request = window.indexedDB.open(db_name, 1)

request.onerror = (event) => {
  console.error(
    "IndexedDB error on open database:",
    (event.target as IDBOpenDBRequest).error?.message
  )
}

request.onupgradeneeded = (event) => {
  db = (event.target as IDBOpenDBRequest).result
  const objectStore = db.createObjectStore("drafts", { keyPath: "id" })

  objectStore.createIndex("id", "id", { unique: true })

  objectStore.transaction.oncomplete = () => {
    console.log("Object store created")
    readonly_transaction = db.transaction("drafts", "readonly")
    readwrite_transaction = db.transaction("drafts", "readwrite")
  }

  db.onerror = (event) => {
    console.error(
      "IndexedDB error:",
      (event.target as IDBRequest).error?.message
    )
  }
}

export const addDocumentChangesToDraft = (object: DocumentContentResponse) => {
  const objectStore = readwrite_transaction.objectStore("drafts")
  const request = objectStore.put({
    ...object,
  })
  request.onsuccess = (event) => {
    console.log("Document added to draft", (event.target as IDBRequest).result)
  }
  request.onerror = (event) => {
    console.error(
      "IndexedDB error when adding document:",
      (event.target as IDBRequest).error?.message
    )
  }
}

export const getDocumentFromDraft = (id: number) => {
  const objectStore = readonly_transaction.objectStore("drafts")
  const request = objectStore.get(id)
  request.onsuccess = (event) => {
    console.log(
      "Document retrieved from draft",
      (event.target as IDBRequest).result
    )
  }
  request.onerror = (event) => {
    console.error(
      "IndexedDB error when retrieving document:",
      (event.target as IDBRequest).error?.message
    )
  }
}

export const removeDocumentFromDraft = (id: number) => {
  const objectStore = readwrite_transaction.objectStore("drafts")
  const request = objectStore.delete(id)
  request.onsuccess = (event) => {
    console.log(
      "Document removed from draft",
      (event.target as IDBRequest).result
    )
  }
  request.onerror = (event) => {
    console.error(
      "IndexedDB error when removing document:",
      (event.target as IDBRequest).error?.message
    )
  }
}
