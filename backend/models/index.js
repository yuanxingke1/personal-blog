const { Sequelize, DataTypes } = require('sequelize');

// 创建数据库连接
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './blog.db',
  logging: false
});

// 定义模型
const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  excerpt: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft'
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories',
      key: 'id'
    },
    field: 'categoryId'
  }
}, {
  timestamps: true
});

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: true
});

const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: true
});

const Subscriber = sequelize.define('Subscriber', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  name: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('active', 'unsubscribed'),
    defaultValue: 'active'
  }
}, {
  timestamps: true
});

// 定义关联关系
Article.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Article, { foreignKey: 'categoryId' });

// 文章和标签的多对多关系
const ArticleTag = sequelize.define('ArticleTag', {}, {
  timestamps: false
});

Article.belongsToMany(Tag, { through: ArticleTag });
Tag.belongsToMany(Article, { through: ArticleTag });

module.exports = {
  sequelize,
  Article,
  Category,
  Tag,
  Subscriber
};