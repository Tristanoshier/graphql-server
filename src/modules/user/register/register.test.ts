import { gCall } from "../../../test-utils/gCall"
import { Connection } from "typeorm"
import { testConn } from "../../../test-utils/testConn"

let connection: Connection
beforeAll(async () => {
   connection =  await testConn()
})

afterAll(async () => {
    await connection.close()
})

const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe('Register', () => {
    it('create user', async () => {
        console.log(await gCall({
            source: registerMutation,
            variableValues: {
              data: {
                firstName: "bob",
                lastName: "bob2",
                email: "bob@bob.com",
                password: "asdfasdf"
              }
            }
        }))
    })
})