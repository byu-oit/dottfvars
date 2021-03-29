import {resolve} from 'path'
import * as env from 'env-var'
import * as dottfvars from '../src/dottfvars'

test('parses .tfvars file', async () => {
  await dottfvars.from(resolve(__dirname, 'examples/good.tfvars'))
  const imageId = env.from(process.env).get('image_id').asString()
  const availabilityZoneNames = env.from(process.env).get('availability_zone_names').asJsonArray()
  expect(typeof imageId).toBe('string')
  expect(availabilityZoneNames).toHaveLength(2)
})

test('parses tfvars.json file', async () => {
  await dottfvars.from(resolve(__dirname, 'examples/good.tfvars.json'))
  const imageId = env.from(process.env).get('image_id').asString()
  const availabilityZoneNames = env.from(process.env).get('availability_zone_names').asJsonArray()
  expect(typeof imageId).toBe('string')
  expect(availabilityZoneNames).toHaveLength(2)
})

test('throws when parse fails', async () => {
  await expect(() => dottfvars.parse('{')).rejects.toThrow()
})
