const Sequelize = require('sequelize');

module.exports = class Posts extends Sequelize.Model{
    static init(sequelize){
        return super.init({
						title: {
                            type: Sequelize.STRING(30)
                        },
                        content: {
                            type: Sequelize.STRING(30)
                        },
                        flag: {
                            type: Sequelize.STRING(5)
                        },
                        store: {
                            type: Sequelize.STRING(20)
                        },
                        writer: {
                            type: Sequelize.STRING(20)
                        },


		}, {
            sequelize,
            timestamps: false,
            modelName: 'Posts',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        
    }
};