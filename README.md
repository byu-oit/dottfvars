# dottfvars

Parses a `.tfvars` or `.tfvars.json` file and adds the key value pairs
to the node environment variables (`process.env`). This module is
intended to be used in conjunction with the
[`env-var` module](https://www.npmjs.com/package/env-var).

## Usage

Can parse `.tfvars` files

```ts
import {resolve} from 'path'

dottfvars.from(resolve(__dirname, 'iac/development.tfvars'))
const imageId = env.from(process.env).get('image_id').asString()
```

Alternatively, you may define your tfvars as JSON and pass in a
`.tfvars.json` file path instead.

Related Packages:
- [env-ssm](https://github.com/byu-oit/env-ssm#readme)
