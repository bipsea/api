import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("items", {
    itemId: {
      type: DataTypes.STRING(),
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(10485760),
    },
    description: {
      type: DataTypes.STRING(10485760),
    },
    imageUri: {
      type: DataTypes.STRING,
    },
    chain: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
    seller: {
      type: DataTypes.STRING,
    },
    filename: {
      type: DataTypes.STRING,
    },
    encryptedFileUri: {
      type: DataTypes.STRING,
    },
    encryptedSymmetricKey: {
      type: DataTypes.STRING(512),
    },
    onchain: {
      type: DataTypes.BOOLEAN,
    },
  });
};
