module.exports = (sequelize, DataTypes) => {
    let alias = 'Rate';
    let cols =  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_currency: {
            type: DataTypes.INTEGER,
        },
        value: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE
        },
        deleted_at: {
            type: DataTypes.DATE
        }
    };
    let config = {
        tableName: 'rates',
        timestamps: false
        }
    const Rate = sequelize.define(alias, cols, config);
    Rate.associate = function(models){
        Rate.belongsTo(models.Currency, {
            as: "currency",
            foreignKey: "id_currency"
        });   
    } 
    return Rate;
}