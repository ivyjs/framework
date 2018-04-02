const mocha = require('mocha');
const chai = require('chai');
const Config = require('../../src/Config');

chai.should();

describe('Config', () => {
    let config;

    before(() => {
        config = new Config();
    });

    it('loads .env config from path', () => {
        config.loadEnvFromPath(process.env.PWD + '/test/unit/configs/.env');
        process.env.should.have.property('NAME').that.equal('good');
    });

    it('returns value from .env if it exists, otherwise get default value', () => {
        config.env('NAME').should.be.equal('good');
        config.env('TEST', 'default').should.be.equal('default');
    });

    it('loads config from file', () => {
        config.loadConfig('app', require('./configs/app'));
        config.configs.collection.should.have
            .property('app')
            .that.deep.equals(require('./configs/app'));
    });

    it('returns property with dot notation, default if not found', () => {
        config.get('app.port').should.equal('3000');
        config.get('database.driver', 'mongodb').should.equal('mongodb');
    });

    it('loads configs from root dir', () => {
        config.loadEnvConfigs();
    });
});
