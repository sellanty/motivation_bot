import { Model, DataTypes } from 'sequelize';
import sequelize from '../connections';

export class Photo extends Model {
  public id!: number;
  public type!: 'morning' | 'evening' | 'motivation';
  public url!: string;
  public caption?: string;
  public isActive!: boolean; 
}

Photo.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM('morning', 'evening', 'motivation'),
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  caption: {
    type: DataTypes.STRING(300),
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: 'Photo',
  tableName: 'photos',
  timestamps: true,
});