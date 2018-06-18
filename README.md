# Brewtal

Entertainment website where you can build an amazing cocktail from various different ingredients and share it with your friends

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

First of all, you will need [Node.js](https://nodejs.org) of version `10.2.1` or compatible with it, [npm](https://www.npmjs.com/) version `6.0.1` or compatible, and [git](https://git-scm.com/downloads) `2.17.0` or compatible.

Check if everything is OK by running `npm -v`, `node -v` and `git --version` in the CLI, it should look simmilar to this:

```bash
> npm -v
6.0.1
```

```bash
> node -v
v10.2.1
```

```bash
> git --version
git version 2.17.0.windows.1
```

To connect to the database you will need to ask the [Amazon team admin](https://github.com/VernonHawk) to make you an IAM account so you can get access to S3 and DynamoDB.
After your account is ready, you will get your Access Key *(for example, AKIAIOSFODNN7EXAMPLE)* and Secret Access Key *(for example, wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY)* \
**Do not provide your access keys to anyone, even your teammates, you might give someone full access to your account.**\
Apart from that, you will be given an .env file, containing environment variables (we don't upload it to GitHub due to security reasons). In this file, you will see something like this:

```bash
PORT = 3000

REGION = "eu-west-2"
AWS_ACCESS_KEY_ID = XXXX
AWS_SECRET_ACCESS_KEY = YYYY
```

Put your Access Key and Secret Access Key instead of XXXX and YYYY respectively.

### Installing

After you have installed [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/), open the CLI at the projects root directory. Then install the node modules via `npm install` or `npm i`.

### Development and build

After installing the packages, you sould be able to run these commands:

- `npm run dev-server` to launch a development server with [nodemon](https://www.npmjs.com/package/nodemon)
- `npm run start` to just launch a server.

Examples:

```bash
> npm run dev-server

[nodemon] 1.17.5
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node server.js`
App listening on port 3000!
```

```bash
> npm run start

App listening on port 3000!
```

## Running the tests

Tests are powered by [Mocha](https://mochajs.org), [Chai](http://www.chaijs.com/), [Supertest](https://www.npmjs.com/package/supertest) and [Istanbul](https://istanbul.js.org/).\
To run the test suite, run `npm test`:

```bash
> npm test
```

## Deployment

Continious Delivery system, which handles the deployment, is triggered by push to `master` branch, which doesn't happen very often and **must** be discussed with the team.

## Built With

- [Node.js](https://nodejs.org) - JavaScript runtime powering the server
- [Express](http://expressjs.com/) - Node.js web framework
- [Amazon S3](https://aws.amazon.com/s3/) - Object storage, used to store images
- [Amazon DynamoDB](https://aws.amazon.com/dynamodb) - NoSQL cloud database
- [MaterializeCSS](https://materializecss.com/) - UI library

## Authors

- **Ladislava Klischenko** - *Project manager, manual QA* - [LadaKlischenko](https://github.com/LadaKlischenko)
- **Igor Morenec** - *Team lead, back-end, DevOps* - [VernonHawk](https://github.com/VernonHawk)
- **Anna Tsukanova** - *Front-end, designer* - [AnnabellFlem](https://github.com/AnnabellFlem)
- **Denys Melnychenko** - *Front-end, designer* - [chelicerae](https://github.com/chelicerae)

## License

This project is licensed under the GNU  General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
