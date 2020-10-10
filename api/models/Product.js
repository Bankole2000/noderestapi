const { Model, Sequelize, DataTypes } = require('sequelize');
const db = require('../../config/database');
// const bcrypt = require('bcrypt');

class Product extends Model {
  // static LoginError(message, field) {
  //   const errors = [];
  //   errors.push({ message, path: field });
  //   return { errors };
  // }
  // static test(a) {
  //   console.log(a);
  // }
  // static async authenticate(email, password) {
  //   const user = await this.findOne({ where: { email } });
  //   if (user) {
  //     const auth = bcrypt.compareSync(password, user.password); //returns a boolean
  //     if (auth) {
  //       return user;
  //     } else {
  //       console.log(auth);
  //       throw this.LoginError('Incorrect Password', 'password');
  //     }
  //   } else {
  //     throw this.LoginError('Email is not registered', 'email');
  //   }
  // }
}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'name field cannot be empty',
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: `Price value cannot be below zero (0)`,
        },
        isInt: {
          msg: 'Must be an integer number of pennies',
        },
      },
      // validate: {
      //   min(value) {
      //     if (value < 0) {
      //       throw new Error('Price cannot be below 0');
      //     }
      //   },
      // },
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
  },
  {
    sequelize: db,
    modelName: 'product',
    // hooks: {
    //   beforeCreate: async (user, options) => {
    //     try {
    //       const salt = await bcrypt.genSalt();
    //       user.password = await bcrypt.hash(user.password, salt);
    //       console.log('user was created', user);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   },
    // },
  }
);

module.exports = Product;
