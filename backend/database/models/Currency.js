module.exports = (sequelize, DataTypes) => {
    let alias = 'Currency';
    let cols =  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING,
        },
        symbol: {
            type: DataTypes.STRING
        },
    };
    let config = {
        tableName: 'currencies',
        timestamps: false
    }
    const Currency = sequelize.define(alias, cols, config);
    
    Currency.associate = function(models){
        Currency.hasMany(models.Rate, {
            as: "rates",
            foreignKey: "id_currency"
        });  
    } 

    return Currency;
}