const jwt = require('jsonwebtoken');

const MODULE_NAME = 'lib-token';

const DEF_LOGGER = null;
const DEF_SECRET = 'Tim';
const DEF_EXPIRES_IN = '1d';

const DEF_CONFIGS = {
  logger: DEF_LOGGER,
  secret: DEF_SECRET,
  expiresIn: DEF_EXPIRES_IN,
}

class LibToken {
  constructor(configs=DEF_CONFIGS) {
    this.logger = configs.logger || DEF_LOGGER;
    this.secret = configs.secret || DEF_SECRET;
    this.expiresIn = configs.expiresIn || DEF_EXPIRES_IN;

    this.log('info', 'Initialized');
  }

  userToToken = (user) => jwt.sign(user, this.secret, { expiresIn: this.expiresIn });

  tokenToUser = (token) => {
    try {
      const user = jwt.verify(token, this.secret);
      return user;
    } catch (e) {
      return null;
    }
  };
  
  log = (level=DEF_LEVEL, msg) => 
    this.logger ? 
      this.logger.log(MODULE_NAME, level, msg) :
      console.log(`${level}: [${MODULE_NAME}] ${msg}`);

  toString = () => `[${MODULE_NAME}]\n\
    \tlogger: ${this.logger ? 'yes' : 'no'}\n\
    `;  
}

module.exports = LibToken;
