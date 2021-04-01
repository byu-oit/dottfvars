# dottfvars

Parses a `.tfvars` or `.tfvars.json` file and adds the key value pairs
to the node environment variables (`process.env`). This module is
intended to be used in conjunction with the
[`env-var` module](https://www.npmjs.com/package/env-var).

## Install

Published on **GPR** and **NPM**.

```bash
npm i @byu-oit/dottfvars
```

## Usage

#### from

Add contents of a tfvars file to process.env. The contents of
process.env will not be overwritten by the contents of your tfvars.

```ts
import {resolve} from 'path'
import * as dottfvars from '@byu-oit/dottfvars'
import env from 'env-var'

dottfvars.from(resolve(__dirname, 'iac/development.tfvars'))
const imageId = env.from(process.env).get('image_id').asString()
```

Alternatively, you may define your tfvars as JSON and pass in a
`.tfvars.json` file path instead.

#### parse

Sometimes you may just want the JSON representation of the tfvars file
without merging it with process.env

```ts
import {resolve} from 'path'
import * as dottfvars from '@byu-oit/dottfvars'
import env from 'env-var'

const container = dottfvars.parse(resolve(__dirname, 'local.tfvars'))
const imageId = env.from(container).get('image_id').asString()
```

Related Packages:
- [env-ssm](https://github.com/byu-oit/env-ssm#readme)

